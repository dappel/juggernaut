//Startup Juggernaut in Cloudfoundry Environment
Juggernaut = require("./index");
Juggernaut.listen(process.env.VCAP_APP_PORT || 3000);
