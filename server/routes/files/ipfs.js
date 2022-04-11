const https = require('https');

const projectId = '1qmt...XXX';
const projectSecret = 'c920...XXX';

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/add/path=?',
    method: 'POST',
};

const ipfsReq = (formData) => https.request({...options, File: formData}, (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        console.log(body);
    });
});


ipfsReq().end()

module.exports = ipfsReq;