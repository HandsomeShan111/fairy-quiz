import { FAIRIES, QUESTIONS, result } from "./quiz.js";

const $ = (id) => document.getElementById(id);
const LETTERS = ["A", "B", "C", "D"];
let picks = [];
let selected = null;

function show(id) {
  for (const s of document.querySelectorAll(".screen")) s.hidden = s.id !== id;
  scrollTo(0, 0);
}

function ask() {
  const q = picks.length;
  selected = null;
  $("count").textContent = `${q + 1}/${QUESTIONS.length}`;
  $("fill").style.width = `${((q + 1) / QUESTIONS.length) * 100}%`;
  $("qtext").textContent = QUESTIONS[q].text;
  $("answers").replaceChildren(
    ...QUESTIONS[q].answers.map(([, , text], i) => {
      const b = document.createElement("button");
      b.className = "answer";
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<span class="letter">${LETTERS[i]}</span><span></span>`;
      b.lastChild.textContent = text;
      b.onclick = () => {
        selected = i;
        for (const a of $("answers").children) a.setAttribute("aria-pressed", String(a === b));
        $("confirm").disabled = false;
      };
      return b;
    }),
  );
  $("confirm").disabled = true;
  show("question");
}

function finish() {
  const f = FAIRIES[result(picks)];
  $("rimg").src = f.image;
  $("rimg").alt = f.name;
  $("rname").textContent = f.name;
  $("rrole").textContent = f.role;
  $("rquote").textContent = f.quote;
  $("rdesc").textContent = f.description;
  $("rpower").textContent = f.power;
  $("rcurse").textContent = f.curse;
  $("rstab").textContent = f.stability;
  $("rmagic").textContent = f.magic;
  show("result");
}

function start() {
  picks = [];
  ask();
}

$("start").onclick = () => {
  // Load every result image while she answers, so the card shows at once.
  for (const f of Object.values(FAIRIES)) new Image().src = f.image;
  start();
};
$("confirm").onclick = () => {
  picks.push(selected);
  if (picks.length < QUESTIONS.length) ask();
  else finish();
};
$("again").onclick = start;
