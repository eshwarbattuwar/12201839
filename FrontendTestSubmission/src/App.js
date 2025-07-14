import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AffordMed URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Shorten URL</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App; 