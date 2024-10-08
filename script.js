// Constants and global variables
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzoXaxHnAzXzs_HuufwiWd9_IKnINMeNsBAr8ks2DnUIGHr02Fhlmh-72hRLK0apluS/exec';
const MAX_TRIALS = 10;
let currentTrial = 0;
let participantId = Date.now().toString(36) + Math.random().toString(36).substr(2);
let isSecondRound = false;
let delegatedToAI = false;
let correctAnswers = 0;
let currentSelection = null;
let currentStimulus = null;
let chatOpened = false;
let chatHistory = [];

const allStimuli = [
    {airports: 0, population_rank: 23, counties_rank: 22, income_rank: 46, travel_rank: 29, correct_answer: 34, ai_prediction: 34},
    {airports: 0, population_rank: 47, counties_rank: 37, income_rank: 4, travel_rank: 47, correct_answer: 29, ai_prediction: 44},
    {airports: 1, population_rank: 16, counties_rank: 43, income_rank: 22, travel_rank: 18, correct_answer: 9, ai_prediction: 21},
    {airports: 0, population_rank: 32, counties_rank: 18, income_rank: 48, travel_rank: 35, correct_answer: 37, ai_prediction: 35},
    {airports: 3, population_rank: 1, counties_rank: 27, income_rank: 9, travel_rank: 1, correct_answer: 1, ai_prediction: 1},
    {airports: 1, population_rank: 22, counties_rank: 24, income_rank: 13, travel_rank: 16, correct_answer: 7, ai_prediction: 13},
    {airports: 0, population_rank: 29, counties_rank: 47, income_rank: 3, travel_rank: 26, correct_answer: 33, ai_prediction: 27},
    {airports: 0, population_rank: 45, counties_rank: 50, income_rank: 11, travel_rank: 50, correct_answer: 50, ai_prediction: 50},
    {airports: 4, population_rank: 4, counties_rank: 20, income_rank: 33, travel_rank: 2, correct_answer: 3, ai_prediction: 1},
    {airports: 1, population_rank: 9, counties_rank: 2, income_rank: 23, travel_rank: 9, correct_answer: 4, ai_prediction: 7},
    {airports: 0, population_rank: 40, counties_rank: 48, income_rank: 5, travel_rank: 25, correct_answer: 17, ai_prediction: 26},
    {airports: 0, population_rank: 39, counties_rank: 32, income_rank: 34, travel_rank: 40, correct_answer: 38, ai_prediction: 44},
    {airports: 2, population_rank: 5, counties_rank: 7, income_rank: 16, travel_rank: 5, correct_answer: 5, ai_prediction: 4},
    {airports: 0, population_rank: 15, counties_rank: 12, income_rank: 32, travel_rank: 27, correct_answer: 28, ai_prediction: 27},
    {airports: 0, population_rank: 30, counties_rank: 9, income_rank: 29, travel_rank: 31, correct_answer: 40, ai_prediction: 27},
    {airports: 0, population_rank: 33, counties_rank: 6, income_rank: 25, travel_rank: 36, correct_answer: 45, ai_prediction: 28},
    {airports: 0, population_rank: 26, counties_rank: 4, income_rank: 47, travel_rank: 30, correct_answer: 26, ai_prediction: 28},
    {airports: 0, population_rank: 25, counties_rank: 25, income_rank: 41, travel_rank: 24, correct_answer: 27, ai_prediction: 28},
    {airports: 0, population_rank: 41, counties_rank: 42, income_rank: 36, travel_rank: 42, correct_answer: 43, ai_prediction: 49},
    {airports: 1, population_rank: 19, counties_rank: 38, income_rank: 1, travel_rank: 17, correct_answer: 20, ai_prediction: 23},
    {airports: 1, population_rank: 14, counties_rank: 44, income_rank: 6, travel_rank: 15, correct_answer: 16, ai_prediction: 15},
    {airports: 1, population_rank: 8, counties_rank: 15, income_rank: 30, travel_rank: 13, correct_answer: 14, ai_prediction: 13},
    {airports: 1, population_rank: 21, counties_rank: 14, income_rank: 12, travel_rank: 21, correct_answer: 15, ai_prediction: 13},
    {airports: 0, population_rank: 31, counties_rank: 16, income_rank: 50, travel_rank: 32, correct_answer: 42, ai_prediction: 34},
    {airports: 0, population_rank: 18, counties_rank: 5, income_rank: 35, travel_rank: 19, correct_answer: 19, ai_prediction: 22},
    {airports: 0, population_rank: 44, counties_rank: 28, income_rank: 42, travel_rank: 41, correct_answer: 39, ai_prediction: 45},
    {airports: 0, population_rank: 38, counties_rank: 11, income_rank: 28, travel_rank: 38, correct_answer: 35, ai_prediction: 34},
    {airports: 1, population_rank: 35, counties_rank: 41, income_rank: 15, travel_rank: 6, correct_answer: 11, ai_prediction: 7},
    {airports: 0, population_rank: 42, counties_rank: 46, income_rank: 7, travel_rank: 39, correct_answer: 41, ai_prediction: 35},
    {airports: 1, population_rank: 11, counties_rank: 40, income_rank: 2, travel_rank: 10, correct_answer: 18, ai_prediction: 10},
    {airports: 0, population_rank: 36, counties_rank: 35, income_rank: 44, travel_rank: 34, correct_answer: 32, ai_prediction: 42},
    {airports: 2, population_rank: 3, counties_rank: 26, income_rank: 17, travel_rank: 4, correct_answer: 6, ai_prediction: 4},
    {airports: 1, population_rank: 10, counties_rank: 8, income_rank: 37, travel_rank: 11, correct_answer: 8, ai_prediction: 10},
    {airports: 0, population_rank: 48, counties_rank: 30, income_rank: 39, travel_rank: 46, correct_answer: 44, ai_prediction: 49},
    {airports: 0, population_rank: 7, counties_rank: 13, income_rank: 31, travel_rank: 12, correct_answer: 23, ai_prediction: 20},
    {airports: 0, population_rank: 28, counties_rank: 17, income_rank: 45, travel_rank: 33, correct_answer: 31, ai_prediction: 34},
    {airports: 1, population_rank: 27, counties_rank: 34, income_rank: 26, travel_rank: 28, correct_answer: 24, ai_prediction: 24},
    {airports: 1, population_rank: 6, counties_rank: 21, income_rank: 24, travel_rank: 7, correct_answer: 12, ai_prediction: 7},
    {airports: 0, population_rank: 43, counties_rank: 49, income_rank: 18, travel_rank: 49, correct_answer: 36, ai_prediction: 50},
    {airports: 0, population_rank: 24, counties_rank: 31, income_rank: 40, travel_rank: 22, correct_answer: 30, ai_prediction: 27},
    {airports: 0, population_rank: 46, counties_rank: 23, income_rank: 38, travel_rank: 45, correct_answer: 46, ai_prediction: 45},
    {airports: 0, population_rank: 17, counties_rank: 10, income_rank: 43, travel_rank: 14, correct_answer: 21, ai_prediction: 21},
    {airports: 2, population_rank: 2, counties_rank: 1, income_rank: 27, travel_rank: 3, correct_answer: 2, ai_prediction: 4},
    {airports: 1, population_rank: 34, counties_rank: 36, income_rank: 14, travel_rank: 37, correct_answer: 22, ai_prediction: 27},
    {airports: 0, population_rank: 49, counties_rank: 45, income_rank: 20, travel_rank: 48, correct_answer: 47, ai_prediction: 49},
    {airports: 0, population_rank: 12, counties_rank: 3, income_rank: 8, travel_rank: 8, correct_answer: 10, ai_prediction: 9},
    {airports: 1, population_rank: 13, counties_rank: 33, income_rank: 10, travel_rank: 20, correct_answer: 13, ai_prediction: 18},
    {airports: 0, population_rank: 37, counties_rank: 29, income_rank: 49, travel_rank: 43, correct_answer: 49, ai_prediction: 49},
    {airports: 0, population_rank: 20, counties_rank: 19, income_rank: 21, travel_rank: 23, correct_answer: 25, ai_prediction: 24},
    {airports: 0, population_rank: 50, counties_rank: 39, income_rank: 19, travel_rank: 44, correct_answer: 48, ai_prediction: 45}
];

const aiQuestions = [
    "What is your prediction for this state's ranking?",
    "What about this state?",
    "How would you rank this one?",
    "What's your guess for this state's position?",
    "Where do you think this state stands?",
    "Any thoughts on this state's ranking?",
    "How would you place this state?",
    "What's your take on this state's position?",
    "Where would you put this state in the rankings?",
    "What's your estimate for this state?"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadStimulus() {
    if (currentTrial < MAX_TRIALS) {
        currentStimulus = allStimuli[currentTrial];
        
        let leftColumnContent = `
            <h2>Trial ${currentTrial + 1} of ${MAX_TRIALS}</h2>
            <table>
                <tr><th colspan="2">State Information:</th></tr>
                <tr><td>Number of Major Airports</td><td>${currentStimulus.airports}</td></tr>
                <tr><td>Census Population Rank - 2010</td><td>${currentStimulus.population_rank}</td></tr>
                <tr><td>Number of Counties Rank</td><td>${currentStimulus.counties_rank}</td></tr>
                <tr><td>Median Household Income Rank - 2008</td><td>${currentStimulus.income_rank}</td></tr>
                <tr><td>Domestic Travel Expenditure Rank - 2009</td><td>${currentStimulus.travel_rank}</td></tr>
            </table>
            <p>Please select a rank for this state based on the number of flight passengers (1-50):</p>
            <div style="display: flex; justify-content: flex-start; align-items: center;">
                <input type="number" id="rank-input" min="1" max="50" style="width: 100px; height: 30px; margin-right: 10px;">
                <button id="submit-rank" onclick="submitRank()" style="height: 36px;">Submit Rank</button>
            </div>`;
        
        let rightColumnContent = `
            <table id="result-table">
                <tr>
                    <th>You</th>
                    <th>AI Prediction</th>
                    <th>Correct Rank</th>
                </tr>
                <tr>
                    <td id="user-rank"></td>
                    <td id="ai-rank"></td>
                    <td id="correct-rank"></td>
                </tr>
            </table>
            <div id="chat-interface">
                <div id="chat-header">AI Agent</div>
                <div id="chat-messages"></div>
                <div id="chat-input">
                    ${!isSecondRound && currentTrial === 0 ? 
                        `<button id="request-prediction" onclick="openChat()" disabled>Request AI Prediction</button>` :
                        `<button id="ask-prediction" onclick="requestAIPrediction()" disabled>${aiQuestions[currentTrial]}</button>`
                    }
                </div>
            </div>`;
        
        document.getElementById('left-column').innerHTML = leftColumnContent;
        document.getElementById('right-column').innerHTML = rightColumnContent;
        
        updateChatDisplay();
    } else {
        if (!isSecondRound) {
            showFinalDecision();
        } else {
            showFinalReward();
        }
    }
}

function submitRank() {
    const rankInput = document.getElementById('rank-input');
    currentSelection = parseInt(rankInput.value);
    
    if (isNaN(currentSelection) || currentSelection < 1 || currentSelection > 50) {
        alert('Please enter a valid rank between 1 and 50.');
        return;
    }
    
    document.getElementById('submit-rank').disabled = true;
    document.getElementById('rank-input').disabled = true;
    document.getElementById('user-rank').textContent = currentSelection;
    
    if (!isSecondRound) {
        if (currentTrial === 0) {
            document.getElementById('request-prediction').disabled = false;
        } else {
            document.getElementById('ask-prediction').disabled = false;
        }
    } else if (delegatedToAI) {
        requestAIPrediction();
    } else {
        showCorrectAnswer();
    }
    
    saveData({
        participantId: participantId,
        round: isSecondRound ? 2 : 1,
        trial: currentTrial + 1,
        participantRank: currentSelection,
        correctRank: currentStimulus.correct_answer,
        aiPrediction: currentStimulus.ai_prediction,
        finalDecision: ''
    });
}

function openChat() {
    chatOpened = true;
    document.getElementById('request-prediction').style.display = 'none';
    document.getElementById('chat-input').innerHTML = `
        <button id="ask-prediction" onclick="requestAIPrediction()">${aiQuestions[currentTrial]}</button>
    `;
    updateChatDisplay();
}

function requestAIPrediction() {
    const userQuestion = aiQuestions[currentTrial];
    const aiResponse = `Based on the provided information, my prediction for this state's rank is ${currentStimulus.ai_prediction}.`;
    
    chatHistory.push({ user: userQuestion, ai: aiResponse });
    updateChatDisplay();

    document.getElementById('ask-prediction').disabled = true;
    document.getElementById('ai-rank').textContent = currentStimulus.ai_prediction;
    
    setTimeout(showCorrectAnswer, 1000);
    
    if (isSecondRound && delegatedToAI) {
        saveData({
            participantId: participantId,
            round: 2,
            trial: currentTrial + 1,
            participantRank: 'N/A',
            correctRank: currentStimulus.correct_answer,
            aiPrediction: currentStimulus.ai_prediction,
            finalDecision: ''
        });
    }
}

function updateChatDisplay() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = chatHistory.map(msg => 
            `<div class="message-container">
                ${msg.user ? 
                    `<div class="message user-message">
                        ${msg.user}
                        <span class="message-label user-label">You</span>
                     </div>` : 
                    ''}
                ${msg.ai ? 
                    `<div class="message ai-message">
                        ${msg.ai}
                        <span class="message-label ai-label">AI</span>
                     </div>` : 
                    ''}
             </div>`
        ).join('');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function showCorrectAnswer() {
    const correctAnswer = currentStimulus.correct_answer;
    document.getElementById('correct-rank').textContent = correctAnswer;
    
    if (isSecondRound) {
        if (delegatedToAI && currentStimulus.ai_prediction === correctAnswer) {
            correctAnswers++;
        } else if (!delegatedToAI && currentSelection === correctAnswer) {
            correctAnswers++;
        }
    }
    
    setTimeout(nextTrial, 2000);
}

function nextTrial() {
    currentTrial++;
    loadStimulus();
}

function showFinalDecision() {
    document.getElementById('experiment').innerHTML = `
        <h3>You have completed 10 trials. Would you like to predict another 10 rounds yourself or let AI predict for you?</h3>
        <button onclick="onFinalDecision('self')">Predict Myself</button>
        <button onclick="onFinalDecision('ai')">Let AI Predict</button>
    `;
}

function onFinalDecision(decision) {
    saveData({
        participantId: participantId,
        round: 1,
        trial: 'Final',
        participantRank: '',
        correctRank: '',
        aiPrediction: '',
        finalDecision: decision
    });
    delegatedToAI = decision === 'ai';
    isSecondRound = true;
    currentTrial = 0;
    correctAnswers = 0;
    chatOpened = decision === 'ai';
    chatHistory = []; // Reset chat history for the second round
    loadStimulus();
}

function showFinalReward() {
    document.getElementById('experiment').innerHTML = `
        <h3>Thank you for participating in the experiment!</h3>
        <p>You got ${correctAnswers} correct answers in the second round.</p>
        <p>Your reward is $${correctAnswers}.</p>
        <p>Your completion code is: ${participantId}</p>
    `;
    saveData({
        participantId: participantId,
        round: 2,
        trial: 'Final',
        participantRank: '',
        correctRank: '',
        aiPrediction: '',
        finalDecision: '',
        correctAnswers: correctAnswers,
        reward: correctAnswers
    });
}

function saveData(data) {
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Data saved successfully:', result);
    })
    .catch(error => {
        console.error('Error saving data:', error);
        // Save to local storage as fallback
        let localData = JSON.parse(localStorage.getItem('experimentData') || '[]');
        localData.push(data);
        localStorage.setItem('experimentData', JSON.stringify(localData));
        console.log('Data saved locally due to network error');
    });
}

// Initialize experiment
shuffleArray(allStimuli);
loadStimulus();
