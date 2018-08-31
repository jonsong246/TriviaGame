//Quiz Parameters
(function(){
    //Array of Questions
    const myQuestions = [
        {
            question: "What is 1+1?",
            answers: {
                a: "11",
                b: "2",
                c: "0",
                d: "10"
            },
            correctAnswer: "b"
        },
        {
            question: "What gas is most abundant in Earth's atmosphere?",
            answers: {
                a: "Oxygen",
                b: "Carbon Dioxide",
                c: "Nitrogen",
                d: "Hydrogen"
            },
            correctAnswer: "c"
        },
        {
            question: "In 'The Lord of the Rings', who are Frodo's childhood friends that accompany him on his adventure?",
            answers: {
                a: "Merry",
                b: "Pip",
                c: "Sam",
                d: "All of the Above"
            },
            correctAnswer: "d"
        },
        {
            question: "In Harry Potter, what spell is used to unlock doors?",
            answers: {
                a: "Obliviate",
                b: "Sectumsempra",
                c: "Alohomora",
                d: "Wingardium Leviosa"
            },
            correctAnswer: "c"
        },
        {
            question: "Which Pokemon is a poison-type?",
            answers:{
                a: "Ekans",
                b: "Muk",
                c: "Ghastly",
                d:"All of the Above"
            },
            correctAnswer: "d"
        }
    ];    
function buildQuiz(){
    //Storing the HTML output
    const output = [];
    //For Each Question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            //Storing the list of answers
            const answers = [];
            //For each available answer...
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            //Adds this question and its answers to the output
            output.push(
                `<div class="slide">
                    <div class="question">${currentQuestion.question}</div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    //Combining the output list into one string of HTML and putting it on the page
    quizContainer.innerHTML = output.join("");
}

//Result Parameters
function showResults(){
    //Gathering answer containers from the quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //Keeping track of USER ANSWERS
    let numCorrect = 0;
    //For Each Question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
        //Find the Selected answer...
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct 
        if(userAnswer===currentQuestion.correctAnswer){
            numCorrect++;
            
            //color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
            //colors answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

//Slide Function
function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide===0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide===slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

      // display quiz right away
      buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  // on submit, show results
  submitButton.addEventListener("click", showResults);
    
})();