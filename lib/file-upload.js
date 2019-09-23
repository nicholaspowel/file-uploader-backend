require('dotenv').config()

const fs = require('fs')
// require AWS SDK for Node.js
const AWS = require('aws-sdk')
// Config AWS to use our region
AWS.config.update({ region: 'us-east-1' })

// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

// call S3 to retrieve upload file to specified bucket
const uploadParams = {
  Bucket: process.env.BUCKET_NAME,
  Key: '',
  Body: '',
  ACL: 'public-read'
}
const file = process.argv[2]
const fileStream = fs.createReadStream(file)
fileStream.on('error', function (err) {
  console.log('File Error', err)
})
uploadParams.Body = fileStream
var path = require('path')
uploadParams.Key = path.basename(file)

s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } if (data) {
    console.log('Upload Success', data.Location)
  }
})
