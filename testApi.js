const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlc2h3YXJiYXR0dXdhckBnbWFpbC5jb20iLCJleHAiOjE3NTI0NzE2MTEsImlhdCI6MTc1MjQ3MDcxMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIzNjA0OGY0LWZlYjUtNDhlMS1hZWEwLTg5ODJhYWY5MmFhNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhdHR1d2FyIGVzaHdhciIsInN1YiI6ImY3ZjJjY2E0LWYyNWQtNGQ0Zi1iNDBkLTQ0ZDQwNjM1MDVmMCJ9LCJlbWFpbCI6ImVzaHdhcmJhdHR1d2FyQGdtYWlsLmNvbSIsIm5hbWUiOiJiYXR0dXdhciBlc2h3YXIiLCJyb2xsTm8iOiIxMjIwMTgzOSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6ImY3ZjJjY2E0LWYyNWQtNGQ0Zi1iNDBkLTQ0ZDQwNjM1MDVmMCIsImNsaWVudFNlY3JldCI6InJGbVZacnVYcFpSY1RUTVAifQ.lQAsu3DX3YhZGpBZWhUAGKmfHUeJT77rJyvfyd6OMx8'; // Replace with your actual token

fetch('http://20.244.56.144/evaluation-service/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`
  },
  body: JSON.stringify({
    url: 'https://chatgpt.com/c/67d00ada-af70-800a-ab55-2265f3051cce',
    validity: 5
  })
})
  .then(res => res.text())
  .then(data => console.log('Raw API response:', data))
  .catch(err => console.error('Error:', err));
