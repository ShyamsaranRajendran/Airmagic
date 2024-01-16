

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
       const button = document.querySelector('.btn13');
      button.classList.toggle('clicked');
   }

   // Assuming there's only one element with the class 'button--1'
   const addToCartBtn = document.querySelector('.button--1');

   // Assuming there's only one element with the class 'imgs12'
   const imgElement = document.querySelector('.imgs12');

   addToCartBtn.addEventListener('click', () => addToCart(imgElement.src));
