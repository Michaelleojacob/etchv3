let slider = document.querySelector('#slider');
let displaySliderValue = document.querySelector('.displaySliderValue');
let sliderValue = 16;
let gridContainer = document.querySelector('.gridContainer');
let gridItemArray = [];
let lastNum = 16;
let lastNumSquared = lastNum * lastNum;
let userColorChoice;

//sets default color
function defaultColor(){
    userColorChoice = 'permMouseOver';
    return userColorChoice;
};
defaultColor();

//black button
const blkbtn = document.querySelector('#black');
blkbtn.addEventListener('click', function(e){
    userColorChoice = 'mouseOverBlack';
    let permMouseOver = document.querySelectorAll('.permMouseOver');
    permMouseOver.forEach(item =>{
        item.classList.add('mouseOverBlack');
        item.classList.remove('permMouseOver');
    });
    return userColorChoice;
    
});

//purple button
const purple = document.querySelector('#purple');
purple.addEventListener('click', function(e){
    userColorChoice = 'permMouseOver';
    let mouseOverBlack = document.querySelectorAll('.mouseOverBlack');
    mouseOverBlack.forEach(item =>{
        item.classList.add('permMouseOver');
        item.classList.remove('mouseOverBlack');
    });
    return userColorChoice;
});

//eraser button
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', function(x){
    userColorChoice = 'mouseOverEraser';
    return userColorChoice
});

//? this is a test, an example for how I could possibly implement a rainbow style.
// rainbow.addEventListener('click', function(e){
//     console.log('rainbow was clicked');
//     userColorChoice = 'rainbow';
// });
// function mouseOverRainbow (x) {
//     x.target.style.background = "yellow";
// }

//dynamically creating the css grid using js variables.
function makeGrid(){
    document.getElementById('gridContainer').style.setProperty(`grid-template-columns`, `repeat(${sliderValue}, 1fr)`);
    document.getElementById('gridContainer').style.setProperty(`grid-template-rows`, `repeat(${sliderValue}, 1fr)`);
}

//reset button
const resetbtn = document.querySelector('#reset');
resetbtn.addEventListener('click', function(){
    griditem = document.querySelectorAll('.griditem');
    griditem.forEach(item => {
        item.classList.remove('permMouseOver', 'mouseOverBlack', 'mouseOverEraser');
    });
});

//default layout, on page refresh
for(i=0; i<lastNumSquared; i++){
    displaySliderValue.textContent = sliderValue;
    makeGrid();
    let griditem = document.createElement(`div`);
    griditem.classList.add('griditem');
    gridItemArray.push(griditem);
    gridContainer.appendChild(griditem);
    griditem.addEventListener('mouseover', function(x){
        griditem.classList.remove('permMouseOver', 'mouseOverBlack', 'mouseOverEraser');
        griditem.classList.add(userColorChoice);
        // griditem.classList.add(mouseOverRainbow(griditem));
        // x.target.style.background = "yellow";
    });
};

//!to change from meteor to scaled just change onchange to oninput
//? slider.oninput
//? vs
//? slider.onchange

// the actual logic for the entire slider.
slider.onchange = function(){
    sliderValue = parseInt(this.value);
    displaySliderValue.textContent = sliderValue;
    makeGrid();
    
    griditem = document.querySelectorAll('.griditem');
    griditem.forEach(item => {
        item.classList.remove('permMouseOver', 'mouseOverBlack');
    });
    
    if(lastNum < sliderValue){
        gridItemArray = [];
        let lastNumSquared = lastNum * lastNum;
        let newNumSquared = sliderValue * sliderValue;
        
        for(let i = lastNumSquared; i<newNumSquared; i++){
            let griditem = document.createElement('div');
            griditem.classList.add('griditem');
            gridItemArray.push(griditem);
            gridContainer.appendChild(griditem);
            griditem.addEventListener('mouseover', function(){
                griditem.classList.remove('permMouseOver', 'mouseOverBlack', 'mouseOverEraser');
                griditem.classList.add(userColorChoice);
            });
        };
        
    }
    if(lastNum > sliderValue) {
        gridItemArray = [];
        let lastNumSquared = lastNum * lastNum;
        let newNumSquared = sliderValue * sliderValue;
        
        for(let i = lastNumSquared; i>newNumSquared; i--){
            let griditem = document.querySelector('div');
            gridItemArray.pop(griditem);
            gridContainer.removeChild(griditem);
            griditem.addEventListener('mouseover', function(){
                griditem.classList.remove('permMouseOver', 'mouseOverBlack', 'mouseOverEraser');
                griditem.classList.add(userColorChoice);
            });
        };
        }
        
    lastNum = sliderValue;
    return sliderValue;
};

displaySliderValue.textContent = sliderValue;