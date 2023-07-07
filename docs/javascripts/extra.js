// Get the current date and time
var currentDate = new Date();

// Get the current hour from the date object (in 24-hour format)
var currentHour = currentDate.getHours();

if (currentHour >= 20 || currentHour <= 7) {
  document.getElementsByTagName('body')[0].setAttribute("data-md-color-scheme","slate")
	console.log('executed auto slate by fromitive')
}
