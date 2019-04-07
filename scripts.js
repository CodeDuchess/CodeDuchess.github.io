
// USED STRICT MODE TO SOLVE: “UNCAUGHT SYNTAX ERROR: UNEXPECTED TOKEN U IN JSON @ POSITION 0”
'use strict';

var apiData="";
const app = document.getElementById('root');
const container1 = document.createElement('div');
container1.setAttribute('class', 'container1');
app.appendChild(container1);
var request = new XMLHttpRequest();

//GET REQUEST WITH USE OF HEROKU AS A PROXY TO SOLVE CORS ERROR
request.open('GET','https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?&markdown=true&location=united+states&page=1&count=20', 
true);

request.onload = function () {  
// CONVERT JSON DATA TO JAVASCRIPT OBJECTS USING JSON.PARSE
    var apiData = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        apiData.forEach(job => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

      // render relevant data: job title, job type, location and description      
        const h1 = document.createElement('h1');
        h1.textContent = job.title;
            
        const h3 = document.createElement('h3');
        h3.textContent = job.type;
            
        const h4 = document.createElement('h4');
        h4.textContent = job.location;   
            
        const p = document.createElement('p');
        job.description = job.description.substring(0, 300);
        p.textContent = `${job.description}...`;
            
        const h2 = document.createElement('h2');
        h2.textContent = `${job.company_url}...`;    
            
        container1.appendChild(card);
        card.appendChild(h1);
        card.appendChild(h3);    
        card.appendChild(h4);      
        card.appendChild(p);
            
        });

  // ERROR HANDLING
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `It's not working!`;
        app.appendChild(errorMessage);
    }
}


// FILTER BY JOB TITLE
var button1 = document.getElementById("keywordSearchButton");
var userInput1 = document.getElementById("userInput1");
button1.addEventListener('click', showResults1);
userInput1.addEventListener("keyup", function(e){
  if (e.keyCode === 13){
    showResults();
  }
})

function showResults1(){
  var searchKeyword = userInput1.value.toLowerCase();
  var cards = document.getElementsByClassName("card"); //this is an array
  var regex = new RegExp(searchKeyword, "g");

  for (var i=0; i<cards.length ; i++){
    if (cards[i].textContent.toLowerCase().match(regex)){
      cards[i].style.display = "block";
    } else{
      cards[i].style.display= "none";
    }
  }
}

// FILTER BY JOB LOCATION
var button2 = document.getElementById("locationSearchButton");
var userInput2 = document.getElementById("userInput2");
button2.addEventListener('click', showResults2);
userInput2.addEventListener("keyup", function(e){
  if (e.keyCode === 13){
    showResults();
  }
})

function showResults2(){
  var searchKeyword = userInput2.value.toLowerCase();
  var cards = document.getElementsByClassName("card");
  var jobLocations = document.getElementsByTagName("h4");
  var regex = new RegExp(searchKeyword, "g");

  for (var i=0; i<cards.length ; i++){
    if (jobLocations[i].textContent.toLowerCase().match(regex)){
      cards[i].style.display = "block";
    } else{
      cards[i].style.display= "none";
    }
  }
}

// FILTER BY JOB TYPE 
var fullTimeCheckBox = document.getElementById("cbFT");
var partTimeCheckBox = document.getElementById("cbPT");
var contractCheckBox = document.getElementById("cbCT");
var jobType = document.getElementsByTagName("h3");

fullTimeCheckBox.addEventListener("change", showByJobType);
partTimeCheckBox.addEventListener("change", showByJobType);
contractCheckBox.addEventListener("change", showByJobType);

function showByJobType(){
  var cards = document.getElementsByClassName("card");
  for (var i=0; i<cards.length ; i++){
    if (fullTimeCheckBox.checked === false){
      if (jobType[i].textContent.toLowerCase() == "full time"){
        cards[i].style.display = "none";
      }
    } else if (fullTimeCheckBox.checked){
      if (jobType[i].textContent.toLowerCase() == "full time"){
        cards[i].style.display = "block";
      }
    }
    if (partTimeCheckBox.checked === false){
      if (jobType[i].textContent.toLowerCase() == "part time"){
        cards[i].style.display = "none";
      }
    }else if (partTimeCheckBox.checked){
      if (jobType[i].textContent.toLowerCase() == "part time"){
        cards[i].style.display = "block";
      }
    }
    if (contractCheckBox.checked === false){
      if (jobType[i].textContent.toLowerCase() == "contract"){
        cards[i].style.display = "none";
      }
    }else if (contractCheckBox.checked){
      if (jobType[i].textContent.toLowerCase() == "contract"){
        cards[i].style.display = "block";
      }
    }
  }
}

request.send();
