window.addEventListener('load', function () {
    // head模块
    // 获取cookie
    var username = getCookie("username");
    var topInfo1 = document.getElementById('uname');
    var topInfo2 = document.getElementById('unname');
    var topInfo1Span = document.querySelector('#uname .user-msg>span');
    var logoutBtn = topInfo1.querySelector('.logout');
    var userMenu = topInfo1.querySelector('.user-menu');
    var useMsg = topInfo1.querySelector('#user-msg');
    // console.log(useMsg);
    if (username) {
        topInfo1.style.display = 'block';
        topInfo2.style.display = 'none';
        topInfo1Span.innerHTML = username;
    }

    // 退出按钮
    logoutBtn.addEventListener('click', function () {
        // 删除cookie
        removeCookie("username");
        topInfo1.style.display = 'none';
        topInfo2.style.display = 'block';
    })

    userMenu.addEventListener('mouseover', function () {
        useMsg.style.color = '#ff6700';
        useMsg.style.background = '#fff';
    })
    userMenu.addEventListener('mouseout', function () {
        useMsg.style.color = '';
        useMsg.style.background = '';
    })
})

$(function () {
    $('#tab-list li').mouseover(function () {
        $(this).addClass('tab-active').siblings().removeClass('tab-active');
        var index = $(this).index()
        // console.log(index);
        $('#goods-list-r .brick-list').eq(index).show().siblings().hide();
    })

    $('.header-nav>.active').hover(function () {
        $('.header-menu').stop().slideToggle(200);
    })
    $('.header-menu').hover(function () {
        $(this).stop().slideToggle(200);
    })
    $('.header-nav>.active').mouseover(function () {
        var index = $(this).index();
        // console.log(index);
        $('.header-menu ul').eq(index).show().siblings('ul').hide();
    })

    // 返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('.goback')[0].style.visibility = 'visible';
        } else {
            $('.goback')[0].style.visibility = 'hidden';
        }

        $('.goback').click(function () {
            $(window).scrollTop(0)
        })
    })

    // 用户名区域下拉菜单
    $('#user-msg').hover(function () {
        $('.user-menu').stop().slideToggle(200)
    })
    $('.user-menu').hover(function () {
        $(this).stop().slideToggle(200);
    })


    // login-notic模块点击X
    $('.login-notic .icon-shanchu').on('click', function () {
        $(this).parents('.login-notic').remove();
    })

    // 页面滚动让product-box模块变为fixed
    $(window).on('scroll', function () {
        // console.log($(document).scrollTop())
        var goodsTop = $('.goods-detail').offset().top;
        if ($(document).scrollTop() >= goodsTop) {
            $('.product-box-fixed').slideDown();
        } else {
            $('.product-box-fixed').slideUp();
        }
    })

    // 放大镜
    class Enlarge {
        constructor(ele) {
            // console.log($(ele))


            this.init();
        }
        init() {
            // 小图片点击
            $('.small-img>img').on('click', this.toggleSmall);
            // 鼠标移入事件
            $('.img-left').hover(this.mouseEnter);
            // 鼠标移动事件
            $('.img-left').on('mousemove', this.mouseMove);
        }

        //小图片切换功能
        toggleSmall() {
            $(this).addClass('active').siblings().removeClass('active');
            var src = $(this).prop('src');
            // console.log($(this).index())
            $('.img-left>img').prop('src', src);
            $('.large-img>img').prop('src', src);
        }

        // 鼠标移入事件
        mouseEnter() {
            $('.mask').toggle();
            $('.large-img').toggle();
        }

        // 鼠标移动事件
        mouseMove(e) {
            var x = e.pageX - $(this).offset().left - ($('.mask').outerWidth()) / 2;
            var y = e.pageY - $(this).offset().top - ($('.mask').outerHeight()) / 2;
            // console.log(x, y)

            // 获取到的值给mask的left和top
            if (x <= 0) {
                x = 0;
            }
            if (x >= ($(this).width() - $('.mask').width())) {
                x = $(this).width() - $('.mask').width();
            }
            if (y <= 0) {
                y = 0;
            }
            if (y >= ($(this).height() - $('.mask').height())) {
                y = $(this).height() - $('.mask').height();
            }
            $('.mask').css({
                top: y,
                left: x
            })

            // 对应的大图片等比例移动起来
            var pencent = $('.img-left').width() / $('.mask').width();
            $('.large-img>img').css({
                left: -(x * pencent),
                top: -(y * pencent),
            })
        }

    }


    new Enlarge('.enlarge')

})



