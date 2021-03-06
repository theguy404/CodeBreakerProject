let answer = document.getElementById('answer'); //answer = <div id="answer"></div>
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    let atp = parseInt(attempt.value);
    
    if(answer == '' && attempt == ''){
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return;
    } else {
        
        atp++;

    }
    
    let test = getResults(input.value);
    
    if(test){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(!test && atp >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
        attempt.value = atp;
}

//implement new functions here
function setHiddenFields(){
    answer.value = Math.floor(Math.random() * 10000).toString(); // answer = 56
    while(answer.value.length < 4){
        answer.value = "0" + answer.value;
    }
    attempt.value = "0";
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
    document.getElementById('code').innerHTML = answer.value;
    if(input){
        document.getElementById('code').className += " success";
    } else {
        document.getElementById('code').className += " failure";
    }
}

function showReplay(){
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}