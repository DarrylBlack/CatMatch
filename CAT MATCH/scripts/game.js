let bigBoi = document.querySelector('.the-cards');
let nums = [1,1,2,3,3,4,4,5,5, 6, 6, 2];
let flippedCards = [];
let flippedCardsUrl = [];
let newDeck = [];
let matches = 0;
let body = document.querySelector('.body');
let clickCount = 0;

axios.get('https://api.thecatapi.com/v1/images/search?limit=6')
.then( response => {
    console.log(response.data);
    populateDeck(response.data);
})
.catch( response => {
    if( response === undefined ){
        location.reload();
    }
})

function populateDeck(pack){
    //the url array
    for(let i = 0; i < 6; i++){
        newDeck.push(pack[i].url);
        newDeck.push(pack[i].url);
    }
    
}

window.onload = function() {
    newGame();
};

function newGame(){
    flippedCards = [];
    shuffleCards();
    makeDeck();
    body.appendChild(bigBoi);

}

function shuffleCards(){
    //THIS IS NOT MINE: THE DURSTENFELD SHUFFLE
    for (let i = newDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newDeck[i];
        newDeck[i] = newDeck[j];
        newDeck[j] = temp;
    }
}

function makeDeck(){
    for(let i = 0; i < 12; i++) {
        let card = document.createElement('li');
        card.classList.add('the-cards__card');

        let cardBack = document.createElement('div');
        cardBack.classList.add('the-cards__card-back');
        card.appendChild(cardBack);

        let catPicBack = document.createElement('img');
        catPicBack.classList.add('the-cards__image-back');
        catPicBack.setAttribute('src', "../assets/icons/paw.png");
        cardBack.appendChild(catPicBack);

        let cardFront = document.createElement('div');
        cardFront.classList.add('the-cards__card-front');
        card.appendChild(cardFront);

        let catPic = document.createElement('img');
        catPic.classList.add('the-cards__image');
        cardFront.appendChild(catPic);
        catPic.setAttribute('src', newDeck[i]);
        // let catURL = newDeck[i];
        // cardFront.style.backgroundImage = `url(${catURL})`

        card.addEventListener('click', () => {
            cardSelect(card, newDeck[i]);
        });
        bigBoi.appendChild(card);
    }
}

function cardSelect(curCard, cardUrl){
    // let curCard = document.querySelector('.the-cards__card');
        if(flippedCards.length < 2) {
            updateClickCount();
            clickCount++;
            curCard.classList.add('flip');
            flippedCards.push(curCard);
            flippedCardsUrl.push(cardUrl);
            console.log(flippedCardsUrl[0], flippedCardsUrl[1]);
            if(flippedCards.length === 2){
                compare();
            }
        }
}

function updateClickCount(count){
    let cCount = document.querySelector('.click-count');
    cCount.innerText = 'click count: ' + (clickCount+1);
}

function compare() {
    console.log(flippedCardsUrl[0])
    if(flippedCards.length === 2 && flippedCardsUrl[0] != flippedCardsUrl[1]){
        console.log('hey')
        flipCard();
        flippedCards = [];
        flippedCardsUrl = [];
    }
    else {
        matches++;
        flippedCards.forEach( car => {
            car.removeEventListener('click', () => {
                //do something
            })
        })
        flippedCards = [];
        flippedCardsUrl = [];
        if(matches === 6){

            let overlay = document.createElement('div');
            overlay.classList.add('overlay');
            console.log(body)
            body.appendChild(overlay);
            let winMessage = document.createElement('h2');
            winMessage.classList.add('overlay__message');
            overlay.appendChild(winMessage);
            winMessage.innerText = 'YOU WON!!';
            let clickCountMessage = document.createElement('p');
            clickCountMessage.classList.add('overlay__click-message');
            winMessage.appendChild(clickCountMessage);
            clickCountMessage.innerText = "You finished in " + clickCount + " clicks!\nGreat job!";

            setTimeout( () => {
                let stupidATag = document.createElement('a');
                stupidATag.setAttribute('href', '../home.html');
                winMessage.appendChild(stupidATag);
                let homeButton = document.createElement('button');
                homeButton.classList.add('overlay__home-button');
                stupidATag.appendChild(homeButton);
                homeButton.innerHTML = "home";

            }, 2000);
            console.log(matches);
        }
        
    }
}

function flipCard(){
    flippedCards.forEach( car => {
        setTimeout(() => {
            car.classList.remove('flip');
        }, 900); 
    })
}

function resetGame() {
    let body = document.querySelector('.body');
    body.innerHTML = '';
    bigBoi.innerHTML = '';
    newGame();
}