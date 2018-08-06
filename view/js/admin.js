window.onload = function () {
    addClass();
    updClass();
    delClass();
}

function addClass() {
    $('.saveclass').click(function () {
        console.log('点击成功');
        if (!$('#qcname').val()) {
            $('#qcname').focus();
            return;
        }

        //直接把数据提交到服务器
        $.ajax({
            url: './addclasssubmit',
            type: 'POST',
            data: {
                qcname: $('#qcname').val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/qclass/';
                }
            }
        });
    });

}

function updClass(){
    $('.updateclass').click(function () {
        console.log('点击成功');
        if (!$('#qcname').val()) {
            $('#qcname').focus();
            return;
        }

        //直接把数据提交到服务器
        $.ajax({
            url: '/admin/qclass/updatesubmit',
            type: 'POST',
            data: {
                qcname: $('#qcname').val(),
                qcid:$('#qcid').val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/qclass/';
                }
            }
        });
    });

}
//修改第四步，ajax请求，提交数据并等待服务器传值，成功后页面跳转
function delClass(){
    $('.delc').click(function(){
        if(!confirm('确认删除吗？')){
            return;
        }
        let $qcid=$(this).attr('qcid');
        let This=this;
        $.ajax({
            url:'/admin/qclass/del',
            type:'POST',
            dataType:'JSON',
            data:{qcid: $qcid},
            success:function(result){
                console.log(result);
                if(result.r=='ok'){
                    $(This).parent().parent().remove();
                }
            }
        })

    })
}