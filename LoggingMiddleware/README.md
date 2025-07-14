# Logging Middleware

Reusable logging function for AffordMed evaluation.

## Usage

```
const { logEvent } = require('./index');

// Example
logEvent('frontend', 'info', 'component', 'App loaded', '<Bearer Token>');
```

- stack: 'frontend' or 'backend'
- level: 'debug', 'info', 'warn', 'error', 'fatal'
- package: see allowed values in the problem statement
- message: your log message
- token: Bearer token from authentication 