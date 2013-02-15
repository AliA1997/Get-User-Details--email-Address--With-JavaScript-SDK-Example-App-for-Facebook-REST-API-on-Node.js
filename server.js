var express = require('express')
  , app = express();

app.use(express.static(__dirname));
app.use(app.router);
app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);