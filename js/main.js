$(document).ready(function () {
  $('.work-img__link').magnificPopup({ type: 'image' });
  $('.work-screen__link').magnificPopup({ type: 'image' });
});

window.onload = () => {
  const mainImage = document.querySelector('.main-block__image');
  if (mainImage !== null) mainImage.classList.remove('hidden-img');
}
new WOW({
  mobile: false,
}).init();
ymaps.ready(init);
function init() {
  try {
    var myMap = new ymaps.Map("map", {
      center: [53.120751, 50.081059],
      zoom: 15
    });
  } catch (e) {
    console.log(e);
  }
  if (typeof myMap !== 'undefined') {
    myMap.geoObjects
        .add(new ymaps.Placemark([53.120751, 50.081059], {
          iconCaption: 'Долотный переулок, 7'
        }, {
          preset: 'islands#icon',
          iconColor: '#0095b6'
        }))
  }
};
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - 50);
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
    {duration: 2200, easing: 'linear'})
  scrollToTop();
});


const allBlocks = document.querySelectorAll('.description-item');
const allTabs = document.querySelectorAll('.presentation__tab');
const appStages = document.querySelectorAll('.description-stage__item');
const appTabs = document.querySelectorAll('.tab-stage__item');
const appBlock = document.querySelector('.apps-description');
const descriptionTitle = document.querySelector('.apps-description .description-item__title');

allTabs.forEach(elem => {
  elem.addEventListener('click', () => {
    const elemClass = elem.classList[0];
    allBlocks.forEach(block => {
      block.classList.remove('show-description-item');
    });
    allBlocks.forEach(block => {
      if (block.classList.contains(elemClass)) {
        appBlock.classList.remove('show__app-block');
        block.classList.add('show-description-item');
        block.scrollIntoView({ behavior: "smooth" });
      }
    });
    appStages.forEach(stage => {
      stage.classList.remove('show-description-stage__item');
    });
    appTabs.forEach(tab => {
      tab.classList.remove('active-tab-stage__item');
    });
    appTabs.forEach(tab => {
      if (tab.classList.contains(elemClass)) {
        tab.classList.add('active-tab-stage__item');
      }
    });
    appStages.forEach(stage => {
      if (stage.classList.contains(elemClass)) {
        appBlock.classList.add('show__app-block');
        stage.classList.add('show-description-stage__item');
        descriptionTitle.scrollIntoView({ behavior: "smooth" });
      }
    })
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
    let target = $(btn).data('dir');
    selectProject(target ? target : 'sites');
    switch (target) {
      case 'sites' : $('#sites-radio').prop('checked', true);
            break;
      case 'apps' : $('#app-radio').prop('checked', true);
            break;
      case 'designs' : $('#design-radio').prop('checked', true);
            break;
      default: $('#sites-radio').prop('checked', true);
            break;
    }

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
function selectProject(selection){
  if (selection === 'sites') {
    sitesChoice.classList.remove('hidden-choice');
    designChoice.classList.add('hidden-choice');
  } else if (selection === 'designs') {
    sitesChoice.classList.add('hidden-choice');
    designChoice.classList.remove('hidden-choice');
  } else { //app
    designChoice.classList.add('hidden-choice');
    sitesChoice.classList.add('hidden-choice');
  }
}

//applications-form__btn
const conactBtn = document.querySelectorAll('.applications-form__btn');
conactBtn.forEach(elem => {
    elem.addEventListener('click', () => {
        let data = {};
        let inputs = $('.applications-form input');
        inputs.toArray().forEach(element => {
            let e = $(element);
            console.log(e.attr('name') + ' ' + e.val());
            data[e.attr('name')] = e.val();
        });
        data[$('.applications-form textarea').attr('name')] = $('.applications-form textarea').val();
        console.log(data);

        axios.post('/contact', data)
            .then(response => {
                console.log(response.data);
                alert('Contact sent');
            })
            .catch(errors => {
                let keys = Object.keys(errors.response.data.errors)
                let msg = "";
                keys.forEach(key => {
                    msg += "Field:" + key + ' ' + errors.response.data.errors[key] + "\n";
                })
                alert(msg);
            });
    })
});
