
export async function getLatestBlockNumber(url: string) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1, // Static ID is fine for simple requests
        })
    });

    if (!response.ok) {
        let errorBody = '';
        try {
            errorBody = await response.text();
        } catch (readError) {
            // Ignore if reading fails
        }
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}. Body: ${errorBody}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(`RPC error! code: ${data.error.code}, message: ${data.error.message}`);
    }

    if (!data.result) {
        throw new Error('Invalid RPC response: Missing result field.');
    }

    const blockNumberHex = data.result;
    const blockNumber = parseInt(blockNumberHex, 16);

    if (isNaN(blockNumber)) {
        throw new Error(`Invalid RPC response: Could not parse block number from hex "${blockNumberHex}"`);
    }

    return blockNumber;
}
