const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Use Render's PORT or fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// Enable CORS (optional if frontend is served from same server)
app.use(cors());

// Serve static frontend files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Tracking endpoint
app.get('/track', (req, res) => {
    const number = req.query.number;
    if (!number) {
        return res.status(400).json({ error: 'Tracking number is required' });
    }

    const dataPath = path.join(__dirname, 'trackingData.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Server Error' });
        }
        const tracking = JSON.parse(data);
        const result = tracking[number.toUpperCase()];
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({
                error: 'Tracking Number not found'
            });
        }
    });
});

// Fallback for SPA routing (send index.html for unknown routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`XTracking backend is running on port ${PORT}`);
});
