"use strict;"

// Event focus on input 'name' and 'other title' hide
window.onload = function() {
    document.querySelector('input#name').focus();   
};

// 
document.querySelector('input#other-title').style.display = 'none';

const selectDesign = document.querySelector('select#design');
const selectColor = document.querySelector('select#color');
const option = document.createElement('option');
option.innerText = 'Please select a T-shirt theme';
option.setAttribute('selected', true);
option.setAttribute('hidden', true);
selectColor.appendChild(option);

for (let i = 0; i < selectColor.length - 1; i++) {
    selectColor[i].style.display = 'none';    
}

selectDesign.addEventListener('change', (e) => {
    let texto = selectDesign.options[selectDesign.selectedIndex].text
    console.log(texto);
    if (e.target.value === 'js puns') {
        selectColor.options[0].selected = true;
        selectColor[0].style.display = 'block';
        selectColor[1].style.display = 'block';
        selectColor[2].style.display = 'block';
        selectColor[3].style.display = 'none';
        selectColor[4].style.display = 'none';
        selectColor[5].style.display = 'none';               
    } else if(e.target.value === 'heart js') {
        selectColor.options[3].selected = true;
        selectColor[0].style.display = 'none';
        selectColor[1].style.display = 'none';
        selectColor[2].style.display = 'none';
        selectColor[3].style.display = 'block';
        selectColor[4].style.display = 'block';
        selectColor[5].style.display = 'block';
    }
});