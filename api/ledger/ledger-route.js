//All the endpoints of ledger components
var router = express.Router();
var controller = require('./controller');

router.get('/',controller.fetch_ledgers);

module.exports=router;