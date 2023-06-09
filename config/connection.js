const { connect, connection} = require('mongoose');

connect('mongodb+srv://dboscar:db1125@classactivities.ujjhnpp.mongodb.net/socialNetworkDB');

module.exports = connection;