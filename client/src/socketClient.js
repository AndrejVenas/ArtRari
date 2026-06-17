import { Client } from '@stomp/stompjs';
import { WS_BASE_URL } from './config/api';

export const subscribeToLotBids = (lotId, onNewBidReceived) => {
    const client = new Client({
        brokerURL: `${WS_BASE_URL}/websocket`,
        reconnectDelay: 5000,
        debug: (str) => console.log('STOMP:', str),
    });


    client.onConnect = () => {
        console.log("STOMP CONNECTED");

        client.subscribe(`/topic/lots.${lotId}.bids`, (message) => {
            // console.log("MESSAGE OBJECT:", message);
            // console.log("BODY:", message.body);

            if (!message.body) {
                console.error("EMPTY MESSAGE BODY");
                return;
            }

            try {
                const data = JSON.parse(message.body);
                // console.log("PARSED:", data);

                onNewBidReceived(data);
            } catch (e) {
                // console.error("JSON ERROR:", e);
            }
        });
    };

    client.onStompError = (frame) => {
        console.error("STOMP ERROR:", frame);
    };

    client.activate();

    return () => {
        client.deactivate();
    };
};
