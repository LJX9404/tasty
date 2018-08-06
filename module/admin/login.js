module.exports=function(){
    let router=express.Router();
    //显示登录注册界面
    router.get('/',(req,res)=>{
        res.render('admin/new');
    });


    //数据库进行账户查找和登录验证
    router.post('/',(req,res)=>{
        let sql ='select aid,username,passwd from admin where username=? limit 1';
        mydb.query(sql, req.body.username, (err, result)=>{
            // console.log(req.body);
            //系统性错误
            if(err){
                res.json({r:'db_error'});
                return;
            }
            //检查是否存在
            if(0==result.length){
                res.json({r:'username_not_exist'});
                return;
            }

            //检查密码正确性
            if(req.body.password!= result[0].passwd){
                res.json({r:'passwd_error'});
                return;
            }

            // console.log(result);
            // res.send('1')
           
         //   SESSION处理
            
            req.session.aid = result[0].aid;
            req.session.username = result[0].username;
            console.log( req.session.aid);
            //更新登录信息
            let upsql = 'UPDATE admin SET loginnum = loginnum + 1, lastlogin = ? WHERE aid = ? LIMIT 1';
            mydb.query(upsql, [new Date().toLocaleString(), result[0].aid], (err, r)=>{
                if(err){
                    console.log(err);
                }
                res.json({r:'ok'});
            });
        });
    })


    //账户注册验证和数据库处理
    router.post('/reg', (req ,res)=>{
        console.log('注册');
        //检查账号是否已经存在
        let p = req.body;
        if(!p.password1){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT aid FROM admin WHERE username = ? LIMIT 1`;
        mydb.query(sql, p.username1, (err, result)=>{
            console.log(err);
            console.log(result);
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO admin(username, passwd, tel,lastlogin) VALUES (?,?,?,?)';
                mydb.query(sql, [p.username1, p.password1, p.tel, new Date().toLocaleString()], (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        });
    });

    return router;
};