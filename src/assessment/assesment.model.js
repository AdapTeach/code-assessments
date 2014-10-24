var mongoose = require("mongoose-q")(),
    Schema = mongoose.Schema;

mongoose.model('Assessment',
    new Schema({
        "title": {
            type: String,
            unique: true,
            required: 'title is required'
        },
        instructions: {
            type: String,
            required: 'instructions are required'
        },
        startCode: {
            type: String,
            required: 'startCode is required'
        },
        tips: [{
            type: String
        }],
        guides: [{
            type: String
        }],
        tests: [{
            type: Schema.ObjectId,
            ref: 'Test'
        }]

    })
);