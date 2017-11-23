/**
 * @author [anxiaosi]
 * @email [an_xmin@163.com]
 * @create date 2017-11-17 09:47:11
 * @modify date 2017-11-17 09:47:11
*/

function start() {
    // 工作经验hover效果
    $('.W-tim-ul,.W-work-right ul').find('li').hover(function () {
        $('.W-jie1').eq($(this).index()).css('color', '#6bc30d');
        if ($(this).index() == 0) {
            xuanz1(0, '57px')
        } else if ($(this).index() == 1) {
            xuanz1(1, '160px')
        } else if ($(this).index() == 2) {
            xuanz1(2, '260px')
        }
    }, function () {
        if ($(this).index() == 0) {
            xuanz2(0, '63px')
        } else if ($(this).index() == 1) {
            xuanz2(1, '165px')
        } else if ($(this).index() == 2) {
            xuanz2(2, '265px')
        }
    });

    function xuanz1(n, top) {
        $('.W-tim-ul li').find('span').eq(n).stop().animate({
            'border-width': '8px',
            'right': '-20px',
            'top': top
        }, 100, 'linear')
    }

    function xuanz2(n, top) {
        $('.W-tim-ul li').find('span').eq(n).stop().animate({
            'border-width': '2px',
            'right': '-14px',
            'top': top
        })
    };
};

function init() {
    start();
}
module.exports = {
    init: init
};