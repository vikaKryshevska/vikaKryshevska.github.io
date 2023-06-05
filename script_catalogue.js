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
  addBuyNowEventListeners();
}

var widthname =15;
if(window.innerWidth<800){
  widthname = 34;
}

function createProductElement(product) {
  const productElement = document.createElement('div');

  productElement.classList.add('element');
  productElement.setAttribute('data-id', product.id);
  productElement.innerHTML = `

      <div class='element_img' >
              <img class="imgE1" src="${product.element_img}" alt="${product.name} title="${product.name}"/>
            </div>
            <div class="element_img">
              <img class="imgE2" src="${product.element_img1}" alt="${product.name}  title="${product.name}"/>
            </div>
            <div class='info'>
         
            <div class="name" title = ${product.name.replaceAll(' ', '_')}>${product.name.length > widthname ? product.name.substring(0, widthname) + '...' : product.name}</div>
             <div class='info1'>
                <div class="color">${product.color}</div>
                <div class="year">${product.price}$</div>
              </div>
            </div>
            <button class="buy" id="${product.id}">Buy Now</button>
      `;

  return productElement;
}


// Отримуємо посилання на елементи DOM
const searchButton = document.getElementById('search-name-button');
const searchInput = document.querySelector('.searchTerm');

searchInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Забороняємо стандартну дію Enter (наприклад, відправку форми)
    searchProducts();
  }
});

searchButton.addEventListener('click', searchProducts);




// Додаємо обробник події кліку на кнопку пошуку
searchButton.addEventListener('click', searchProducts);

function searchProducts() {
  const searchTerm = document.querySelector('.searchTerm').value.toLowerCase();
  const productsContainer = document.getElementById('products-list');

  fetch('all_products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productColor = product.color.toLowerCase();

        return (
          productName.includes(searchTerm) ||
          productColor.includes(searchTerm)
        );
      });

      filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('element');

        productElement.setAttribute('data-id', product.id);
        productElement.innerHTML = `
            <div class='element_img'>
            <img class="imgE1" src="${product.element_img}" />
          </div>
          <div class="element_img">
            <img  class="imgE2" src="${product.element_img1}" />
          </div>
          <div class='info'>
      
          <div class="name" title = ${product.name.replaceAll(' ', '_')}>${product.name.length > widthname ? product.name.substring(0, widthname) + '...' : product.name}</div>
          <div class='info1'>
              <div class="color">${product.color}</div>
              <div class="year">${product.price}$</div>
            </div>
          </div>
          <button class="buy" id="${product.id}">Buy Now</button>
    `;

        productsContainer.appendChild(productElement);
      });
      addBuyNowEventListeners();
    })
    .catch(error => console.error(error));
}

// Отримуємо посилання на елементи DOM
const priceLowHighCheckbox = document.getElementById('low-high');
const priceHighLowCheckbox = document.getElementById('high-low');

// Додаємо обробники подій кліку на чекбокси
priceLowHighCheckbox.addEventListener('click', sortProductsByPriceLowHigh);
priceHighLowCheckbox.addEventListener('click', sortProductsByPriceHighLow);


function sortProductsByPriceLowHigh() {
  const productsContainer = document.getElementById('products-list');

  const productElements = Array.from(productsContainer.getElementsByClassName('element'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => a.price - b.price);

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });

  addBuyNowEventListeners();
}

function sortProductsByPriceHighLow() {
  const productsContainer = document.getElementById('products-list');

  const productElements = Array.from(productsContainer.getElementsByClassName('element'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => b.price - a.price);

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElemen(product);
    productsContainer.appendChild(productElement);
  });
  addBuyNowEventListeners();
}



function getProductData(productElement) {
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.querySelector('.name').textContent;
  const productCategory = productElement.querySelector('.color').textContent;
  const productPrice = parseFloat(productElement.querySelector('.year').textContent);
  const productPhoto1 = productElement.querySelector('.imgE1').getAttribute('src');
  const productPhoto2 = productElement.querySelector('.imgE2').getAttribute('src');
  return {
    id: productId,
    name: productName,
    color: productCategory,
    price: productPrice,
    element_img: productPhoto1,
    element_img1: productPhoto2
  };
}


// Функція створення елемента продукту
function createProductElemen(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('element');
  productElement.setAttribute('data-id', product.id);
  productElement.innerHTML = `
  <div class="element_img">
  <img class="imgE1" src="${product.element_img}" />
</div>
<div class="element_img">
  <img class="imgE2" src="${product.element_img1}" />
</div>
<div class='info'>

<div class="name" title = ${product.name}>${product.name.length > widthname ? product.name.substring(0, widthname) + '...' : product.name}</div>
<div class='info1'>
    <div class="color">${product.color}</div>
    <div class="year">${product.price}$</div>
  </div>
</div>
<button class="buy" id="${product.id}">Buy Now</button>
`;


  return productElement;
}



const lowHighCheckbox = document.getElementById('low-high');
const highLowCheckbox = document.getElementById('high-low');
const listElement = document.querySelector('.list_');

lowHighCheckbox.addEventListener('change', function () {
  if (lowHighCheckbox.checked) {
    highLowCheckbox.checked = false;
    zToACheckbox.checked = false;
    aToZCheckbox.checked = false;
    listElement.classList.add('low-high');
    listElement.classList.remove('high-low');
  } else {
    listElement.classList.remove('low-high');
  }
  addBuyNowEventListeners();
});

highLowCheckbox.addEventListener('change', function () {
  if (highLowCheckbox.checked) {
    lowHighCheckbox.checked = false;
    zToACheckbox.checked = false;
    aToZCheckbox.checked = false;
    listElement.classList.add('high-low');
    listElement.classList.remove('low-high');
  } else {
    listElement.classList.remove('high-low');
  }
  addBuyNowEventListeners();
});



/* -------------------------------------------------------------------------------------------------- */


const aToZCheckbox = document.getElementById('a-z');
const zToACheckbox = document.getElementById('z-a');

aToZCheckbox.addEventListener('change', function () {
  if (aToZCheckbox.checked) {
    zToACheckbox.checked = false;
    lowHighCheckbox.checked = false;
    highLowCheckbox.checked = false;
  }
  addBuyNowEventListeners();
});

zToACheckbox.addEventListener('change', function () {
  if (zToACheckbox.checked) {
    aToZCheckbox.checked = false;
    lowHighCheckbox.checked = false;
    highLowCheckbox.checked = false;
  }
  addBuyNowEventListeners();
});




// Додаємо обробники подій кліку на чекбокси
aToZCheckbox.addEventListener('click', sortProductsByNameAtoZ);
zToACheckbox.addEventListener('click', sortProductsByNameZtoA);

function sortProductsByNameAtoZ() {
  const productsContainer = document.getElementById('products-list');

  const productElements = Array.from(productsContainer.getElementsByClassName('element'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
  addBuyNowEventListeners();
}

function sortProductsByNameZtoA() {
  const productsContainer = document.getElementById('products-list');
  const productElements = Array.from(productsContainer.getElementsByClassName('element'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
  addBuyNowEventListeners();
}















// Отримуємо посилання на елементи DOM
const minPriceSlider = document.querySelector('.min-price');
const maxPriceSlider = document.querySelector('.max-price');
const minPriceInput = document.getElementById('Min');
const maxPriceInput = document.getElementById('Max');

// Додаємо обробники подій input до повзунків
minPriceSlider.addEventListener('input', updateMinPriceInput);
maxPriceSlider.addEventListener('input', updateMaxPriceInput);

// Функція оновлення значення текстового поля мінімальної ціни при зміні повзунка
function updateMinPriceInput() {
  minPriceInput.value = minPriceSlider.value + "$";
}

// Функція оновлення значення текстового поля максимальної ціни при зміні повзунка
function updateMaxPriceInput() {
  maxPriceInput.value = maxPriceSlider.value + "$";
}

// Додаємо обробники подій input до текстових полів
minPriceInput.addEventListener('input', updateMinPriceSlider);
maxPriceInput.addEventListener('input', updateMaxPriceSlider);

// Функція оновлення значення повзунка мінімальної ціни при зміні текстового поля
function updateMinPriceSlider() {
  const minPrice = parseInt(minPriceInput.value);
  if (!isNaN(minPrice)) {
    minPriceSlider.value = minPrice;
  }
}

// Функція оновлення значення повзунка максимальної ціни при зміні текстового поля
function updateMaxPriceSlider() {
  const maxPrice = parseInt(maxPriceInput.value);
  if (!isNaN(maxPrice)) {
    maxPriceSlider.value = maxPrice;
  }
}


/* -------------------------------------------------------------------------------------------------- */

const btn = document.getElementById("apply-filters-button");
btn.addEventListener('click', (event) => {
  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = ""; // Очистити контейнер перед виводом нових продуктів

  // Завантажуємо JSON-файл зі списком продуктів
  fetch('all_products.json')
    .then(response => response.json())
    .then(products => {
      searchProductsByPrice(products, productsContainer); // Викликаємо функцію для пошуку продуктів за ціною
    })
    .catch(error => console.error(error));
  addBuyNowEventListeners();
});


const btn2 = document.getElementById("apply-filters2-button");
btn2.addEventListener('click', (event) => {
  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = ""; // Очистити контейнер перед виводом нових продуктів

  // Завантажуємо JSON-файл зі списком продуктів
  fetch('all_products.json')
    .then(response => response.json())
    .then(products => {
      searchProductsByPrice(products, productsContainer); // Викликаємо функцію для пошуку продуктів за ціною
    })
    .catch(error => console.error(error));
});


function searchProductsByPrice(products, productsContainer) {
  const minPrice = parseInt(document.getElementById('Min').value);
  const maxPrice = parseInt(document.getElementById('Max').value);

  if (isNaN(minPrice) || isNaN(maxPrice) || minPrice.value === '' || maxPrice.value === '') {
    // Якщо введені значення не є числами
    minPrice = 100;
    maxPrice = 1000;
  }

  const select = document.getElementById('select-color');
  const searchTerm = select.value.toLowerCase();


  const filteredProducts = products.filter(product => {
    const productPrice = parseInt(product.price);
    const productColor = product.color.toLowerCase();
    const productName = product.name.toLowerCase();
    return productPrice >= minPrice && productPrice <= maxPrice && (productColor.includes(searchTerm) || productName.includes(searchTerm));
  });

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('element');
    productElement.setAttribute('data-id', product.id);
    productElement.innerHTML = `
    <div class="element_img">
    <img class="imgE1" src="${product.element_img}" />
  </div>
  <div class="element_img">
    <img class="imgE2" src="${product.element_img1}" />
  </div>
  <div class='info'>
  
  <div class="name" title = ${product.name.replaceAll(' ', '_')}>${product.name.length > widthname ? product.name.substring(0, widthname) + '...' : product.name}</div>
  <div class='info1'>
      <div class="color">${product.color}</div>
      <div class="year">${product.price}$</div>
    </div>
  </div>
  <button class="buy" id="${product.id}">Buy Now</button>
  `;


    // Додаємо HTML-блок до контейнера
    productsContainer.appendChild(productElement);
  });
  addBuyNowEventListeners();
}













var toggleSortButton = document.getElementById('toggle-sort-button');
var sort = document.getElementById('sort');
var filters = document.getElementById('filters');


function toggleSort() {
  if (window.innerWidth < 900) {
    filters.classList.toggle('open');
    sort.classList.toggle('open');

  } else {
    filters.style.display = 'block';
    sort.style.display = 'block';

  }
}


toggleSortButton.addEventListener('click', function () {
  toggleSort();
});


window.addEventListener('resize', function () {
  if (window.innerWidth >= 900) {
    filters.style.display = 'block';
    sort.style.display = 'block';
  }
});


var toggleFiltersButton = document.getElementById('toggle-filters-button');
var filters = document.getElementById('filters');
var filter = document.getElementById('filter');

function toggleFilters() {
  if (window.innerWidth < 800) {
    filters.classList.toggle('open');
    filter.classList.toggle('open');
  } else {
    filters.style.display = 'block';
    filter.style.display = 'block';
  }
}

toggleFiltersButton.addEventListener('click', function () {
  toggleFilters();
});

window.addEventListener('resize', function () {
  if (window.innerWidth >= 800) {
    filters.style.display = 'block';
    filter.style.display = 'block';
  }
});



function ResetAll() {

  // Очищаємо значення ціни
  document.getElementById('Min').value = '';
  document.getElementById('Max').value = '';
  document.getElementById('min-price').value = '100';
  document.getElementById('max-price').value = '1000';
  // Очищаємо контейнер з продуктами
  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = '';

  // Відновлюємо всі доступні товари
  fetch('all_products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('element');
        productElement.setAttribute('data-id', product.id);
        productElement.innerHTML = `
          <div class="element_img">
          <img class="imgE1" src="${product.element_img}" />
        </div>
        <div class="element_img">
          <img class="imgE2" src="${product.element_img1}" />
        </div>
        <div class='info'>
        
        <div class="name" title = ${product.name.replaceAll(' ', '_')}>${product.name.length > widthname ? product.name.substring(0, widthname) + '...' : product.name}</div>
        <div class='info1'>
            <div class="color">${product.color}</div>
            <div class="year">${product.price}$</div>
          </div>
        </div>
        <button class="buy" id="${product.id}">Buy Now</button>
        `;

        // Додаємо HTML-блок до контейнера
        productsContainer.appendChild(productElement);
      });

      addBuyNowEventListeners();
    })
    .catch(error => console.error(error));


}



const resetButtonS = document.getElementById("reset-filters2-button");
resetButtonS.addEventListener('click', (event) => {
  ResetAll();
});


const resetButton = document.getElementById("reset-filters-button");
resetButton.addEventListener('click', (event) => {
  ResetAll();
});





// Функція, яка додає обробник подій до кнопок "Buy Now"
function addBuyNowEventListeners() {
  const buyNowButtons = document.querySelectorAll('.buy');

  buyNowButtons.forEach(button => {
    const buttonId = button.id;
    const productId = buttonId.split('_')[0];

    button.addEventListener('click', function () {
      redirectToNewPage(productId);
    });
  });
}

// Функція, яка перенаправляє на нову сторінку з використанням переданого ID
function redirectToNewPage(productId) {
  var url = './payment_form.html?id=' + productId;
  window.open(url, '_self');
}