const now = Date.now()
console.log(now);

const date1 = now + 60000
const date2 = date1 + 60000 * 2
console.log(new Date(date1))
console.log(date1)
console.log(new Date(date2))
console.log(date2)