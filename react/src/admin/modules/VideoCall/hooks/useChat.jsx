import { useState, useEffect, useRef } from "react";
import { socketService } from "../services/socketService";

const useChat = () => {
    const [mess, setMess] = useState([]);
    const [id, setId] = useState();

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketService.connect();
        socketRef.current.on("connect", () => {
            const socketId = socketRef.current.id;
         
            setId(socketId);
        });

        socketService.on("sendDataServer", (dataGot) => {
            setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
        });

        return () => {
            socketService.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        if (message) {
            const msg = {
                content: message,
                id: id,
            };
            socketService.emit("sendDataClient", msg);
        }
    };

    return {
        mess,
        sendMessage,
        id,
    };
};

export default useChat;
