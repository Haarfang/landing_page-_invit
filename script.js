/* =========================================
   CONNEXION GOOGLE SHEETS
========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxUR9o_iIO5gFRKaVz_8MiDOCdX2VDuQQSdKyRm9_OJ5XMGla9lhvc_ajmMfLoOp6Xf/exec";


/* =========================================
   QUESTIONS DU MARIAGE
========================================= */

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


/* =========================================
   VARIABLES
========================================= */

let currentQuestion = 0;

let answers = [];

let declined = false;


/* =========================================
   ELEMENTS HTML
========================================= */

const intro =
    document.getElementById("intro");

const questionnaire =
    document.getElementById("questionnaire");

const success =
    document.getElementById("success");

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


/* =========================================
   CHOIX DE LA PRÉSENCE
========================================= */

function chooseAttendance(choice) {

    if (choice === "oui") {

        answers[0] =
            "⚔️ Oui, je réponds présent(e) !";

        declined = false;

    }

    else if (choice === "non") {

        answers[0] =
            "🕯️ Hélas, je ne pourrai être des nôtres.";

        declined = true;
    }


    /*
       On quitte directement la première page
       et on commence le questionnaire à la
       question du nom.
    */

    intro.classList.remove("active");

    questionnaire.classList.add("active");

    currentQuestion = 0;

    showQuestion();
}


/* =========================================
   AFFICHER UNE QUESTION
========================================= */

function showQuestion() {

    const question =
        questions[currentQuestion];

    questionContainer.innerHTML = "";


    /* ---------------------------------------
       NUMÉRO
    --------------------------------------- */

    const number =
        document.createElement("div");

    number.className =
        "question-number";

    number.textContent =
        `QUESTION ${currentQuestion + 1}`;

    questionContainer.appendChild(number);


    /* ---------------------------------------
       TITRE
    --------------------------------------- */

    const title =
        document.createElement("h2");

    title.className =
        "question-title";

    title.textContent =
        question.title;

    questionContainer.appendChild(title);


    /* ---------------------------------------
       QUESTIONS À CHOIX
    --------------------------------------- */

    if (question.type === "choice") {

        const answersContainer =
            document.createElement("div");

        answersContainer.className =
            "answers";


        question.answers.forEach(
            (answer) => {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "answer-button";

                button.textContent =
                    answer;


                if (
                    answers[currentQuestion + 1] ===
                    answer
                ) {

                    button.classList.add(
                        "selected"
                    );
                }


                button.onclick =
                    function () {

                        answers[
                            currentQuestion + 1
                        ] = answer;


                        document
                            .querySelectorAll(
                                ".answer-button"
                            )
                            .forEach(
                                btn => {

                                    btn.classList.remove(
                                        "selected"
                                    );

                                }
                            );


                        button.classList.add(
                            "selected"
                        );
                    };


                answersContainer.appendChild(
                    button
                );

            }
        );


        questionContainer.appendChild(
            answersContainer
        );
    }


    /* ---------------------------------------
       QUESTIONS TEXTE
    --------------------------------------- */

    if (question.type === "text") {

        const input =
            document.createElement("textarea");

        input.className =
            "text-input";

        input.placeholder =
            question.placeholder;

        input.value =
            answers[currentQuestion + 1] || "";


        input.addEventListener(
            "input",
            function () {

                answers[
                    currentQuestion + 1
                ] = input.value;

            }
        );


        questionContainer.appendChild(
            input
        );
    }


    /* ---------------------------------------
       PROGRESSION
    --------------------------------------- */

    const totalQuestions =
        declined ? 1 : questions.length;

    const progress =
        (
            (currentQuestion + 1)
            / totalQuestions
        ) * 100;


    progressBar.style.width =
        progress + "%";


    progressText.textContent =
        `Question ${currentQuestion + 1} / ${totalQuestions}`;


    /* ---------------------------------------
       BOUTON RETOUR
    --------------------------------------- */

    if (currentQuestion === 0) {

        previousButton.style.visibility =
            "hidden";

    } else {

        previousButton.style.visibility =
            "visible";
    }


    /* ---------------------------------------
       BOUTON SUIVANT
    --------------------------------------- */

    if (
        declined ||
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "⚔️ Sceller ma réponse";

    } else {

        nextButton.textContent =
            "Continuer →";
    }


    nextButton.disabled = false;
}


/* =========================================
   QUESTION SUIVANTE
========================================= */

function nextQuestion() {

    const answerIndex =
        currentQuestion + 1;

    const currentAnswer =
        answers[answerIndex];


    if (
        currentAnswer === undefined ||
        currentAnswer.trim === undefined
            ? false
            : currentAnswer.trim() === ""
    ) {

        alert(
            "⚔️ Votre réponse est attendue avant de poursuivre."
        );

        return;
    }


    /*
       Si la personne ne vient pas,
       il n'y a qu'une seule question :
       son nom.
    */

    if (declined) {

        finishDecline();

        return;
    }


    /*
       Si la personne vient et qu'elle
       est à la dernière question.
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


/* =========================================
   QUESTION PRÉCÉDENTE
========================================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


/* =========================================
   FIN POUR UN INVITÉ ABSENT
========================================= */

async function finishDecline() {

    nextButton.disabled = true;

    nextButton.textContent =
        "🕯️ Transmission...";


    const data = {

        presence:
            answers[0] || "",

        nom:
            answers[1] || "",

        compagnie: "",

        enfants: "",

        menu: "",

        restrictions: "",

        hebergement: "",

        message: ""
    };


    try {

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
                    JSON.stringify(data)
            }
        );


        questionnaire.classList.remove(
            "active"
        );

        success.classList.add(
            "active"
        );


        success.innerHTML = `

            <div class="mini-ornament">
                🕯️
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
                de ne pas pouvoir vous compter
                parmi nous pour ce jour si important
                à nos yeux.

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


    } catch (error) {

        console.error(
            "Erreur lors de l'envoi :",
            error
        );


        alert(
            "⚠️ Le messager n'a pas réussi à transmettre votre réponse. Veuillez réessayer."
        );


        nextButton.disabled = false;

        nextButton.textContent =
            "⚔️ Sceller ma réponse";
    }
}


/* =========================================
   FIN POUR UN INVITÉ PRÉSENT
========================================= */

async function finishQuest() {

    nextButton.disabled = true;

    nextButton.textContent =
        "⚔️ Scellement en cours...";


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
                    JSON.stringify(data)
            }
        );


        questionnaire.classList.remove(
            "active"
        );

        success.classList.add(
            "active"
        );


        success.innerHTML = `

            <div class="mini-ornament">
                ⚔️
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


        console.log(
            "Réponse envoyée :",
            data
        );


    } catch (error) {

        console.error(
            "Erreur lors de l'envoi :",
            error
        );


        alert(
            "⚠️ Le messager n'a pas réussi à transmettre votre réponse. Veuillez réessayer."
        );


        nextButton.disabled = false;

        nextButton.textContent =
            "⚔️ Sceller ma réponse";
    }
}
