const {WebSocketServer} = require("ws");

function webSocketThing(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on("connection", (socket) => {
        socket.isAlive = true;

        socket.on("message", function tallies(data) {
            const tally = JSON.parse(data.toString());

            if (tally.type === 'vote') {
                votes[tally.option] += 1
            }

            const responseMessage = JSON.stringify({
                type: 'vote_update',
                tallies: votes
            });

            socketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        socket.on("pong", () => {
            socket.isAlive = true;
        });
    });

    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000)
}

module.exports = { webSocketThing };