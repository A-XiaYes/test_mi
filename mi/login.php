<?php
header("content-type:text/html;charset=utf8");


// var_dump($_POST);

$username = $_POST['username'];
$password = $_POST['password'];

$con = mysqli_connect("localhost","root","root","mi");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from mimsg where username = '$username'");
$row = mysqli_fetch_assoc($res);

if ($row) {
    // 用户名存在
    // var_dump($row);
    // 验证密码
    if ($row["password"] === $password) {
        $arr = [
            "meta"=>[
                "status"=>201,
                "msg"=>"登陆成功"
            ],
            "data"=>null
        ];
    }else {
        // 登陆失败
        $arr = [
            "meta"=>[
                "status"=>301,
                "msg"=>"密码错误"
            ],
            "data"=>null
        ];
    }
}else {
    $arr = [
        "meta"=>[
            "status"=>101,
            "msg"=>"用户名不存在"
        ],
        "data"=>null
    ];
}

echo json_encode($arr);