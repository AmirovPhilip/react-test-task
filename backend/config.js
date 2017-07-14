var config = {
    database: 'mongodb://localhost:27017/myapi',
    port: '8090',
    session: {
        secret: 'secret',
        key: 'sid',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: null
        }
    }
};

module.exports = config;
