const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");


if(isNaN(getParams())){
    window.location.href = "https://nnakleskin.github.io/go-code-hack/cards/index.html?vid=11"
}


let maxTime = 50;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 6 && timeLeft > 0) {
            let modal = document.querySelector(".modal-overlay")
            let modalTitle = document.querySelector(".modal-title")
            let modalDesc = document.querySelector(".modal-desc")
            const closeGame = document.querySelector("#close-game")
            const closeModal = document.querySelector("#close-modal")
            closeGame.addEventListener("click", function(){
                window.location.href = "https://mtmuseum.com/vdnh"
            })
            closeModal.addEventListener("click", function(){
                modal.classList.add("d-none")
            })
            modal.classList.remove("d-none")
            modalDesc.innerHTML = `
                На картинках, с которыми вы играли, изображены объекты-связки. Нам есть, что о них рассказать: <br><br> 
                1) USB-зарядка в интерьере автобуса связывает современные потребительские тенденции с развитием технологий, символизируя синтез внимания к человеку и технологического прогресса<br><br> 
                2) Батарейка-аккумулятор демонстрирует тесную связь между экологичностью электротранспорта и будущим наземного транспорта и его развитеим <br><br> 
                3) Кнопка открытия двери символизирует наступление эпохи со-участия и коммуникации пассажиров, их связи друг с другом<br><br> 
                4) Лидар беспилотного такси демонстрирует наступление эпохи цифровизации и дигитализации, а также развития комфортного и безопасного транспорта <br><br> 
                5) Камера Face pay связывает тему технологичных органов зрения с системами оплаты проезда<br><br> 
                6) Карта «Тройка» сиволизирует развитие тренда на экосистемы, которые обеспечивают мобильность, комфорт и удобство современной транспортной системы <br><br> 
                7) Кнопка включения светофора — символ наступления шеринговой эпохи и развития культуры разделения услуг, что сопосбствует созданию более дружелюбной и комфортной общественной среды <br><br> 
                8) Телефон с приложением «Московский транспорт» связывает экосистемы, призванные ускорить мобильность людей, с их личным комфортом и удобством использования элементов экосистемы<br><br> 
            `
            setProgressStorage(getParams()) 
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});