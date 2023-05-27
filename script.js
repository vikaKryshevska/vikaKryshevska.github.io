
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





// Отримуємо контейнер, в який будемо додавати продукти


let jsonData = [
  {
     name: "Saurabh",
     age: "20",
     city: "Prayagraj"
  },
  {
     name: "Vipin",
     age: 23,
     city: "Lucknow",
  },
  {
     name: "Saksham",
     age: 21,
     city: "Noida"
  }
];
/* 
// Get the container element where the table will be inserted
let container = document.getElementById("products-list");

// Create the table element
let table = document.createElement("table");

// Get the keys (column names) of the first object in the JSON data
let cols = Object.keys(jsonData[0]);

// Create the header element
let thead = document.createElement("thead");
let tr = document.createElement("tr");

// Loop through the column names and create header cells
cols.forEach((item) => {
  let th = document.createElement("th");
  th.innerText = item; // Set the column name as the text of the header cell
  tr.appendChild(th); // Append the header cell to the header row
});
thead.appendChild(tr); // Append the header row to the header
table.append(tr) // Append the header to the table

// Loop through the JSON data and create table rows
jsonData.forEach((item) => {
  let tr = document.createElement("tr");
  
  // Get the values of the current object in the JSON data
  let vals = Object.values(item);
  
  // Loop through the values and create table cells
  vals.forEach((elem) => {
     let td = document.createElement("td");
     td.innerText = elem; // Set the value as the text of the table cell
     tr.appendChild(td); // Append the table cell to the table row
  });
  table.appendChild(tr); // Append the table row to the table
});
container.appendChild(table) // Append the table to the container element


 */






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
const images = document.querySelector('.carousel').children;
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