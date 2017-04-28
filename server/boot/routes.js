'use strict';

module.exports = function(app) {
//   // Install a `/` route that returns server status
//   var router = server.loopback.Router();
//   router.get('/', server.loopback.status());
//   server.use(router);

  // Install a "/ping" route that returns "pong"
  app.get('/status', function(req, res) {
    res.send('Aloha!');
  });
};
