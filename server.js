const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.send('API Home Page');
});

app.use(express.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
