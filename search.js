$(document).ready(function () {
    // Function to filter product-section items based on search input
    function filterProducts(searchTerm) {
      // Convert search term to lowercase for case-insensitive matching
      var searchQuery = searchTerm.toLowerCase();

      // Loop through each product-section and hide/show based on the search query
      $('.product-section').each(function () {
        var productName = $(this).find('.product-name a').text().toLowerCase();

        // If the product name contains the search query, show the product
        if (productName.includes(searchQuery)) {
          $(this).show();
        } else {
          // Otherwise, hide the product
          $(this).hide();
        }
      });
    }

    // Set up autocomplete on the search input
    $('.search-textbox').autocomplete({
      source: function (request, response) {
        // Extract product names from product-section items
        var productNames = $('.product-section .product-name a').map(function () {
          return $(this).text();
        }).get();

        // Filter product names based on the user's input
        var filteredNames = $.ui.autocomplete.filter(productNames, request.term);

        // Provide the filtered names to the autocomplete widget
        response(filteredNames);
      },
      minLength: 1, // Minimum length before triggering autocomplete
      select: function (event, ui) {
        // When a suggestion is selected, update the search input
        $('.search-textbox').val(ui.item.value);

        // Call the filterProducts function with the selected search term
        filterProducts(ui.item.value);

        return false;
      }
    });

    // Event handler for the clear button
    $('.clear-button').on('click', function () {
      // Clear the search input
      $('.search-textbox').val('');

      // Reset the product-section visibility
      $('.product-section').show();
    });
  });
