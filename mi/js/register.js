window.addEventListener('load', function () {
    var btn = document.querySelector('.regbox-btn>[type="button"]');
    var usernameIpt = document.querySelector('[name="username"]');
    var passwordIpt = document.querySelector('[name="password"]');
    var repassIpt = document.querySelector('[name="repass"]');
    var emailIpt = document.querySelector('[name="email"]');
    var telIpt = document.querySelector('[name="tel"]');
    // var hint = document.getElementsByClassName('hint')
    // console.log(hint)



    // 验证数据
    var usernameReg = /^(\w|[\u4e00-\u9fa5]){2,12}$/;
    var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var telReg = /^1[3|4|5|7|8][0-9]{9}$/;



    focusAndBlur(usernameIpt, usernameReg, '请输入正确的用户名');
    focusAndBlur(passwordIpt, passwordReg, '至少需要一个大写、小写字母和数字');
    repassIpt.onblur = function () {

        // 获取输入的值
        var username = usernameIpt.value.trim();
        var password = passwordIpt.value.trim();
        var repass = repassIpt.value.trim();
        var email = emailIpt.value.trim();
        var tel = telIpt.value.trim();

        if (repass != password) {
            repassIpt.nextElementSibling.innerHTML = '两次密码不一致';
            repassIpt.nextElementSibling.classList.remove('right');
            repassIpt.nextElementSibling.classList.add('wrong');
            // return false;
        } else {
            repassIpt.nextElementSibling.innerHTML = '';
            repassIpt.nextElementSibling.classList.remove('wrong');
            repassIpt.nextElementSibling.classList.add('right');
            // return true;
        }
    }
    repassIpt.onfocus = function () {
        repassIpt.nextElementSibling.innerHTML = '';
        repassIpt.nextElementSibling.classList.remove('wrong');
        repassIpt.nextElementSibling.classList.remove('right');
    }
    focusAndBlur(emailIpt, emailReg, '邮箱格式不正确');
    focusAndBlur(telIpt, telReg, '号码格式不正确');



    btn.addEventListener('click', function () {

        // 获取输入的值
        var username = usernameIpt.value.trim();
        var password = passwordIpt.value.trim();
        var repass = repassIpt.value.trim();
        var email = emailIpt.value.trim();
        var tel = telIpt.value.trim();

        if (!validate(usernameIpt, usernameReg, '请输入正确的用户名')) {
            return false;
        }

        if (!validate(passwordIpt, passwordReg, '至少需要一个大写、小写字母和数字')) {
            return false;
        }

        if (repass != password) {
            repassIpt.nextElementSibling.innerHTML = '两次密码不一致';
            repassIpt.nextElementSibling.classList.remove('right');
            repassIpt.nextElementSibling.classList.add('wrong');
            return false;
        } else {
            repassIpt.nextElementSibling.innerHTML = '';
            repassIpt.nextElementSibling.classList.remove('wrong');
            repassIpt.nextElementSibling.classList.add('right');
            // return true;
        }

        if (!validate(emailIpt, emailReg, '邮箱格式不正确')) {
            return false;
        }

        if (!validate(telIpt, telReg, '号码格式不正确')) {
            return false;
        }


        // sendAjax({
        //     url: 'register.php',
        //     method: 'post',
        //     data: { username, password, email, tel },
        //     dataType: "json",
        //     success: function (res) {
        //         if (res.meta.status === 201) {
        //             alert(res.meta.msg);
        //             // location.assign('login.html');
        //         } else {
        //             alert(res.meta.msg);
        //             return false;
        //         }
        //     }
        // })


        // pAjax({
        //     url: "register.php",
        //     method: 'post',
        //     data: { username, password, email, tel },
        // }).then(res => {
        //     if (res.meta.status === 201) {
        //         alert(res.meta.msg);
        //         location.assign('login.html');
        //     } else {
        //         alert(res.meta.msg);
        //         return false;
        //     }
        // })



        $(function () {
            $.ajax({
                url: 'register.php?_=' + (+new Date()),
                method: 'post',
                data: {
                    username,
                    password,
                    email,
                    tel
                },
                dataType: 'json',
                success: res => {
                    if (res.meta.status === 201) {
                        alert(res.meta.msg);
                        location.assign('login.html');
                    } else {
                        alert(res.meta.msg);
                        return false;
                    }
                }
            })
        })

    })



    // 给元素绑定获取焦点和失去焦点事件，并验证，输出提示信息
    function focusAndBlur(ele, eleReg, message) {
        ele.onblur = function () {
            if (!eleReg.test(ele.value.trim())) {
                ele.nextElementSibling.innerText = message;
                ele.nextElementSibling.classList.remove('right')
                ele.nextElementSibling.classList.add('wrong')
                // 如果不满足规则 - 阻止默认行为提交
                return false;
            } else {
                ele.nextElementSibling.innerText = '';
                ele.nextElementSibling.classList.remove('wrong')
                ele.nextElementSibling.classList.add('right')
            }
        }
        ele.onfocus = function () {
            ele.nextElementSibling.innerText = '';
            ele.nextElementSibling.classList.remove('wrong')
            ele.nextElementSibling.classList.remove('right')
        }
    }

    // 验证
    function validate(ele, eleReg, message) {
        if (!eleReg.test(ele.value.trim())) {
            ele.nextElementSibling.innerText = message;
            ele.nextElementSibling.classList.remove('right')
            ele.nextElementSibling.classList.add('wrong')
            // 如果不满足规则 - 阻止默认行为提交
            return false;
        } else {
            ele.nextElementSibling.innerText = '';
            ele.nextElementSibling.classList.remove('wrong')
            ele.nextElementSibling.classList.add('right')

        }
        return true;
    }

})



