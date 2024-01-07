function createProductElement(item) {
    // Create a div with class "ac1"
    const ac1Element = document.createElement("div");
    ac1Element.className = "ac1";

    // Create an anchor (a) element with href
    const anchor = document.createElement('a');

// Check if item.gallery_url already has a leading slash
if (item.gallery_url.startsWith('/')) {
anchor.href = `/customize-view${item.gallery_url}`;
} else {
anchor.href = `/customize-view/${item.gallery_url}`;
}

ac1Element.appendChild(anchor);


    // Create an image (img) element with src and alt
    const imgElement = document.createElement("img");
    imgElement.src = item.gallery_url;
    imgElement.alt = "No img";
    imgElement.className = "pt1";
    anchor.appendChild(imgElement);

    const h3Element = document.createElement("h3");
    h3Element.textContent = "Image";

    // Create a button element with text content
    const buttonElement = document.createElement("button");
    buttonElement.type = "submit";
    buttonElement.className = "bn1";
    buttonElement.textContent = `Buy Now: $599`;

    // Append the h3 and button elements to the div element
    ac1Element.appendChild(h3Element);
    ac1Element.appendChild(buttonElement);

    return ac1Element;
  }

  function addProductsToContainer(container, items) {
    // Loop through the items and create elements dynamically
    items.forEach(item => {
      const productElement = createProductElement(item);
      container.appendChild(productElement);
    });
  }

  // Reference to the container where the dynamic content will be appended
  const acContainer = document.getElementById("acContainer");

  // Fetch gallery items from the server
  fetch('/sub-gallery-img-getter')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Call the function to add products to the container
      addProductsToContainer(acContainer, data);
    })
    .catch(error => {
      console.error('Error fetching gallery items:', error);
    });