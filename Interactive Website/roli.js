//ROLI PARTJA
/*
//QUIZZ DOLGOK - RÓLAND
let questionCount = 0;
let correctAnswers = 0;
let allFetchedData;

// Function to load the next question
function loadNextQuestion() {
    if (questionCount < 5) {
        // Fetch new question and update the UI
        fetch('/resources/foodData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the retrieved data is stored globally for later use
                allFetchedData = data;
                loadNextQuestion(); // Load the first question
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        const filteredData = allFetchedData.filter(item =>
            item["Kalória (kcal)"] &&
            item["Fehérje (g)"] &&
            item["Zsír (g)"] &&
            item["Szénhidrát (g)"] &&
            item["Élelmiszer"]

        )
    };

    // Reset button colors from previous question
    answerButtons.forEach(button => {
        button.style.backgroundColor = ''; // Reset button color
    });

}

// Next button functionality
const nextButton = document.getElementById('next');

nextButton.addEventListener('click', () => {
    questionCount++;
    loadNextQuestion();
});
*/