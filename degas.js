// Access a ul with the id gameBoard and add an eventlistener.
document.querySelector('#gameBoard').addEventListener('click', matchingCards)
// Access a button and add an eventlistener for a click event
document.querySelector('button').addEventListener('click' , shuffleCards)
// Global variables
// gameOrder holds the order of cards' positions of the current game
// selected holds 1 or 2 cards. It's used to check if the selected cards match.
// matched is the current game's counter.
let gameOrder = [],
    selected = [],
    matched = 0;
function shuffleCards() {
    // assign images to each variable, cardX
    // store 2 of each card in an array, cards.
    gameOrder = []
    cardOrder = [];
    let card1 = 'card1.jpg',
        card2 = 'card2.jpg',
        card3 = 'card3.jpg',
        card4 = 'card4.jpg',
        card5 = 'card5.jpg',
        cards = [card1, card1, card2, card2, card3, card3, card4, card4, card5, card5];
    // deck holds all the section elements with the class 'card'
    const deck = document.querySelectorAll('.card');
    //In deck, for each card, do the following:
    deck.forEach(card => {
        // Create variable, random.
        let random;
        
        // At least once, generate a random number and store it in a variable.
        // Repeat that action until variable, random, is given a value, representing an index in array, cards, 
        // that is not undefined.
        do {
            random = Math.floor(Math.random() * 10)
            console.log(random)
        } while (cards[random] === undefined)

        //Store card that's in array, cards, at index, random.
        gameOrder.push(cards[random]);
        //Give card a background image of back.jpg
        card.style.backgroundImage = 'url(cardBack.png';
        //Delete the CONTENT in array, cards, at index, random, therefore, leaving element as undefined.
        //This method is taken as to not throw off random number generator. Random number generator is set
        //to multiply by 10, returning values between 0 and 9. IF splice method were to be used the length
        //of array, cards, would be decreased, meaning its indexes would go from 0 - 8, then 0 - 7,and so forth.
        delete cards[random];
    });

    console.log(gameOrder);
}
//Calling, FOR NOW, function, shuffleCards() to shuffle cards at page load. 
//This way, there's no need for an eventlistener.
shuffleCards();
// In function, matchingCards(e), the clicked card (i.e. the target) is stored in array, selected.
function matchingCards(e) {
    //If the clicked target has a class called 'card'
        //Store that target's dataset value to variable, cardNumber
        //Store card in array, selected
        //Give that card the background that's stored in array, gameOrder, at index, cardNumber. I.E. flip the card.
    if (e.target.className === 'card'){
        let cardNumber = e.target.dataset.value;
        selected.push(e.target);
        e.target.style.backgroundImage = `url( ${gameOrder[cardNumber]}`;
    }
    console.log(selected)
    //If the length of array, selected, is 2 (I.E. user has clicked two cards)
        //If the background image of element in array, selected, at index 0 is the same as 
        //the background image of element in array, selected, at index 1 (I.E. Check if cards match)
            //Remove eventListener that allows user to click on cards (I.E. Disable clicking on cards)
            //Add 1 to variable, matched.
    if (selected.length === 2) {
        document.querySelector('#gameBoard').removeEventListener('click', matchingCards);
        //All other cards are unclickable
        if (selected[0].style.backgroundImage === selected[1].style.backgroundImage) {
            matched++;
        }
        //If they're not the same
            //Wait 1 second before giving each element a background of back.jpg
            //(I.E. Before flipping them back)
        else {
            setTimeout(() => {
                selected[0].style.backgroundImage = 'url(cardBack.jpg';
                selected[1].style.backgroundImage = 'url(cardBack.jpg'; 
            }, 1000);
        }
        //Wait 1 second for cards to flip back before clearing out array, selected
        //and adding, once again, eventListener to allow user to click on cards.
        setTimeout(() => {
            selected = [];
            document.querySelector('#gameBoard').addEventListener('click', matchingCards);
        }, 1000);
        console.log(selected);
        //Cards are clickable once again
    }
}

