/* var fs = require('fs');

const button = document.getElementById('csirke');

const json = readJson('/resources/foodData.json');
console.log(json);

const randomInfo = document.getElementById('randomInfo');
button.addEventListener("click", handleCsirkeButton);
console.debug(resourceJson);

function handleCsirkeButton() {
    const randomNum = Math.floor(Math.random() * 500);
    randomInfo.textContent = randomNum;
}

function readJson(filename) {
    return JSON.parse(fs.readFileSync(filename).toString());
}
*/

/*const infoElement = document.getElementById('randomInfo');

fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => item["Kalória (kcal)"] && item["Fehérje (g)"] && item["Zsír (g)"] && item["Szénhidrát (g)"]);
        
        if (filteredData.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const randomItem = filteredData[randomIndex];

            const kcal = randomItem["Kalória (kcal)"];
            const protein = randomItem["Fehérje (g)"];
            const fat = randomItem["Zsír (g)"];
            const cho = randomItem["Szénhidrát (g)"];
            const ca = randomItem["Ca (mg)"];
            const cholesterol = randomItem["koleszterin (mg)"];
            const öér = randomItem["ÖÉR (g)"];
            const potassium = randomItem["Kálium (mg)"];
            const cVitamin = randomItem["C-vitamin (mg)"];
            const natrium = randomItem["Nátrium (mg)"]; 
            const coffein = randomItem["koffein (mg)"];
            const phosphoricAcid = randomItem["foszforsav (mg)"];

            const randomInfoText = `Kalória: ${kcal}, Fehérje: ${protein}, Zsír: ${fat}, Szénhidrát (g): ${cho}, Kalcium (mg): ${ca}, Koleszterin (mg): ${cholesterol}, ÖÉR (g): ${öér}, Kálium (mg): ${potassium}, C-vitamin (mg): ${cVitamin}, Nátrium (mg): ${natrium}, Koffein (mg): ${coffein}, Foszforsav (mg): ${phosphoricAcid}`;
            infoElement.textContent = randomInfoText;
        } else {
            infoElement.textContent = 'No items found with the specified properties.';
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
*/

/*
const infoElement = document.getElementById('randomInfo');

fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => item["Kalória (kcal)"] && item["Fehérje (g)"] && item["Zsír (g)"] && item["Szénhidrát (g)"]);

        if (filteredData.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const randomItem = filteredData[randomIndex];

            // List of properties to choose from
            const properties = ["Kalória (kcal)", "Fehérje (g)", "Zsír (g)", "Szénhidrát (g)", "Ca (mg)", "koleszterin (mg)"];
            
            // Randomly select a property
            const selectedProperty = properties[Math.floor(Math.random() * properties.length)];
            
            // Get the value of the selected property
            const selectedValue = randomItem[selectedProperty] ? randomItem[selectedProperty] : 'N/A';

            // Construct the output text
            const randomInfoText = `${selectedProperty}: ${selectedValue}`;
            infoElement.textContent = randomInfoText;
        } else {
            infoElement.textContent = 'No items found with the specified properties.';
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
*/

// A GOMBOK RANDOM ÉLELMISZERBŐL VALÓ KIVÁLASZTÁSA
/*
const buttons = document.querySelectorAll('.answer');

fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => 
            item["Kalória (kcal)"] && 
            item["Fehérje (g)"] && 
            item["Zsír (g)"] && 
            item["Szénhidrát (g)"] &&
            item["Élelmiszer"]
        );

        if (filteredData.length >= 4) {
            // Randomly select correct answer
            const correctAnswerIndex = Math.floor(Math.random() * filteredData.length);
            const correctAnswer = filteredData[correctAnswerIndex]["Élelmiszer"];

            // Randomly assign correct answer to one of the buttons
            const randomButtonIndex = Math.floor(Math.random() * buttons.length);
            buttons[randomButtonIndex].textContent = correctAnswer;
            
            // Remove correct answer from the data
            filteredData.splice(correctAnswerIndex, 1);

            // Randomly assign other button data
            for (let i = 0; i < buttons.length; i++) {
                if (i !== randomButtonIndex) {
                    const randomIndex = Math.floor(Math.random() * filteredData.length);
                    const randomFoodItem = filteredData[randomIndex]["Élelmiszer"];
                    buttons[i].textContent = randomFoodItem;

                    // Remove selected item from the list to avoid repetition
                    filteredData.splice(randomIndex, 1);
                }
            }
        } else {
            // Handle the case where there are not enough items in the data
            console.error('Not enough items in the data.');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


    // button alja

const answerButtons = document.querySelectorAll('.answer');
const correctAnswer = "Option 1"; // Set the correct answer dynamically

function handleButtonClick(event) {
    const clickedButton = event.target;
    const buttonText = clickedButton.textContent;

    if (buttonText === correctAnswer) {
        document.body.style.backgroundColor = 'green'; // Change the background color to green for correct answer
        alert('Correct answer!');
    } else {
        document.body.style.backgroundColor = 'red'; // Change the background color to red for wrong answer
        alert('Wrong answer. Try again!');
    }
}

answerButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
*/

// random number from json


const infoElement = document.getElementById('randomInfo');

fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => 
            item["Kalória (kcal)"] && 
            item["Fehérje (g)"] && 
            item["Zsír (g)"] && 
            item["Szénhidrát (g)"]
        );

        if (filteredData.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const randomItem = filteredData[randomIndex];

            const baseProperties = ["Kalória (kcal)", "Fehérje (g)", "Zsír (g)", "Szénhidrát (g)"];
            const additionalProperties = Object.keys(randomItem).filter(prop => 
                !baseProperties.includes(prop) && 
                prop !== "Élelmiszer"
            );
            
            let randomProperty;
            let randomValue;

            if (additionalProperties.length > 0) {
                randomProperty = additionalProperties[Math.floor(Math.random() * additionalProperties.length)];
                randomValue = randomItem[randomProperty];
            } else {
                // If no additional properties, choose one of the base properties
                randomProperty = baseProperties[Math.floor(Math.random() * baseProperties.length)];
                randomValue = randomItem[randomProperty];
            }

            const randomInfoText = `${randomProperty}: ${randomValue}`;
            infoElement.textContent = randomInfoText;
        } else {
            infoElement.textContent = 'No items found with the specified properties.';
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// ANSWER BUTTON FUNCTION

const answerButtons = document.querySelectorAll('.answer');
let correctAnswerIndex;

// Fetch your data and set up answer buttons
fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => 
            item["Kalória (kcal)"] && 
            item["Fehérje (g)"] && 
            item["Zsír (g)"] && 
            item["Szénhidrát (g)"] &&
            item["Élelmiszer"]
        );

        if (filteredData.length >= 4) {
            // Randomly select the correct answer index
            correctAnswerIndex = Math.floor(Math.random() * 4);

            // Randomly assign correct answer to one of the buttons
            for (let i = 0; i < answerButtons.length; i++) {
                const randomIndex = Math.floor(Math.random() * filteredData.length);
                const randomFoodItem = filteredData[randomIndex]["Élelmiszer"];
                answerButtons[i].textContent = randomFoodItem;

                // Remove selected item from the list to avoid repetition
                filteredData.splice(randomIndex, 1);
            }
        } else {
            // Handle the case where there are not enough items in the data
            console.error('Not enough items in the data.');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function handleButtonClick(event) {
    const clickedButton = event.target;
    const buttonIndex = Array.from(answerButtons).indexOf(clickedButton);

    if (buttonIndex === correctAnswerIndex) {
        clickedButton.style.backgroundColor = 'green'; // Change the background color to green for correct answer
        alert('Correct answer!');
    } else {
         clickedButton.style.backgroundColor = 'red'; // Change the background color to red for wrong answer
        alert('Wrong answer. Try again!');
    }
}

answerButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// HELP BUTTON FUNCTION

let filteredData; // Define filteredData at a higher scope

fetch('/resources/foodData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process data here
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



const helpButton = document.getElementById('help');

function handleHelpButtonClick() {
    if (filteredData && correctAnswerIndex !== undefined) {
        const correctAnswerItem = filteredData[correctAnswerIndex];
        const properties = Object.keys(correctAnswerItem);
        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        infoElement.textContent = `${randomProperty}: ${correctAnswerItem[randomProperty]}`;
    } else {
        infoElement.textContent = 'No correct answer available.';
    }
}

helpButton.addEventListener('click', handleHelpButtonClick);
