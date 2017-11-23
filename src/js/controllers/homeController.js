/**
 * @author [anxiaosi]
 * @email [an_xmin@163.com]
 * @create date 2017-11-23 12:06:46
 * @modify date 2017-11-23 12:06:46
*/

var work_experience = require("../module/work_experience/experience"),
    jineng =require('../module/jineng/jineng');

var Home = function () {
    this.options = {};
    this.redianM = null, this.redianC = null;
};

/**
 * 初始化
 * @param options Object 参数传递
 */
Home.prototype.init = function (options) {
    $.extend(this.options, options);
    this.initExperience();
    this.initJineng();
}


/**
 * 工作经验
 */
Home.prototype.initExperience = function () {
    work_experience.init();
};

/**
 * 技能熟练度
 */
Home.prototype.initJineng = function () {
    jineng.init();
};



var instance;

module.exports = {
    'getInstance': function(options) {
        return instance || (instance = new Home(options));
    }
};