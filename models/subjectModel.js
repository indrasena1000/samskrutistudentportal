const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  stream:{},
  branch:{},
  regulation:{},
  semister:{},
  subjects:[]
})


const Subject = mongoose.model('Subject', subjectSchema);
  
  module.exports = Subject;