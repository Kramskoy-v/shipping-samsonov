
// Отправка данных на сервер
function send(event, php) {
   event.preventDefault ? event.preventDefault() : event.returnValue = false;
   let req = new XMLHttpRequest();
   req.open('POST', php, true);
   req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
         json = JSON.parse(this.response); // ie 11
         console.log(json);

         // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
         if (json.result == 'success') {
            // Если сообщение отправлено
            modalWindow.classList.add('modal--active');
            form.reset();
         } else {
            // Если произошла ошибка
            alert('Ошибка. Сообщение не отправлено');
         }
         // Если не удалось связаться с php файлом
      } else { alert('Ошибка сервера. Номер: ' + req.status); }
   };

   // Если не удалось отправить запрос. Стоит блок на хостинге
   req.onerror = function () { alert('Ошибка отправки запроса'); };
   req.send(new FormData(event.target));
}


//Modal windows
let modalWindow = document.querySelector('.modal');
let modalClose = document.querySelector('.modal__close');
modalClose.addEventListener('click', function () {
   modalWindow.classList.remove('modal--active')
});

//Hamburger menu
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.menu');
let linkClose = document.querySelector('.menu__list');

hamburger.addEventListener('click', function () {
   hamburger.classList.toggle('hamburger--active')
      & mobileMenu.classList.toggle('menu--active')
});

function closeMenu() {
   mobileMenu.classList.remove('menu--active');
}
function closeHam() {
   hamburger.classList.remove('hamburger--active');
}

linkClose.addEventListener('touchstart', function (event) {
   if (event.target.closest('.menu__link')) {
      closeMenu(), closeHam();
   }
});

AOS.init();