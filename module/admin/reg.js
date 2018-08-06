module.exports=function(){
    let router=express.Router();
    router.get('/', (req ,res)=>{
        res.render('admin/reg');
    });

    //处理注册的数据
    router.post('/', (req ,res)=>{
        //检查账号是否已经存在
        let p = req.body;
        if(!p.passwd){
            res.json({r:'passwd_no'});
            return ;
        }
        let sql = `SELECT uid FROM admin WHERE username = ? LIMIT 1`;
        mydb.query(sql, p.username, (err, result)=>{
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO user(username, passwd, tel, email, ip, regtimes) VALUES (?,?,?,?,?,?)';
                mydb.query(sql, [p.username, md5(p.passwd), p.tel, p.email, req.ip, new Date().toLocaleString()], (err, result)=>{
                    if(err){
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

