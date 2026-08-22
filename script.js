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
            "🕯️ Hélas, je ne pourrai être des nôtres."
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
/* =========================================
   CHOIX DE LA PRÉSENCE
========================================= */

function chooseAttendance(choice) {

    /*
       On mémorise directement la réponse
       à la première question.
    */

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
       On ouvre le questionnaire
       directement à la question suivante :
       
       Question 1 = présence
       Question 2 = nom
    */

    intro.classList.remove("active");

    questionnaire.classList.add("active");

    currentQuestion = 1;

    showQuestion();
}
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

    /*
       Pour un invité qui ne vient pas,
       on n'utilise que les deux premières
       questions :

       Question 1 = présence
       Question 2 = prénom + nom

       Pour un invité présent, toutes les
       questions normales restent disponibles.
    */

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


            /*
               Si une réponse avait déjà été
               sélectionnée, on la conserve.
            */

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


                /*
                   Détection de la réponse
                   "Hélas"
                */

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

    /*
       Pour un invité absent :

       2 étapes seulement.

       Pour un invité présent :

       questionnaire complet.
    */

    let totalQuestions =
        questions.length;

    let displayedQuestion =
        currentQuestion;


    if (declined) {

        totalQuestions = 2;

    }


    const progress =
        (
            (displayedQuestion + 1)
            / totalQuestions
        ) * 100;

    progressBar.style.width =
        progress + "%";


    progressText.textContent =
        `Question ${displayedQuestion + 1} / ${totalQuestions}`;


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

    /*
       Invité absent :
       sur la question du nom,
       le bouton devient "Sceller".
    */

    if (
        declined &&
        currentQuestion === 1
    ) {

        nextButton.textContent =
            "⚔️ Sceller ma réponse";

    }

    /*
       Invité présent :
       dernière question normale.
    */

    else if (
        !declined &&
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "⚔️ Sceller ma réponse";

    }

    /*
       Dans tous les autres cas.
    */

    else {

        nextButton.textContent =
            "Continuer →";
    }


    /*
       On s'assure que le bouton est
       réactivé lorsque l'on change
       de question.
    */

    nextButton.disabled = false;
}


/* =========================================
   QUESTION SUIVANTE
========================================= */

function nextQuestion() {

    const currentAnswer =
        answers[currentQuestion];


    /* ---------------------------------------
       VÉRIFICATION DE LA RÉPONSE
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
       
       Après "Hélas" :

       Question 1 → Question 2
       
       Question 2 → fin.
    --------------------------------------- */

    if (
        declined &&
        currentQuestion === 0
    ) {

        currentQuestion = 1;

        showQuestion();

        return;
    }


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
        !declined &&
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

        /*
           Si l'invité revient à la première
           question, on oublie le statut
           "absent".
        */

        if (currentQuestion === 0) {

            declined = false;
        }

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


    /*
       Données envoyées à Google Sheets.

       presence = réponse à la question 1
       nom      = réponse à la question 2

       Les autres champs restent vides.
    */

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


        /* ---------------------------------
           AFFICHAGE DU MESSAGE FINAL
        --------------------------------- */

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
   FIN POUR UN INVITÉ PRÉSENT
========================================= */

async function finishQuest() {

    nextButton.disabled = true;

    nextButton.textContent =
        "⚔️ Scellement en cours...";


    /* ---------------------------------------
       Préparation des données
    --------------------------------------- */

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
