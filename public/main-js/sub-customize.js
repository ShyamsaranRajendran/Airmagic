let str;
  
const s=document.getElementById('amount');
function displayAmount(amount) {
            event.preventDefault();

            str=amount.split('x')
            document.getElementById('price').textContent="preferred size: "+amount;
}
function toggleActive(button) {
if (button.classList.contains("active-button")) {
    button.classList.remove("active-button");
} else {
    button.classList.add("active-button");
}
}
function openPopup() {
        // Show the overlay and popup
        event.preventDefault();
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup').style.display = 'block';
    }

    function closePopup() {
        // Hide the overlay and popup
        event.preventDefault();
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }

function changeheight(a) {
            event.preventDefault();
const gridContainer = document.getElementById("grid");


if (a==="square") {

gridContainer.style.height = "520px"; // Set the new height
s.textContent="Amount: $"+parseInt(str[0])*20;
} else {
gridContainer.style.height = "350px"; // Set a different height
    s.textContent="Amount: $"+parseInt(str[0])*30;
}
}


var zoomFactor = 1.0; // Initial zoom factor

function zoomIn() {
            event.preventDefault();
zoomFactor += 0.1; // Increase zoom factor
updateZoom();
}

function zoomOut() {
            event.preventDefault();
if (zoomFactor > 1.0) {
    zoomFactor -= 0.1; // Decrease zoom factor, but don't go below 1.0
    updateZoom();
}
}

function updateZoom() {
            event.preventDefault();
var zoomedImage = document.getElementById("cursorImage");
zoomedImage.style.transform = "scale(" + zoomFactor + ")";
}

//script for add to cart button

document.getElementById("openModalButton").addEventListener("click", function() {
document.getElementById("modal").style.display = "block";
});

// Close the modal
document.getElementById("closeModal").addEventListener("click", function() {
document.getElementById("modal").style.display = "none";
});

// Close the modal if the user clicks outside the modal
window.addEventListener("click", function(event) {
            event.preventDefault();
if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
}
});



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
