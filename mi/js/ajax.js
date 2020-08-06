function sendAjax(options){
    // 处理每个选项
    // 路径必填，且是字符串
    if(!options.url){
        // 没有传url
        throw new Error("请求地址必填");
    }
    // 如果代码能走到这里，传了地址
    // 判断类型
    if(Object.prototype.toString.call(options.url) !== '[object String]'){
        // 不是字符串
        throw new Error("请求地址必须是字符串");
    }
    // 处理请求方式
    // 没有传，默认是get
    if(!options.method){
        options.method = 'get';
    }
    // 如果代码能走到这里，说明传入了
    // 判断是否是get或post
    if(options.method.toLowerCase()!=="get" && options.method.toLowerCase()!=="post"){
        // 不是get或post
        throw new Error("请求方式只接受get或post");
    }
    // 处理数据
    if(!options.data){ // 如果没传
        // 默认赋值为null
        options.data = null;
    }else{ // 如果有传入
        var data = '';
        // 判断数据是字符串还是object
        if(Object.prototype.toString.call(options.data)==='[object String]'){
            // 如果是字符串
            // 判断是否至少包含一个 =
            if(options.data.indexOf("=") === -1){
                throw new Error("数据格式有误！");
            }
            data = options.data;
        }else if(Object.prototype.toString.call(options.data)==='[object Object]'){
            // {"username":"张三","password":123456,tel:1234567810} 转为
            // 'username=张三&password=123456&tel=12345678910'
            var f = '';
            for(var attr in options.data){
                data += f + attr + "=" + options.data[attr];
                f = '&';
            }
        }
        // 代码走到这里，data都是一个字符串，是数据
        // 请求方式是否为get
        if(options.method==="get"){
            // 将数据放在地址后面
            options.url = options.url + "?" + data; // "demo.php?[object Object]"
        }
    }
    // 处理是否异步的async
    if(options.async===undefined){ // 值是undefiend表示没有传
        options.async = true;
    }
    // 代码走到这里，说明async传入了
    // 判断类型是否是布尔值
    if(Object.prototype.toString.call(options.async) !== '[object Boolean]'){
        throw new Error("async参数只接受布尔类型");
    }
    // 处理想要的数据格式 dataType
    // 判断是否传入
    if(!options.dataType){
        options.dataType = 'string';
    }
    // 如果能走到这里，传入了，就判断是否为 string或json
    if(options.dataType.toLowerCase() !== 'string' && options.dataType.toLowerCase() !== 'json'){
        throw new Error("dataType参数只接受string或json");
    }
    // 处理成功时要执行的回调函数
    // 判断是否传入
    if(!options.success){
        options.success = function(){}
    }
    // 如果传入了，判断是否是一个函数
    if(Object.prototype.toString.call(options.success) !== '[object Function]'){
        throw new Error("success参数只接受函数类型");
    }
    // 处理错误是执行的函数
    if(!options.error){
        options.error = function(){}
    }
    // 如果传入了，判断是否是一个函数
    if(Object.prototype.toString.call(options.error) !== '[object Function]'){
        throw new Error("error参数只接受函数类型");
    }
    // 到这里所有参数处理完毕 - 开始ajax
    // ajax对象的兼容写法
    var xhr;
    try{
        xhr = new XMLHttpRequest(); // 这种写法在ie下是不能兼容的
    }catch(e){
        try{
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); // 兼容ie678
        }catch(err){
            xhr = new ActiveXObject("Msxml2.XMLHTTP"); // 更低版本ie
        }
    }
    // 打开
    xhr.open(options.method,options.url,options.async);
    // 监听
    xhr.onreadystatechange = function(){
        // 判断ajax的状态
        // 先判断是否完成
        if(xhr.readyState===4){
            // 在判断是否成功
            if(xhr.status>=200 && xhr.status<300){
                // 成功
                // 获取响应的数据
                var res = xhr.responseText;
                // 判断想要的数据格式是什么
                if(options.dataType==="json"){
                    // 如果是json，就将数据先转为json对象
                    res = JSON.parse(res);
                }
                // 调用成功想执行的函数
                options.success(res);
            }else{ // 请求失败了
                options.error();
            }
        }
    }
    // 发送
    if(options.method==="post"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
        return;
    }
    xhr.send();
}


/*********************** 这是请求示例 **************************/
/*

sendAjax({
    url:"demo.php",
    method:"post",
    success:function(res){
        console.log(res);
    },
    dataType:"json",
    async:true,
    data:{
        username:"张三",
        sex:"女"
    }
});

*/
