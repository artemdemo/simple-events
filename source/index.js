const cbMap = {};

const eventListener = {
    on: (type, cb) => {
        if (!this.cbMap.hasOwnProperty(type)) {
            this.cbMap[type] = [];
        }
        this.cbMap[type].push(cb);
    },

    off: (type, cb) => {
        if (!this.cbMap.hasOwnProperty(type)) {
            throw new Error(`[EventListener: off()] There is no such type: ${type}`);
        }
        for (let i = this.cbMap[type].length - 1; i >= 0; i--) {
            if (this.cbMap[type][i] === cb) {
                this.cbMap[type] = [
                    ...this.cbMap[type].slice(0, i),
                    ...this.cbMap[type].slice(i + 1),
                ];
                return true;
            }
        }
        return false;
    },

    send: (type, data) => {
        if (!this.cbMap.hasOwnProperty(type)) {
            throw new Error(`[EventListener: send()] There is no such type: ${type}`);
        }
        this.cbMap[type].forEach(cb => cb(data));
    },
}

export default eventListener;