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
            $('html,body').stop().animate({
                scrollTop: 0
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


    // 商品选择结算模块
    getMsg();
    $('.buy-option li').on('click', function () {
        // $(this).toggleClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        getMsg();
    })

    $('.service-box li').on('click', function () {
        $(this).toggleClass('active');
        // console.log($(this).children('.box'))
        $(this).children('.box').children('h3').toggleClass('current');
        $(this).children('.checkbox').children('.icon-fuxuankuanggou').toggleClass('icon-active');
        $(this).children('.box').children('.agree').children('.icon-fuxuankuanggou').toggleClass('icon-active');
        if ($(this).siblings('li').hasClass('active')) {
            $(this).siblings('li').removeClass('active');
            $(this).siblings('li').children('.box').children('h3').removeClass('current');
            $(this).siblings('li').children('.checkbox').children('.icon-fuxuankuanggou').removeClass('icon-active');
            $(this).siblings('li').children('.box').children('.agree').children('.icon-fuxuankuanggou').removeClass('icon-active');
        }
        getServiceMsg();

    })



    // 选择列表模块
    // 商品信息模块
    function getMsg() {
        $('.serviceMsg').empty();
        var msg = $('.buy-option .active').text();
        // console.log(msg)
        var li = `<li class="item-info">${msg}<span>2999元</span></li>`;
        var ul = document.querySelector('.serviceMsg');
        ul.insertAdjacentHTML('beforeend', li);
    }
    // 服务信息模块
    // function Trim(str, is_global) {
    //     var result;
    //     result = str.replace(/(^\s+)|(\s+$)/g, "");
    //     if (is_global.toLowerCase() == "g") {
    //         result = result.replace(/\s/g, "");
    //     }
    //     return result;
    // }
    function getServiceMsg() {
        $('.priceMsg').empty();
        var price = parseInt($('.price-info').text());

        $('.service-box ul>.active').each(function (i, ele) {
            var serviceMsg = $(ele).children('.box').children('h3').children('em').text();
            var priceMsg = $(ele).children('.box').children('h3').children('span').text();
            // console.log(priceMsg)
            var li = `<li class="item-info">${serviceMsg}<span>${priceMsg}</span></li>`;
            var ul = document.querySelector('.priceMsg');
            ul.insertAdjacentHTML('beforeend', li);
            // 计算所选列表价钱总和
            price += parseInt(priceMsg);
        })
        $('.total-price').text('总计：' + price + '元');
    }


})



