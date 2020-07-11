module.exports = {
    app: {
        http2: {
            enabled: false,
            key: '/path/to/key/file',
            cert: '/path/to/cert/file',
        },
        hostname: 'localhost',
        name: 'wumpus-and-the-octocat',
        port: 8199,
    },
    discord: {
        token: undefined,
        registered_channels: [],
    },
    logger: {
        level: 'info',
    },
};
