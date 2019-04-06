
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
//CONVERT JSON DATA TO JAVASCRIPT OBJECTS USING JSON.PARSE
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

var button = document.querySelector("button");
var userInput = document.getElementById("userInput");
button.addEventListener('click', showResults);
userInput.addEventListener("keyup", function(e){
  if (e.keyCode === 13){
    showResults();
  }
})

function showResults(){
  var searchKeyword = userInput.value.toLowerCase();
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

// FILTER BY JOB TYPE USING JQUERY OPTION 1
$('input[type="checkbox"]').click(function() {
    if ($('input[type="checkbox"]:checked').length > 0) {
        $('.checkbox >div').hide();
        $('input[type="checkbox"]:checked').each(function() {
            $('.checkbox >div[type=' + this.cbFT + ']').show();
        });
    } else {
        $('.checkbox >div').show();

    }
});


request.send();








    
