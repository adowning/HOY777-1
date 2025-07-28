import { WebSocket, WebSocketServer } from 'ws';

console.log("Starting WebSocket proxy server...");

// --- LZW Compression/Decompression Logic ---
// This is the decompression function you provided from the game's code.
function decompress(data) {
    if (!data.startsWith("lzw:")) return data;
    const compressed = data.substring(4);
    const dictionary = {};
    let currentChar = compressed.substring(0, 1);
    let oldPhrase = currentChar;
    let decompresseds = [currentChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < compressed.length; i++) {
        const currentCode = compressed.charCodeAt(i);
        if (currentCode < 256) {
            phrase = compressed.substring(i, 1);
        } else {
            phrase = dictionary[currentCode] ? dictionary[currentCode] : (oldPhrase + currentChar);
        }
        decompresseds.push(phrase);
        currentChar = phrase.substring(0, 1);
        dictionary[code] = oldPhrase + currentChar;
        code++;
        oldPhrase = phrase;
    }
    return decompresseds.join("");
}

// This is the corresponding compression function.
function compress(data) {
    const dictionary = {};
    let phrase = data.substring(0, 1);
    const compresseds = [phrase];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
        const currentChar = data.substring(i, 1);
        if (dictionary[phrase + currentChar]) {
            phrase += currentChar;
        } else {
            compresseds.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0));
            dictionary[phrase + currentChar] = code;
            code++;
            phrase = currentChar;
        }
    }
    compresseds.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0));
    const compressed = compresseds.map(c => typeof c === 'number' ? String.fromCharCode(c) : c).join('');
    return "lzw:" + compressed;
}


// --- WebSocket Proxy Server Logic ---
const PROXY_PORT = 8080;
const wss = new WebSocketServer({ port: PROXY_PORT });

console.log(`WebSocket proxy listening on: ws://localhost:${PROXY_PORT}`);

wss.on('connection', (clientSocket) => {
    console.log('[PROXY] Client connected.');
    let gameServerSocket;
    let isReadyForTraffic = false;

    // 1. Handle messages from the Game Client -> Proxy
    clientSocket.on('message', (message) => {
        const messageStr = message.toString();

        // The first message from the client MUST be our special config object.
        if (!isReadyForTraffic) {
            try {
                const config = JSON.parse(messageStr);
                if (config.type === 'proxy-config' && config.url) {
                    console.log(`[PROXY] Received config. Connecting to real game server at: ${config.url}`);

                    // Connect to the actual game server
                    gameServerSocket = new WebSocket(config.url, {
                        // The game server might require a specific origin header
                        origin: 'https://demo.nolimitcity.com'
                    });

                    // 2. Handle messages from the Game Server -> Proxy
                    gameServerSocket.on('message', (gameMessage) => {
                        const decompressedMessage = decompress(gameMessage.toString());
                        console.log('\n--- SERVER -> CLIENT ---');
                        console.log('Raw:', gameMessage.toString());
                        console.log('Decoded:', decompressedMessage);
                        console.log('------------------------\n');

                        // Forward the message to the actual game client
                        clientSocket.send(gameMessage);
                    });

                    gameServerSocket.on('open', () => {
                        console.log('[PROXY] Connection to real game server established.');
                        isReadyForTraffic = true;
                        // Tell the client we are ready to start the real traffic
                        clientSocket.send(JSON.stringify({ type: 'proxy-ready' }));
                    });

                    gameServerSocket.on('close', () => {
                        console.log('[PROXY] Connection to real game server closed.');
                        clientSocket.close();
                    });

                    gameServerSocket.on('error', (err) => {
                        console.error('[PROXY] Error connecting to real game server:', err);
                        clientSocket.close();
                    });

                }
            } catch (e) {
                console.error('[PROXY] First message was not a valid config. Closing connection.');
                clientSocket.close();
            }
            return; // Stop processing until the proxy is ready
        }

        // --- Default message forwarding ---
        const decompressedMessage = decompress(messageStr);
        console.log('\n--- CLIENT -> SERVER ---');
        console.log('Raw:', messageStr);
        console.log('Decoded:', decompressedMessage);
        console.log('------------------------\n');

        // Forward the message to the game server
        if (gameServerSocket && gameServerSocket.readyState === WebSocket.OPEN) {
            gameServerSocket.send(message);
        }
    });

    clientSocket.on('close', () => {
        console.log('[PROXY] Client disconnected.');
        if (gameServerSocket) {
            gameServerSocket.close();
        }
    });

    clientSocket.on('error', (err) => {
        console.error('[PROXY] Error with client connection:', err);
    });
});