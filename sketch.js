let timer = 0;

function getWord(number){

  number = int(number);
  
  if (number==1){return "one "}
  else if (number==2){return "two "}
  else if (number==3){return "three "}
  else if (number==4){return "four "}
  else if (number==5){return "five "}
  else if (number==6){return "six "}
  else if (number==7){return "seven "}
  else if (number==8){return "eight "}
  else if (number==9){return "nine "}
  else if (number==10){return "ten "}
  else if (number==11){return "one " + "past " +"ten "}
  else if (number==12){return "two " + "past " +"ten "}
  else if (number==13){return "three " + "past " +"ten "}
  else if (number==14){return "four " + "past " +"ten "}
  else if (number==15){return "QUARTER "}
}

function getWordHour(number){
  number = int(number);
	number = number%12;
  if (number==0){return "twelve"}
  else if (number==1){return "one"}
  else if (number==2){return "two"}
  else if (number==3){return "three"}
  else if (number==4){return "four"}
  else if (number==5){return "five"}
  else if (number==6){return "six"}
  else if (number==7){return "seven"}
  else if (number==8){return "eight"}
  else if (number==9){return "nine"}
  else if (number==10){return "ten"}
  else if (number==11){return "eleven"}
  else if (number==12){return "twelve"}
  else if (number==13){return "one"}

  return number.toString();

}

function makeTimeString(listWithShit){
  
var decimalTime = listWithShit[0] + 0.01;
var changes = listWithShit[1];
var operator = listWithShit[2];

var decimalTimeString = decimalTime.toString();
  
var hourString = decimalTimeString.slice(0,2);

var finalString = ""

for(var i = operator.length-1; i >=0; i--){
  var curOperator = operator[i];
  var curChange = changes[i]

  if(curChange == 15){curChange = "QUARTER "}
  else if(curChange == 30){curChange = "HALF "}
  else if(curChange == 10){curChange = "TEN ";}
  else if(curChange == 5){curChange = "FIVE ";}

  finalString+=curChange;

  if(curOperator == "-"){finalString+="past ";}
  else if(curOperator == "+"){finalString+="before ";}
}
  
var minuteString = decimalTimeString.slice(3,5);


var minuteStringInt = int(minuteString);


minuteStringInt = int(map(minuteStringInt,0,100,0,60) );
var newMinuteString = "";

if(minuteStringInt>=45){
  var hourStringInt = int(hourString)+1;
  hourString = hourStringInt.toString();
  var leftOverMinutes = minuteStringInt-45;

  if(leftOverMinutes == 0){
    newMinuteString = "QUARTER "+"before "
  }
  else{
    newMinuteString = getWord(leftOverMinutes) + "past " + "QUARTER " + "before "
  }
}

else if(30<=minuteStringInt  && minuteStringInt<45){
  var leftOverMinutes = 45-minuteStringInt;

  if(leftOverMinutes == 15){
    newMinuteString = "HALF "+"past "
  }
  else{
    newMinuteString = getWord(leftOverMinutes) + "past "+"HALF "+"past "
  }
}

else if(15<=minuteStringInt  && minuteStringInt<30){
  if(minuteStringInt == 30){
    newMinuteString = "HALF "+"past ";
  }
  else{
    var leftOverMinutes = 30-minuteStringInt;
    newMinuteString = getWord(leftOverMinutes) + "to "+"HALF "+"past ";
  }
}

else if(0<minuteStringInt  && minuteStringInt<15){
      newMinuteString = getWord(minuteStringInt) + "past "          
}

var hourStringWord = getWordHour(int(hourString));

var timestring = finalString + newMinuteString + hourStringWord + "."

finalString = "It is " + timestring.toLowerCase();
return finalString;
}


function complicatedClock(hour,minute){
  var currentTime = hour+map(minute,0,60,0,1);
  var newTime = currentTime;
  
  // LIST TO KEEP TRACK OF ALL THE SUBTRACTIONS/ADDITIONS BEING MADE
  var changes = [];

  // LIST TO KEEP TRACK OF WHETHER THE CHANGES ARE ADDITIONS OR SUBTRACTIONS
  var operator = [];

  var timeChanges = [30,15,10,5];

  for(var i = 0; i < timer; i++){

    var curIndex = int(random(0,4));

    var stepChange = timeChanges[curIndex];

    var addOrSubtract = random(0,1);

    if(addOrSubtract < 0.5){
      changes.push(stepChange);
      operator.push("+");
      newTime = newTime + map(stepChange,0,60,0,1);
      
    }

    else {
      changes.push(stepChange);
      operator.push("-");
      newTime = newTime-map(stepChange,0,60,0,1);
    }
  }
  return [newTime,changes,operator];
}


var curTimeString;
var increasing = true;
var textYTop = 20;
var frameMod = 60*8;
var oldTimeString;
var sizeOfText = 12;


function setup() {
  createCanvas(500,500);
  background(50);
  textFont("Helvetica");
  fill(255);
  noStroke();	
  curTimeString = makeTimeString(complicatedClock(hour(),minute()));
  oldTimeString = curTimeString;
}

function keyPressed(){
  if (key == ' '){
    increasing = !increasing;
  }
 
  else {
  	increasing = true;
  }
}



function draw() {
  if(frameMod < 2){
        frameMod = 2;
      }

  rectMode(CORNER);
  background(50);
  textSize(sizeOfText);

  var numElementsPerLine = (width/sizeOfText)*1.5;
  //console.log("width",textWidth(curTimeString))
  var totalElements = curTimeString.length;
  var numLines = int(totalElements/numElementsPerLine);

  var currentHeight = numLines*sizeOfText;
  //console.log(height,currentHeight);
  

  while(currentHeight > height){
    sizeOfText = sizeOfText - 0.1;
    currentHeight = numLines*sizeOfText;

  }
  

  if (frameCount % frameMod == 0 && increasing == true){
      timer+= 1;
      curTimeString = makeTimeString(complicatedClock(hour(),minute()));
    if (curTimeString.length > 2*oldTimeString.length){
      if(frameMod < 2){
        frameMod = 2;
      }
      else{
        frameMod = int(frameMod/4);
      }     
      oldTimeString = curTimeString;
    }
  }

  
  text(curTimeString,20,textYTop,460,curTimeString.length*100);
}

