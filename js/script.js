"use strict";

// Global variabel
let activityCost = 0;

// Test for local storage
const supportsLocalStorage = () => {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

// Section T-Shirt info
// Set default option to 'color' input
const selectDesign = document.querySelector("select#design");
const selectColor = document.querySelector("select#color");
const option = document.createElement("option");
option.innerText = "Please select a T-shirt theme";
option.setAttribute("selected", true);
option.setAttribute("hidden", true);
selectColor.appendChild(option);

for (let i = 0; i < selectColor.length - 1; i++) {
selectColor[i].style.display = "none";
}

// Section Activities
// Select input
const activities = document.querySelector('.activities');
// const labelActivities = activities.querySelectorAll('label');
const inputActivities = activities.querySelectorAll('input');
const lengthActivities = inputActivities.length;
// Create 'label' element for input 'data-cost'
const textTotal = document.createElement('label');
activities.appendChild(textTotal);



// Event focus on input 'name' and 'other title' hide
window.onload = function () {
    if (supportsLocalStorage()) {
        document.querySelector("input#name").focus();
        document.querySelector("input#other-title").style.display = "none";

        // Add eventcchange: show options on 'color' input by 'design' input
        selectDesign.addEventListener("change", (e) => {
            if (e.target.value === "js puns") {
                selectColor.options[0].selected = true;
                selectColor[0].style.display = "block";
                selectColor[1].style.display = "block";
                selectColor[2].style.display = "block";
                selectColor[3].style.display = "none";
                selectColor[4].style.display = "none";
                selectColor[5].style.display = "none";
            } else if (e.target.value === "heart js") {
                selectColor.options[3].selected = true;
                selectColor[0].style.display = "none";
                selectColor[1].style.display = "none";
                selectColor[2].style.display = "none";
                selectColor[3].style.display = "block";
                selectColor[4].style.display = "block";
                selectColor[5].style.display = "block";
            }
        })

        // Add event change: loop over the checkbox elements and disabled if checked
        activities.addEventListener('change', (e) => {
            const selectInput = e.target;
            const selectName = selectInput.getAttribute('name');
            const selectDayTime = selectInput.getAttribute('data-day-and-time');
            const selectCost = parseInt(selectInput.getAttribute('data-cost'));
        
            if (selectInput.checked) {
                activityCost += selectCost;
                for (let i = 0; i < lengthActivities; i++) {
                    if (inputActivities[i].getAttribute('data-day-and-time') === selectDayTime && inputActivities[i].getAttribute('name') !== selectName) {
                        inputActivities[i].disabled = 'true';
                    } 
                }
            } else {
                activityCost -= selectCost;   
                for (let i = 0; i < lengthActivities; i++) {
                    if (inputActivities[i].getAttribute('data-day-and-time') === selectDayTime && inputActivities[i].getAttribute('name') !== selectName) {
                        inputActivities[i].disabled = '';
                    } 
                }           
            } 
            textTotal.innerText = `Total Cost: $${activityCost}`;      
        });
    }  
};



