new WOW({
  mobile: false,
}).init();
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [53.120751, 50.081059],
    zoom: 15
  });
  myMap.geoObjects
    .add(new ymaps.Placemark([53.120751, 50.081059], {
      iconCaption: 'Долотный переулок, 7'
    }, {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    }))
};
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 40);
  }
};
let burger = document.querySelector('.menu-burger__wrapper');
let menuMobile = document.querySelector('.mobile-menu__wrapper');
let body = document.querySelector('body');
let toTop = document.querySelector('.to-top');
let astronaut = document.querySelector('.astronaut-with-balls');
burger.addEventListener('click', (e) => {
  e.stopPropagation();
  menuMobile.classList.add('show-mobile-menu');
});
body.addEventListener('click', () => {
  menuMobile.classList.remove('show-mobile-menu');
});
toTop.addEventListener('click', () => {
  let height = body.clientHeight;
  astronaut.animate(
    [
      { transform: `translateY(0)`},
      { transform: `translateY(-${height}px)`}
    ],
    {duration: 5000, easing: 'ease-out'})
  scrollToTop();
});


// Перенести 
const allBlocks = document.querySelectorAll('.description-item');
const allTabs = document.querySelectorAll('.presentation__tab');
const appStages = document.querySelectorAll('.description-stage__item');
const appTabs = document.querySelectorAll('.tab-stage__item');

allTabs.forEach(elem => {
  elem.addEventListener('click', () => {
    const elemClass = elem.classList[0];
    allBlocks.forEach(block => {
      block.classList.remove('show-description-item');
    });
    allBlocks.forEach(block => {
      if (block.classList.contains(elemClass)) {
        block.classList.add('show-description-item');
        block.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

appTabs.forEach(elem => {
  elem.addEventListener('mouseover', () => {
    const elemClass = elem.classList[0];
    const windowWidth = window.screen.width;
    appStages.forEach(block => {
      block.classList.remove('show-description-stage__item');
    });
    appStages.forEach(block => {
      if (block.classList.contains(elemClass)) {
        block.classList.add('show-description-stage__item');
        if (windowWidth <= 992) {
          block.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    });
  });
});

const types = document.querySelectorAll('.types input');
const designChoice = document.querySelector('.design-choice');
const sitesChoice = document.querySelector('.sites-choice');
const appChoice = document.querySelector('.app-choice');
const subTypes = document.querySelectorAll('.subtypes input');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const toOrder = document.querySelectorAll('.to-order');
types.forEach(type => {
  type.addEventListener('change', () => {
    subTypes.forEach(elem => {
      elem.checked = false;
    });
    if (type.checked && type.value === 'site') {
      sitesChoice.classList.remove('hidden-choice');
      designChoice.classList.add('hidden-choice');
    } else if (type.checked && type.value === 'design') {
      sitesChoice.classList.add('hidden-choice');
      designChoice.classList.remove('hidden-choice');
    } else {
      designChoice.classList.add('hidden-choice');
      sitesChoice.classList.add('hidden-choice');
    }
  });
});
/* Кастомное добавление файлов в форме */
const input = document.querySelector("#tech");
const label = input.nextElementSibling;
const labelVal = label.innerHTML;
input.addEventListener('change', (event) => {
  const fileName = event.target.value.split("\\").pop();
  if (fileName) {
    document.querySelector('.file-placeholder').innerHTML = fileName;
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
toOrder.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('show-modal');
  });
});

if (window.screen.width < 768) {
  const animated = document.querySelectorAll('.animate__animated');
  animated.forEach(element => {
    element.classList.remove('wow');
    element.classList.remove('animate__animated');
  });
}