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
   COMMENCER LE QUESTIONNAIRE
========================================= */

function startQuest() {

    intro.classList.remove("active");

    questionnaire.classList.add("active");

    currentQuestion = 0;

    answers = [];

    declined = false;

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
       NUMÉRO DE LA QUESTION
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


            if (
                answers[currentQuestion] ===
                answer
            ) {

                button.classList.add(
                    "selected"
                );
            }


            button.onclick = function () {

                answers[currentQuestion] =
                    answer;


                document
                    .querySelectorAll(
                        ".answer-button"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                /* -----------------------------
                   DÉTECTION DE LA RÉPONSE
                   "HÉLAS"
                ----------------------------- */

                if (
                    currentQuestion === 0 &&
                    answer.includes("Hélas")
                ) {

                    declined = true;

                } else if (
                    currentQuestion === 0
                ) {

                    declined = false;
                }

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
        (
            (currentQuestion + 1)
            / questions.length
        ) * 100;

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
        declined &&
        currentQuestion === 1
    ) {

        nextButton.textContent =
            "⚔️ Sceller ma réponse";

    } else if (
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


    /* ---------------------------------------
       VÉRIFICATION
    --------------------------------------- */

    if (
        currentAnswer === undefined ||
        currentAnswer === ""
    ) {

        alert(
            "⚔️ Votre réponse est attendue avant de poursuivre."
        );

        return;
    }


    /* ---------------------------------------
       INVITÉ ABSENT
       
       Après "Hélas", on affiche uniquement
       la question du nom.
    --------------------------------------- */

    if (
        declined &&
        currentQuestion === 0
    ) {

        currentQuestion = 1;

        showQuestion();

        return;
    }


    /* ---------------------------------------
       INVITÉ ABSENT
       
       Après le nom, on termine.
    --------------------------------------- */

    if (
        declined &&
        currentQuestion === 1
    ) {

        finishDecline();

        return;
    }


    /* ---------------------------------------
       INVITÉ PRÉSENT
       
       Dernière question.
    --------------------------------------- */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        finishQuest();

        return;
    }


    /* ---------------------------------------
       QUESTION SUIVANTE
    --------------------------------------- */

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
        "🕯️ Transmission de votre réponse...";


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

            <div class="ornament">
                🕯️
            </div>

            <p class="small-title">
                Votre réponse a bien été reçue
            </p>

            <h2>
                Une place restera vide au banquet
            </h2>

            <div class="divider">
                ⚔ ✦ ⚔
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
   ENVOI DES RÉPONSES
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
