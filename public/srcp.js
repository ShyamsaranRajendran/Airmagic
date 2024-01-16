const imageInput = document.getElementById('imageInput');
const imagePreviews = document.querySelectorAll('.image-preview');

imageInput.addEventListener('change', function () {
  const files = imageInput.files;

  for (let i = 0; i < imagePreviews.length; i++) {
    const file = files[i];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreviews[i].src = e.target.result;
        imagePreviews[i].style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      imagePreviews[i].src = '#';
      imagePreviews[i].style.display = 'none';
    }
  }
});

$(document).ready(function () {
           
    $(".btn12").click(function () {
        updateSelectedSize($(this).text());
    });
    $(".btn14").click(function () {
        updateSelectedShape($(this).text());
    });
    function updateSelectedSize(selectedSize) {
        $(".btn12").removeClass("active");
        $(`.btn12:contains(${selectedSize})`).addClass("active");
        $(".selected-size").text("Selected size : " + selectedSize + " Inch");
        $(".imgs12").attr("src", imageArray[selectedSize]);
    }
    function updateSelectedShape(selectedShape) {
        $(".btn14").removeClass("active");
        $(`.btn14:contains(${selectedShape})`).addClass("active");
        $(".selected-shape").text("Selected shape : " + selectedShape);
    }
});
let str1;
function uploadImage() {
const inputElement = document.getElementById('imageInput');
const file = inputElement.files[0];

if (!file) {
alert('Please select an image to upload.');
return;
}

const formData = new FormData();
formData.append('image', file);

fetch('http://localhost:4000/upload', {
method: 'POST',
body: formData
})
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log(data);



// Add the image to the cart
str1=data.imagePath;
// addToCart(data.imagePath);

alert('Image uploaded successfully! Image path: ' + data.imagePath);
})
.catch(error => {
console.error('Error uploading image:', error);
alert('Error uploading image. Please try again.');
});
}

function addToCart(imageUrl) {
fetch('http://localhost:4000/addToCart', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ imageUrl }),
})
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(result => {
console.log(result.message);
})
.catch(error => {
console.error('Error adding to cart:', error);
alert('Error adding to cart. Please try again.');
});
const button = document.querySelector('.btn13');
button.classList.toggle('clicked');
}

function changeShape(shape) {
    const container = document.getElementById('container');
    const image = document.querySelector('.image');

    switch (shape) {
        case 'square':
            container.style.width = '100px';
            container.style.height = '100px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        case 'rectangle-horizontal':
            container.style.width = '200px';
            container.style.height = '100px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        case 'rectangle-vertical':
            container.style.width = '100px';
            container.style.height = '200px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        case 'square-2':
            container.style.width = '150px';
            container.style.height = '150px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        case 'rectangle-horizontal-2':
            container.style.width = '300px';
            container.style.height = '150px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        case 'rectangle-vertical-2':
            container.style.width = '150px';
            container.style.height = '300px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
        default:
            // Default shape (you can customize this based on your needs)
            container.style.width = '500px';
            container.style.height = '300px';
            image.style.width = '100%';
            image.style.height = '100%';
            break;
    }
}