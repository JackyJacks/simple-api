const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization header' });
    }

    // Decode the base64 encoded username and password
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Validate username and password
    if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
        return res.status(401).json({ error: `Unauthorized: Invalid basic credentials` });
    }
    
    // Token is valid, proceed next
    next();
};

// Endpoint 1: Return "hello world", kinda
app.get('/greet', (req, res) => {
    res.send('Hallo Welt');
});

// Endpoint 2: Return personalized message
app.get('/greet/:name', authenticate, (req, res) => {
    const name = req.params.name;
    if (!name) {
        return res.status(400).json({ error: 'Please provide a name parameter' });
    }
    const date = new Date().toLocaleDateString();
    res.send(`Hallo ${name}. Heute ist ${date}.`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});