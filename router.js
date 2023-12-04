var express = require('express');
var router = express.Router();

const credentials ={
    username : "ashkar",
    password : "123"
}


router.post('/login',(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    if(req.body.username === credentials.username && req.body.password === credentials.password){
        req.session.user = req.body.username;
        
        res.redirect('/route/home-page')
    }else{
        res.end("invalid");
    }
    
})
router.get('/home-page',(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    if(req.session.user){
        res.render('home-page',{user: req.session.user})
    }else{
        res.redirect('/')
        
    }
})

router.get('/logout',(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    req.session.destroy(function(err){
        
        res.redirect('/')
        if(err){
            console.log(err)
            res.send('Error')
        }else{
            res.render('index',{title:'Login Page',logout:'logged out'})
        }
    })
})

module.exports = router;
