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
    
    User.findOne({googleID:req.decoded.userID}).select('googleID googleName photo').exec((err,user)=>{
        if(err)
        {
            res.json({succes:false,message:"Wystąpił błąd"});
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
    new Event({
        organizator:req.body.organizator,
    nazwa:req.body.nazwa,
    wsp:req.body.wsp,
    miejsce:req.body.miejsce,
    rodzaj:req.body.rodzaj,
    limity:req.body.limity,
    oplata:req.body.oplata,
    termin:req.body.termin,
    roznica:req.body.roznica,
    frakcje:req.body.frakcje,
    opis:req.body.opis

    }).save((err, ev)=>{
        if(err)
        {
            res.status(400).json({success:false, message:"Wystąpił błąd", created_id:''});
        }
        else{
        res.status(200).json({success:true,message:'Utworzono wydarzenie', created_id:ev._id});
        }
    });
   
})
router.get('/event',function(req,res){
    var date = new Date();
    Event.find({"termin":{"$gte": new Date()}},function(error,result){
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
    console.log('bullshit');
    console.log(req.body.params._id);
    await Event.updateOne({"_id":req.body.params._id},{$pull:{"frakcje.$[].zapisani":{"_id":req.body.params._idGracz}}},{safe:true,multi:true});
    await Event.updateOne({"_id":req.body.params._id},{$addToSet:{"frakcje.$[s].zapisani":{_id:req.body.params._idGracz,imie:req.body.params.gracz}}},
    {arrayFilters:[{"s.strona":req.body.params.strona}],upsert:true},function(error,result){
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

router.post('/postField',function(req,res){
    new Battlefield({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        wsp: req.body.wsp,
        opis: req.body.opis
    }).save((err,ev)=>{
        if(err)
        {
            res.status(500).json({message:"Błąd dodania lokacji", success: false, id: ev._id})
        }
        else
        {
            res.status(200).json({message:"Dodano wydarzenie", success: true, id:ev._id})
        }
    })
} )

router.get('/getFields', function(req,res){
    Battlefield.find({},function(error,result){
        if(error)
            res.status(500).json({message:"Nie udało się pobrać lokacji"})
        else{
            res.status(200).json(result);
        }
    });
})

router.post('/postField', function(req,res){
    new Battlefield({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        wsp: req.body.wsp,
        opis: req.body.opis
    }).save((err, field)=>{
        if(err)
        {
            res.status(400).json({success:false, message:"Wystąpił błąd", created_id:''});
        }
        else{
        res.status(200).json({success:true,message:'Utworzono wydarzenie', created_id:field._id});
        }
    });
})

return router;



}