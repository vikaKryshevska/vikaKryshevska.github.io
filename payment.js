// ---------------------- PRODUCT INFO ----------------------

function getProductDetails(productId) {
    return fetch('all_products.json')
        .then(response => response.json())
        .then(products => {
            const parsedProductId = parseInt(productId, 10);
            const product = products.find(item => item.id === parsedProductId);

            if (product) {
                const productIdField = document.getElementById('product-id');
                const productCostField = document.getElementById('product-cost');

                productIdField.value = product.id;
                productCostField.value = product.price;
            } else {
                alert(`Product not found! ${parsedProductId}`);
            }
        })
        .catch(error => console.error(error));
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

getProductDetails(id);



// ---------------------- CHECBOX DELIVERY METHOD ----------------------



const fedexCheckbox = document.getElementById('FedEx');
const dhlCheckbox = document.getElementById('DHL');

fedexCheckbox.addEventListener('change', function () {
    if (fedexCheckbox.checked) {
        dhlCheckbox.checked = false;
    }
});

dhlCheckbox.addEventListener('change', function () {
    if (dhlCheckbox.checked) {
        fedexCheckbox.checked = false;
    }
});


// ---------------------- SUBMIT BUTTON ----------------------



const submitButton = document.getElementById('submit-order');
const privacyCheckbox = document.getElementById('privacy');

submitButton.addEventListener('click', function(event) {
  if (!privacyCheckbox.checked) {
    event.preventDefault(); // Зупиняє відправку форми
    alert("You haven't agreed with our privacy policy! Check it and repeat submit.");
  } else {
    alert("Thank you for your order. Our manager will contact you soon!");
    window.open("index.html");  /// Відкриває сторінку "about.html"
    window.close(); // Закриває поточну сторінку
  }
});
