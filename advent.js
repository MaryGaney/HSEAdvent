//this list will hold all of the days that are already clicked
let daysOpened = JSON.parse(localStorage.getItem('daysClicked'));

let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];

//re-assign the icons to the random list
icons = randomizeIcons(icons);

//variable to grab all boxes and store them in a list
const boxes = document.querySelectorAll('.num')

if(daysOpened !== null){ //there is something in daysOpened
  showClikedBoxes();
}

//this function will show a particular emoji when the user clicks on a certain
//box

function handelBoxClick(event){
  const boxClicked = event.currentTarget;
  const daysClicked = boxClicked.dataset.day;
  const today = new Date();

  //compare box that was clicked to the current day
  if(today.getDate() >= Number(daysClicked)){
    console.log('Yes, you can open me!!');
    boxClicked.innerHTML = icons[Number(daysClicked)];
    storeDaysClicked(Number(daysClicked));
  }else{
    console.log('No peaking! This box is not ready yet!');
  }
}//end of handelBoxClick

//add event listener to each box
boxes.forEach(function (box){
  box.addEventListener('click', handelBoxClick);
});

//this function will put the days clicked into local storage
function storeDaysClicked(day){
//first see if daysClicked is in localStorage
if(!localStorage.getItem('daysClicked')){//daysClicked does not exist
  daysOpened = [];
}else{//if there is something in daysClicked
  daysOpened = JSON.parse(localStorage.getItem('daysClicked'));
}
//only need to push to add to daysOpened if the day is not already in there
if(!daysOpened.includes(day)){
  daysOpened.push(day);
}

localStorage.setItem('daysClicked', JSON.stringify(daysOpened));

}//end of storeDaysClicked

//this function will randomize the list of icons. Pass in old list
function randomizeIcons(oldList){
  //this will hold the randomList
  let randomList = [];
  //check if our icons have already been removed
 if(!localStorage.getItem('icons')){

  while(oldList.length > 0){//while there is still something in the oldList
    //this is a random list
    const index = Math.floor(Math.random()*oldList.length);
    //add random element or item to the randomList
    randomList.push(oldList[index]);
    //remove item that we just added
    oldList.splice(index, 1); //start at index and remove one
  }
  localStorage.setItem('icons', JSON.stringify(randomList));
}else{//if there is something in the icons list in localStorage
  randomList = JSON.parse(localStorage.getItem('icons'));

}
return randomList;
}//end of randomizeIcons


//This function will show the icons that were previously clicked
function showClikedBoxes(){
  if(daysOpened !== null){
 boxes.forEach(function (box){
   //see if the user has clicked on the day
   const day = Number(box.dataset.day);
   if(daysOpened.includes(day)){
     box.innerHTML = icons[day];
   }
 });
}
}//end of showClikedBoxes

//TO DO
//  Keep the random icons that were previously clicked on the screen

//this function will reset the calendar
function resetCalendar(){
  //only reset if they say yes to a prompt
  const answer = confirm('Are you sure you want to reset your calendar? This action cannot be undone.');
  if (answer){
    //this will clear all items in local storage
    localStorage.clear();
    //reload the page
    document.location.reload();
  }
}//end of reset calendar

//add reset button to the bottom of the calendar
//create the button element
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Button';
//add event listener to call reset function
resetButton.addEventListener('click', resetCalendar);

//place the button on the page
//grab the footer
const footer = document.querySelector('footer');
//add the button to the footer after the opening tag
footer.insertAdjacentElement('afterbegin', resetButton);
//afterbegin, beforebegin, beforeend, afterend

//add a little style
footer.style.textAlign = 'center';
footer.style.paddingTop = '20px';



//end of file
