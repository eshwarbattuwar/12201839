# AffordMed URL Shortener (Frontend)

## Overview
This is a React-based URL Shortener web application for the AffordMed Campus Hiring Evaluation. It features:
- URL shortening (simulated on the client side)
- Custom logging middleware (logs sent to the provided backend)
- Material UI for styling
- Robust client-side validation and error handling

## Features
- Shorten up to 5 URLs at once
- Optional validity period (defaults to 30 minutes)
- Optional custom shortcode (must be unique and alphanumeric)
- All actions logged to the backend `/evaluation-service/logs` endpoint
- Simulated short URL generation and expiry (no backend for actual shortening)
- Clean, responsive UI

## How to Run
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the app:
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Logging Middleware
- All significant events (shortening, errors, etc.) are logged to the backend using the provided Bearer token.
- Logging endpoint: `http://20.244.56.144/evaluation-service/logs`

## Simulated URL Shortening
- Since the backend does **not** provide a URL shortening API, all short URLs are generated and managed on the client side.
- Each short URL is unique for the session and displayed in the results.

## Assignment Note
> **Note:** The provided backend only exposes a logging endpoint. There is no API for actual URL shortening. All shortening logic is simulated in the frontend as per assignment requirements.

## Screenshots
- (Add screenshots of your working UI here before submission)

## Author
Battuwar Eshwar 