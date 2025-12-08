

export class websocketClient {

    constructor(updateTallies) {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === 'vote_update') {
                const tallies = message.tallies;
            }
            updateTallies(tallies);
        }
    }

    sendMessage(name, msg) {
        this.notifyObservers('sent', 'me', msg);
        this.socket.send(JSON.stringify({ name, msg }));
    }

}