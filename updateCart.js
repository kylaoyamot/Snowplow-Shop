// cart.js

$(document).ready(function () {
    // Check if a shopping cart already exists in local storage
    var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Function to update the cart items in the HTML
    function updateCart() {
        var cartItemsContainer = $('#cart-items');
        cartItemsContainer.empty(); // Clear previous content

        if (shoppingCart.length === 0) {
            cartItemsContainer.append('<p>Your shopping cart is empty.</p>');
        } else {
            // Loop through each item in the shopping cart
            shoppingCart.forEach(function (item, index) {
                // Create HTML elements for each item
                var itemElement = $('<div class="cart-item">' +
                    '<img src="' + item.image + '" alt="Product Image">' +
                    '<p><strong>Name:</strong> ' + item.name + '</p>' +
                    '<p><strong>Price:</strong> ' + item.price + '</p>' +
                    '<button class="remove-item" data-index="' + index + '">Remove</button>' +
                    '</div>');

                // Append the item to the cart items container
                cartItemsContainer.append(itemElement);
            });
        }
    }

    // Initial update of the cart
    updateCart();

    // Event listener for removing items from the cart
    $(document).on('click', '.remove-item', function () {
        var itemIndex = $(this).data('index');

        // Remove the item at the specified index from the shopping cart array
        shoppingCart.splice(itemIndex, 1);

        // Save the updated shopping cart in local storage
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

        // Update the cart in the HTML
        updateCart();
    });
});
