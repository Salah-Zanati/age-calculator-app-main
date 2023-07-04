/** @format */
// get elements we need
let dayInput = document.getElementById("dayInput"),
	monthInput = document.getElementById("monthInput"),
	yearInput = document.getElementById("yearInput"),
	calculationBtn = document.getElementById("calculationBtn"),
	yearSpan = document.querySelector(".year-span"),
	monthSpan = document.querySelector(".month-span"),
	daySpan = document.querySelector(".day-span");
// create class to save all functions
let validation = {
	emptyError: function (inputs, clsName) {
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].value == "") {
				inputs[i].parentElement.classList.add(clsName);
				inputs[i].parentElement.classList.add("error");
				inputs[i].classList.add("error");
			} else if (inputs[i] != "") {
				if (inputs[i].parentElement.className.includes(clsName)) {
					inputs[i].classList.remove("error");
					inputs[i].parentElement.classList.remove("error");
					inputs[i].parentElement.classList.remove(clsName);
				}
			}
		}
	},
	invalidError: function (inputs, classesNames) {
		if (parseInt(inputs[0].value) > 31 || parseInt(inputs[0].value) < 1) {
			inputs[0].parentElement.classList.add(classesNames[0]);
			inputs[0].parentElement.classList.add("error");
			inputs[0].classList.add("error");
		} else {
			if (inputs[0].parentElement.className.includes(classesNames[0])) {
				inputs[0].parentElement.classList.remove(classesNames[0]);
				inputs[0].parentElement.classList.remove("error");
				inputs[0].classList.remove("error");
			}
		}
		if (parseInt(inputs[1].value) > 12 || parseInt(inputs[1].value) < 1) {
			inputs[1].parentElement.classList.add("invalid-month-error");
			inputs[1].parentElement.classList.add("error");
			inputs[1].classList.add("error");
		} else {
			if (inputs[1].parentElement.className.includes(classesNames[1])) {
				inputs[1].parentElement.classList.remove(classesNames[1]);
				inputs[1].parentElement.classList.remove("error");
				inputs[1].classList.remove("error");
			}
		}
		if (
			parseInt(inputs[2].value) > new Date().getFullYear() ||
			parseInt(inputs[2].value) < new Date().getFullYear() - 100
		) {
			inputs[2].parentElement.classList.add("invalid-year-error");
			inputs[2].parentElement.classList.add("error");
			inputs[2].classList.add("error");
		} else {
			if (inputs[2].parentElement.className.includes(classesNames[2])) {
				inputs[2].parentElement.classList.remove(classesNames[2]);
				inputs[2].parentElement.classList.remove("error");
				inputs[2].classList.remove("error");
			}
		}
	},
	wholeFormError: function (day, month, year) {
		let state = true;
		switch (parseInt(month.value)) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				if (parseInt(day.value) > 31 || parseInt(day.vlaue) < 1) state = false;
				else state = true;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				if (parseInt(day.value) > 30 || parseInt(day.vlaue) < 1) state = false;
				else state = true;
				break;
			case 2:
				if (parseInt(year.vlaue) % 4 == 0) {
					if (parseInt(day.value) > 29 || parseInt(day.value) < 1) {
						state = false;
					} else {
						state = true;
					}
				} else if (parseInt(year.vlaue) % 4 != 0) {
					if (parseInt(day.value) > 28 || parseInt(day.value) < 1) {
						state = false;
					} else {
						state = true;
					}
				}
				break;
		}
		if (state == true) {
			if (day.parentElement.className.includes("invalid-date")) {
				day.classList.remove("error");
				day.parentElement.classList.remove("error");
				day.parentElement.classList.remove("invalid-date");
				month.classList.remove("error");
				month.parentElement.classList.remove("error");
				year.classList.remove("error");
				year.parentElement.classList.remove("error");
			}
		} else {
			day.classList.add("error");
			day.parentElement.classList.add("error");
			day.parentElement.classList.add("invalid-date");
			month.classList.add("error");
			month.parentElement.classList.add("error");
			year.classList.add("error");
			year.parentElement.classList.add("error");
		}
	},
};
// on click (calculationBtn)
calculationBtn.onclick = function () {
	validation.emptyError([dayInput, monthInput, yearInput], "empty-error");
	validation.invalidError(
		[dayInput, monthInput, yearInput],
		["invalid-day-error", "invalid-month-error", "invalid-year-error"]
	);
	validation.wholeFormError(dayInput, monthInput, yearInput);
	if (
		!dayInput.parentElement.classList.contains("error") ||
		!monthInput.parentElement.classList.contains("error") ||
		!yearInput.parentElement.classList.contains("error")
	) {
		let dateNow = new Date(),
			birthDay = new Date(
				`${yearInput.value}-${monthInput.value}-${dayInput.value}`
			);
		let age = dateNow - birthDay;
		let years = age / 1000 / 60 / 60 / 24 / 365.2;
		let months = (years % Math.floor(years)) * 12;
		let days = (months % Math.floor(months)) * 30;
		yearSpan.textContent = Math.floor(years);
		monthSpan.textContent = Math.floor(months);
		daySpan.textContent = Math.floor(days);
	}
};
// calculationBtn.
