function addToCart(itemOrButton) {
  let imageUrl = '';

  if (typeof itemOrButton === 'string') {
      imageUrl = itemOrButton;
  } else if (itemOrButton.getAttribute) {
      imageUrl = itemOrButton.getAttribute('data-image-url');
  }

  if (!imageUrl || imageUrl.trim() === '') {
      console.error('Invalid item or button');
      return;
  }

  fetch('/addToCart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item: imageUrl }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log('Item added to cart successfully.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
