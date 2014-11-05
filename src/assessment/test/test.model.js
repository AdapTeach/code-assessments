(function() {
  'use strict';


  var mongoose = require("mongoose-q")(),
    Schema = mongoose.Schema;

  mongoose.model('Test',
    new Schema({
      title: {
        type: String,
        required: 'the title is required'
      },
      code: {
        type: String,
        required: 'Code is required'
      },
      expectations: [{
        type: String,
        required: 'Expectations is required'
      }],
      assessment: {
        type: Schema.ObjectId,
        ref: 'Assessment'
      }
    })
  );
})();