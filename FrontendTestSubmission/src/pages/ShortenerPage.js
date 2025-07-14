import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, Alert } from '@mui/material';
// Import the logging middleware
import { logEvent } from '../LoggingMiddleware/index';

const MAX_URLS = 5;
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlc2h3YXJiYXR0dXdhckBnbWFpbC5jb20iLCJleHAiOjE3NTI0NzE2MTEsImlhdCI6MTc1MjQ3MDcxMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIzNjA0OGY0LWZlYjUtNDhlMS1hZWEwLTg5ODJhYWY5MmFhNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhdHR1d2FyIGVzaHdhciIsInN1YiI6ImY3ZjJjY2E0LWYyNWQtNGQ0Zi1iNDBkLTQ0ZDQwNjM1MDVmMCJ9LCJlbWFpbCI6ImVzaHdhcmJhdHR1d2FyQGdtYWlsLmNvbSIsIm5hbWUiOiJiYXR0dXdhciBlc2h3YXIiLCJyb2xsTm8iOiIxMjIwMTgzOSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6ImY3ZjJjY2E0LWYyNWQtNGQ0Zi1iNDBkLTQ0ZDQwNjM1MDVmMCIsImNsaWVudFNlY3JldCI6InJGbVZacnVYcFpSY1RUTVAifQ.lQAsu3DX3YhZGpBZWhUAGKmfHUeJT77rJyvfyd6OMx8';

const initialUrlState = { url: '', validity: '', shortcode: '', error: {} };

function generateShortcode(existingShortcodes, preferred) {
  // Use preferred if valid and unique
  if (preferred && /^[a-zA-Z0-9]{1,20}$/.test(preferred) && !existingShortcodes.has(preferred)) {
    return preferred;
  }
  // Otherwise, generate a random unique shortcode
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8);
  } while (existingShortcodes.has(code));
  return code;
}

function ShortenerPage() {
  const [urls, setUrls] = useState(Array(MAX_URLS).fill().map(() => ({ ...initialUrlState })));
  const [results, setResults] = useState([]);
  const [apiError, setApiError] = useState('');

  const handleChange = (idx, field, value) => {
    const newUrls = [...urls];
    newUrls[idx][field] = value;
    setUrls(newUrls);
  };

  const validate = (entry) => {
    const error = {};
    // Basic URL validation
    if (!entry.url) error.url = 'URL is required';
    else {
      try {
        new URL(entry.url);
      } catch {
        error.url = 'Invalid URL format';
      }
    }
    // Validity must be empty or a positive integer
    if (entry.validity && (!/^\d+$/.test(entry.validity) || parseInt(entry.validity) <= 0)) {
      error.validity = 'Validity must be a positive integer (minutes)';
    }
    // Shortcode: alphanumeric, reasonable length
    if (entry.shortcode && !/^[a-zA-Z0-9]{1,20}$/.test(entry.shortcode)) {
      error.shortcode = 'Shortcode must be alphanumeric (max 20 chars)';
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setResults([]);
    const newUrls = urls.map((entry) => {
      const error = validate(entry);
      return { ...entry, error };
    });
    setUrls(newUrls);
    const validEntries = newUrls.filter(entry => Object.keys(entry.error).length === 0 && entry.url);
    if (validEntries.length === 0) return;

    // Simulate shortening
    const existingShortcodes = new Set();
    const now = new Date();
    const responses = [];
    for (let entry of validEntries) {
      const validity = entry.validity ? parseInt(entry.validity) : 30;
      const shortcode = generateShortcode(existingShortcodes, entry.shortcode);
      existingShortcodes.add(shortcode);
      const expiry = new Date(now.getTime() + validity * 60000).toLocaleString();
      const shortUrl = `http://localhost:3000/${shortcode}`;
      responses.push({
        shortUrl,
        expiry,
        longUrl: entry.url,
        shortcode
      });
      await logEvent('frontend', 'info', 'component', `Shortened URL: ${entry.url} -> ${shortUrl}`, BEARER_TOKEN);
    }
    setResults(responses);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Shorten up to 5 URLs</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urls.map((entry, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">URL #{idx + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Long URL"
                      fullWidth
                      required
                      value={entry.url}
                      onChange={e => handleChange(idx, 'url', e.target.value)}
                      error={!!entry.error.url}
                      helperText={entry.error.url}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      label="Validity (minutes)"
                      fullWidth
                      value={entry.validity}
                      onChange={e => handleChange(idx, 'validity', e.target.value)}
                      error={!!entry.error.validity}
                      helperText={entry.error.validity}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      label="Preferred Shortcode"
                      fullWidth
                      value={entry.shortcode}
                      onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                      error={!!entry.error.shortcode}
                      helperText={entry.error.shortcode}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained">Shorten URLs</Button>
        </Box>
      </form>
      {apiError && <Alert severity="error" sx={{ mt: 2 }}>{apiError}</Alert>}
      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Results</Typography>
          {results.map((res, idx) => (
            <Paper key={idx} sx={{ p: 2, mt: 2 }}>
              <Typography>Shortened URL: <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></Typography>
              <Typography>Expires at: {res.expiry}</Typography>
              <Typography>Original URL: {res.longUrl}</Typography>
              <Typography>Shortcode: {res.shortcode}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ShortenerPage; 