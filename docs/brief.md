# Brief: «Какая ты фея геймдева?»

Status: approved result, scope and design set for release.
Date: 2026-10-12.

## Story this supports

A teen discovers a playful game-making role through six questions and can visit «Школа Создателей Игр».

This quiz is a side project. It is not part of Constantine's research. It only borrows the project's repository and test site.

## Problem

Teens aged 14–16 play games but rarely picture themselves making one. "Game development" sounds like one job: programming. A teen who draws, plans, tests or posts online does not see a place for herself in it.

The school needs a light first touch with this audience. The bet: a plain ad for a game-making course rarely gets shared, while a funny quiz that tells a teen who she already is does.

## Who it is for

- The teen, 14–16, on a phone. She opens a link from a friend or a post, answers six questions, and gets a fairy that matches her.
- Her friends. They see her result as a screenshot and want their own.
- HandsomeShan, for «Школа Создателей Игр». The quiz brings teens one tap away from the school's Telegram channel.

## What exists today

The quiz is built and approved. HandsomeShan approved all six illustrations without changes, asked for a single page, reviewed the built quiz and chose to prepare it for release.

- A title screen: «Какая ты фея геймдева?», «6 вопросов. Одна судьба», «УЗНАТЬ СВОЮ СУДЬБУ».
- Six questions in a fixed order, four answers each, A to D. A tap picks an answer. She can change it until she confirms. Confirm stays grey until she picks one. There is no way back to a previous question. A counter like «3/6» and a progress bar show how far she is.
- Each answer gives two points to one fairy and one point to another. The fairy with most points wins. In a tie, the tied fairy that most recently got the two points wins.
- Six results, one per game-making role:
  - Фея Подвального Кода: programming.
  - Фея Другого Оттенка: art and sound.
  - Фея Драконьей Идеи: game design.
  - Фея Сияющего Хайпа: marketing and community.
  - Фея Цветущего Дедлайна: producing.
  - Фея Девятого Вала Багов: testing.
- The result card fits one phone screen: picture, name, role, quote, description, Суперсила, Проклятие, Стабильность, Магия.
- Every card ends with the school's invitation: «Хочешь научиться делать свои игры? Загляни в Школу Создателей Игр → t.me/PROTOschool». The link opens the school's Telegram.
- Below the card: «Сделай скрин и кинь подругам» and «Пройти ещё раз». Replay clears every answer.
- Title, questions and result change in place on one page. The page never reloads.
- The look is original Y2K magical-girl: candy gradients, shiny metallic titles, glossy buttons, sparkles. Feminine grammar is a deliberate joke.
- Pictures on result cards are light copies of the approved illustrations, about 0.8 MB for all six instead of 8.4 MB. They look the same at card size.
- A separate gallery page still shows the six approved illustrations in full quality, with names.

## Alternatives considered

- Ship the approved page as it is. Chosen. It is everything the request asked for, HandsomeShan reviewed it, and it needs no server.
- Add a share button that makes a result picture or a link per result. Rejected: the request says sharing is by screenshot only. A screenshot also needs no personal data.
- Build it as a Telegram bot. Rejected: a bot needs a server, and a plain web link opens in any phone browser.

## Out of scope

- Analytics, counters or tracking of any kind.
- Registration, login, or any personal data.
- A server or database. The quiz is plain web pages.
- Sharing by anything other than a screenshot.
- New or redrawn illustrations. The known small flaws in the six pictures stay, as approved.
- Any change to the approved text. The request allowed polishing the «Стабильность» lines during testing; the review asked for no change.
- Constantine's research, documents and plans.
- A link preview picture or text for messengers. The page title shows instead.
- Moving the quiz to production. Release puts it on the staging site; production is a person's decision.

## Constraints

- Phone first. The result card must fit one phone screen, with the browser's own bars showing, from iPhone SE size up.
- Russian interface. Text stays exactly as approved.
- The approved illustrations stay untouched.
- No paid services.

## Success looks like

- She gets one clear result she wants to screenshot and send.
- The school's link is on every result and opens Telegram.

## Scope

The approved page ships with two small fixes: its address works without the closing slash, and every card fits an iPhone SE with Safari's bars showing. Text and pictures stay. It covers all nine stories. The Scope document in this folder lists each story's check, the decisions made and the accepted limits.

## Design

The approved look and the approved screens stay. No new mockups. Design work is limited to the two fixes and one small change.

- What each screen shows first:
  - Title: the shiny title, then the subtitle, then the start button.
  - Question: the question, then the four answers, then «ПОДТВЕРДИТЬ». The counter and bar sit above, quiet.
  - Result: the fairy's picture and name, then her role and quote, then the description and the four traits. The school's invitation closes the card. «Сделай скрин и кинь подругам» and «Пройти ещё раз» sit below it, outside the screenshot.
- Short screens, up to 600 px tall: only spacing shrinks. Gaps, padding, line spacing and the top margin get smaller. Text size stays.
  - The space saved goes to the picture, the card's main image. On an iPhone SE with Safari's bars, every picture gets slightly larger than before.
  - The same rule shows the whole «ПОДТВЕРДИТЬ» button on every question. Before, it was cut off at the bottom on two questions.
  - Taller screens look exactly as approved.
- Address without the closing slash: the site sends the visitor on to the address with the slash. Other wrong addresses still show "Not found".
- Small change: the whole invitation strip opens the school's Telegram, not only the 15 px tall address. It looks the same.
- Pictures load in the background from the first question on, so they are ready when the result appears.

## Next steps

- Make the two fixes and the small change, as the Scope lists them.
- Check every story in Chromium and WebKit, as the Scope lists.
- Release the approved quiz and gallery with the project's site.
- Once the quiz is in production, HandsomeShan shares the link with the audience.
