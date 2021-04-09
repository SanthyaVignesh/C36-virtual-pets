var dog,sadDog,happyDog, database;
var foodS = 0,foodStock;
var addFood;
var foodObj;
var feedTime = 0;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  database.ref('FeedTime').on("value",function(data){
    feedTime = data.val();
  });

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDogBt = createButton("Feed the Dog");
  feedDogBt.position(700,95);
  feedDogBt.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display(); 
  //write code to display text lastFed time here


  drawSprites();

  fill("Black");
  textSize(20);
  if(feedTime > 12){
    text("Last Feed : " + (feedTime - 12)+" PM",300,30);
  }else if(feedTime == 0){
    text("Last Feed : 12 AM",300,30);
  }else if(feedTime < 12){
    text("Last Feed : " + feedTime+" AM",300,30);
  }else if(feedTime == 12){
    text("Last Feed : 12 PM",300,30);
  }

  if(foodS === 0){
    dog.addImage(sadDog);
  }
 

}

//function to read food Stock

function readStock(data){
   foodS=data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodS);
}


function feedDog(){

  if(foodS > 0){
    dog.addImage(happyDog);
    database.ref("/").update({
      'Food':foodS-1,
      'FeedTime' : hour()
    })
  }
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    'Food':foodS
  })
}
