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
                <div class="year">${product.price}$</div>
              </div>
            </div>
      
      `;

    return productElement;
  }





  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const images = document.querySelector('.slider').children;
  let index = 0;
  let data = [];
  
  prev.addEventListener('click', () => {
    nextImage('prev');
  });
  
  next.addEventListener('click', () => {
    nextImage('next');
  });
  
  async function loadImages() {
    const response = await fetch('slider.json');
    data = await response.json();
  
    nextImage('next');
  }
  
  function nextImage(direction) {
    if (direction === 'next') {
      index++;
      if (index === data.length) {
        index = 0;
      }
    } else {
      if (index === 0) {
        index = data.length - 1;
      } else {
        index--;
      }
    }
  
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('main');
      images[i].classList.remove('fade-in');
    }
  
    images[index].classList.add('main');
    images[index].classList.add('fade-in');
  }  
  
  loadImages();



fetch('slider.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
              appendDataSlider(data)
            })
             
            .catch(function (err) {
                console.log('error: ' + err);
            });

function appendDataSlider(data) {
       var sliderContainer = document.getElementById('slider-list');
        for (var i = 0; i < data.length; i++) {                  
          sliderContainer.appendChild(createSliderElement(data[i]));
          } 
       }

  function createSliderElement(slider) {
    const sliderElement = document.createElement('div');
    if(slider.id==11){
      sliderElement.classList.add('main');
    }
      sliderElement.classList.add('item');

   
    sliderElement.innerHTML = `

      <div class='item_img'>
      <img src="${slider.element_img}" />
    </div>
    <div class='info'>
         
            <div class="name">${slider.name}</div>
             <div class='info1'>
                <div class="color">${slider.color}</div>
                <div class="year">${slider.price}</div>
              </div>
            </div>
      
      `;

    return sliderElement;
  }







  var slideIndex = 0;
  showSlides();
  
  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
   
    var currentSlide = slides[slideIndex];
    
    // Сховати попередній слайд
    if (currentSlide) {
      currentSlide.style.animation = "slide-out 1s ease-in-out forwards";
      currentSlide.addEventListener("animationend", function() {
        this.style.display = "none";
        this.style.animation = ""; // Скидаємо анімацію
      });
    }
    
    // Збільшуємо індекс слайда
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    
    // Відображення нового слайда
    var newSlide = slides[slideIndex];
    newSlide.style.display = "block";


    var images = newSlide.getElementsByTagName("img");
  var imageIndex = 0;

  // Зміна зображень кожні 0.5 секунди
  function changeImage() {
    var currentImage = images[imageIndex];
    if (currentImage) {
      currentImage.style.opacity = 0;
      imageIndex++;
      if (imageIndex >= images.length) {
        imageIndex = 0;
      }
    }
    var newImage = images[imageIndex];
    newImage.style.opacity = 1;
  }

  // Запускаємо зміну зображень кожну 0.5 секунди
  setInterval(changeImage, 500);



  
    newSlide.style.animation = "slide-in 1s ease-in-out forwards";



    newSlide.addEventListener("animationend", function() {
      this.style.display = "block";
      this.style.animation = ""; // Скидаємо анімацію
    });
    setTimeout(showSlides, 5000); // Змінює слайд кожні 5 секунд
  }

  /*Застосовується анімація slide-in для появи нового слайда,
   а потім через 5 секунд спрацьовує таймер, щоб застосувати 
   анімацію slide-out для поточного слайда. Після закінчення анімації, 
   слайд приховується, а анімація знімається. Потім встановлюється таймаут 
   на 5 секунд перед викликом функції showSlides знову, щоб продовжувати змінювати слайди. */
  