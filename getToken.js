const fetch = require('node-fetch');

const payload = {
  email: 'eshwarbattuwar@gmail.com',
  name: 'Battuwar Eshwar',
  rollNo: '12201839',
  accessCode: 'CZypQK',
  clientID: 'f7f2cca4-f25d-4d4f-b40d-44d4063505f0',         // <-- your clientID
  clientSecret: 'rFmVZruXpZRcTTMP'  // <-- your clientSecret
};

fetch('http://20.244.56.144/evaluation-service/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => {
    console.log('Auth response:', data);
    if (data.access_token) {
      console.log('Your Bearer token:', data.access_token);
    }
  })
  .catch(err => console.error('Error:', err)); 