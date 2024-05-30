import { useEffect } from "react";
import initPusher from "./Init";

const usePusher = (auth, channelName, eventName, callback) => {
    useEffect(() => {
        const pusher = initPusher();
        const channel = pusher.subscribe(channelName);

        const handler = (data) => {
            if (data.email === auth.user.email || auth.user.role.name === "Pelayanan_Publik") {
                callback(data);
            }
        };

        channel.bind(eventName, handler);

        return () => {
            channel.unbind(eventName);
            pusher.unsubscribe(channelName);
            pusher.disconnect();
        };
    }, []);
};

export default usePusher;
