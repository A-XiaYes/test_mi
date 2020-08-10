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

    // 用户名区域下拉菜单
    $('#user-msg').hover(function () {
        $('.user-menu').stop().slideToggle(200)
    })
    $('.user-menu').hover(function () {
        $(this).stop().slideToggle(200);
    })

    // fillter-box区域点击下拉
    $('.fillter-box .more').on('click', function () {
        $(this).parents('.fillter-wrap').toggleClass('fillter-wrap-toggle');
    })

    // checkbox点击 
    $('.type-list a').on('click', function () {
        $(this).children().toggleClass('current');
    })

    // 爱心点击事件 
    $('.icon-xin').on('click', function () {
        $(this).toggleClass('active');
    })

    // thumbs-list 鼠标移入切换主图效果
    $('.thumbs-list>li').hover(function () {
        $(this).toggleClass('current');
        // var index = $(this).index();
        var src = $(this).children('img').prop('src');
        // console.log(src);
        $(this).parent().siblings('.figure-img').children('a').children('img').prop('src', src);
    })

    // 返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('.goback')[0].style.visibility = 'visible';
        } else {
            $('.goback')[0].style.visibility = 'hidden';
        }

        $('.goback').click(function () {
            // $(document).scrollTop(0)
            $('html, body').stop().animate({
                scrollTop: 0,
            })
        })
    })

    // home-bar区域根据用户浏览器宽度改变大小和位置
    toggleBar();
    $(window).on('resize', function () {
        toggleBar();
    })

    function toggleBar() {
        var w = $('html').width();
        if (w <= 1500) {
            $('.home-bar').addClass('home-bar-xm');
        } else {
            $('.home-bar').removeClass('home-bar-xm');
        }
    }


    // 底部轮播
    var that;
    class Carousel {
        constructor() {
            // console.log(thiis);
            that = this;
            this.left = $('.recommend-item').outerWidth(true) * 5;
            this.init();

        }

        init() {
            // pagers点击事件
            $('.pager').on('click', this.toggleDots)
        }

        toggleDots() {
            $(this).find('span').addClass('active').parent().siblings('.pager').find('span').removeClass('active');
            // console.log(that.left)
            var index = $(this).index();
            $('.recommend-list').stop().animate({
                left: -index * that.left
            }, 500)

        }

    }

    new Carousel();

})