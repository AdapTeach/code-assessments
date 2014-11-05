(function() {
  'use strict';

  var mongoose = require("mongoose-q")(),
    Schema = mongoose.Schema;

  mongoose.model('Tip',
    new Schema({
      title: {
        type: String
      },
      content: {
        type: String
      },
      assessment: {
        type: Schema.ObjectId,
        ref: 'Assessment'
      }
    })
  );

})();