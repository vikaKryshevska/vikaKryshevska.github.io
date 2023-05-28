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







fetch('products.json')
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
         
            <div class="name">${product.name}</div>
             <div class='info1'>
                <div class="color">${product.color}</div>
                <div class="year">${product.price}</div>
              </div>
            </div>
      
      `;

    return productElement;
  }






  const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const images = document.querySelector('.slider').children;
const totalImages = images.length;
let index = 0;

prev.addEventListener('click', () => {
  nextImage('next');
})

next.addEventListener('click', () => {
  nextImage('prev');
})

function nextImage(direction) {
  if(direction == 'next') {
    index++;
    if(index == totalImages) {
      index = 0;
    }
  } else {
    if(index == 0) {
      index = totalImages - 1;
    } else {
      index--;
    }
  }

  for(let i = 0; i < images.length; i++) {
    images[i].classList.remove('main');
  }
  images[index].classList.add('main');
}

/* function myFunction() {
  var x = document.getElementById("navigation");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
} */