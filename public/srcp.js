const imageInput = document.getElementById('imageInput');
const imagePreviews = document.querySelectorAll('.image-preview');
const price=document.getElementById('price');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreviews.forEach((preview) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
            });
        };
        reader.readAsDataURL(file);
    } else {
        imagePreviews.forEach((preview) => {
            preview.src = '#';
            preview.style.display = 'none';
        });
    }
});
 
document.getElementById('openPopupButton').addEventListener('click', function() {
    // Open "page2.html" in a popup window
    window.open('/buy-now', 'PopupWindow', 'width=400,height=400');
});

// Function to toggle the 'active' class on button click
function toggleActive(button) {
    const buttons = document.querySelectorAll('.button1');
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
}

// Add an event listener to each button
const buttons = document.querySelectorAll('.button1');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        toggleActive(button);
        const amount = parseInt(button.getAttribute('data-amount'));
        displayAmount(amount);
    });
});

let gMouseDownX = 0;
let gMouseDownY = 0;
let gMouseDownOffsetX = 0;
let gMouseDownOffsetY = 0;

function addListeners() {
document.getElementById('cursorImage').addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
gMouseDownX = e.clientX;
gMouseDownY = e.clientY;

var div = document.getElementById('cursorImage');

//The following block gets the X offset (the difference between where it starts and where it was clicked)
let leftPart = "";
if(!div.style.left)
leftPart+="0px";    //In case this was not defined as 0px explicitly.
else
leftPart = div.style.left;
let leftPos = leftPart.indexOf("px");
let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString,10);

//The following block gets the Y offset (the difference between where it starts and where it was clicked)
let topPart = "";
if(!div.style.top)
topPart+="0px";     //In case this was not defined as 0px explicitly.
else
topPart = div.style.top;
let topPos = topPart.indexOf("px");
let topNumString = topPart.slice(0, topPos);    // Get the Y value of the object.
gMouseDownOffsetY = gMouseDownY - parseInt(topNumString,10);

window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
var div = document.getElementById('cursorImage');
div.style.position = 'absolute';
let topAmount = e.clientY - gMouseDownOffsetY;
div.style.top = topAmount + 'px';
let leftAmount = e.clientX - gMouseDownOffsetX;
div.style.left = leftAmount + 'px';
}

addListeners();
