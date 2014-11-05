(function() {
  'use strict';

  var mongoose = require("mongoose-q")(),
    Schema = mongoose.Schema;


  mongoose.model('Guide',
    new Schema({
      title: {
        type: String,
      },
      code: {
        type: String
      },
      assessment: {
        type: Schema.ObjectId,
        ref: 'Assessment'
      }
    })
  );
})();