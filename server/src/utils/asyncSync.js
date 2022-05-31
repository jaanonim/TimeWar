const AsyncLock = require("async-lock");
let lock = new AsyncLock();
const runWhenUnlock = async (key, fn) => {
    return new Promise((resolve) =>
        lock.acquire(
            key,
            async (done) => {
                let res = await fn();
                done();
                resolve(res);
            },
            null,
            {}
        )
    );
};

module.exports = { runWhenUnlock };
