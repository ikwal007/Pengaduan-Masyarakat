import { useEffect } from "react";
import initPusher from "./Init";

const usePusher = (auth, channelName, eventName, callback) => {
    useEffect(() => {
        console.log(auth, channelName, eventName, callback);
        const pusher = initPusher();
        const channel = pusher.subscribe(channelName);

        const handler = (data) => {
            if (data.email === auth.user.email) {
                callback(data);
            }
        };

        channel.bind(eventName, handler);

        return () => {
            channel.unbind(eventName);
            pusher.unsubscribe(channelName);
            pusher.disconnect();
        };
    }, [auth, channelName, eventName, callback]);
};

export default usePusher;
