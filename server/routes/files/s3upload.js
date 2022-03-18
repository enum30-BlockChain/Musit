const AWS =  require ("aws-sdk");   //s3연결 페키지
const multer = require('multer');   //client로부터 formdata가져올수있음
const moment = require('moment');   //시간 표시 module
const multerS3 = require('multer-s3');  //s3올리는 module
require("dotenv").config();

const s3 = new AWS.S3({ //s3.Connect
  accessKeyId:      process.env.ACCESS_KEY_ID,
  secretAccessKey:  process.env.SECRET_ACCESS_KEY,
  region:           process.env.REGION
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.BUCKET,               // s3 생성시 버킷명
  metadata: function (req, img, cb) {
    cb(null, {fieldName: img.fieldname});   // 파일 메타정보를 저장합니다.
  },
  key: function (req, img, cb) {
    cb(null, moment().format('YYYYMMDDHHmmss') + "_" + img.originalname) // key... 저장될 파일명과 같이 해봅니다.
  }
})

const upload = multer({ storage:storage }).single("img");
module.exports = upload;