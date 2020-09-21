var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var Schema = mongoose.Schema;
var EventSchema = new Schema({},{collection:'Events'});

module.export = mongoose.Model('Event', EventSchema);