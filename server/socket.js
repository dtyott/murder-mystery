const WebSocket = require('ws');

const users = new Set();

const server = new WebSocket.Server({
    port: process.env.WEBSOCKET_PORT
},
() => {
    console.log(`Websocket Server started on port ${process.env.WEBSOCKET_PORT}`);
}
);

server.on('connection', (ws) => {
    console.log('a user connected')
    const userRef = {
        ws,
    };
    users.add(userRef);

    ws.on('close', (code, reason) => {
        users.delete(userRef);
        console.log(`Connection closed: ${code} ${reason}!`);
    });
});

function broadcast(data) {
    console.log(`broadcasting ${data}`)
    server.clients.forEach(client => client.send(data));
  };

module.exports = {
    broadcast
}