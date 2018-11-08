const express = require('express');

const routes = express.Router();

const Contact = require('./models/contacts');
const controller = require('./controller');

routes.get('/contacts', controller.GetAllContacts);

routes.post('/contacts', controller.AddContact);

routes.delete('/contacts/:id', controller.deleteContact);

routes.put('/contacts/:id', controller.updateContact)

module.exports = routes;