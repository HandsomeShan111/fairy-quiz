# Scope: «Какая ты фея геймдева?»

Brief and stories: in the same folder.

## Decision

Ship the approved page with two small fixes. No change to its text or pictures.

The quiz covers all nine stories. Each story gets a check in the Test stage.

## In scope

- The quiz page at `/fairy-quiz/` and the gallery at `/fairy-quiz/gallery/`.
- The site server and placeholder home page from the project's starter commit. Staging has no site yet, so they ship with the quiz.
- This folder's documents. They are reachable by address on the site. They hold no private information.
- Checks for every story, listed below.

## Fixes

- Address without the closing slash. `/fairy-quiz` and `/fairy-quiz/gallery` answer "Not found"; only `/fairy-quiz/` works. The site server sends a folder address to its slash form. The fix is in `serve.ts`, the shared site server.
  - Rule: the requested file is missing, the path has no closing slash, and `<path>/index.html` exists. Then answer 301 with a relative `Location`: the path, a slash, then the query.
  - A relative `Location` keeps the visitor on the public address. The server itself listens only inside the machine.
  - Every other missing address still answers "Not found". `/fairy-quiz/docs` has no `index.html`, so it stays "Not found".
- Card fit on short screens. With Safari's bars showing, an iPhone SE leaves 375×548 for the page. There the kod and art cards end 28 px below the screen. The layout tightens on short screens until every card fits. Layout only: text and pictures stay.
  - A new rule in `quiz.css` for page areas up to 600 px tall:
    ```css
    @media (max-height: 600px) {
      main { padding-top: max(.4rem, env(safe-area-inset-top)); }
      .card { gap: .3rem; padding: .5rem; line-height: 1.2; }
      #rname { margin-bottom: .1rem; }
      .role { margin-bottom: .15rem !important; }
      .stats { gap: .15rem; }
      .cta { padding: .4rem .6rem; }
      #qtext { margin: .9rem 0 .75rem; }
    }
    ```
  - Only spacing shrinks. Text size stays. The picture keeps its 9rem minimum and takes the space saved.
  - Measured in Chromium at 375×548: every card ends 30 px above the screen's edge. The picture on the kod and art cards grows from 144 to 149 px; on the others, from 144–145 to 181–197 px.
  - The same rule shows the whole «ПОДТВЕРДИТЬ» button on questions 2 and 3: they ended at 554/548, now at 539.
  - Screens taller than 600 px are unchanged.

## Small change found in this stage

- The school's link is 140×15 px, a small target for a finger. The whole invitation strip (329×61 px on an iPhone SE) becomes the link. It looks the same.
  - In `quiz.css`: `.cta { position: relative; }` and `.cta a::after { content: ""; position: absolute; inset: 0; }`.

## Stories and their checks

- S1. Find a fitting role.
  - Exists: six questions in fixed order, four answers each, one result by points, the tie rule.
  - Check: the unit tests score all 4,096 answer combinations. A browser run reaches all six results and two ties.
- S2. Change an answer until confirming.
  - Exists: a tap picks, another tap changes, «ПОДТВЕРДИТЬ» stays grey until a pick. No way back.
  - Check: the browser run changes each answer once before confirming and finds no back control.
- S3. Whole result on one phone screen.
  - Exists: the picture shrinks to fit the text. Smaller text on short phones.
  - Check: every result card ends inside the page area with the browser's bars showing: 375×548 (iPhone SE), 360×640, 390×664 and 414×715. Also full screen at 375×667 and 390×844. No sideways scroll.
  - Check: at 375×548, the whole «ПОДТВЕРДИТЬ» button shows on all six questions.
- S4. School in one tap.
  - Exists: the invitation's link opens `https://t.me/PROTOschool` in a new tab.
  - Check: the browser run reads the link on all six results. A tap on the strip's corner opens it too.
- S5. Replay from a clean start.
  - Exists: «Пройти ещё раз» clears every answer and returns to question 1.
  - Check: after replay, the counter reads «1/6», nothing is picked, confirm is grey.
- S6. No personal data.
  - Exists: no form, no storage, no login, no counter.
  - Check: the page asks nothing of the player and loads nothing from other sites. One exception: the board's bug widget, on addresses ending in `.ts.net` (test and staging sites).
- S7. A friend sees a funny, clear result.
  - Exists: S3's card, made for one screenshot.
  - Check: screenshots of all six cards at 390×844, read by a person in the Visual check.
- S8. The school's invitation on every result.
  - Exists: the same invitation under all six cards.
  - Check: exact invitation text and link on all six results.
- S9. Approved art and text unchanged.
  - Exists: cards show light copies of the approved pictures. The gallery shows the originals.
  - Check: every shown text matches the text in the task's request, not the quiz's own data. The gallery loads all six originals.

## Added to testing

- Run the browser checks in WebKit too. WebKit is the engine of Safari and of every browser on iPhone, Telegram's included. So far the quiz was checked in Chromium only.
  - The test server lacks the quiz's font, Trebuchet MS, and uses a wider one. iPhones have Trebuchet MS, so text there takes less room than measured.

## Decisions made in this stage

- No link preview picture or text for messengers. Not requested, and it would need new text and a choice of one fairy. The page title shows instead.
- The gallery ships at its own address, with no link to it from the quiz.
- The browser checks stay a test-stage tool, not a file in the repository. A repository test would need a browser library the project does not have.
- Release puts the quiz on the staging site only. A public address for teens follows the project's move to production, a person's decision.

## Accepted limits

- Phone held sideways: the card is taller than the screen.
- Browser set to enlarged text: the card may need scrolling.
- The browser's back button leaves the quiz. A reload starts over from the title.
- Not tested on a real phone or inside Telegram's built-in browser.
- Phones narrower than 360 px, such as the first iPhone SE, are not checked.
- White text on the pink buttons and the invitation strip is below the contrast that accessibility guidance asks for. The approved colours stay.
- Not checked with a keyboard or a screen reader. On a screen change, focus is not moved to the new screen.
- With scripts off, the start button does nothing and nothing explains why.
- The friend-side limits in the stories document stay.

## Flow

```
title --start--> question 1..6 --pick, change, confirm--> result
result --replay--> question 1
result --link--> school's Telegram, new tab
```

## Release check

- Open the quiz on the staging site at `/fairy-quiz/` and `/fairy-quiz`. Play to a result and tap the school's link.
- Rollback: revert the quiz's commits on staging. The site server stays. The quiz is plain files, with no data to undo.
