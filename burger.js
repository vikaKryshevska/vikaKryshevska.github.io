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
