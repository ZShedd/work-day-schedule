var currentDateElement = $('#currentDay');
var timeBlockElements = $('.time-block');
var saveButtonElements = $('.saveBtn');

$(function () {
  var currentTime = Number(dayjs().format('H'));
  var timeBlockInt;
  var todayLocalStorage = dayjs().format('M/D/YYYY');
  localStorage.setItem('date', todayLocalStorage); 
//Change time blocks to current sestting.
  for (let i = 0; i < timeBlockElements.length; i++) {
    timeBlockInt = Number(timeBlockElements[i].id);
    if (currentTime < timeBlockInt) {
      timeBlockElements[i].classList.add('future');
    } else if (currentTime > timeBlockInt) {
      timeBlockElements[i].classList.add('past');
    } else {
      timeBlockElements[i].classList.add('present');
    }
  }
// Save inputs to local storage
  saveButtonElements.click(function () {
    var item = $(this)
    var id = item.parent().attr('id');
    var eventInput = item.siblings('.description').val();
    localStorage.setItem(id, eventInput);
  })
  //check local storage and add to schedule 
  if (localStorage) {
    var savedEventTimeBlockId;
    var savedEventText;
    var textArea = $('.description')
    
    
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      console.log(localStorage.key(i))
      savedEventTimeBlockId = localStorage.key(i);
      savedEventText = localStorage.getItem(savedEventTimeBlockId);

      if (localStorage.key(i) === "date") {
        if (localStorage.getItem(savedEventTimeBlockId) != todayLocalStorage) { 
          localStorage.clear();
        } 
      }

      for (let i = 0; i < timeBlockElements.length; i++) {
        if (savedEventTimeBlockId === timeBlockElements[i].id) {
          textArea[i].value = savedEventText;
        }
      }
    }
  }

  var todayDisplay = dayjs().format('M/D/YYYY h:mm A');
  currentDateElement.text(todayDisplay);
});