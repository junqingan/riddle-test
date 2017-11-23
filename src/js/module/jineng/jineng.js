/**
 * @author [anxiaosi]
 * @email [an_xmin@163.com]
 * @create date 2017-11-23 12:06:08
 * @modify date 2017-11-23 12:06:08
*/

function start() {
    var jinengLi = $('.jineng ul').children("li");
    jinengLi.hover(function () {
        var codeHtml = $(this).find('.bg').width();
        var ParseInt = parseInt(codeHtml / $(this).width() * 100)
        $(this).find('code').html(ParseInt + '%');
        $(this).find('code').stop().animate({
            'left': codeHtml + 10,
            'opcity': 1
        }, 300, 'linear')
    }, function () {
        $(this).find('code').stop().animate({
            'left': '380px',
            'opcity': 0
        }, 1500, 'linear')
    });
};
function init() {
    start();
};
module.exports = {
    init: init
};