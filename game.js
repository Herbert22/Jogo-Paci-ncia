const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');

class CardSnap{
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;
        this.cards = [];
    }
}

class Card{
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
        this.flipped = false;
        this.snap = null;
        this.movingX = 0;
        this.movingY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    drawCard(x, y){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.roundRect(x, y, 100, 150, 4);
        ctx.stroke();
        ctx.fill();

        let suitImage = new Image();

        if(this.flipped){
            switch(this.suit){
                case "ouros":
                    ctx.fillStyle = "red";
                    suitImage.src = "ouros.jpg";
                    break;
                case "espadas":
                    ctx.fillStyle = "black";
                    suitImage.src = "espadas.jpg";
                    break;
                case "copas":
                    ctx.fillStyle = "red";
                    suitImage.src = "copas.jpg";
                    break;
                case "paus":
                    ctx.fillStyle = "black";
                    suitImage.src = "paus.jpg";
                    break;
            }

            ctx.font = "24px Arial";
            ctx.beginPath();
            ctx.fillText(this.number, x + 10, y + 26);
            suitImage.onload = () => {ctx.drawImage(suitImage, x + 28, y + 7, 16, 20)};
        }else{
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.roundRect(x + 5, y + 5, 90, 140, 4);
            ctx.fill();
        }
    }
}

let initialCards = [];
const suits = ["ouros", "espadas", "copas", "paus"];
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const towerN = [1, 2, 3, 4, 5, 6, 7];

const cardSnaps = [
    new CardSnap(40, 30, "mainSetClosed"),
    new CardSnap(160, 30, "mainSetClosed"),

    new CardSnap(400, 30, "muont"),
    new CardSnap(520, 30, "muont"),
    new CardSnap(640, 30, "muont"),
    new CardSnap(760, 30, "muont"),

    new CardSnap(40, 200, "tower"),
    new CardSnap(160, 200, "tower"),
    new CardSnap(280, 200, "tower"),
    new CardSnap(400, 200, "tower"),
    new CardSnap(520, 200, "tower"),
    new CardSnap(640, 200, "tower"),
    new CardSnap(760, 200, "tower"),
]

//FUNCOES LOGICAS
function generateCardSet(){
    suits.map(s => {
        numbers.map(n => {
            initialCards.push(new Card(n, s));
        })
    })
}

function shuffleSet(){
    for(let i = initialCards.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [initialCards[i], initialCards[j]] = [initialCards[j], initialCards[i]];
    }
}

function distributeInitialSetup(){
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < towerN[i]; j++){
            let index = Math.floor(Math.random() * initialCards.length);
            let randomCard = initialCards[index];
            const snap = cardSnaps[i + 6];
            snap.cards.push(randomCard);
            randomCard.snap = snap;

            if(j == towerN[i] - 1){
                randomCard.flipped = true;
            }

            initialCards.splice(index, 1);
        }
    }

    mainSetClosed().cards = initialCards;
}

function start(){
    generateCardSet();
    shuffleSet();
    distributeInitialSetup();
}

//FUNCOES UTILITARIAS
function mainSetOpened(){
    return cardSnaps.find(s => s.type == "mainSetOpened");
}

function mainSetClosed(){
    return cardSnaps.find(s => s.type == "mainSetClosed");
}

//FUNCOES DE DESENHO
function drawCard(){
    cardSnaps.map(s => {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.roundRect(s.x, s.y, 100, 150, 4);
        ctx.stroke();
        switch(s.type){
            case "mount":
            case "mainSetClosed":
            case "mainSetOpened":
                s.cards.map(c => {
                    c.drawCard(s.x, s.y);
                })
                break;
            case "tower":
                s.cards.map((c, i) => {
                    c.drawCard(s.x, s.y + (i * 20));
                })
                break;
        }
    })
}

start();
drawCard();