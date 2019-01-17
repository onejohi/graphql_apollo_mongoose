const { ApolloServer, gql } = require('apollo-server');
const Client = require('./models/request');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/deliveryman', { useNewUrlParser: true });

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    }
];

var clients = [];

Client.getAllClients(data => {
    clients = data;
});

const typeDefs = gql`

    scalar Date

    type Book {
        title: String,
        author: String
    }

    type Location {
        lat: Float,
        lon: Float,
        address: String
    }

    type Client {
        _id: String,
        username: String,
        avatar: String,
        password: String,
        location: Location,
        created_on: Date,
        bio: String,
    }

    type Query {
        books: [ Book ],
        clients: [ Client ]
    }
`;

const resolvers = {
    Query: {
        books: () => books,
        clients: () => clients,
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server running on ${url}`);
});