const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  stream:{
    type:String,
    enum:["MBA","Engineering","Pharmacy","Polytechnic"],
    required:true
 },
  branch:{
      type:String,
      required:true
  }
})
const Qualification = mongoose.model('Qualification', qualificationSchema);
  
  module.exports = Qualification;