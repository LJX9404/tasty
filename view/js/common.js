window.onload = function () {
    reg();
    login();
    loginhover();
    reghover()
}
function login() {
    //客户端格式验证
    $('#btn1').click(function () {
        let flag = 0;
        let username = $('#username').val();
        let password = $('#password').val();
        const usernameReg = /^[\w\d\u4e00-\u9fa5]{2,12}$/;
        //验证账号格式
        if (!usernameReg.test(username)) {
            // $('#username').addClass('err');
            flag++;
            $('#username').focus();
            $('.span1').css('display', 'block');
        }
        //验证密码长度
        if (password.length < 6 || password.length > 12) {
            flag++;
            // $('#password').addClass('err');
            $('#password').focus();
            $('.span2').css('display', 'block');
        }
        if (flag) {
            return;
        }


        //ajax处理
        $.ajax({
            url: './login',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginform').serialize(),
            success: function (data) {
                console.log(data.r);
                alert('111');
                if (data.r == 'username_not_exist') {
                    console.log('不存在');
                    $('#username').addClass('err');
                    $('#username').focus();
                    $('.span3').css('display', 'block');
                } else if (data.r == 'passwd_error') {
                    $('#password').addClass('err');
                    $('#password').focus();
                    $('.span4').css('display', 'block');
                } else if (data.r == 'db_err') {
                    alert('系统性错误，请刷新后重新操作');
                    window.location.reload();
                } else {
                    window.location.href = '/admin/qclass';
                   //预留登陆成功后的跳转界面 
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });

    });
}
function reg() {
    $('#btn2').click(function () {
        //标记错误信息
        let flag = 0;
        let username1 = $('#username1').val();
        let passwd1 = $('#password1').val();
        let tel = $('#tel').val();

        //账号长度要求：2-12
        let usernameReg = /^[\w\u4e00-\u9fa5]{2,12}$/;
        if (!usernameReg.test(username1)) {
            flag++;
            $('#username1').focus();
            $('.span1').css('display', 'block');
        }

        //密码错误提示
        if (passwd1.length < 6 || passwd1.length > 16) {
            flag++;
            // $('#password').addClass('err');
            $('#password1').focus();
            $('.span2').css('display', 'block');
        }

        //手机号验证
        let telReg = /^1[345789]{1}\d{9}$/;
        if (!telReg.test(tel)) {
            $('#tel').focus();
            $('.span5').css('display', 'block');
        }

        //如果上面检验都没问题，就要发起AJAX请求
        if (flag) {
            return;
        }

        //开始ajax处理
        $.ajax({
            url: '/admin/login/reg',
            type: 'POST',
            dataType: 'JSON',
            data: $('#regform').serialize(),
            success: function (data) {
                console.log(data);
                if (data.r == 'success') {
                    window.location.href = './login.html';
                    //跳转到主页面
                }else if(data.r == 'username_existed'){
                    $('.span3').css('display', 'block');
                    $('#username1').focus();
                }else if(data.r == 'passwd_no'){
                    $('.span4').css('display', 'block');
                    $('#password1').focus();
                }else if(data.r == 'db_err'){
                    alert('系统错误请刷新')
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
    });
}
function loginhover(){
    $("#logininfo").click(function (){  
        // console.log('点击成功');
        $(".login").show();  
        $(".reg").hide(); 
    })
}
function reghover(){
    $("#reginfo").click(function (){  
        // console.log('点击成功');
        $(".reg").show();  
        $(".login").hide();
    }) 
}
