/* =========================================================
   CONNEXION GOOGLE SHEETS
========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxUR9o_iIO5gFRKaVz_8MiDOCdX2VDuQQSdKyRm9_OJ5XMGla9lhvc_ajmMfLoOp6Xf/exec";


/* =========================================================
   QUESTIONS DU MARIAGE
========================================================= */

const questions = [

    {
        type: "text",

        title:
            "Sous quel nom devons-nous inscrire votre présence dans les chroniques du Royaume ?",

        placeholder:
            "Prénom et nom..."
    },


    {
        type: "choice",

        title:
            "Combien de personnes composeront votre compagnie pour cette noble journée ?",

        answers: [
            "1 personne",
            "2 personnes",
            "3 personnes",
            "4 personnes",
            "5 personnes",
            "6 personnes ou plus"
        ]
    },


    {
        type: "choice",

        title:
            "De jeunes écuyers vous accompagneront-ils ?",

        answers: [
            "🧒 Oui",
            "🏰 Non"
        ]
    },


    {
        type: "choice",

        title:
            "Quel mets conviendra à votre noble personne ?",

        answers: [
            "🍖 Menu classique",
            "🌿 Menu végétarien",
            "🧒 Menu enfant",
            "📜 Autre / besoin particulier"
        ]
    },


    {
        type: "text",

        title:
            "Le banquet devra-t-il tenir compte d'une allergie ou d'une restriction alimentaire ?",

        placeholder:
            "Aucune restriction ? Indiquez simplement « Aucune »..."
    },


    {
        type: "choice",

        title:
            "Après les festivités, aurez-vous besoin d'un refuge pour passer la nuit ?",

        answers: [
            "🏰 Oui",
            "🐎 Non",
            "❓ Je ne sais pas encore"
        ]
    },


    {
        type: "text",

        title:
            "Avant de sceller votre réponse, souhaitez-vous adresser quelques mots à Julie & Loïc ?",

        placeholder:
            "Votre message aux futurs époux..."
    }

];


/* =========================================================
   ÉTAT DU QUESTIONNAIRE
========================================================= */

let currentQuestion = 0;

let answers = [];

let declined = false;

let isSubmitting = false;


/* =========================================================
   ÉLÉMENTS HTML
========================================================= */

const intro =
    document.getElementById("intro");

const questionnaire =
    document.getElementById("questionnaire");

const success =
    document.getElementById("success");

const successContent =
    document.getElementById("success-content");

const questionContainer =
    document.getElementById("question-container");

const progressBar =
    document.getElementById("progress-bar");

const progressText =
    document.getElementById("progress-text");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");


/* =========================================================
   UTILITAIRE : CHANGEMENT D'ÉCRAN
========================================================= */

function showScreen(screenToShow) {

    const screens = [
        intro,
        questionnaire,
        success
    ];


    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    screenToShow.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   CHOIX DE PRÉSENCE
========================================================= */

function chooseAttendance(choice) {

    /*
        On réinitialise la navigation
        tout en conservant uniquement
        le choix de présence.
    */

    answers = [];


    if (choice === "oui") {

        answers[0] =
            "⚔️ Oui, je réponds présent(e) !";

        declined = false;

    }


    else {

        answers[0] =
            "🕯️ Hélas, je ne pourrai être des nôtres.";

        declined = true;

    }


    currentQuestion = 0;

    showScreen(
        questionnaire
    );

    showQuestion();
}


/* =========================================================
   AFFICHER UNE QUESTION
========================================================= */

function showQuestion() {

    const question =
        questions[currentQuestion];


    /*
        On vide complètement la zone
        avant de créer la nouvelle question.
    */

    questionContainer.innerHTML = "";


    /* -----------------------------------------------------
       NUMÉRO DE QUESTION
    ----------------------------------------------------- */

    const number =
        document.createElement("div");

    number.className =
        "question-number";


    number.textContent =
        `QUESTION ${currentQuestion + 1}`;


    questionContainer.appendChild(
        number
    );


    /* -----------------------------------------------------
       TITRE
    ----------------------------------------------------- */

    const title =
        document.createElement("h2");

    title.className =
        "question-title";

    title.textContent =
        question.title;


    questionContainer.appendChild(
        title
    );


    /* -----------------------------------------------------
       QUESTION À CHOIX
    ----------------------------------------------------- */

    if (question.type === "choice") {

        const answersContainer =
            document.createElement("div");

        answersContainer.className =
            "answers";


        question.answers.forEach(
            answer => {

                const button =
                    document.createElement("button");


                button.type =
                    "button";


                button.className =
                    "answer-button";


                button.textContent =
                    answer;


                /*
                    Restaure la sélection
                    lorsqu'on revient en arrière.
                */

                if (
                    answers[currentQuestion + 1]
                    === answer
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        answers[
                            currentQuestion + 1
                        ] = answer;


                        answersContainer
                            .querySelectorAll(
                                ".answer-button"
                            )
                            .forEach(
                                currentButton => {

                                    currentButton
                                        .classList
                                        .remove(
                                            "selected"
                                        );

                                }
                            );


                        button.classList.add(
                            "selected"
                        );

                    }
                );


                answersContainer.appendChild(
                    button
                );

            }
        );


        questionContainer.appendChild(
            answersContainer
        );

    }


    /* -----------------------------------------------------
       QUESTION TEXTE
    ----------------------------------------------------- */

    if (question.type === "text") {

        const input =
            document.createElement("textarea");


        input.className =
            "text-input";


        input.placeholder =
            question.placeholder;


        input.value =
            answers[
                currentQuestion + 1
            ] || "";


        input.setAttribute(
            "maxlength",
            "600"
        );


        input.setAttribute(
            "autocomplete",
            currentQuestion === 0
                ? "name"
                : "off"
        );


        input.addEventListener(
            "input",
            () => {

                answers[
                    currentQuestion + 1
                ] = input.value;

            }
        );


        questionContainer.appendChild(
            input
        );

    }


    updateProgress();

    updateNavigation();
}


/* =========================================================
   PROGRESSION
========================================================= */

function updateProgress() {

    const totalQuestions =
        declined
            ? 1
            : questions.length;


    const visibleQuestion =
        declined
            ? 1
            : currentQuestion + 1;


    const progress =
        (
            visibleQuestion
            / totalQuestions
        ) * 100;


    progressBar.style.width =
        `${progress}%`;


    progressText.textContent =
        `Question ${visibleQuestion} / ${totalQuestions}`;

}


/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {

    /*
        Sur la première question,
        RETOUR reste invisible mais conserve
        sa place afin que CONTINUER ne bouge pas.
    */

    previousButton.style.visibility =
        currentQuestion === 0
            ? "hidden"
            : "visible";


    /*
        Texte du dernier bouton.
    */

    if (
        declined ||
        currentQuestion ===
            questions.length - 1
    ) {

        nextButton.innerHTML =
            `
                <span>SCELLER MA RÉPONSE</span>
                <span>⚔</span>
            `;

    }

    else {

        nextButton.innerHTML =
            `
                <span>CONTINUER</span>
                <span>→</span>
            `;

    }


    nextButton.disabled =
        isSubmitting;

}


/* =========================================================
   VALIDATION DE LA QUESTION
========================================================= */

function currentAnswerIsValid() {

    const answer =
        answers[
            currentQuestion + 1
        ];


    if (answer === undefined) {
        return false;
    }


    if (
        typeof answer === "string"
    ) {

        return (
            answer.trim().length > 0
        );

    }


    return true;
}


/* =========================================================
   QUESTION SUIVANTE
========================================================= */

function nextQuestion() {

    if (isSubmitting) {
        return;
    }


    /*
        Une réponse est obligatoire
        pour toutes les questions.
    */

    if (!currentAnswerIsValid()) {

        alert(
            "⚔️ Votre réponse est attendue avant de poursuivre."
        );

        return;

    }


    /*
        Pour un invité absent,
        seule la question du nom est posée.
    */

    if (declined) {

        finishDecline();

        return;

    }


    /*
        Dernière question.
    */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        finishQuest();

        return;

    }


    currentQuestion++;

    showQuestion();

}


/* =========================================================
   QUESTION PRÉCÉDENTE
========================================================= */

function previousQuestion() {

    if (
        isSubmitting ||
        currentQuestion === 0
    ) {

        return;

    }


    currentQuestion--;

    showQuestion();

}


/* =========================================================
   ENVOI À GOOGLE SHEETS
========================================================= */

async function sendToGoogleSheets(
    data
) {

    await fetch(
        GOOGLE_SCRIPT_URL,
        {
            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body:
                JSON.stringify(
                    data
                )
        }
    );

}


/* =========================================================
   FIN POUR UN INVITÉ ABSENT
========================================================= */

async function finishDecline() {

    if (isSubmitting) {
        return;
    }


    isSubmitting = true;

    nextButton.disabled = true;

    nextButton.innerHTML =
        `
            <span>TRANSMISSION...</span>
            <span>🕯</span>
        `;


    const data = {

        presence:
            answers[0] || "",

        nom:
            answers[1] || "",

        compagnie:
            "",

        enfants:
            "",

        menu:
            "",

        restrictions:
            "",

        hebergement:
            "",

        message:
            ""

    };


    try {

        await sendToGoogleSheets(
            data
        );


        renderDeclineSuccess();

        showScreen(
            success
        );

    }


    catch (error) {

        console.error(
            "Erreur lors de l'envoi :",
            error
        );


        alert(
            "⚠️ Le messager n'a pas réussi à transmettre votre réponse. Veuillez réessayer."
        );


        isSubmitting = false;

        updateNavigation();

    }

}


/* =========================================================
   FIN POUR UN INVITÉ PRÉSENT
========================================================= */

async function finishQuest() {

    if (isSubmitting) {
        return;
    }


    isSubmitting = true;

    nextButton.disabled = true;

    nextButton.innerHTML =
        `
            <span>SCELLEMENT...</span>
            <span>⚔</span>
        `;


    const data = {

        presence:
            answers[0] || "",

        nom:
            answers[1] || "",

        compagnie:
            answers[2] || "",

        enfants:
            answers[3] || "",

        menu:
            answers[4] || "",

        restrictions:
            answers[5] || "",

        hebergement:
            answers[6] || "",

        message:
            answers[7] || ""

    };


    try {

        await sendToGoogleSheets(
            data
        );


        console.log(
            "Réponse envoyée :",
            data
        );


        renderPositiveSuccess();

        showScreen(
            success
        );

    }


    catch (error) {

        console.error(
            "Erreur lors de l'envoi :",
            error
        );


        alert(
            "⚠️ Le messager n'a pas réussi à transmettre votre réponse. Veuillez réessayer."
        );


        isSubmitting = false;

        updateNavigation();

    }

}


/* =========================================================
   ÉCRAN FINAL — INVITÉ PRÉSENT
========================================================= */

function renderPositiveSuccess() {

    successContent.innerHTML =
        `

            <div class="mini-ornament">
                ⚔
            </div>


            <p class="small-title">
                VOTRE RÉPONSE A BIEN ÉTÉ REÇUE
            </p>


            <h2>
                VOTRE RÉPONSE
                <br>
                A ÉTÉ SCELLÉE
            </h2>


            <div class="ornament-divider">

                <span></span>

                <i>◆</i>

                <span></span>

            </div>


            <p class="success-text">

                Merci d'avoir répondu à notre invitation.

            </p>


            <p class="success-text">

                Nous avons hâte de partager
                cette journée avec vous.

            </p>


            <p class="final-message">

                Avec toute notre affection,

            </p>


            <p class="final-signature">

                ✦ Julie & Loïc ✦

            </p>

        `;

}


/* =========================================================
   ÉCRAN FINAL — INVITÉ ABSENT
========================================================= */

function renderDeclineSuccess() {

    successContent.innerHTML =
        `

            <div class="mini-ornament">
                🕯
            </div>


            <p class="small-title">

                VOTRE RÉPONSE A BIEN ÉTÉ REÇUE

            </p>


            <h2>

                UNE PLACE RESTERA
                <br>
                VIDE AU BANQUET

            </h2>


            <div class="ornament-divider">

                <span></span>

                <i>◆</i>

                <span></span>

            </div>


            <p class="success-text">

                Nous sommes sincèrement désolés
                de ne pas pouvoir vous compter parmi nous
                pour ce jour si important à nos yeux.

            </p>


            <p class="success-text">

                Votre présence nous manquera,
                mais nous penserons bien à vous
                en cette belle journée.

            </p>


            <p class="final-message">

                Avec toute notre affection,

            </p>


            <p class="final-signature">

                ✦ Julie & Loïc ✦

            </p>

        `;

}


/* =========================================================
   TOUCHE ENTRÉE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Ctrl + Entrée permet de continuer
            depuis une question texte.

            On n'utilise volontairement pas
            Entrée seule pour permettre les
            retours à la ligne dans les messages.
        */

        if (
            event.key === "Enter" &&
            event.ctrlKey &&
            questionnaire.classList.contains(
                "active"
            )
        ) {

            event.preventDefault();

            nextQuestion();

        }

    }
);
