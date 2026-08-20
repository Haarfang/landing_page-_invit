/* ================================
   GENERAL
================================ */

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    min-height: 100vh;

    background:
        radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 60%),
        linear-gradient(135deg, #15120e, #292116, #100e0b);

    color: #eadbb8;

    font-family: "Libre Baskerville", serif;
}


/* ================================
   PAGE
================================ */

.page {
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 15px;

    position: relative;
}

.page::before {
    content: "";

    position: fixed;
    inset: 12px;

    border: 1px solid rgba(192, 154, 78, 0.35);

    pointer-events: none;
}


/* ================================
   SCREENS
================================ */

.screen {
    display: none;

    width: 100%;
    max-width: 720px;

    min-height: 600px;

    padding: 50px 40px;

    text-align: center;

    background:
        linear-gradient(
            rgba(54, 42, 27, 0.94),
            rgba(30, 24, 17, 0.97)
        );

    border: 2px solid #9d7a3e;

    box-shadow:
        0 0 0 8px rgba(0,0,0,0.2),
        0 20px 70px rgba(0,0,0,0.7);

    position: relative;
}

.screen::before,
.screen::after {
    content: "✦";

    position: absolute;

    color: #c5a35a;

    font-size: 28px;
}

.screen::before {
    top: 15px;
    left: 20px;
}

.screen::after {
    bottom: 15px;
    right: 20px;
}

.screen.active {
    display: flex;

    flex-direction: column;

    justify-content: center;

    animation: fadeIn 0.7s ease;
}


/* ================================
   TYPOGRAPHY
================================ */

.small-title {
    font-family: "MedievalSharp", cursive;

    color: #c7a65b;

    font-size: 18px;

    letter-spacing: 2px;

    margin-bottom: 25px;
}

h1 {
    margin: 0;

    font-family: "Cinzel", serif;

    font-size: clamp(42px, 8vw, 72px);

    color: #e4c77d;

    letter-spacing: 4px;

    text-shadow: 0 4px 10px rgba(0,0,0,0.7);
}

h1 span {
    font-family: "MedievalSharp", cursive;

    font-size: 0.7em;

    color: #b89245;
}

h2 {
    font-family: "Cinzel", serif;

    color: #e4c77d;

    font-size: clamp(27px, 5vw, 40px);

    margin: 15px 0 25px;
}

.divider {
    margin: 25px 0;

    color: #b99248;

    letter-spacing: 8px;

    font-size: 18px;
}

.invitation {
    max-width: 560px;

    margin: 0 auto;

    line-height: 1.9;

    font-size: 17px;
}

.intro-text {
    line-height: 1.8;

    font-size: 14px;

    color: #c7baa0;

    max-width: 500px;

    margin: 20px auto 30px;
}


/* ================================
   DATE
================================ */

.date {
    display: flex;

    align-items: center;

    justify-content: center;

    gap: 18px;

    margin: 30px 0;

    font-family: "Cinzel", serif;

    color: #d8bb72;
}

.date span {
    font-size: 26px;
}

.date strong {
    font-size: 25px;

    letter-spacing: 4px;
}

.location {
    font-family: "Cinzel", serif;

    font-size: 20px;

    color: #dfc88f;
}


/* ================================
   BUTTONS
================================ */

button {
    font-family: "Cinzel", serif;

    cursor: pointer;

    transition: all 0.25s ease;
}

.main-button {
    display: inline-block;

    border: 1px solid #c19b4e;

    background:
        linear-gradient(
            180deg,
            #6e5328,
            #3d2d16
        );

    color: #f1dfad;

    padding: 16px 25px;

    font-size: 15px;

    letter-spacing: 1px;

    box-shadow:
        0 5px 15px rgba(0,0,0,0.4);

    margin: 10px auto;
}

.main-button:hover {
    transform: translateY(-2px);

    background:
        linear-gradient(
            180deg,
            #85652f,
            #503b1e
        );

    box-shadow:
        0 8px 20px rgba(0,0,0,0.6);
}

.secondary-button {
    border: 1px solid #705a35;

    background: transparent;

    color: #bbae94;

    padding: 13px 20px;

    font-size: 14px;
}

.secondary-button:hover {
    background: rgba(255,255,255,0.05);
}


/* ================================
   QUESTIONS
================================ */

#question-container {
    flex: 1;

    display: flex;

    flex-direction: column;

    justify-content: center;
}

.question-number {
    color: #a9894b;

    font-family: "Cinzel", serif;

    font-size: 13px;

    letter-spacing: 2px;

    margin-bottom: 15px;
}

.question-title {
    font-family: "Cinzel", serif;

    color: #e3c67d;

    font-size: clamp(23px, 5vw, 32px);

    line-height: 1.4;

    margin-bottom: 30px;
}


/* ================================
   ANSWERS
================================ */

.answers {
    display: flex;

    flex-direction: column;

    gap: 12px;

    width: 100%;

    max-width: 520px;

    margin: 0 auto;
}

.answer-button {
    width: 100%;

    padding: 17px 20px;

    border: 1px solid #806632;

    background: rgba(20, 16, 11, 0.6);

    color: #e2d4b6;

    font-family: "Libre Baskerville", serif;

    font-size: 15px;

    text-align: left;
}

.answer-button:hover {
    border-color: #c7a65b;

    background: rgba(117, 88, 39, 0.25);

    transform: translateX(4px);
}

.answer-button.selected {
    background: rgba(141, 105, 45, 0.45);

    border-color: #d0ae62;

    color: #f4dda0;

    box-shadow:
        inset 0 0 15px rgba(201, 164, 82, 0.1);
}


/* ================================
   TEXT INPUT
================================ */

.text-input {
    width: 100%;

    max-width: 520px;

    margin: 0 auto;

    min-height: 110px;

    padding: 15px;

    resize: vertical;

    background: rgba(10, 8, 5, 0.6);

    border: 1px solid #806632;

    color: #eadbb8;

    font-family: "Libre Baskerville", serif;

    font-size: 15px;

    outline: none;
}

.text-input:focus {
    border-color: #c7a65b;
}


/* ================================
   NAVIGATION
================================ */

.navigation {
    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 15px;

    margin-top: 30px;
}


/* ================================
   PROGRESS
================================ */

.quest-header {
    margin-bottom: 10px;
}

.progress-container {
    width: 100%;

    height: 6px;

    background: rgba(0,0,0,0.5);

    border: 1px solid #5b4827;

    overflow: hidden;
}

#progress-bar {
    width: 12.5%;

    height: 100%;

    background: #b08a43;

    transition: width 0.4s ease;
}

#progress-text {
    color: #9e9179;

    font-size: 12px;

    margin-top: 8px;
}


/* ================================
   SUCCESS
================================ */

.success-text {
    line-height: 1.9;

    max-width: 520px;

    margin: 10px auto;
}

.success-text strong {
    color: #d5b66c;
}

.seal {
    width: 130px;

    height: 130px;

    margin: 30px auto;

    border: 3px double #b08b47;

    border-radius: 50%;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    color: #c4a35c;

    font-family: "Cinzel", serif;
}

.seal span {
    font-size: 13px;

    letter-spacing: 3px;

    margin: 7px 0;
}

.final-message {
    color: #bfb19a;

    font-size: 14px;

    line-height: 1.8;
}

.final-signature {
    margin-top: 25px;

    font-family: "MedievalSharp", cursive;

    font-size: 24px;

    color: #d3b56c;
}


/* ================================
   ANIMATION
================================ */

@keyframes fadeIn {

    from {
        opacity: 0;

        transform: translateY(15px);
    }

    to {
        opacity: 1;

        transform: translateY(0);
    }

}


/* ================================
   MOBILE
================================ */

@media (max-width: 600px) {

    .page {
        padding: 15px;
    }

    .page::before {
        inset: 6px;
    }

    .screen {
        min-height: calc(100vh - 30px);

        padding: 40px 22px;
    }

    .date {
        gap: 10px;
    }

    .date span {
        font-size: 20px;
    }

    .date strong {
        font-size: 19px;
    }

    .navigation {
        flex-direction: column-reverse;
    }

    .navigation button {
        width: 100%;
    }

}
