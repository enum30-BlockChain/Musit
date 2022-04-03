const now = Date.now()
console.log(now)
console.log(new Date(now))

const date1 = new Date(2022, 03, 03, 16, 23)
const date2 = new Date(2022, 03, 03, 16, 24)
console.log(date1.getTime())
console.log(date2.getTime())