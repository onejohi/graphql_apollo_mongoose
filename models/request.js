const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    username: String,
    avatar: String,
    password: String,
    location: {
        lat: Number,
        lon: Number,
        address: String
    },
    created_on: Date,
    bio: String
}, { collection: 'clients' });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

//Functions

//This function returns all clients in the database collection 'clients'
module.exports.getAllClients = (callback) => {
    Client.find().then(clients => {
        callback(clients);
    }).catch(err => {
        console.log(err);
    })
}

// This function returns one document that matches the ID of the request
module.exports.getOneClient = (id, callback) => {
    Client.findOne({ _id: id }).then(client => {
        callback(client);
    }).catch(err => {
        console.log(err);
    })
}