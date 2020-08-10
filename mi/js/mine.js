//  数组去重
function unique(arr) {
    var newArr = [];
    for (i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}


//  获取任意两个数min~max之间的随机数    包括min和max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// 得到当前日期 格式化日期 年月日
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var dates = date.getDate();
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var day = date.getDate();
    return '今天是' + year + '年' + month + '月' + dates + '日' + arr[day];
}




// 定义一个函数，函数的功能就是用来获取任意元素的样式
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele)[attr];
    } else {
        return ele.currentStyle[attr];
    }
}

// var div = document.querySelector(".box");
// var w = getStyle(div,"width");
// console.log(w);




// // 运动函数
// function move(ele, obj, cb = function () { }) {
//     var timerObj = {};
//     for (let attr in obj) {
//         timerObj[attr] = setInterval(function () {
//             let target = obj[attr];
//             if (attr == "opacity") {
//                 target *= 100;
//             }
//             let l = getStyle(ele, attr);
//             if (attr === "opacity") {
//                 l *= 100;
//             }
//             l = parseFloat(l);
//             if ((target - l) / 10 > 0) {
//                 percent = Math.ceil((target - l) / 10);
//             } else {
//                 percent = Math.floor((target - l) / 10);
//             }
//             l += percent;
//             if (attr === "opacity") {
//                 ele.style[attr] = l / 100
//             } else {
//                 ele.style[attr] = l + "px"
//             }
//             if (l == target) {
//                 clearInterval(timerObj[attr]);
//                 delete timerObj[attr];
//                 let k = 0;
//                 for (let i in timerObj) {
//                     k++;
//                 }
//                 if (k == 0) {
//                     cb();
//                 }
//             }
//         }, 20)
//     }
// }





function move(ele, obj, fn = null) {
    var timerObj = {}
    for (let attr in obj) {
        let target = obj[attr];
        let currentStyle = parseInt(getStyle(ele, attr));
        if (attr == 'opacity') {
            currentStyle = currentStyle * 100;
            target = target * 100;
        }
        timerObj[attr] = setInterval(function () {
            let speed = target - currentStyle;
            let percent;
            if (speed < 0) {
                percent = Math.floor(speed / 10);
            } else {
                percent = Math.ceil(speed / 10);
            }
            currentStyle += percent;
            if (currentStyle == target) {
                clearInterval(timerObj[attr]);
                delete timerObj[attr]
                var k = 0;
                for (var i in timerObj) {
                    k++;
                }
                if (k == 0) {
                    if (fn) {
                        fn()
                    }
                }
            } else {
                if (attr == "opacity") {
                    ele.style[attr] = currentStyle / 100;
                } else {
                    ele.style[attr] = currentStyle + 'px';
                }
            }

        }, 30);

    }
}




//  缓慢动画原理
//  步长值：(目标值 - 现在的位置) / 10
function animate(obj, target, callback) {
    clearInterval(obj.timer); // 防止多次点击生成多个定时器
    obj.timer = setInterval(() => {

        // 步长值
        var step = (target - obj.offsetLeft) / 10;

        step = step > 0 ? Math.ceil(step) : Math.floor(step)

        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写在定时器结束里面
            if (callback) {
                // 调用回调函数
                callback();
            }
        }

    }, 15);
}


function motion(ele, propertyS, fn) {
    clearInterval(ele.timerId)
    ele.timerId = setInterval(() => {
        var flag = 1
        for (property in propertyS) {
            var value
            var target = propertyS[property]
            if (property === 'opacity') {
                value = Math.round(parseFloat(getStyle(ele, property)) * 100)
            } else {
                value = parseInt(getStyle(ele, property))
            }
            var speed = (target - value) / 30
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            value += speed
            if (property === 'zIndex') {
                value = target
            }
            if (value != target) {
                flag = 0
            }
            if (property === 'opacity') {
                ele.style.opacity = value / 100
            } else if (property === 'zIndex') {
                ele.style.zIndex = value
            } else {
                ele.style[property] = value + 'px'
            }

        }
        if (flag) {
            fn && fn()
            clearInterval(ele.timerId)
        }

    }, 15)
}


// sendAjax({
//     url: "demo.php",
//     method: "post",
//     success: function (res) {
//         console.log(res);
//     },
//     dataType: "json",
//     async: true,
//     data: {
//         username: "张三",
//         sex: "女"
//     }
// });


function sendAjax(options) {
    // 处理每个选项
    // 路径必填，且是字符串
    if (!options.url) {
        // 没有传url
        throw new Error("请求地址必填");
    }
    // 如果代码能走到这里，传了地址
    // 判断类型
    if (Object.prototype.toString.call(options.url) !== '[object String]') {
        // 不是字符串
        throw new Error("请求地址必须是字符串");
    }
    // 处理请求方式
    // 没有传，默认是get
    if (!options.method) {
        options.method = 'get';
    }
    // 如果代码能走到这里，说明传入了
    // 判断是否是get或post
    if (options.method.toLowerCase() !== "get" && options.method.toLowerCase() !== "post") {
        // 不是get或post
        throw new Error("请求方式只接受get或post");
    }
    // 处理数据
    if (!options.data) { // 如果没传
        // 默认赋值为null
        options.data = null;
    } else { // 如果有传入
        var data = '';
        // 判断数据是字符串还是object
        if (Object.prototype.toString.call(options.data) === '[object String]') {
            // 如果是字符串
            // 判断是否至少包含一个 =
            if (options.data.indexOf("=") === -1) {
                throw new Error("数据格式有误！");
            }
            data = options.data;
        } else if (Object.prototype.toString.call(options.data) === '[object Object]') {
            // {"username":"张三","password":123456,tel:1234567810} 转为
            // 'username=张三&password=123456&tel=12345678910'
            var f = '';
            for (var attr in options.data) {
                data += f + attr + "=" + options.data[attr];
                f = '&';
            }
        }
        // 代码走到这里，data都是一个字符串，是数据
        // 请求方式是否为get
        if (options.method === "get") {
            // 将数据放在地址后面
            options.url = options.url + "?" + data; // "demo.php?[object Object]"
        }
    }
    // 处理是否异步的async
    if (options.async === undefined) { // 值是undefiend表示没有传
        options.async = true;
    }
    // 代码走到这里，说明async传入了
    // 判断类型是否是布尔值
    if (Object.prototype.toString.call(options.async) !== '[object Boolean]') {
        throw new Error("async参数只接受布尔类型");
    }
    // 处理想要的数据格式 dataType
    // 判断是否传入
    if (!options.dataType) {
        options.dataType = 'string';
    }
    // 如果能走到这里，传入了，就判断是否为 string或json
    if (options.dataType.toLowerCase() !== 'string' && options.dataType.toLowerCase() !== 'json') {
        throw new Error("dataType参数只接受string或json");
    }
    // 处理成功时要执行的回调函数
    // 判断是否传入
    if (!options.success) {
        options.success = function () { }
    }
    // 如果传入了，判断是否是一个函数
    if (Object.prototype.toString.call(options.success) !== '[object Function]') {
        throw new Error("success参数只接受函数类型");
    }
    // 处理错误是执行的函数
    if (!options.error) {
        options.error = function () { }
    }
    // 如果传入了，判断是否是一个函数
    if (Object.prototype.toString.call(options.error) !== '[object Function]') {
        throw new Error("error参数只接受函数类型");
    }
    // 到这里所有参数处理完毕 - 开始ajax
    // ajax对象的兼容写法
    var xhr;
    try {
        xhr = new XMLHttpRequest(); // 这种写法在ie下是不能兼容的
    } catch (e) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); // 兼容ie678
        } catch (err) {
            xhr = new ActiveXObject("Msxml2.XMLHTTP"); // 更低版本ie
        }
    }
    // 打开
    xhr.open(options.method, options.url, options.async);
    // 监听
    xhr.onreadystatechange = function () {
        // 判断ajax的状态
        // 先判断是否完成
        if (xhr.readyState === 4) {
            // 在判断是否成功
            if (xhr.status >= 200 && xhr.status < 300) {
                // 成功
                // 获取响应的数据
                var res = xhr.responseText;
                // 判断想要的数据格式是什么
                if (options.dataType === "json") {
                    // 如果是json，就将数据先转为json对象
                    res = JSON.parse(res);
                }
                // 调用成功想执行的函数
                options.success(res);
            } else { // 请求失败了
                options.error();
            }
        }
    }
    // 发送
    if (options.method === "post") {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
        return;
    }
    xhr.send();
}








function pAjax(options) {
    return new Promise(function (resolve, reject) {
        // 处理每个选项
        // 路径必填，且是字符串
        if (!options.url) {
            // 没有传url
            throw new Error("请求地址必填");
        }
        // 如果代码能走到这里，传了地址
        // 判断类型
        if (Object.prototype.toString.call(options.url) !== '[object String]') {
            // 不是字符串
            throw new Error("请求地址必须是字符串");
        }
        // 处理请求方式
        // 没有传，默认是get
        if (!options.method) {
            options.method = 'get';
        }
        // 如果代码能走到这里，说明传入了
        // 判断是否是get或post
        if (options.method.toLowerCase() !== "get" && options.method.toLowerCase() !== "post") {
            // 不是get或post
            throw new Error("请求方式只接受get或post");
        }
        // 处理数据
        if (!options.data) { // 如果没传
            // 默认赋值为null
            options.data = null;
        } else { // 如果有传入
            var data = '';
            // 判断数据是字符串还是object
            if (Object.prototype.toString.call(options.data) === '[object String]') {
                // 如果是字符串
                // 判断是否至少包含一个 =
                if (options.data.indexOf("=") === -1) {
                    throw new Error("数据格式有误！");
                }
                data = options.data;
            } else if (Object.prototype.toString.call(options.data) === '[object Object]') {
                // {"username":"张三","password":123456,tel:1234567810} 转为
                // 'username=张三&password=123456&tel=12345678910'
                var f = '';
                for (var attr in options.data) {
                    data += f + attr + "=" + options.data[attr];
                    f = '&';
                }
            } else {
                throw new Error("数据格式有误！");
            }
            // 代码走到这里，data都是一个字符串，是数据
            // 请求方式是否为get
            if (options.method === "get") {
                // 将数据放在地址后面
                options.url = options.url + "?" + data; // "demo.php?[object Object]"
            }
        }
        // 处理是否异步的async
        if (options.async === undefined) { // 值是undefiend表示没有传
            options.async = true;
        }
        // 代码走到这里，说明async传入了
        // 判断类型是否是布尔值
        if (Object.prototype.toString.call(options.async) !== '[object Boolean]') {
            throw new Error("async参数只接受布尔类型");
        }
        // 处理想要的数据格式 dataType
        // 判断是否传入
        if (!options.dataType) {
            options.dataType = 'json';
        }
        // 如果能走到这里，传入了，就判断是否为 string或json
        if (options.dataType.toLowerCase() !== 'string' && options.dataType.toLowerCase() !== 'json') {
            throw new Error("dataType参数只接受string或json");
        }
        // 到这里所有参数处理完毕 - 开始ajax
        // ajax对象的兼容写法
        var xhr;
        try {
            xhr = new XMLHttpRequest(); // 这种写法在ie下是不能兼容的
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP"); // 兼容ie678
            } catch (err) {
                xhr = new ActiveXObject("Msxml2.XMLHTTP"); // 更低版本ie
            }
        }
        // 打开
        xhr.open(options.method, options.url, options.async);
        // 监听
        xhr.onreadystatechange = function () {
            // 判断ajax的状态
            // 先判断是否完成
            if (xhr.readyState === 4) {
                // 在判断是否成功
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 成功
                    // 获取响应的数据
                    var res = xhr.responseText;
                    // 判断想要的数据格式是什么
                    if (options.dataType === "json") {
                        // 如果是json，就将数据先转为json对象
                        res = JSON.parse(res);
                    }
                    // 调用成功想执行的函数
                    resolve(res)
                } else { // 请求失败了
                    reject()
                }
            }
        }
        // 发送
        if (options.method === "post") {
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
            return;
        }
        xhr.send();
    })
}

////////////////////////////// 调用模板 ///////////////////////////////
// pAjax({
//     url:"demo.php",
//     data:{
//         pid:1
//     },
// }).then(res=>{
//     console.log(res);
// })


/**
 * setCookie 设置cookie的函数
 * @param {1} key 设置的cookie的键
 * @param {2} value 设置的cookie的值
 * @param {3} seconds 设置cookie在多少秒之后失效 - 单位：秒
 * @param {4} path 设置cookie的路径 - 默认是 / 根目录
 */
function setCookie(key, value, seconds, path = "/") {
    var date = new Date();
    date.setTime(date.getTime() - 8 * 3600 * 1000 + seconds * 1000)
    document.cookie = key + '=' + value + ';expires=' + date + ";path=" + path;
}
/**
 * getCookie 获取cookie的函数
 * @param {1} key 要获取的cookie的键
 * return 返回想要的键对应的值
 */
function getCookie(key) {
    var cookies = document.cookie;
    var arr = cookies.split("; ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split("=")[0] == key) {
            return arr[i].split("=")[1];
        }
    }
}
/**
 * removeCookie 删除cookie的函数
 * @param {1} key 要删除的cookie的键
 * @param {2} path 要删除的cookie的路径 - 默认为 / 根目录
 */
function removeCookie(key, path = "/") {
    setCookie(key, null, -1, path);
}