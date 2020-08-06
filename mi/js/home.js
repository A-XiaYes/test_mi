window.addEventListener('load', function () {
    var mySwiper1 = new Swiper('#swiper1', {
        direction: 'horizontal', // 垂直切换选项或水平
        loop: true, // 循环模式选项


        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 使第几张图片默认显示
        initialSlide: 0,

        // 动画速度和滑动速度
        speed: 800,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        // 小抓手
        // grabCursor: true,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        // },

        // 切换样式
        effect: 'fade',

    })



    // 鼠标点击pagination控制swiper切换
    // 如果你在swiper初始化后才决定使用clickable，可以这样设置
    mySwiper1.params.pagination.clickable = true;
    //此外还需要重新初始化pagination
    mySwiper1.pagination.destroy()
    mySwiper1.pagination.init()
    mySwiper1.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');


    mySwiper1.el.onmouseover = function () {
        mySwiper1.autoplay.stop();  //鼠标覆盖停止自动切换
    }
    mySwiper1.el.onmouseout = function () {
        mySwiper1.autoplay.start();  //鼠标离开开始自动切换
    }




    var mySwiper2 = new Swiper('#swiper2', {
        autoplay: true,//可选选项，自动滑动
        // loop: true,
        slidesPerView: 4,
        slidesPerGroup: 4,

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 动画速度和滑动速度
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    })


    mySwiper2.el.onmouseover = function () {
        mySwiper2.autoplay.stop();  //鼠标覆盖停止自动切换
    }
    mySwiper2.el.onmouseout = function () {
        mySwiper2.autoplay.start();  //鼠标离开开始自动切换
    }


    // //返回顶部
    // var goback = document.querySelector('.goback');
    // // console.log(goback);
    // window.addEventListener('scroll', function () {
    //     if (window.pageYOffset >= window.innerHeight) {
    //         goback.style.visibility = 'visible';
    //     } else {
    //         goback.style.visibility = 'hidden';
    //     }
    // })

    // goback.addEventListener('click', function () {
    //     window.scroll(0, 0)
    // })



    //倒计时
    var hour = document.querySelector('.hour');
    var minute = document.querySelector('.minute');
    var second = document.querySelector('.second');
    // console.log(hour, minute, second)
    var time = +new Date('2020-10-01 00:00:00');
    countDown();
    setInterval(countDown, 1000);

    function countDown() {
        var nowtime = new Date();
        var diff = (time - nowtime) / 1000;
        var h = parseInt(diff / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;
        var m = parseInt(diff / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(diff % 60);
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }


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
        $(this).stop().slideToggle();
    })

})