
const menu = document.querySelector(".navigation");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".my-button");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    menu.classList.add("hideMenu");
   
  } else {
    menu.classList.add("showMenu");
    menu.classList.remove("hideMenu");
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)




const urlParams = new URLSearchParams(window.location.search);


// Отримуємо контейнер, в який будемо додавати продукти
const productsContainer = document.getElementById('products-list');

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Очищуємо контейнер від попереднього списку продуктів
    productsContainer.innerHTML = '';
    products.forEach(product => {
      const productElement = document.createElement('li');
      productElement.classList.add('element');
      productElement.setAttribute('data-id', product.id);
      productElement.innerHTML = `


      <div class="element_img">
              <img src="${product.element_img}.jpeg" />
            </div>
            <div class="element_img">
              <img src="i${product.element_img1}" />
            </div>
            <div class="info">
         
                <div class="name">{product.name}</div>
                <div class="info1">
                <div class="color">${product.color}</div>
                <div class="year">${product.price}</div>
              </div>
            </div>
      
      `;

      productsContainer.appendChild(productElement);
    });
    addBuyNowEventListeners();
  })
  .catch(error => console.error(error));


/* function myFunction() {
  var x = document.getElementById("navigation");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
} */