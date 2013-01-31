var express = require('express')
  , app = express();

var port = process.env.OPENSHIFT_INTERNAL_PORT || 3000
  , ipaddr = process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1';

app.use(express.static(__dirname));
app.use(app.router);
app.listen(port, ipaddr);