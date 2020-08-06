window.addEventListener('load', function () {
    var btn = document.querySelector('.btn-bg>.login-btn');
    var usernameIpt = document.querySelector('[name = "username"]');
    var passwordIpt = document.querySelector('[name = "password"]');
    var hint = document.querySelector('.hint');
    // console.log(usernameIpt, passwordIpt);

    usernameIpt.addEventListener('input', function () {
        if (this.value !== '') {
            usernameIpt.style.borderColor = '';
            hint.style.display = 'none';
        }
    })
    passwordIpt.addEventListener('input', function () {
        if (this.value !== '') {
            passwordIpt.style.borderColor = '';
            hint.style.display = 'none';
        }
    })

    btn.addEventListener('click', function () {
        var username = usernameIpt.value.trim();
        var password = passwordIpt.value.trim();
        if (username === '') {
            hint.children[1].innerHTML = '请输入用户名';
            hint.style.display = 'block';
            usernameIpt.style.borderColor = '#ff6700';
            return false;
        } else {
            if (password === '') {
                hint.children[1].innerHTML = '请输入密码';
                hint.style.display = 'block';
                passwordIpt.style.borderColor = '#ff6700';
                return false;
            } else {
                hint.style.display = 'none';
            }
        }

        // pAjax({
        //     url: "login.php",
        //     method: 'post',
        //     data: { username, password },
        // }).then(res => {
        //     if (res.meta.status === 201) {
        //         // 设置cookie
        //         setCookie('username', username, 7200);
        //         // alert(res.meta.msg);
        //         // 跳转到首页
        //         location.href = 'home.html';
        //     } else {
        //         // alert(res.meta.msg);  
        //         hint.children[1].innerHTML = '用户名或者密码错误';
        //         hint.style.display = 'block';
        //         return false;
        //     }
        // })


        $(function () {
            $.ajax({
                url: 'login.php?_=' + (+new Date()),
                method: 'post',
                data: {
                    username,
                    password
                },
                dataType: 'json',
                success: res => {
                    if (res.meta.status === 201) {
                        // 设置cookie
                        setCookie('username', username, 7200);
                        // alert(res.meta.msg);
                        // 跳转到首页
                        location.href = 'home.html';
                    } else {
                        // alert(res.meta.msg);  
                        hint.children[1].innerHTML = '用户名或者密码错误';
                        hint.style.display = 'block';
                        return false;
                    }
                }
            })
        })



    })


})