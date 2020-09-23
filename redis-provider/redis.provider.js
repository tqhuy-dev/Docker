const redis = require("redis");
let cl
module.exports = {
    initRedis: () => {
        const client = redis.createClient();
        client.on("error", function (error) {
            console.error(error);
        });
        cl = client
    },

    getKey: () => {
        return new Promise((resolve, reject) => {
            cl.get("test", function (err, reply) {
                // reply is null when the key is missing
                if (err) {
                    reject(err)
                } else {
                    resolve(reply)
                }
            });
        })
    },

    addKey: (key) => {
        cl.set("test" , key)
    }
}