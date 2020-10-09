var User = require('../models/user');
var Event = require('../models/event');
var Battlefield = require('../models/battlefield');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { deleteOne } = require('../models/user');
const { isValidObjectId } = require('mongoose');


module.exports = function(router){  
    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", value= "*");
        next();
      });
    const checkToken = (req, res, next) => {
        const header = req.headers['authorization'];
    
        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
    
            req.decode=jwt.verify(token,'POPOLUPO',(err,decoded)=>{
                if(err)
                {
                res.sendStatus(403);
                }
                else{
                    req.decoded=decoded;
                    next();
                }
            })
           
        } else {
            //If header is undefined return Forbidden (403)
            res.sendStatus(403)
        }
    }
router.post('/authenticate', function(res,req){
 
});
router.get('/user',checkToken,function(req,res){
    console.log('it works');
    User.findOne({googleID:req.decoded.userID}).select('googleID googleName photo').exec((err,user)=>{
        if(err)
        {
            res.json({succes:false,message:"Fucked up"});
        }
        else{
            if(!user)
            res.json({succes:false,message:'User not found'});
            else
            res.json({succes:true,message:'Found user',userID:user.googleID,name:user.googleName,photo:user.photo});
           
        }
        
    })

    
})

router.post('/event', function(req,res){
    console.log(req.body.zapisani);
    new Event({
        organizator:req.body.organizator,
    nazwa:req.body.nazwa,
    wsp:req.body.wsp,
    miejsce:req.body.miejsce,
    rodzaj:req.body.rodzaj,
    limity:req.body.limity,
    roznica:req.body.roznica,
    frakcje:req.body.frakcje,
    opis:req.body.opis

    }).save();
    res.json({success:true,message:'created event'});
})
router.get('/event',function(req,res){
    
    Event.find({},function(error,result){
        if(error)
        console.log(error)
        else{
            res.json(result);
        }
    });
})
router.put('/unsignUser',function(req,res){
    Event.updateOne({"_id":req.body._id},{$pull:{"frakcje.$[].zapisani":{"_id":req.body.gracz}}},{safe:true,multi:true},function(error,result){
        if(error){
            console.log(error);
            res.json({success:false,message:"Wystąpił błąd"})
            }
            else{
                res.json({success:true,message:"Wypisano z wydarzenia"});
            }
    })
})
router.put('/updateEvent',async function(req,res){
    await Event.updateOne({_id:req.body._id},req.body,function(error,result){
        if(error){
        console.log(error);
        res.json({success:false,message:"Wystąpił błąd"})
        }
        else{
            res.json({success:true,message:"Wydarzenie zaaktualizowane"});
        }
    });
    
})

router.put('/signUser',async function(req,res){
    await Event.updateOne({"_id":req.body._id},{$addToSet:{"frakcje.$[s].zapisani":{_id:req.body._idGracz,imie:req.body.gracz}}},
    {arrayFilters:[{"s.strona":req.body.strona}],upsert:true},function(error,result){
       if(error)
       console.log(error);
       else{
           if(result.nModified==0)
           {
               res.json({message:"Już jesteś zapisany"});
           }
           else{
            res.json({message:"Zostałeś zapisany"});
           }
           
       }
})})

router.delete('/deleteEvent', function(req,res){
    Event.remove({_id:req.body._id},function(error,result){
        if(error){
        console.log(error);
        res.json({success:false,message:"Wystąpił błąd"})
        }
        else{
            res.json({success:true,message:"Wydarzenie usunięte"});
        }
    })
})
return router;
}