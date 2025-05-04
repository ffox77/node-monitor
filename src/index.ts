require('dotenv').config();
import {pollBlockNumber} from "./poll-block-number";

import express from 'express';
const app = express();

app.get('/health', (req, res) => {
  res.send('OK');
});

const port = parseInt(process.env.PORT || '3008');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Poll every minute
setInterval(pollBlockNumber, 120_000);
pollBlockNumber();