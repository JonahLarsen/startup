const {WebSocketServer} = require("ws");

function webSocketThing(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    const votes = {
        TopLeft: 0,
        TopMiddle: 0,
        TopRight: 0,
        MiddleLeft: 0,
        MiddleMiddle: 0,
        MiddleRight: 0,
        BottomLeft: 0,
        BottomMiddle: 0,
        BottomRight: 0
    };

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
                    client.send(responseMessage);
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