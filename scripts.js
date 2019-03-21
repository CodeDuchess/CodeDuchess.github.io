    
// USED STRICT MODE TO SOLVE: “UNCAUGHT SYNTAX ERROR: UNEXPECTED TOKEN U IN JSON @ POSITION 0”
'use strict';

<script
  src="http://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>

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

        const h1 = document.createElement('h1');
        h1.textContent = job.title;

        const p = document.createElement('p');
        job.description = job.description.substring(0, 300);
        p.textContent = `${job.description}...`;

        container1.appendChild(card);
        card.appendChild(h1);
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

// FILTER BY JOB TYPE

var chkFilter = function() {
    var self = this;
    this.filters = apiData;
     }
    ];

    this.index = {};
    
    //build an index
    arrayForEach(this.job, function(job) {
    arrayForEach(person.filters, function(filter) {
            var list = self.index["" + filter] = self.index["" + filter] || [];
            list.push(job);           
        });
    });
    
    this.filteredJobs = apiData(function() {
        var filters = self.filters(),
            result = [];

        if (filters.length === 1) {
            return self.index[filters[0]];           
        }
    
        arrayForEach(filters, function(filter) {
             arrayPushAll(result, self.index[filter]);       
        });        
    
        return arrayGetDistinctValues(result);
    });          
};
                     
applyBindings(new chkFilter());
  

request.send();
