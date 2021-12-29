// const gm = require('gm')
// const axios = require('axios')

// const header = Buffer.from('474946383961', 'hex');
// const logicalScreenDescriptor = Buffer.from('01000100800100', 'hex');
// const imageDescriptor = Buffer.from('2c000000000100010000', 'hex');
// const imageData = Buffer.from('0202440100', 'hex');

// function pixelPick(target) {
//   return new Promise((resolve, reject) => {
//     gm(target)
//       .resize(250, 250)
//       .colors(1)
//       .toBuffer('RGB', function (err, buffer) {
//         if (err) return reject(err);
//           const gif = [
//               header,
//               logicalScreenDescriptor,
//               buffer.slice(0, 3),
//               Buffer.from([0, 0, 0]),
//               imageDescriptor,
//               imageData
//           ];
//           const minimized = `data:image/gif;base64,${Buffer.from(gif).toString('base64')}`;
//           return resolve(minimized);
//       });
//   })
// }

// function fetchedPixelPic(url) {
//   return axios.get(encodeURI(url), { responseType: 'stream' }).then(r => pixelPick(r.data));
// }

// fetchedPixelPic('https://d6j35gv9ux3qi.cloudfront.net/img/2019지혜진개인전수정_A52_1614608066518.jpg');

const handler = require('./handler');
const s3UploadParam = {
  "Records": [
    {
      "eventVersion": "2.0",
      "eventSource": "aws:s3",
      "awsRegion": "us-west-2",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "responseElements": {
        "x-amz-request-id": "EXAMPLE123456789",
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH"
      },
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "testConfigRule",
        "bucket": {
          "name": "my-s3-bucket",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "arn:aws:s3:::example-bucket"
        },
        "object": {
          "key": "HappyFace.jpg",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
};
// handler.fetchedPixelPic({ queryStringParameters: { imgUrl: 'https://static.lookpin.co.kr/20211201111258-86c2/3c81d36637884619d10f10fdd372f8ab.jpg'}}).then(console.log)
handler.fetchedPixelPicForServer(s3UploadParam).then(console.log)