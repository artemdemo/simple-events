import simpleEvents from './index';

describe('Simple events', () => {
    it('should throw error if there is no route', (done) => {
        try {
            simpleEvents.send('unknown');
        } catch (e) {
            done();
        }
    });

    it('should subscribe to route', (done) => {
        simpleEvents.on('subscribe', () => {
            done();
        });
        simpleEvents.send('subscribe');
    });

    it('should send data', (done) => {
        const someData = {
            foo: 1,
        };
        simpleEvents.on('send-data', (data) => {
            done();
            expect(data).toEqual(someData);
        });
        simpleEvents.send('send-data', someData);
    });

    it('should call all callbacks in route', (done) => {
        let counter = 0;
        simpleEvents.on('call-all', () => {
            counter++;
        });
        simpleEvents.on('call-all', () => {
            counter++;
        });
        simpleEvents.on('call-all', () => {
            counter++;
            done();
            expect(counter).toEqual(3);
        });
        simpleEvents.send('call-all');
    });

    it('should unsubscribe spcific callback', (done) => {
        const cb = () => {
            throw new Error('This callback shouldn\'t be called');
        }
        simpleEvents.on('unsubscribe', cb);
        simpleEvents.on('unsubscribe', () => {
            done();
        });
        simpleEvents.off('unsubscribe', cb);
        simpleEvents.send('unsubscribe');
    });

    it('should remove whole route', () => {
        simpleEvents.on('remove-route', () => {
            throw new Error('This callback shouldn\'t be called');
        });
        simpleEvents.on('remove-route', () => {
            throw new Error('This callback shouldn\'t be called as well');
        });
        simpleEvents.off('remove-route');
        simpleEvents.send('remove-route');
    });
});