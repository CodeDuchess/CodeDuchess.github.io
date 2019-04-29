'use strict';

var apiData="";
const app = document.getElementById('root');
const container1 = document.createElement('div');
container1.setAttribute('class', 'container1');
app.appendChild(container1);

//GET REQUEST WITH USE OF HEROKU AS A PROXY TO SOLVE CORS ERROR
var request = new XMLHttpRequest();
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
        const h2 = document.createElement('h2');
        job.title = job.title.substring(0, 40);    
        h2.textContent = `${job.title}...`;
            
        const h3 = document.createElement('h3');
        h3.textContent = job.company;
                        
        const h4 = document.createElement('h4');
        h4.textContent = job.location;   
            
        const p = document.createElement('p');
        job.description = job.description.substring(0, 300);
        p.textContent = `${job.description}...`;
      
        container1.appendChild(card);
        card.appendChild(h2);
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

/* JQUERY EVENT HANDLER TO VIEW ENTIRE JOB LISTING
$(document).ready(function() {
    $('#btnClickMe').on('click', sayHello);
    
    function sayHello()
    {
        alert('Hello');
    }

}); */

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
let fullTimeCheckBox = document.getElementById("cbFT");
let partTimeCheckBox = document.getElementById("cbPT");
let contractCheckBox = document.getElementById("cbCT");
let jobType = document.getElementsByTagName("h3");

fullTimeCheckBox.addEventListener("change", showByJobType);
partTimeCheckBox.addEventListener("change", showByJobType);
contractCheckBox.addEventListener("change", showByJobType);

function showByJobType(){
  let cards = document.getElementsByClassName("card");
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
