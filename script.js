const DISPLAY = document.querySelector("#display");

let pixelWidth = 16;


for(let i = 0; i < pixelWidth; i++){
    for (let j = 0; j < pixelWidth; j++){
        const PIXEL = document.createElement("div");
        PIXEL.classList.add('pixel');
        DISPLAY.appendChild(PIXEL);
    }
}


const PEN_CONTROL = document.querySelector("#control-pen");

const PENCIL_CONTROL = document.querySelector("#control-pencil");

const RAINBOW_CONTROL = document.querySelector("#control-rainbow");

const CLEAR_CONTROL = document.querySelector("#control-clear");