const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxUR9o_iIO5gFRKaVz_8MiDOCdX2VDuQQSdKyRm9_OJ5XMGla9lhvc_ajmMfLoOp6Xf/exec";


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
            "5 personnes et plus"
            
        ]
    },


    {
        type: "choice",

        title:
            "De jeunes écuyers vous accompagneront-ils ?",

        answers: [
            "Oui",
            "Non"
        ]
    },


    {
        type: "choice",

        menu: true,

        title:
            "Quel mets allez-vous choisir ?",

        answers: [
            "🍖  Menu classique",
            "🌿  Menu végétarien"
        ]
    },


    {
        type: "text",


        title:
            "Le banquet devra-t-il tenir compte d'une allergie ou d'une restriction alimentaire ?",

        help:
            "Allergie, intolérance, menu enfant ou autre besoin particulier… ",

        placeholder:
            "Votre réponse..."
    },


    {
        type: "choice",


        title:
            "Après les festivités, aurez-vous besoin d'un refuge pour passer la nuit ?",

        answers: [
            "Oui",
            "Non",
            "Je ne sais pas encore"
        ]
    },


    {
        type: "text",


        title:
            "Avant de sceller votre réponse, souhaitez-vous adresser quelques mots à Julie & Loïc ?",

        placeholder:
            "Votre message..."
    }

];


let currentQuestion = 0;
let answers = [];
let declined = false;
let sending = false;


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

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const successContent =
    document.getElementById("success-content");


function showScreen(target) {

    [
        intro,
        questionnaire,
        success

    ].forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    target.classList.add(
        "active"
    );


    window.scrollTo(
        0,
        0
    );

}


function chooseAttendance(choice) {

    answers = [];


    if (choice === "oui") {

        answers[0] = "Oui";

        declined = false;

    }

    else {

        answers[0] = "Non";

        declined = true;

    }


    currentQuestion = 0;


    showScreen(
        questionnaire
    );


    showQuestion();

}


function showQuestion() {

    const question =
        questions[currentQuestion];


    questionContainer.innerHTML =
        "";

    const title =
        document.createElement(
            "h2"
        );


    title.className =
        "question-title";


    title.textContent =
        question.title;


    questionContainer.appendChild(
        title
    );


    if (question.symbol) {

        const symbol =
            document.createElement(
                "div"
            );


        symbol.className =
            "question-symbol";


        symbol.textContent =
            question.symbol;


        questionContainer.appendChild(
            symbol
        );

    }


    if (question.help) {

        const help =
            document.createElement(
                "p"
            );


        help.className =
            "question-help";


        help.textContent =
            question.help;


        questionContainer.appendChild(
            help
        );

    }


    if (question.type === "choice") {

        const answerContainer =
            document.createElement(
                "div"
            );


        answerContainer.className =
            question.menu

                ? "answers menu-answers"

                : "answers";


        question.answers.forEach(
            answer => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "answer-button";


                button.textContent =
                    answer;


                if (
                    answers[
                        currentQuestion + 1
                    ] === answer
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


                        answerContainer
                            .querySelectorAll(
                                ".answer-button"
                            )
                            .forEach(
                                item => {

                                    item.classList.remove(
                                        "selected"
                                    );

                                }
                            );


                        button.classList.add(
                            "selected"
                        );

                    }
                );


                answerContainer.appendChild(
                    button
                );

            }
        );


        questionContainer.appendChild(
            answerContainer
        );

    }


    if (question.type === "text") {

        const input =
            document.createElement(
                "textarea"
            );


        input.className =
            "text-input";


        input.placeholder =
            question.placeholder;


        input.value =
            answers[
                currentQuestion + 1
            ] || "";


        input.maxLength =
            600;


        input.addEventListener(
            "input",
            () => {

                answers[
                    currentQuestion + 1
                ] =
                    input.value;

            }
        );


        questionContainer.appendChild(
            input
        );

    }


    updateFooter();

}


function updateFooter() {

    const total =
        declined
            ? 1
            : questions.length;


    const progress =
        (
            (currentQuestion + 1)
            /
            total
        )
        * 100;


    progressBar.style.width =
        `${progress}%`;


    previousButton.style.visibility =
        currentQuestion === 0

            ? "hidden"

            : "visible";


    if (
        declined ||
        currentQuestion ===
            questions.length - 1
    ) {

        nextButton.textContent =
            "SCELLER MA RÉPONSE ✦";

    }

    else {

        nextButton.textContent =
            "CONTINUER →";

    }

}


function answerIsValid() {

    /*
       QUESTION 5 = restrictions alimentaires
       currentQuestion commence à 0,
       donc la question 5 correspond à l'index 4.
    */

    if (currentQuestion === 4) {
        return true;
    }


    const value =
        answers[
            currentQuestion + 1
        ];


    if (
        value === undefined ||
        value === null
    ) {
        return false;
    }


    if (
        typeof value === "string"
    ) {
        return value.trim().length > 0;
    }


    return true;
}

function nextQuestion() {

    if (sending) {
        return;
    }


    if (!answerIsValid()) {

        alert(
            "Votre réponse est attendue avant de poursuivre."
        );

        return;

    }


    if (declined) {

        submitDecline();

        return;

    }


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        submitAttendance();

        return;

    }


    currentQuestion++;

    showQuestion();

}


function previousQuestion() {

    if (sending) {
        return;
    }


    if (
        currentQuestion > 0
    ) {

        currentQuestion--;

        showQuestion();

    }

}


async function sendData(data) {

    await fetch(
        GOOGLE_SCRIPT_URL,
        {

            method:
                "POST",

            mode:
                "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body:
                JSON.stringify(data)

        }
    );

}


async function submitDecline() {

    sending = true;


    nextButton.disabled = true;

    nextButton.textContent =
        "TRANSMISSION…";


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

        await sendData(data);

        showDeclineSuccess();

        showScreen(success);

    }


    catch (error) {

        console.error(error);


        alert(
            "La réponse n'a pas pu être transmise. Veuillez réessayer."
        );


        sending = false;

        nextButton.disabled = false;

        updateFooter();

    }

}


async function submitAttendance() {

    sending = true;


    nextButton.disabled = true;

    nextButton.textContent =
        "SCELLEMENT…";


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

        await sendData(data);

        showPositiveSuccess();

        showScreen(success);

    }


    catch (error) {

        console.error(error);


        alert(
            "La réponse n'a pas pu être transmise. Veuillez réessayer."
        );


        sending = false;

        nextButton.disabled = false;

        updateFooter();

    }

}


function showPositiveSuccess() {

    successContent.innerHTML =
        `

        <h2>
            VOTRE RÉPONSE
            <br>
            A ÉTÉ SCELLÉE
        </h2>


        <div class="divider">
            <span></span>
            <i>◆</i>
            <span></span>
        </div>


        <p class="success-text">
            Merci d'avoir répondu
            à notre invitation.
        </p>


        <p class="success-text">
            Nous avons hâte de partager
            cette journée avec vous.
        </p>


        <p class="final-message">
            Avec toute notre affection,
        </p>


        <p class="final-signature">
            Julie & Loïc
        </p>

    `;

}


function showDeclineSuccess() {

    successContent.innerHTML =
        `

        <h2>
            VOTRE RÉPONSE
            <br>
            A ÉTÉ SCELLÉE
        </h2>


        <div class="divider">
            <span></span>
            <i>◆</i>
            <span></span>
        </div>


        <p class="success-text">
            Merci d'avoir pris le temps
            de nous répondre.
        </p>


        <p class="success-text">
            Votre présence nous manquera,
            mais nous penserons bien à vous
            lors de cette journée.
        </p>


        <p class="final-message">
            Avec toute notre affection,
        </p>


        <p class="final-signature">
            Julie & Loïc
        </p>

    `;

}
