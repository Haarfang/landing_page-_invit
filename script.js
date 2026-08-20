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
        type: "choice",

        title: "Serez-vous parmi nous pour célébrer l'union de Julie & Loïc ?",

        answers: [
            "⚔️ Oui, je réponds présent(e) !",
            "🕯️ Hélas, je ne pourrai être des vôtres."
        ]
    },

    {
        type: "text",

        title: "Sous quel nom devons-nous inscrire votre présence dans les chroniques du Royaume ?",

        placeholder: "Prénom et nom..."
    },

    {
        type: "choice",

        title: "Combien de personnes composeront votre compagnie pour cette noble journée ?",

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

        title: "De jeunes écuyers vous accompagneront-ils ?",

        answers: [
            "🧒 Oui",
            "🏰 Non"
        ]
    },

    {
        type: "choice",

        title: "Quel mets conviendra à votre noble personne ?",

        answers: [
            "🍖 Menu classique",
            "🌿 Menu végétarien",
            "🥕 Menu végétalien",
            "🧒 Menu enfant",
            "📜 Autre / besoin particulier"
        ]
    },

    {
        type: "text",

        title: "Le banquet devra-t-il tenir compte d'une allergie ou d'une restriction alimentaire ?",

        placeholder: "Aucune restriction ? Indiquez simplement « Aucune »..."
    },

    {
        type: "choice",

        title: "Après les festivités, aurez-vous besoin d'un refuge pour passer la nuit ?",

        answers: [
            "🏰 Oui",
            "🐎 Non",
            "❓ Je ne sais pas encore"
        ]
    },

    {
        type: "text",

        title: "Avant de sceller votre réponse, souhaitez-vous adresser quelques mots à Julie & Loïc ?",

        placeholder: "Votre message aux futurs époux..."
    }

];


/* =========================================
   VARIABLES
========================================= */

let currentQuestion = 0;

let answers = [];


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
   COMMENCER LE QUESTIONNAIRE
========================================= */

function startQuest() {

    intro.classList.remove("active");

    questionnaire.classList.add("active");

    currentQuestion = 0;

    answers = [];

    showQuestion();
}


/* =========================================
   AFFICHER UNE QUESTION
========================================= */

function showQuestion() {

    const question =
        questions[currentQuestion];

    questionContainer.innerHTML = "";


    const number =
        document.createElement("div");

    number.className =
        "question-number";

    number.textContent =
        `QUESTION ${currentQuestion + 1}`;

    questionContainer.appendChild(number);


    const title =
        document.createElement("div");

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


        question.answers.forEach((answer) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";

            button.textContent =
                answer;


            if (answers[currentQuestion] === answer) {

                button.classList.add("selected");

            }


            button.onclick = function () {

                answers[currentQuestion] =
                    answer;

                document
                    .querySelectorAll(".answer-button")
                    .forEach(btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    });

                button.classList.add(
                    "selected"
                );
            };


            answersContainer.appendChild(
                button
            );

        });


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
            answers[currentQuestion] || "";


        input.addEventListener(
            "input",
            function () {

                answers[currentQuestion] =
                    input.value;

            }
        );


        questionContainer.appendChild(
            input
        );
    }


    /* ---------------------------------------
       BARRE DE PROGRESSION
    --------------------------------------- */

    const progress =
        ((currentQuestion + 1)
        / questions.length) * 100;

    progressBar.style.width =
        progress + "%";

    progressText.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


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
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "⚔️ Sceller ma réponse";

    } else {

        nextButton.textContent =
            "Continuer →";
    }
}


/* =========================================
   QUESTION SUIVANTE
========================================= */

function nextQuestion() {

    const currentAnswer =
        answers[currentQuestion];


    if (
        currentAnswer === undefined ||
        currentAnswer === ""
    ) {

        alert(
            "⚔️ Votre réponse est attendue avant de poursuivre."
        );

        return;
    }


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
   QUESTION PRECEDENTE
========================================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


/* =========================================
   ENVOI DES REPONSES
========================================= */

async function finishQuest() {

    nextButton.disabled = true;

    nextButton.textContent =
        "⚔️ Scellement en cours...";


    /* Préparation des données */

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

                body: JSON.stringify(data)
            }
        );


        /* ---------------------------------
           Réponse envoyée
        --------------------------------- */

        questionnaire.classList.remove(
            "active"
        );

        success.classList.add(
            "active"
        );


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
