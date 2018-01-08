console.log("Script.js is linked!");

window.onload = function(e) {
    // wrap all your code in one function and it will load when everything else (like html,css) shows up. FYI you add this function, it effectively wraps all code in that file in a function that is called once the dom is finished loading
    // fwiw, the issue is your code is being executed before the other file has been loaded into the runtime environment
    var currentQuestion = 0;
    var score = 0;
    //total amount of questions, questions in a var in the other JS file
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

    // load question from the question index. questions[questionIndex] <-- that refers to the index of question # (from other file)

    function loadQuestion(questionIndex) {
        console.log({ questionIndex });
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

    //if user selects nothing, they are alerted to select an answer. if they select the answer that matches the right answer. ultimately the container is hidden once all the questions are completed.
    function loadNextQuestion() {
        console.log("clicked!");
        //check if the radio button is selected or not
        var selectedOption = document.querySelector(
            "input[type = radio]:checked"
        );
        console.log("buttonchecked");
        // var selectedOption = document.querySelector(
        //     "input[type = radio]:checked"
        // );
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
        if (currentQuestion == totQuestions - 1) {
            nextButton.textContent = "finished!";
        }
        if (currentQuestion == totQuestions - 1) {
            //hide the container which shows the options
            container.style.display = "none";
            resultCont.style.display = "";
            // resultCont.textContent='Your score ' + score;
            // return;
        }
        if (score <= 25.0) {
            var remainder = Math.abs(25.0) - Math.abs(score);
            var scoreDecimal = score.toFixed(2);
            var remainderDecimal = remainder.toFixed(2);
            resultCont.textContent =
                " You spent $" +
                scoreDecimal +
                " You win! You're under budget with $" +
                remainderDecimal +
                " left to spare";
            console.log(scoreDecimal);
            console.log(remainderDecimal);
        }
        if (score > 25) {
            resultCont.textContent =
                "You spent $" +
                scoreDecimal +
                " You lose! You went over budget with $" +
                remainderDecimal +
                " that you overspent";
            console.log(scoreDecimal);
            console.log(remainderDecimal);
            // return;
        }
    }
    //nothing shows up unless you call the function at the bottom this gets it to start at index 0. The first question is being called manually here.
    loadQuestion(currentQuestion);
};
