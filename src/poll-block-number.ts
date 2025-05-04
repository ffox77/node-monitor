import {getLatestBlockNumber} from "./evm-node";


let lastBlockNumber = 0;
let lastTime = 0;

function sendAlert(text: string) {
  return fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
}

export async function pollBlockNumber() {

  if (!process.env.WEBHOOK_URL) {
    throw new Error('No webhook URL provided.');
  }

  if (!process.env.RPC_URL) {
    throw new Error('No RPC URL provided.');
  }

  const currentTime = Date.now();
  const timePassedInSeconds = (currentTime - (lastTime || currentTime)) / 1000;

  try {
    const blockNumber = await getLatestBlockNumber(process.env.RPC_URL);
    console.log('Latest block number:', blockNumber);

    if (blockNumber === 0) {
      // Alert: block number is zero
      sendAlert('Block number is zero!');
    }
    if (blockNumber === lastBlockNumber) {
      // Alert: block not syncing
      sendAlert(`Block number not increasing - block (${blockNumber}) - Time Ago (${timePassedInSeconds}s)`);
    }
    else {
      lastTime = currentTime;
    }
    lastBlockNumber = blockNumber;
  } catch (err) {
    // Alert: no connection or timeout
    sendAlert(`Error fetching block number - block (${lastBlockNumber}) - Time Since Last Change (${timePassedInSeconds}s)`);
  }
}

