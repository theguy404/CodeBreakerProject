let answer = document.getElementById('answer'); //answer = <div id="answer"></div>
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    
    if(answer == '' && attempt == ''){
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return;
    }
    
    attempt++;
    
    let test = getResults(input.value);
    
    if(test){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(!test && attempt >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
    answer.value = Math.floor(Math.random() * 10000).toString(); // answer = 56
    while(answer.value.length < 4){
        answer.value = "0" + answer.value;
    }
    attempt = 0;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(input){
    if(input.length == 4){
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input){
    let first = `<div class="row"><span class="col-md-6">`;
    let last = `</span><div class="col-md-6">`;
    let string = first;
    let correct = 0;
    for(let i = 0; i < 4; i++){
        if(answer.value.includes(input.charAt(i))){
            if(input.charAt(i) == answer.value.charAt(i)){
                string = string + `<span class="glyphicon glyphicon-ok"></span>`;
                correct++;
            } else {
                string = string + `<span class="glyphicon glyphicon-transfer"></span>`;
            }
        } else {
            string = string + `<span class="glyphicon glyphicon-remove"></span>`;
        }
    }
    document.getElementById('results').innerHTML = string + last;
    if(correct == 4){
        return true;
    } else {
        return false;
    }
}

function showAnswer(input){
    document.getElementById('answer').innerHTML = answer;
    if(input){
        document.getElementById('answer').className += " success";
    } else {
        document.getElementById('answer').className += " failure";
    }
}

function showReplay(){
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}