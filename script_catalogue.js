

fetch('all_products.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
              appendData(data)
            })
             
            .catch(function (err) {
                console.log('error: ' + err);
            });

function appendData(data) {
       var productsContainer = document.getElementById('products-list');
        for (var i = 0; i < data.length; i++) {                  
          productsContainer.appendChild(createProductElement(data[i]));
          } 
       }

       

  function createProductElement(product) {
    const productElement = document.createElement('div');
      productElement.classList.add('element');
      productElement.innerHTML = `

      <div class='element_img'>
              <img src="${product.element_img}" />
            </div>
            <div class="element_img">
              <img src="${product.element_img1}" />
            </div>
            <div class='info'>
         
            <div class="name">${product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</div>
             <div class='info1'>
                <div class="color">${product.color}</div>
                <div class="year">${product.price}$</div>
              </div>
            </div>
            <button class="buy" onclick="window.open('/payment_form.html','_self');">Buy Now</button>
      `;

    return productElement;
  }


  

