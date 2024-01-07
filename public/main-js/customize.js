

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

   // Use window.sessionStorage to access the session variable in the browser
   const selectedImage = window.sessionStorage.selectedImage || "/gallery/gal2/image1.png";
   document.getElementById('selectedImage').src = selectedImage;

   // Function to handle adding an image to the cart
   function addToCart(imageUrl) {
       fetch('/addToCart', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ imageUrl }),
       })
       .then(response => response.json())
       .then(data => {
           console.log(data);
       })
       .catch(error => {
           console.error('Error:', error);
       });
   }

   // Assuming there's only one element with the class 'button--1'
   const addToCartBtn = document.querySelector('.button--1');

   // Assuming there's only one element with the class 'imgs12'
   const imgElement = document.querySelector('.imgs12');

   addToCartBtn.addEventListener('click', () => addToCart(imgElement.src));
