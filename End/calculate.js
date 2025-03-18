// function checkDate() {
//     const day = parseInt(document.getElementById("day").value);
//     const month = parseInt(document.getElementById("month").value);
//     const year = parseInt(document.getElementById("year").value);
//     const result = document.getElementById("result");

//     if (isNaN(day) || isNaN(month) || isNaN(year)) {
//         result.innerHTML = "❌ Please enter valid numbers.";
//         result.classList.add("text-red-500", "result-message");
//         return;
//     }

//     const date = new Date(year, month - 1, day);
//     if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
//         result.innerHTML = "✅ Valid Date!";
//         result.classList.remove("text-red-500");
//         result.classList.add("text-green-500", "result-message");
//     } else {
//         result.innerHTML = "❌ Invalid Date!";
//         result.classList.remove("text-green-500");
//         result.classList.add("text-red-500", "result-message");
//     }
// }
function  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function isValidDate(day, month, year) {
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if (month === 2) {
        if (isLeapYear(year)) {
            return day <= 29;
        } else {
            return day <= 28;
        }
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return day <= 30;
    }
    return true;
}   
function checkDate() {
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    const result = document.getElementById("result");
    if (!isValidDate(day, month, year)) {
        result.innerHTML = "❌ Invalid Date!";
        result.classList.remove("text-green-500");
        result.classList.add("text-red-500", "result-message");
    } else {
        result.innerHTML = "✅ Valid Date!";
        result.classList.remove("text-red-500");
        result.classList.add("text-green-500", "result-message");
    }
}




