const express = require('express');
const OngControler = require('./controllers/OngController');
const IncidentControler = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngControler.index);
routes.post('/ongs', OngControler.create);

routes.get('/incidents', IncidentControler.index);
routes.post('/incidents', IncidentControler.create);
routes.delete('/incidents/:id', IncidentControler.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;
