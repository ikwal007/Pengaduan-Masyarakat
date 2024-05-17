import Pusher from "pusher-js";

const initPusher = () => {
    return new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
        app_id: import.meta.env.VITE_PUSHER_APP_ID,
        secret: import.meta.env.VITE_PUSHER_APP_SECRET,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });
};

export default initPusher;
