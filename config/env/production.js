module.exports = {
    dbUrl: 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/codeassessments',
    dbRoot : 'admin',
    dbPassword :'581fda294ea757a0d649590cff1f4c9a',
    crossOrigin: '',
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    address : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
};