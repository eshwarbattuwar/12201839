const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

/**
 * Sends a log to the AffordMed log API.
 * @param {string} stack - 'backend' or 'frontend'
 * @param {string} level - 'debug', 'info', 'warn', 'error', 'fatal'
 * @param {string} pkg - package name (see allowed values)
 * @param {string} message - log message
 * @param {string} token - Bearer token for auth
 */
async function logEvent(stack, level, pkg, message, token) {
  try {
    const res = await fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
    return await res.json();
  } catch (err) {
    // Optionally handle error
    return { error: err.message };
  }
}

module.exports = { logEvent }; 