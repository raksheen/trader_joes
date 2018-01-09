console.log("Script.js is linked!");
// Wrapping all code in window.onload so that the javascript on this page acts as one function and runs when all other things (like HTML, CSS runs).
window.onload = function(e) {
    var currentQuestion = 0;
    var score = 0;
    //total amount of questions, questions in a var in the other question.js file
    var totQuestions = questions.length;

    var container = document.getElementById("quizContainer");
    var questionEl = document.querySelector(".question");
    var opt1 = document.getElementById("opt1");
    var opt2 = document.getElementById("opt2");
    var opt3 = document.getElementById("opt3");
    var opt4 = document.getElementById("opt4");
    var nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", loadNextQuestion);
    var resultCont = document.getElementById("result");

    // This shows/loads questions from the question index. questions[questionIndex] <-- that refers to the index of question # (from other file). This is grabbing the questions and sourcing the images.
    function loadQuestion(questionIndex) {
        console.log(questionIndex);
        var q = questions[questionIndex];
        //set the text for the question element
        questionEl.textContent = questionIndex + 1 + ". " + q.question;
        questionEl.imageContent = questionIndex + 1 + ". " + q.question;
        opt1.textContent = q.option1;
        opt2.textContent = q.option2;
        opt3.textContent = q.option3;
        opt4.textContent = q.option4;
        document.querySelector(".image1").src = q.image1;
        document.querySelector(".image2").src = q.image2;
        document.querySelector(".image3").src = q.image3;
        document.querySelector(".image4").src = q.image4;
    }

    //If user selects nothing, they are alerted to select an answer. Whichiver option they select, the scoare will be adding up behind the scenes (and in the console). The container will be hidden once the questions are completed.
    function loadNextQuestion() {
        console.log("clicked!");
        //check if the radio button is selected or not
        var selectedOption = document.querySelector(
            "input[type = radio]:checked"
        );
        console.log("buttonchecked");

        if (!selectedOption) {
            alert("please select your answer!");
            return;
        }
        if (selectedOption.value === "1" && opt1.id === "opt1") {
            var amount1 = questions[currentQuestion].value1;
            score += amount1;
            console.log(amount1);
            console.log(score);
            selectedOption.checked == false;
        }
        if (selectedOption.value === "2" && opt2.id === "opt2") {
            var amount2 = questions[currentQuestion].value2;
            score += amount2;
            console.log(amount2);
            console.log(score);
            selectedOption.checked == false;
        }
        if (selectedOption.value === "3" && opt3.id === "opt3") {
            var amount3 = questions[currentQuestion].value3;
            score += amount3;
            console.log(amount3);
            console.log(score);
            selectedOption.checked == false;
        }
        if (selectedOption.value === "4" && opt4.id === "opt4") {
            var amount4 = questions[currentQuestion].value4;
            score += amount4;
            console.log(amount4);
            console.log(score);
            selectedOption.checked == false;
        }
        if (selectedOption.checked === true) {
            currentQuestion++;
            loadQuestion(currentQuestion);
            selectedOption.checked = false;
        }
        // if (currentQuestion == totQuestions - 1) {
        //     nextButton.textContent = "finished!";
        // }
        //THIS part is not working. I don't know why it can't be (currentQuestion == totQuestions). To get this game to work, I have an extra object.
        if (currentQuestion == totQuestions - 1) {
            //hide the container which shows the options
            // nextButton.textContent = "finished!";
            container.style.display = "none";
            resultCont.style.display = "";
            return;
        }

        // Win condition. If user spends $30 of less, they win and it tells you how much they have to spare.
        if (score <= 30.0) {
            var remainder = 30 - Math.abs(score);
            var scoreDecimal = score.toFixed(2);
            var remainderDecimal = parseInt(remainder.toFixed(2));
            resultCont.textContent =
                "Yey! You won! You spent $" +
                scoreDecimal +
                ". You're under budget with $" +
                remainderDecimal +
                " left to spare.";
            console.log(scoreDecimal);
            console.log(remainderDecimal);
        } else {
            var remainder = Math.abs(score) - 30;
            var scoreDecimal = score.toFixed(2);
            var remainderDecimal = remainder.toFixed(2);
            resultCont.textContent =
                "Uh-oh! You lost! You spent $" +
                scoreDecimal +
                ". You overspent by $" +
                remainderDecimal +
                ". Better luck next time.";
            //restart button at end of game if you lose
            console.log({ currentQuestion });
            if (currentQuestion === questions.length) {
                var restartButton = document.createElement("BUTTON");
                //var textButton = document.createTextNode("try again");
                restartButton.setAttribute("class", "restartStyle");
                //restartButton.appendChild(textButton);
                document.body.appendChild(restartButton);
                restartButton.addEventListener("click", reload);
            }

            function reload() {
                location.reload();
            }

            console.log(scoreDecimal);
            console.log(remainderDecimal);
            // return;
        }
    }
    //Nothing shows up unless you call the function at the bottom this gets it to start at index 0. The first question is being called manually here.
    loadQuestion(currentQuestion);
};
