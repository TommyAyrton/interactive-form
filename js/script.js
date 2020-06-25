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

// Form variable
const form = document.querySelector('form');

// Input Variables
const inputName = document.querySelector('input#name');
const inputEmail = document.querySelector('input#mail');
const inputOtherTitle = document.querySelector('input#other-title');

// Select Job Role
const selectJobRole = document.getElementById('title');
// Select Design
const selectDesign = document.getElementById('design');
// Select Color
const selectColor = document.getElementById('color');
let option = new Option("Please select a T-shirt theme", "value", true, true);
// option.setAttribute("hidden", true);
selectColor.appendChild(option);

// Section Activities
const chkActivities = document.querySelector('fieldset.activities');
const inputActivities = chkActivities.querySelectorAll('input');
const lengthActivities = inputActivities.length;
// Create 'label' element for input 'data-cost'
const textTotal = document.createElement('label');
chkActivities.appendChild(textTotal);

// Function to get the selected option
const getSelectedOption = (sel) => {
    let opt;
    for ( let i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
} 
// Select Payment Info
const selectPayment = document.getElementById('payment');
const optionSelectPay = selectPayment.querySelector('option');
optionSelectPay.setAttribute('hidden', true);
const divCreditCard = document.getElementById('credit-card');
const divPaypal = document.getElementById('paypal');
const divBitcoin = document.getElementById('bitcoin');
const inputCreditCard = document.getElementById('cc-num');
const inputZip = document.getElementById('zip');
const inputCVV = document.getElementById('cvv');

// Input Funtions Validations: validated each input
const isValidUsername = (username) => {
    return /^[a-z]+$/.test(username);
}
const isValidEmail = (email) => {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
const isValidCreditCard = (card) => {
    // Visa, Mastercard, Discover
    return /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/.test(card);
}
const isValidZipCode = (zip) => {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
}
const isValidCVV = (cvv) => {
    // To match 3 or 4 digits
    return /^[0-9]{3,4}$/.test(cvv);
}
const isValidActivities = (activities) => {
    for (let i = 0, len = inputActivities.length; i < len; i++) {
        const element = inputActivities[i];
        if (!element.checked) {
            return false;
        } else {
            return true;
        }         
    }
}

// Call validators
const createListener = (validator) => {
    return e => {
        const input = e.target;
        const text = e.target.value;
        const valid = validator(text);
        if (text !== "" && !valid) {
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#5e97b0';
        }
    };
}

// Add events
// Add event change: show input 'other-title'
selectJobRole.addEventListener('change', () => {
    let opt = getSelectedOption(selectJobRole);
    if (opt.value === 'other') {        
        inputOtherTitle.style.display = 'block';
    } else {
        inputOtherTitle.style.display = "none";
    }
});
// Add event: show options on 'color' input by 'design' input
selectDesign.addEventListener('change', () => {
    let opt = getSelectedOption(selectDesign);
    for (let i = 0, len = selectColor.length ; i < len; i++) {  
        selectColor[i].style.display = 'none';      
        if (opt.value === 'js puns') {
            selectColor.options[0].selected = true;
            for (let j = 0; j < 3; j++) {
                selectColor[j].style.display = 'block';                
            }
        }
        if (opt.value === 'heart js') {
            selectColor.options[3].selected = true;
            for (let k = 3; k < 6; k++) {
                selectColor[k].style.display = 'block';              
            }
        }if (selectDesign.options[0].selected) {
            selectColor[6].selected = true;
        }               
    }
});
// Add event change: show/hide payment method
selectPayment.addEventListener('change', () => {
    let opt = getSelectedOption(selectPayment);
    for (let i = 0; i < 3; i++) {
        divCreditCard.style.display = 'none';
        divPaypal.style.display = 'none';
        divBitcoin.style.display = 'none';
        if (opt.value === 'credit card') {
            divCreditCard.style.display = 'block';
        } else if (opt.value === 'paypal') {
            divPaypal.style.display = 'block';
        } else if (opt.value === 'bitcoin') {
            divBitcoin.style.display = 'block';
        }
    }
})
// Add event change: loop over the checkbox elements and disabled if checked
chkActivities.addEventListener('change', (e) => {
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

// Form submit
// Function validator: if any input return false
const formSubmit = (e) => {
    e.preventDefault();
    let opt = getSelectedOption(selectPayment);
    if (!isValidUsername(inputName.value)) {  
        inputName.focus();      
        return;
    }
    if (!isValidEmail(inputEmail.value)) {
        inputEmail.focus();
        return;
    }
    if (!isValidActivities(inputActivities)) {
        textTotal.innerText = `Select one or more activities`;
        textTotal.focus();
        return;
    }
    if (opt.value === 'credit card') {
        if (!isValidCreditCard(inputCreditCard)) {
            inputCreditCard.focus();
            return;
        }
        if (!isValidZipCode(inputZip)) {
            inputZip.focus();
            return;
        }
        if (!isValidCVV(inputCVV)) {
            inputCVV.focus();
            return;
        }
    }
    form.submit();
}

//  Valid each input
inputName.addEventListener('input', createListener(isValidUsername));
inputEmail.addEventListener('input', createListener(isValidEmail));
inputCreditCard.addEventListener('input', createListener(isValidCreditCard));
inputZip.addEventListener('input', createListener(isValidZipCode));
inputCVV.addEventListener('input', createListener(isValidCVV));

// 
window.onload = function() {
    if (supportsLocalStorage) {
        inputName.focus();
        inputOtherTitle.style.display = 'none';

        // Hide options for 'selectColor'
        for (let i = 0, len = selectColor.length; i < len; i++) {
            selectColor[i].style.display = 'none';    
        }

        // Hide 'div' payment info
        divCreditCard.style.display = 'none';
        divPaypal.style.display = 'none';
        divBitcoin.style.display = 'none';
        
        // Valid all input on form submit
        form.addEventListener('submit', formSubmit);
    }
}
