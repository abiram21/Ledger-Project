// Each components routes are imported and used
module.exports = function(app) {
    app.use(process.env.BASE_URL+'/ledgers', require('./api/ledger'));  
}
