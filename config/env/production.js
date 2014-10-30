module.exports = {
    dbUrl: 'mongodb://Charl:mongolab4tw@ds039277.mongolab.com:39277/codeassessments',
    dbRoot : 'admin',
    dbPassword :'KAPDyGr4G2Rp',
    crossOrigin: '',
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    address : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
};