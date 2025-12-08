

class websocketClient {
    observers = []
    connected = false;

    constructor() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        
        this.socket.onopen = (event) => {
            this.notifyObservers('system', 'websocket', 'connected');
        }

        this.socket.onmessage = async (event) => {

        }

        this.socket.onclose = (event) => {
            this.notifyObservers('system', 'websocket', 'disconnected');
            this.connected = false;
        }
    }

    sendMessage(name, msg) {
        this.notifyObservers('sent', 'me', msg);
        this.socket.send(JSON.stringify({ name, msg }));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

}