function Card( number, suit) {
	var card ={};
	card.number = number;
	card.suit = suit;
	card.display = display;
	return card;
}

var display = function() {
	if(this.number <= 10 && this.number > 1) {
		return this.number +" of " + this.suit;
	} else if (this.number === 1){
		return "Ace of " + this.suit;
	} else if (this.number === 11){
		return "Jack of " + this.suit;
	} else if (this.number === 12){
		return "Queen of " + this.suit;
	} else if (this.number === 13){
		return "King of " + this.suit;
	} else{
		return "invalid card"
	}
}

var suits = ["spades", "clubs","heart", "diamonds"];

function Deck() {
	var deck={}
	deck.cards = [];
	for(var i =0; i< suits.length; i++) {
		for(var j=1; j<14; j++) {
			deck.cards.push(Card(j, suits[i]))
		}
	}
	deck.shuffle = shuffle



	return deck;
}

var shuffle = function() {
	for (var i = 0 ; i < this.cards.length ; i++){
		var tmp;
		var randIndex = generateRandomIndex(i+1 , this.cards.length-1)
		tmp = this.cards[randIndex]
		this.cards[randIndex] = this.cards[i];
		this.cards[i] = tmp;
	}
}

function generateRandomIndex(min, max) { // maximum not included
	return Math.floor(Math.random() * (max - min)) + min;
}

//////////////////////
var userName=window.prompt();
var start = new Date()
var startTime = start.toLocaleTimeString('fr-FR', {hour: "numeric", minute: "numeric", second: "numeric"})
var numberOfGames=0;
var scores=[];

function playGame() {
	var deck=Deck();
	numberOfGames++

	deck.shuffle();
	var currentCard = deck.cards[0];
	var nextCard=deck.cards[1];
	var score =0;
	
	var count=0;
	while(score<52) {
		alert(currentCard.display());
		var input = window.prompt()
		if(input==="Equal") {
			if(nextCard.number===currentCard.number) {
				count++
				score+=10
				currentCard = deck.cards[count];
				nextCard=deck.cards[count+1];

			}
			else{
				alert("you lost . Your score is " + score )
				scores.push(score)
				break
			}
		} else if(input==="higher") {
			if(nextCard.number>=currentCard.number) {
				count++
				score++
				currentCard = deck.cards[count];
				nextCard=deck.cards[count+1];

			}
			else{
				alert("you lost . Your score is " + score )
				scores.push(score)
				break
			}
		} else if(input==="lower") {
			if(nextCard.number<=currentCard.number) {
				score++
				count++
				currentCard = deck.cards[count];
				nextCard=deck.cards[count+1];

			}
			else{
				alert("you lost . Your score is " + score )
				scores.push(score)
				break
			}
		} else {
			alert("invalid input")
		}
	}
}

function resetStats() {
	scores=[];
	numberOfGames=0;
	playTime = 0

}

function convertTime(end, start) {
	var str = "";

	var resSec = Number(end.slice(6)) - Number(start.slice(6));
	var resMin = Number(end.slice(3,5)) - Number(start.slice(3,5));
	var resHr = Number(end.slice(0,2)) - Number(start.slice(0,2));

	if (resMin < 0) {
		resMin += 60;
		resHr-- ;
	}

	if (resSec < 0) {
		resSec += 60;
		resMin --;
	}

	if (resHr !== 0){
		str += resHr + "hr "
	}
	if (resMin !== 0){
		str += resMin + "min "
	}
	str += resSec + "s."

	return str
}

function generatePlayTime() {
	var end = new Date()
	var endTime = end.toLocaleTimeString('fr-FR', {hour: "numeric", minute: "numeric", second: "numeric"})
	return convertTime(endTime ,startTime)
}

function getAvgScore() {
	return scores.reduce(function(a,b){
		return a+b
	},0)/scores.length
}
function getHighScore() {
	return scores.reduce(function(a,b){
		if(a>b){
			return a
		}
		return b
	},)
}

