$(document).ready(function () {
    // Check if a shopping cart already exists in local storage
    var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Add a click event listener to all elements with the class 'product-add-to-cart'
    $('.product-add-to-cart').on('click', function (event) {
        // Prevent the default behavior of the button
        event.preventDefault();

        // Get the closest parent element with the class 'product-section'
        var productSection = $(this).closest('.product-section');

        // Get relevant information from the clicked product
        var productName = productSection.find('.product-name a').text();
        var productPrice = productSection.find('.product-discounted-price').text();
        var productImage = productSection.find('.product-img').attr('src');

        // Create an object to store product information
        var product = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        // Ask the user to confirm before adding the product
        var addToCart = confirm("Do you want to add '" + productName + "' to your shopping cart?");

        if (addToCart) {
            // Add the product to the shopping cart array
            shoppingCart.push(product);

            // Save the updated shopping cart in local storage
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

            // You can also update the UI, display a confirmation message, or perform any other actions here
            updateCart(); // Call a function to update the cart count in the navigation bar
        }
    });

    // Function to update the cart items and count in the HTML
    function updateCart() {
        var cartCountContainer = $('.cart-sect a').last(); // Select the last anchor tag inside the cart-sect

        // Update the cart count
        var cartCount = shoppingCart.length;
        cartCountContainer.text('Cart (' + cartCount + ')');
    }

    // Initial update of the cart
    updateCart();
});
