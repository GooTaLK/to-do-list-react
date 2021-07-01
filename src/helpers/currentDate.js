const date = new Date();

const month = date.getMonth() + 1;
const day = date.getDate();

const currYear = date.getFullYear();
const currMonth = month < 10 ? '0' + String(month) : month;
const currDay = day < 10 ? '0' + String(day) : day;

export let formatDate = `${currYear}-${currMonth}-${currDay}`;

// console.log(formatDate);
