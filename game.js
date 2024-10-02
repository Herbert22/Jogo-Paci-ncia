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

function drawCard(){
    cardSnaps.map(s => {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.roundRect(s.x, s.y, 100, 150, 4);
        ctx.stroke();
    })
}

// let card = new Card("A","paus");
// card.drawCard(10, 10);

drawCard();