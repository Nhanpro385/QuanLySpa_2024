import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

export const socketService = {
    socket: null,

    connect() {
        if (!this.socket) {
            this.socket = socketIOClient.connect(host);
        }
        return this.socket;
    },

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    },

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    },

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    },
};
