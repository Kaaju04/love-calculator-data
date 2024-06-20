const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/save-names', (req, res) => {
    const { yourName, crushName } = req.body;
    const entry = `${yourName} and ${crushName}\n`;

    // Save the names to a file
    fs.appendFile('names.txt', entry, (err) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(200).send('Names saved');
    });
});

app.get('/view-names', (req, res) => {
    // Only you should know this URL
    fs.readFile('names.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
