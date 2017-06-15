const cbMap = {};

const eventListener = {
    on: (route, cb) => {
        if (!this.cbMap.hasOwnProperty(route)) {
            this.cbMap[route] = [];
        }
        this.cbMap[route].push(cb);
    },

    off: (route, cb) => {
        if (!this.cbMap.hasOwnProperty(route)) {
            throw new Error(`[EventListener: off()] There is no such route: ${route}`);
        }
        for (let i = this.cbMap[route].length - 1; i >= 0; i--) {
            if (this.cbMap[route][i] === cb) {
                // this.cbMap[route] = [
                //     ...this.cbMap[route].slice(0, i),
                //     ...this.cbMap[route].slice(i + 1),
                // ];
                this.cbMap[route].splice(i, 1);
                return true;
            }
        }
        return false;
    },

    send: (route, data) => {
        if (!this.cbMap.hasOwnProperty(route)) {
            throw new Error(`[EventListener: send()] There is no such route: ${route}`);
        }
        this.cbMap[route].forEach(cb => cb(data));
    },
}

export default eventListener;