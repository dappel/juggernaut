var util = require("util");
var url = require("url");
var redis = require("redis");

module.exports.createClient = function () {
    var client;

    if (process.env.VCAP_SERVICES) {
        conf = JSON.parse(process.env.VCAP_SERVICES);
        credentials = conf['redis-2.2'][0].credentials;

        console.log(credentials);
        client = redis.createClient(credentials.port, credentials.hostname);
        client.auth(credentials.password);
//        console.log("AuthInfos:"+credentials.port+credentials.hostname + credentials.name + credentials.password);
    }
    else {

        if (process.env.REDISTOGO_URL) {
            var address = url.parse(process.env.REDISTOGO_URL);
            client = redis.createClient(address.port, address.hostname);
            client.auth(address.auth.split(":")[1]);
        } else {
            client = redis.createClient();
        }
    }

// Prevent redis calling exit
    client.on("error", function (error) {
        util.error(error);
    });

    client.on("connect", function (error) {
        console.log('Connected to Redis');
    });

    return client;
}
;