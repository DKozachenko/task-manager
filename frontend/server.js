/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'dist', 'task-manager')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'task-manager', 'index.html'));
});

app.listen(port);

