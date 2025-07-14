const fetch = require('node-fetch');

const payload = {
  email: 'eshwarbattuwar@gmail.com',
  name: 'Battuwar Eshwar',
  mobileNo: '8143635201',
  githubUsername: 'eshwarbattuwar',
  rollNo: '12201839',
  accessCode: 'CZypQK'
};

fetch('http://20.244.56.144/evaluation-service/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => {
    console.log('Registration response:', data);
    if (data.clientID && data.clientSecret) {
      console.log('clientID:', data.clientID);
      console.log('clientSecret:', data.clientSecret);
    }
  })
  .catch(err => console.error('Error:', err)); 