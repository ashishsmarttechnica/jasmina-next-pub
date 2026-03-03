
// utils/getChatSocket.js
import { io } from "socket.io-client";

const baseURL = process.env.NEXT_PUBLIC_SOCKET_BASE;

let sockets = {};

export function getChatSocket(userId) {
    if (!userId) {
        console.error("User ID missing for socket connection");
        return null;
    }

    // Agar already connected hai to wahi socket return karo
    if (sockets[userId]) {
        return sockets[userId];
    }

    // Naya socket instance banao
    const socket = io(`${baseURL}/user-${userId}`, {
        transports: ["websocket"],
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
    });

    sockets[userId] = socket;

    return socket;
}
