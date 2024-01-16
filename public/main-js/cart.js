var num=0;
function createProductElements_1(imageNames) {
         // Container to hold all product elements
         const container = document.createElement('div');

         imageNames.forEach(imageName => {
            num=num+1;
             const productContainer = document.createElement('div');
             productContainer.classList.add('s');
            
             // Create product display section
             const productDisplay = document.createElement('div');
             productDisplay.classList.add('sp');


       const productImageContainer = document.createElement('div');
       productImageContainer.classList.add('sp1');
       const productImage = document.createElement('img');
       productImage.src = `${imageName.img_url}`;
       productImage.alt = 'product';
       productImage.classList.add('pic1');
       productImageContainer.appendChild(productImage);

       const productDetails = document.createElement('div');
       productDetails.classList.add('sp2');
       const productName = document.createElement('h2');
       productName.style.fontFamily = 'Oswald';
       productName.textContent = 'Custom Acrylic Photo Frame';

       const productDescription = document.createElement('p');
       productDescription.textContent = 'Acrylic Photo Frames';

       const productPrice = document.createElement('h2');
       productPrice.textContent = '₹599 Only';

       const acrylicThickness = document.createElement('p');
       acrylicThickness.textContent = 'Acrylic Thickness: 3 MM';

       const acrylicSize = document.createElement('p');
       acrylicSize.textContent = 'Landscape Acrylic Size: 12x8';

       const removeButton = document.createElement('button');
             removeButton.classList.add('bbtn1');
             removeButton.type = 'submit';
             removeButton.textContent = 'Remove Product';
             removeButton.addEventListener('click', (event) => {
                 handleRemove(imageName.img_url);
                 console.log('Remove clicked for image:', imageName.img_url);
                 window.location.reload();
                 event.stopPropagation();
             });
       productDetails.appendChild(productName);
       productDetails.appendChild(productDescription);
       productDetails.appendChild(productPrice);
       productDetails.appendChild(acrylicThickness);
       productDetails.appendChild(acrylicSize);
       productDetails.appendChild(removeButton);

       productDisplay.appendChild(productImageContainer);
       productDisplay.appendChild(productDetails);

       // Create order summary section
       const orderSummary = document.createElement('div');
       orderSummary.classList.add('s1');

       const orderSummaryTitle = document.createElement('h1');
       orderSummaryTitle.style.color = '#1DAAA1';
       orderSummaryTitle.textContent = 'ORDER SUMMARY';

       const hr1 = document.createElement('hr');
       hr1.style.backgroundColor = 'rgb(163, 163, 163)';
       hr1.style.justifyContent = 'center';
       hr1.style.textAlign = 'center';
       hr1.style.width = '100%';
       hr1.style.height = '2px';

       const subTotal = document.createElement('p');
       subTotal.textContent = 'Sub-Total  :  ₹599';

       const shippingCharges = document.createElement('p');
       shippingCharges.textContent = 'Shipping Charges  :  Free';

       const hr2 = document.createElement('hr');
       hr2.style.backgroundColor = 'rgb(163, 163, 163)';
       hr2.style.justifyContent = 'center';
       hr2.style.textAlign = 'center';
       hr2.style.width = '100%';
       hr2.style.height = '2px';

       const total = document.createElement('h2');
       total.textContent = `Total : ₹${num*599} Only`;

       const proceedToBuyButton = document.createElement('button');
             proceedToBuyButton.classList.add('bbtn12');
             proceedToBuyButton.type = 'submit';
             proceedToBuyButton.textContent = 'Proceed to buy (1 Item)';
             proceedToBuyButton.addEventListener('click', (event) => {
                 handleBuyNow(imageName.img_url);
                 console.log('Buy Now clicked for image:', imageName.img_url);
                 event.stopPropagation();
             });
       orderSummary.appendChild(orderSummaryTitle);
       orderSummary.appendChild(hr1);
       orderSummary.appendChild(subTotal);
       orderSummary.appendChild(shippingCharges);
       orderSummary.appendChild(hr2);
       orderSummary.appendChild(total);
       orderSummary.appendChild(proceedToBuyButton);

       // Append product display and order summary to the product container
   
       productContainer.appendChild(productDisplay);
             productContainer.appendChild(orderSummary);

       // Append the product container to the main container
       container.appendChild(productContainer);
   });

   return container;
}

function fetchImageNames() {
 fetch('/getImages')
     .then(response => {
         if (!response.ok) {
             throw new Error(`Network response was not ok, Status: ${response.status}`);
         }
         return response.json();
     })
     .then(imageNames => {
         const cartElement = document.querySelector('.cart');
         cartElement.innerHTML = '';
         console.log('Fetched image URLs:', imageNames);
         
         // Create product elements and append them to the body
         const productElements = createProductElements_1(imageNames);
         cartElement.appendChild(productElements);
         updateTotalCost();
     })
     .catch(error => {
         console.error('Fetch error:', error);
     });
}

function handleBuyNow(imageUrl) {
   fetch('/buy-now-item', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ imageUrl }),
   })
       .then(response => {
           if (!response.ok) {
               throw new Error(`Network response was not ok, Status: ${response.status}`);
           }
           return response.json();
       })
       .then(data => {
           console.log('Buy Now success:', data);
           // Optionally, you can perform additional actions after a successful buy
       })
       .catch(error => {
           console.error('Buy Now error:', error);
       });
}

function handleRemove(imageUrl) {
   fetch('/remove-item', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ imageUrl }),
   })
       .then(response => {
           if (!response.ok) {
               throw new Error(`Network response was not ok, Status: ${response.status}`);
           }

           return response.json();
       })
       .then(data => {
           console.log('Buy Now success:', data);
           // Optionally, you can perform additional actions after a successful buy
       })
       .catch(error => {
           console.error('Buy Now error:', error);
       });
}

function updateTotalCost() {
    
}




// Call the function to fetch and display images
fetchImageNames();