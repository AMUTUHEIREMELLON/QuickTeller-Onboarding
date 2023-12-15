// const axios = require('axios');
// var data = JSON.stringify({
//   source_sdk: 'rest_api',
//   source_sdk_version: '1.0.0',
//   signature: 'mmYRrEh7LzJNErJo8XNgRIpPbrMZwtOFnK+rnN16HXY=',
//   timestamp: '2022-12-19T10:46:26.998Z',
//   partner_params: {
//     user_id: 'INTS',
//     job_id: 'INT',
//     job_type: 5,
//   },
//   country: 'UG',
//   id_type: 'NATIONAL_ID_NO_PHOTO',
//   id_number: '00000000000000',
//   first_name: '',
//   last_name: '',
//   dob: '',
//   bank_code: '',
//   partner_id: '2384',
// });

// var config = {
//   method: 'post',
//   url: 'https://testapi.smileidentity.com/v1/id_verification',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   data: data,
// };

// axios(config).then(function (response) {
//   console.log(response.data);
// });

let date = '2000-09-20T00:00:00';
const formattedDate = new Date(date).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
console.log(formattedDate);
