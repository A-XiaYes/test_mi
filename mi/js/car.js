
$(function () {
    $('.icon-checkbox').click(function () {
        $(this).toggleClass('active')
        // 让select-tip消失
        if ($('.icon-checkbox').hasClass('active')) {
            $('.no-select-tip').hide()
        } else {
            $('.no-select-tip').show()
        }
        // 结算按钮
        if (!$('.icon-checkbox').hasClass('active')) {
            $('.total-price>.btn').addClass('btn-disabled').removeClass('btn-primary');
        } else {
            $('.total-price>.btn').addClass('btn-primary').removeClass('btn-disabled');
        }
        getSum()
    })

    //全选功能
    $('.check-all').click(function () {
        $('.no-select-tip').toggle()
        // 判断是否有这个类名
        if ($('.check-all').hasClass('active')) {
            $('.no-select-tip').hide()
            // console.log(1)
            $('.icon-checkbox').addClass('active');
        } else {
            $('.icon-checkbox').removeClass('active')
        }
        // 结算按钮
        if (!$('.icon-checkbox').hasClass('active')) {
            $('.total-price>.btn').addClass('btn-disabled').removeClass('btn-primary');
        } else {
            $('.total-price>.btn').addClass('btn-primary').removeClass('btn-disabled');
        }
        getSum()
    })

    // 如果小复选框被选中的个数等于商品个数 就应该把全选按钮选上，否则全选按钮不选。
    // console.log($('.icon-checkbox'))
    $('.j-checkbox').click(function () {
        if ($('.list-item .active').length === $('.j-checkbox').length) {
            $('.check-all').addClass('active')
        } else {
            $('.check-all').removeClass('active')
        }
    })


    // 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $('.increment').click(function () {
        // 获取当前文本框兄弟的值
        var n = $(this).siblings('.goods-num').val();
        // console.log(n)
        n++;
        $(this).siblings('.goods-num').val(n);
        // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p
        var p = $(this).parents('.col-num').siblings('.col-price').html()
        p = p.substring(0, p.length - 1);
        // console.log(p)
        var price = (p * n).toFixed(2);
        // 小计模块 
        $(this).parents('.col-num').siblings('.col-tatol').html(price + '元')
        getSum();

    })

    // 增减商品数量模块 首先声明一个变量，当我们点击-号（decrement），就让这个值--，然后赋值给文本框。
    $('.decrement').click(function () {
        // 获取当前文本框兄弟的值
        var n = $(this).siblings('.goods-num').val();
        // console.log(n)
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.goods-num').val(n);
        // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p
        var p = $(this).parents('.col-num').siblings('.col-price').html()
        p = p.substring(0, p.length - 1);
        // console.log(p)
        var price = (p * n).toFixed(2);
        // 小计模块 
        $(this).parents('.col-num').siblings('.col-tatol').html(price + '元')
        getSum();
    })

    // 用户修改文本框的值 计算 小计模块 
    $('.goods-num').change(function () {
        var n = $(this).val()
        // console.log(n)
        if (n < 1) {
            n = 1;
            $(this).val(n)
        }
        var p = $(this).parents('.col-num').siblings('.col-price').html();
        p = p.substring(0, p.length - 1);
        var price = (p * n).toFixed(2);
        $(this).parents('.col-num').siblings('.col-tatol').html(price + '元');
        getSum();
    })

    // 计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总价钱


        // $('.goods-num').each(function (i, ele) {
        //     count += parseInt($(ele).val());
        // })
        // $('.tatol-num').text(count);

        // $('.p-sum').each(function (i, ele) {
        //     money += parseFloat($(ele).text().substring(0, $('.col-tatol').text().length - 1))
        // })
        // // console.log(money)
        // $('.total-price em').text(money.toFixed(2));

        $('.hl>.active').each(function (i, ele) {
            var num = parseInt($(ele).parents('.col-check').siblings('.col-num').find('.goods-num').val());
            // console.log(num);
            count += num;

            var m = parseFloat($(ele).parents('.col-check').siblings('.p-sum').text());
            // console.log(m);
            money += m;

        })
        $('.tatol-num').text(count);
        $('.total-price em').text(money.toFixed(2));
    }


    //  删除商品模块
    // (1) 商品后面的删除按钮
    $('.del').click(function () {
        $(this).parents('.list-item').remove();
        getSum();
        if ($('.list-item').length === 0) {
            $('.cart-wrap').hide();
            $('.empty-cart').show();
            $('.empty-cart #btn').removeClass('btn-shopping');
            $('legend').text('为您推荐').css('padding', '0 150px');
        }
    })

    // cart-bar距离底部距离为0时改为fixed






    // 用户未登录时
    // 获取cookie
    var username = getCookie("username");
    if (username) {
        $('.topbar-info .name').text(username);
    } else {
        $('.topbar-info .user').hide();
        $('.topbar-info .login-box').show();
        $('.cart-wrap').hide();
        $('.empty-cart').show();
        $('.empty-cart .desc').show().next().find('.btn-login').show();
        $('.empty-cart #btn').addClass('btn-shopping');
        $('legend').text('为您推荐').css('padding', '0 150px');
    }

    // 退出按钮
    $('.user-menu-wrapper .logout').click(function () {
        // 删除cookie
        removeCookie("username");
        $('.topbar-info .user').hide();
        $('.topbar-info .login-box').show();
        $('.cart-wrap').hide();
        $('.empty-cart').show();
        $('.empty-cart .desc').show().next().find('.btn-login').show();
        $('.empty-cart #btn').addClass('btn-shopping');
        $('legend').text('为您推荐').css('padding', '0 150px');
    })
})