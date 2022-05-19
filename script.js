const canvas = document.querySelector('.canvas-container');
const canvas_resolution_buttons = document.querySelectorAll('.canvas-radio');
const pixel_color_picker = document.querySelector('#pixel-color-picker');
const background_color_picker = document.querySelector('#background-color-picker');

pixel_color_picker.value = '#000000';
background_color_picker.value = '#FFFFFF';

let canvas_size = canvas.clientWidth;   // Same for height, canvas will always be square

let resolution = 16;    // Defualt canvas resolution
let pixel_color = pixel_color_picker.value; // Defualt pixel color
let background_color = background_color_picker.value; // Defualt background color

let is_drawing = false;
let pixels = null;

function generate_pixels() {
    let pixel_size = canvas_size / resolution;

    let first = canvas.firstElementChild;
    while(first) {
        first.remove();
        first = canvas.firstElementChild;
    }

    for (let i = 0; i < resolution*resolution; i++) {
        const new_pixel = document.createElement('div');
        new_pixel.className = 'pixel';
        canvas.appendChild(new_pixel);
    }

    pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.setAttribute('style', 'background-color: ' + background_color + '; width: ' + pixel_size + 'px; height: ' + pixel_size + 'px;');
        pixel.addEventListener('mousedown', () => {
            is_drawing = true;
            pixel.style.backgroundColor = pixel_color;
        });
        pixel.addEventListener('mouseup', () => {
            is_drawing = false;
        });
        pixel.addEventListener('mouseover', () => {
            if(is_drawing)
                pixel.style.backgroundColor = pixel_color;
        });
    });
}

canvas_resolution_buttons.forEach(button => {
    button.addEventListener('click', () => {
        resolution = parseInt(button.id);
        console.log(resolution);
        generate_pixels();
    });
})

pixel_color_picker.addEventListener('change', () => {
    pixel_color = pixel_color_picker.value;
});

background_color_picker.addEventListener('change', () => {
    background_color = background_color_picker.value;
    generate_pixels();
})

generate_pixels();