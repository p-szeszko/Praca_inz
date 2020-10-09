var mongoose = require('mongoose');
mongoose.Primies=global.Promise;
var Schema = mongoose.Schema;
var BFSchema = new Schema({},{collection: 'Battlefields'});

module.exports = mongoose.model('Battlefield', BFSchema);