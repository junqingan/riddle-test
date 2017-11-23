/**
 * @author [anxiaosi]
 * @email [an_xmin@163.com]
 * @create date 2017-11-17 09:47:32
 * @modify date 2017-11-17 09:47:32
*/

window.$ = require('jquery');
require('../utils/SuperSlide');
var homeController = require("../controllers/homeController.js").getInstance();

var indexLess = require('../../less/index.min.less');
homeController.init();