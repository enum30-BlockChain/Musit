const formData = new FormData()
const now = Date.now()
console.log(new Date(now).toLocaleString())
console.log(new Date(now).toLocaleDateString().split("/"));
console.log(new Date(now).toLocaleTimeString());
console.log(new Date(now).toISOString().slice(0, 16));
const getNowDate = () => {
  const now = Date.now();
  const date = new Date(now).toLocaleDateString().split("/")
  date[0] = ("0" + date[0]).slice(-2)
  date[1] = ("0" + date[1]).slice(-2)
  const time = new Date(now).toLocaleTimeString().split(":")
  time[0] = ("0" + time[0]).slice(-2)
  time[1] = ("0" + time[1]).slice(-2)
  return `${date[2]}-${date[0]}-${date[1]}T${time[0]}:${time[1]}`
}
console.log(getNowDate())

const json = JSON.stringify({img: 123})

formData.append("img", 123)
const formDataToJson = {};
for ([k,v] of formData) {
  formDataToJson[k] = v;
}

const x= "123";
console.log(x.length)
console.log(formDataToJson)
console.log(json)

const y = {
  one: "",
}

if(y.one == undefined) {
  console.log(1)
} else {
  console.log(2)
}