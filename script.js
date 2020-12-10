const DISPLAY = document.querySelector("#display");
const DISPLAY_WIDTH = 480;

let pixelWidth = 16;
generateGrid();

const PIXEL_CONTROL = document.querySelector("#control-pixel");

PIXEL_CONTROL.addEventListener("change", e => {
    if (PIXEL_CONTROL.value >= 10 && PIXEL_CONTROL.value <= 100)
    {
        pixelWidth = PIXEL_CONTROL.value;
        generateGrid();
    }
});

function generateGrid(){
    //Remove old grid
    DISPLAY.innerHTML = "";
    //Generate new grid
    for(let i = 0; i < pixelWidth; i++){
        for (let j = 0; j < pixelWidth; j++){
            const PIXEL = document.createElement("div");
            PIXEL.classList.add('pixel');
            PIXEL.style.width = `${DISPLAY_WIDTH/pixelWidth}px`;
            PIXEL.style.height = `${DISPLAY_WIDTH/pixelWidth}px`;
            DISPLAY.appendChild(PIXEL);
        }
    }

    //Make coloring work
    coloring();
}

// CONTROLS
let selectedControl = 0; // 0 Pen - 1 Color pencil - 2 Rainbow

const PEN_CONTROL = document.querySelector("#control-pen");
const PENCIL_CONTROL = document.querySelector("#control-color");
const RAINBOW_CONTROL = document.querySelector("#control-rainbow");
const CLEAR_CONTROL = document.querySelector("#control-clear");

PEN_CONTROL.addEventListener("click", selectControl);
PENCIL_CONTROL.addEventListener("click", selectControl);
RAINBOW_CONTROL.addEventListener("click", selectControl);
CLEAR_CONTROL.addEventListener("click", generateGrid);

function selectControl(){
    //Toggle selectability
    if (Array.from(this.classList).includes('selectable'))
    {
        deselectOthers();
        this.classList.add('selected');
        this.classList.remove('selectable');
    }

    //Update control variable
    switch(this.id){
        case 'control-pen':
            selectedControl = 0;
            break;
        case 'control-color':
            selectedControl = 1;
            break;
        case 'control-rainbow':
            selectedControl = 2;
            break;
    }
}

function deselectOthers(){
    const CONTROLS = [PEN_CONTROL, PENCIL_CONTROL, RAINBOW_CONTROL];

    CONTROLS.forEach(control => {
        control.classList.remove('selected');
        control.classList.add('selectable');
    })
}

// COLOR PICKER
let pencilColor = "#F3B54A";
const COLOR_PICKER = document.querySelector("#color-picker");
//Color pencil icon
PENCIL_CONTROL.style.color = pencilColor;
//Make default color picker the primary color
COLOR_PICKER.value = pencilColor;

//Open color picker on click
PENCIL_CONTROL.addEventListener("click", e => {
    COLOR_PICKER.focus();
    COLOR_PICKER.click();
})

//While changing color, update the color picked
COLOR_PICKER.addEventListener("input", e => {
    pencilColor = COLOR_PICKER.value;
    //Update pencil icon color;
    PENCIL_CONTROL.style.color = COLOR_PICKER.value;
})

// COLORING
function coloring(){
    const PIXELS = document.querySelectorAll('.pixel');

    PIXELS.forEach(pixel => {
        let pixelOpacity = 0;
        pixel.addEventListener("mouseover", e => {
            switch(selectedControl){
                //Pen
                case 0:
                    pixelOpacity += 0.20;
                    pixel.style.backgroundColor = "black";
                    pixel.style.opacity = `${pixelOpacity}`;
                    break;
                //Color
                case 1:
                    pixel.style.backgroundColor = pencilColor;
                    pixel.style.opacity = '1';
                    break;
                //Rainbow
                case 2:
                    let rainbowColors = ['#262949', '#045459', '#087353', '#15C286', '#ABD96D', '#FBBF54', '#EE6B3B', '#EC0F47', '#A02C5D', '#700460', '#022C7A'];
                    let randomIndex = Math.floor(Math.random() * rainbowColors.length); 

                    pixel.style.backgroundColor = rainbowColors[randomIndex];
                    pixel.style.opacity = `${Math.random() + 0.2}`;
                    break;
            }
        })
    })
}