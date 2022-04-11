const formData = new FormData()

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

