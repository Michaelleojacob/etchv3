let slider = document.querySelector('#slider');
let displaySliderValue = document.querySelector('.displaySliderValue');
let sliderValue = 16;
let gridContainer = document.querySelector('.gridContainer');
let gridItemArray = [];
let lastNum = 16;
let lastNumSquared = lastNum * lastNum;
let userColorChoice;

const copyThis = document.getElementById('copyemail');
copyThis.addEventListener('click', () => {
  copyThis.select();
  copyThis.setSelectionRange(0, 99999);
  document.execCommand('copy');
})

//sets default color
function defaultColor(x){
    userColorChoice = 'purple';
    return userColorChoice;
};

defaultColor();

//black button
const blkbtn = document.querySelector('#black');
blkbtn.addEventListener('click', function(e){
    griditem = document.querySelectorAll('.griditem');
    userColorChoice = 'black';
    return userColorChoice;
    
});

//purple button
const purple = document.querySelector('#purple');
purple.addEventListener('click', function(e){
    userColorChoice = 'purple';
    return userColorChoice;
});

//eraser button
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', function(x){
    userColorChoice = 'gray';
    return userColorChoice;
});

const random = document.querySelector('#random');
random.addEventListener('click', function(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    userColorChoice = `#${randomColor}`
    return userColorChoice;
});

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', function(){
    userColorChoice = rainbow;
    return userColorChoice;
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
        item.style.background = '';
    });
});

function resetGrid(){
    griditem = document.querySelectorAll('.griditem');
    griditem.forEach(item => {
        item.style.background = '';
    });
};

//default layout, on page refresh
for(i=0; i<lastNumSquared; i++){
    displaySliderValue.textContent = sliderValue;
    makeGrid();
    let griditem = document.createElement(`div`);
    griditem.classList.add('griditem');
    gridItemArray.push(griditem);
    gridContainer.appendChild(griditem);
    griditem.addEventListener('mouseover', function(x){
        if(userColorChoice === rainbow){
            x.target.style.background = getRandomColor();
        }
        else{
            if(userColorChoice === rainbow){
            x.target.style.background = getRandomColor();
        }
        else{
            x.target.style.background = userColorChoice;
        };
        };
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
    resetGrid();
    
    griditem = document.querySelectorAll('.griditem');
    
    if(lastNum < sliderValue){
        gridItemArray = [];
        let lastNumSquared = lastNum * lastNum;
        let newNumSquared = sliderValue * sliderValue;
        
        for(let i = lastNumSquared; i<newNumSquared; i++){
            let griditem = document.createElement('div');
            griditem.classList.add('griditem');
            gridItemArray.push(griditem);
            gridContainer.appendChild(griditem);
            griditem.addEventListener('mouseover', function(x){
                if(userColorChoice === rainbow){
            x.target.style.background = getRandomColor();
        }
        else{
            x.target.style.background = userColorChoice;
        };
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
            griditem.addEventListener('mouseover', function(x){
                if(userColorChoice === rainbow){
            x.target.style.background = getRandomColor();
        }
        else{
            x.target.style.background = userColorChoice;
        };
            });
        };
        }
        
    lastNum = sliderValue;
    return sliderValue;
};

displaySliderValue.textContent = sliderValue;