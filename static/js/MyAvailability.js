const calendar = document.querySelector('.calendar');
console.log(document.body.innerHTML)
console.log(document.querySelectorAll('div'))
console.log(calendar)
const monthName = calendar.querySelector('.month-name');
const year = calendar.querySelector('.year');
const weekdays = calendar.querySelector('.weekdays');
const days = calendar.querySelector('.days');
const prevBtn = calendar.querySelector('.prev');
const nextBtn = calendar.querySelector('.next');

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const weekdaysList = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
];

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

showCalendar(currentMonth, currentYear);

prevBtn.addEventListener('click', () => {
	currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
	currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
	currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
	showCalendar(currentMonth, currentYear);
});

function showCalendar(month, year) {
	const firstDayOfMonth = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	monthName.textContent = months[month];
	year.textContent = year.toString();
	weekdays.innerHTML = '';

	for (let i = 0; i < weekdaysList.length; i++) {
		const weekday = document.createElement('th');
		weekday.textContent = weekdaysList[i];
		weekdays.appendChild(weekday);
	}

	days.innerHTML = '';

	let dateCount = 1;

	for (let i = 0; i < 6; i++) {
		const row = document.createElement('tr');

		for (let j = 0; j < 7; j++) {
			const cell = document.createElement('td');

			if (i === 0 && j < firstDayOfMonth) {
				cell.innerHTML = '';
			} else if (dateCount > daysInMonth) {
				cell.innerHTML = '';
			} else {
				cell.textContent = dateCount;
				cell.classList.add('available');
				cell.addEventListener('dblclick', () => {
					if (cell.classList.contains('available')) {
						cell.classList.remove('available');
						cell.classList.add('unavailable');
					} else if (cell.classList.contains('unavailable')) {
						cell.classList.remove('unavailable');
						cell.classList.add('available');
					}
				});

				dateCount++;
			}

			row.appendChild(cell);
		}

		days.appendChild(row);
	}
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', saveAvailability);
function saveAvailability() {
	const availableDates = [];
	const unavailableDates = [];
	const availableCells = document.querySelectorAll('.available');
	const unavailableCells = document.querySelectorAll('.unavailable');
  
	availableCells.forEach(cell => {
	  availableDates.push(cell.textContent);
	});
  
	unavailableCells.forEach(cell => {
	  unavailableDates.push(cell.textContent);
	});
  
	const data = {
	  availableDates: availableDates,
	  unavailableDates: unavailableDates
	};
  
	fetch('/save-availability', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => {
	  if (response.ok) {
		alert('Availability saved!');
	  } else {
		alert('Error saving availability');
	  }
	})
	.catch(error => {
	  alert('Error saving availability');
	  console.error(error);
	});
  }