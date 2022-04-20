const formData = new FormData()
const now = Date.now()
console.log(new Date(now).toLocaleString())
console.log(new Date(now).toLocaleDateString().split("/"));
console.log(new Date(now).toLocaleTimeString());
console.log(new Date(now).toISOString().slice(0, 16));
const getNowDate = () => {
  const now = Date.now();
  const today = (new Date(now))
  const time = (new Date(now).toTimeString().slice(0,5))
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let date = today.getDate() + 1;


  const result = `${year}-${month}-${date}T${time}`
  console.log(result)
  time
  
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