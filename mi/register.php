<?php



header("content-type:text/html;charset=utf8");
// 接收数据
// var_dump($_POST);
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$tel = $_POST['tel'];

// 连接数据库
$con = mysqli_connect("localhost","root","root","mi");
mysqli_query($con,"set names utf8");

// 开始注册逻辑
// 先查看数据库中用户名是否存在
$res = mysqli_query($con,"select * from mimsg where username='$username'");
// 提取数据
$row = mysqli_fetch_assoc($res);
if($row){
    // 用户名已经存在
    $arr = [
        "meta"=>[
            "status"=>101,
            "msg"=>"用户名被占用"
        ],
        "data"=>null
    ];
}else{
    $res = mysqli_query($con,"insert mimsg(username,password,tel,email) values('$username','$password',$tel,'$email')");
    if($res){
        // 注册成功
        $arr = [
            "meta"=>[
                "status"=>201,
                "msg"=>"注册成功"
            ],
            "data"=>null
        ];
    }else{
        // 注册失败
        $arr = [
            "meta"=>[
                "status"=>301,
                "msg"=>"注册失败"
            ],
            "data"=>null
        ];
    }
}
echo json_encode($arr);
/*
通常情况下，响应的数据格式：
{
    meta:{
        status:状态码,
        msg:"提示信息"
    },
    data:null
}

*/