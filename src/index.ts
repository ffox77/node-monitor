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

let POLLING_INTERVAL =  120_000;
if (process.env.POLLING_INTERVAL) {
  POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL) * 1000;
}
// Poll every minute
setInterval(pollBlockNumber, POLLING_INTERVAL);
pollBlockNumber();