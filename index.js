window.addEventListener("DOMContentLoaded", function() {
    
    "use strict";

    let tab = document.querySelectorAll(".info-header-tab"),
        infoHeader = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++) {
            if(tabContent[i].classList.contains("show") || !tabContent[i].classList.contains("hide")) {
                tabContent[i].classList.remove("show");
                tabContent[i].classList.add("hide");    
            }
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    infoHeader.addEventListener("click", function(event) {
        let target = event.target;

        if(target && target.classList.contains("info-header-tab")) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = "2019-04-25";

    function getTimeRemaining(endTime) {
        let t       = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours   = Math.floor( (t / (1000*60*60) ) );

            return {
                "total"   : t,
                "hours"   : hours,
                "minutes" : minutes,
                "seconds" : seconds
            };
    }

    function setClock(id, endTime) {
        let timer   = document.getElementById(id),
            hours   = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            hours.textContent = ("0" + t.hours).slice(-2);
            minutes.textContent = ("0" + t.minutes).slice(-2);
            seconds.textContent = ("0" + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeInterval);

                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            } 
        }
    }

    setClock("timer", deadline);

    // Modal window

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

    more.addEventListener("click", function() {
        this.classList.add("more-splash");
        showModalWindow();
    });

    close.addEventListener("click", function() {
        more.classList.remove("more-splash");
        showModalWindow(false);
    });

    function showModalWindow(show) {
        if(show === false) {
            document.body.style.overflow = "";
            overlay.style.display = "none";
            return;
        }

        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    // Modal window in tab
    let info = document.querySelector(".info");

    info.addEventListener("click", function(event) {
        
        let target = event.target;

        if(target && target.classList.contains("description-btn")) {
            // console.log("done");
            showModalWindow();
        }
    });

    // FOrm

    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

        statusMessage.classList.add("status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);
        request.send(formData);

        let promise = new Promise(function(resolve, reject) {
            request.addEventListener("readystatechange", function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });
        });

        promise.then(function() {
            statusMessage.innerHTML = message.success; 
        }).then(function() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
        }).catch(function() {
            statusMessage.innerHTML = message.failure;
        });

        
    });

    // Form contact

    let formContact = document.getElementById("form"),
        inputContact = formContact.getElementsByTagName("input");

    formContact.addEventListener("submit", function(event) {
        event.preventDefault();

        // form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(formContact);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        // request.addEventListener("readystatechange", function() {
        //     if (request.readyState < 4) {
        //         statusMessage.innerHTML = message.loading;
        //     } else if (request.readyState === 4 && request.status == 200) {
        //         statusMessage.innerHTML = message.success;
        //     } else {
        //         statusMessage.innerHTML = message.failure;
        //     }
        // });

        for (let i = 0; i < inputContact.length; i++) {
            inputContact[i].value = "";
        }
    });

    // slider 

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    
    function showSlides(n) {
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        slides.forEach(item => item.style.display = "none");

        dots.forEach(item => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlides(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlides(i);
            }
        }
    });

    // calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1], 
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = total;

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        calcCore();
    });

    restDays.addEventListener('input', function() {
        daysSum = +this.value;
        calcCore();
    });

    place.addEventListener('change', function() {
        calcCore();
    });

    function calcCore() {
        if (personsSum !== 0 && daysSum !== 0) {
            total = (daysSum + personsSum) * 4000 * +place.value;
        } else {
            total = 0;
        }

        totalValue.innerHTML = total;
    }

// end DOMContentLoaded
});