const datePicker = document.getElementById("date-picker");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

function getDateInAllFormats(day, month, year) {
	const yy = year.slice(-2);
	const ddmmyyyy = day + month + year;
	const mmddyyyy = month + day + year;
	const yyyymmdd = year + month + day;
	const ddmmyy = day + month + yy;
	const mmddyy = month + day + yy;
	const yyddmm = yy + day + month;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(dates) {
	const palindrome = dates.filter((str) => {
		return str === str.split("").reverse().join("");
	});

	return palindrome.length > 0;
}

function getNextDate(date) {
	const currentDate = new Date(date.year, date.month - 1, date.day);
	const nextDate = new Date(currentDate.getTime() + 86400000);
	let [day, month, year] = [
		nextDate.getDate(),
		nextDate.getMonth() + 1,
		nextDate.getFullYear(),
	];
	if (month < 10) {
		month = "0" + String(month);
	}
	console.log(month);
	const dateObj = {
		day: String(day),
		month: String(month),
		year: String(year),
	};
	return dateObj;
}

function getPrevDate(date) {
	const currentDate = new Date(date.year, date.month - 1, date.day);
	const nextDate = new Date(currentDate.getTime() - 86400000);
	let [day, month, year] = [
		nextDate.getDate(),
		nextDate.getMonth() + 1,
		nextDate.getFullYear(),
	];
	if (month < 10) {
		month = "0" + String(month);
	}
	console.log(month);
	const dateObj = {
		day: String(day),
		month: String(month),
		year: String(year),
	};
	return dateObj;
}

function getNearestPalindromeDate(day, month, year) {
	let nextDate = getNextDate({ day, month, year });
	let prevDate = getPrevDate({ day, month, year });
	let count = 0;

	while (1) {
		count++;
		let dates = getDateInAllFormats(
			nextDate.day,
			nextDate.month,
			nextDate.year
		);

		if (checkPalindromeForAllDateFormats(dates)) {
			return [count, nextDate, "next"];
		}
		dates = getDateInAllFormats(prevDate.day, prevDate.month, prevDate.year);
		if (checkPalindromeForAllDateFormats(dates)) {
			return [count, prevDate, "prev"];
		}
		nextDate = getNextDate(nextDate);
		prevDate = getPrevDate(prevDate);
	}
}

checkBtn.addEventListener("click", () => {
	const date = datePicker.value;

	if (date !== "") {
		const dateArray = date.split("-");
		const year = dateArray[0];
		const month = dateArray[1];
		const day = dateArray[2];

		const dateFormatList = getDateInAllFormats(day, month, year);
		const isPalindrome = checkPalindromeForAllDateFormats(dateFormatList);
		console.log(isPalindrome);
		result.style.display = "block";
		result.style.borderColor = "#292929";
		if (isPalindrome) {
			result.innerText = "Yay! Your birthday is a palindrome";
		} else {
			const [count, date, tag] = getNearestPalindromeDate(day, month, year);
			const dateStr = `${date.day}-${date.month}-${date.year}`;
			if (tag === "next") {
				result.innerText = `The nearest palindrome date is ${dateStr}, which is in ${count} days.`;
			} else {
				result.innerText = `The nearest palindrome date is ${dateStr}, which was ${count} days ago.`;
			}
		}
	} else {
		result.style.display = "block";
		result.style.borderColor = "red";
		result.innerText = "Please enter a date";
	}
});
