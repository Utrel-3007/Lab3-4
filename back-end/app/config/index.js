const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: "mongodb://localhost:27017/contactbook"
    },
    jwt: {
        secret: "contactbook-secret-key"
    }
};

module.exports = config;
