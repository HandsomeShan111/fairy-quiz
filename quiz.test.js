// bun test side/fairy-quiz
import { expect, test } from "bun:test";
import { FAIRIES, QUESTIONS, result } from "./quiz.js";

// Every possible run: 4^6 answer combinations.
const allRuns = [...Array(4 ** QUESTIONS.length).keys()].map((n) =>
  QUESTIONS.map((_, q) => Math.floor(n / 4 ** q) % 4),
);

test("six questions, four answers each, every fairy known", () => {
  expect(QUESTIONS).toHaveLength(6);
  for (const q of QUESTIONS) {
    expect(q.answers).toHaveLength(4);
    for (const [main, second] of q.answers) {
      expect(FAIRIES[main]).toBeDefined();
      expect(FAIRIES[second]).toBeDefined();
      expect(main).not.toBe(second);
    }
  }
});

test("main +2, second +1: clear winner", () => {
  // kod: main in Q1, Q3, Q5, Q6, second in Q2, Q4 = 10.
  expect(result([0, 0, 1, 1, 2, 2])).toBe("kod");
});

test("tie goes to the tied fairy picked as main most recently", () => {
  // All A: art 4 (main Q3, Q6), hype 4 (main Q5). Art was main last.
  expect(result([0, 0, 0, 0, 0, 0])).toBe("art");
  // Same, with Q6 D (bag main, plan second): bag 5 wins clearly.
  expect(result([0, 0, 0, 0, 0, 3])).toBe("bag");
  // Q5 D (ideya main, art second) and Q6 A (art main, ideya second): art 5, ideya 5; art was main last.
  expect(result([0, 0, 0, 0, 3, 0])).toBe("art");
  // Q6 C (kod main, ideya second) instead: kod 5, ideya 5; kod was main last.
  expect(result([0, 0, 0, 0, 3, 2])).toBe("kod");
});

test("every run: winner has the top score; ties go to the latest main", () => {
  const wins = {};
  let ties = 0;
  for (const picks of allRuns) {
    const score = {};
    const lastMain = {};
    picks.forEach((p, q) => {
      const [main, second] = QUESTIONS[q].answers[p];
      score[main] = (score[main] ?? 0) + 2;
      score[second] = (score[second] ?? 0) + 1;
      lastMain[main] = q;
    });
    const winner = result(picks);
    const top = Math.max(...Object.values(score));
    const tied = Object.keys(score).filter((f) => score[f] === top);
    expect(score[winner]).toBe(top);
    // At least one tied fairy was a main pick, so the tie rule always decides.
    expect(lastMain[winner]).toBeDefined();
    for (const f of tied) expect(lastMain[f] ?? -1).toBeLessThanOrEqual(lastMain[winner]);
    if (tied.length > 1) ties++;
    wins[winner] = (wins[winner] ?? 0) + 1;
  }
  expect(Object.keys(wins).sort()).toEqual(Object.keys(FAIRIES).sort());
  expect(ties).toBeGreaterThan(0);
  console.log("wins per fairy over 4096 runs:", JSON.stringify(wins), "ties:", ties);
});
