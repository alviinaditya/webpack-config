const path = require('path');

module.exports = {
    paths: {
        in: path.resolve(__dirname, '../src/'),
        out: path.resolve(__dirname, '../dist/') 
    },
    server: {
        host: 'localhost',
        port: 1003
    }
};