/*  javascript Make it as classes that use inheritance and objects*/

/* 
​
Extra JavaScript Practice with Reese using Video Games
​
Today:
[] Objects (getters, setters, functions)
[] Prototypes
[] Classes
​
*/
​
//Objects
​
//To make an empty object
let obj = {}; //<--this is an empty object
​
//Objects have key: value pairs and also methods, which are functions.
​
//we are going to make a player character object
​
var playerCharacter = {
	name: "Hero", //when making obkjects with multiple keys, make sure you seperate them with a comma, otherwise you get red squigglies
	xPos: 0,
	inventory: ["Shirt", "Kitchen Knife", "Stick"],
	"home base": "This Place", //You put "" around keys that have a space / usually best to leave them as one word
	// home base: //<-- does not work.
	//The player needs to be able to move. So we would add amethod, which is a function
	move: function (x) {
		this.xPos = +x; //this refers to this particular object (playerCharacter)
	},
};
​
//What if we want to change or reference something in the object?
//Easy!
​
//I want to reference the character name
​
let name = playerCharacter.name; // name variable now references the playerCharacter name using dot notations
//another way to reference the player name
​
let nameAlso = playerCharacter["name"]; //bracket notations
​
console.log("Dot notation: ", name);
​
console.log("Bracket notation=: ", nameAlso);
​
//I want to change the items
​
playerCharacter.items = ["soup", "sword", "apple"];
​
console.log(playerCharacter.items);
​
//i want to move the character // call the method
​
console.log("Current xPos: ", playerCharacter.xPos);
​
//call method
playerCharacter.move(10); // move character 10 spaces
​
console.log("New xPos: ", playerCharacter.xPos);
​
// Lets add a y position
​
playerCharacter.yPos = 0; //access object. make new key. give value
​
//lets use it in the move method
​
playerCharacter.move = function (x, y) {
	//Don't forget the keyword function
	this.xPos += x;
	this.yPos += y;
};
​
// Get or Set something inside the Object .. as in get a title or set their health
var playerCharacter2 = {
	name: "Hero 2", //when making obkjects with multiple keys, make sure you seperate them with a comma, otherwise you get red squigglies
	job: "Delivery Boy", // I used job instead of class, because class is a keyword in Jacvascript and can cause issues later if not careful
	health: 200,
	xPos: 0,
	inventory: ["Shirt", "Kitchen Knife", "Stick"],
	"home base": "This Place", //You put "" around keys that have a space / usually best to leave them as one word
	// home base: //<-- does not work.
	//get their job
	get job() {
		//get the job
		return `${this.name} the ${this.job}`; //give me the name and the job `` (backticks) are next to the 1 above the tab (at least on my computers it is)
	}, //dont forget the comma to seperate
	set fullHealth(h) {
		//set the health
		this.health = h; //references health key in this particular object
	},
	//The player needs to be able to move. So we would add amethod, which is a function
	move: function (x) {
		this.xPos = +x; //this refers to this particular object (playerCharacter)
	},
};
​
//to get the job of character //gives call stack error so ignore it
//playerCharacter2.job; //Should give me Hero 2 the Delivery Boy
​
//give me the full health or change it
playerCharacter2.fullHealth = 350; // health should now be 350 instead of 200
​
//Object Constructors
//there is an easier way to make player characters, instead of them each an object using constructors.
// You see how i did playerCharacter and playerCharacter2, if I havd like 30 player characters, I would have to do that for EACH of them. I don't wanna. so i will show you the next easiest way to do it. Of course if you want to do it the previous, go right ahead, it is up to you.
​
//We are going to make a player using an Object Constructor
​
function player(name, xPos, health) {
	// Object Constructor for player characters
	this.name = name;
	this.xPos = xPos; //make sure you end each one with a ; best practice
	this.health = health;
	//adding ability to move
	this.move = function (x) {
		this.xPos += x;
	};
}
​
//to make a new character instead of using the 1st method
//do this
​
var player1 = new player("Foxy", 10, 9999); //I made a new player, you need the new keyword for each new player
​
//give specific player a y position
player1.yPos = 20; //here i give player 1 a y position
​
//lets make another player
​
var player2 = new player("Froggy", 20, 7777); //this is muych cleaner than making an object the 1st method way each time
player2.yPos; //this will come back as undefined because I never gave it to them. Plue it is not in the Object constructor
//Of course you can always go up and add it
​
//Prototypes
​
// Lets say I wanna have a class system in the game or add abilities to certain objects, like heal or what class they are
​
//I want to add a Kitsune class
​
//I would use prototype
​
/* Syntax for prototype
object constructor name.prorotype.whateverKeyword = value
*/
player.prototype.classification = "Kitsune";
​
//to add to certain player... using Foxy as example
​
player1.classification = "Kitsune"; //i set player 1's classification
//Remember that class is a keyword in JavaScript, that is why I am not using it because it can cause issues later if I type something wrong
​
//Lets give the ability to heal to Froggy
​
//first lets mae a heal function
​
var bubbleHeal = function (amount) {
	//heal function
	this.health += amount;
};
​
//NOW we use prototype to set to object constructor
player.prototype.bubbleHeal = bubbleHeal;
​
player2.bubbleHeal(50);
player1.bubbleHeal(100);
​
//Play around and make your own methods and add it using prototype
​
//Classes  -- the easiest way to make multiple characters
//Classes are syntatic sugar for JavaScript and give the feel of Object Oriented programming
//Syntatic sugar --> It makes the program "sweeter". Meaning, makes it easier to read, more concise or clearly expressed.
​
class Characters {
	//easiest way to make multiple characters
	constructor(name, xPos, yPos, health, job) {
		this.name = name;
		this.xPos = xPos;
		this.yPos = yPos;
		this.health = health;
		this.job = job;
	}
	//now to give the ability to move
	move(x) {
		this.xPos += x;
		this.yPos += y;
	}
}
// what if I want to make NPC's or multiple classes of people. We can super(), this allows other classes to inherit from the parent and makes life easier.
​
class DragonCharacter extends Characters {
	//child class of Character.. Chracter is the parent
	constructor(name, xPos, yPos, health, job) {
		//instead of typing all that over again like on line 174 - 183
		//I can use inheritance by using super
		super(name, xPos, yPos, health, job); // inherits from parent attr
		//but if i want to add something that is not in parent, I can
		this.classification = "Dragon"; //not in Parent (Characters)
	}
}
​
//Lets make new players or NPCs using these classes and subclasses
var npc1 = new DragonCharacter(
	"Ingram",
	"30",
	"20",
	"9999999999999",
	"Whatever it wants to do"
);
npc1.name; //I should get Ingram back
npc1.health; // give health points
npc1.job;
//lets make a new character
console.log(
	"Npc Name: ",
	npc1.name,
	"Health: ",
	npc1.health,
	"Class: ",
	npc1.classification,
	"Job: ",
	npc1.job
);
​
let p3 = new Characters("Newbie", 5, 9, 100, "Unemployed");
// p3.name;
// p3.job;
// p3.health;
​
console.log(p3.name, p3.job, p3.health);
​
//We are done with basics of Javascript for games, next time we will start building a game.  See you!!

