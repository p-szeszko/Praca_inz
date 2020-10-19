var mongoose=require('mongoose');

var gracz={_id:'', imie:''};
var frakcja={strona:'', wielkosc:'', zapisani:[gracz], otwarte:Boolean};
mongoose.Promise=global.Promise;
var Schema = mongoose.Schema;
var EventSchema = new Schema({
    organizator:{type:Object, required:true},
    nazwa:{type:String, required:true},
    termin:{type:String, required:true},
    wsp:{type:String, required:true},
    oplata:{type:Number, required: true},
    miejsce:{type:String, required:true},
    rodzaj:{type:String, required:true},
    limity:{type:Array, required:true},
    roznica:{type:Number,required: true},
    frakcje:{type:[frakcja], required:true},
    opis:{type:String, required:true}

},{collection:'Events'});

module.exports = mongoose.model('Event', EventSchema);