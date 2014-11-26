var mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema;

mongoose.model('Assessment',
    new Schema({
        id : {
            type: String,
            unique: true,
            required : 'id is required'
        },
        title: {
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
        creator : {
            type : Schema.ObjectId,
            ref : 'User',
            required : 'creator is required'
        },
        tips: [{
            type: Schema.ObjectId,
            ref: 'Tip'
        }],
        guides: [{
            type: Schema.ObjectId,
            ref: 'Guide'
        }],
        tests: [{
            type: Schema.ObjectId,
            ref: 'Test'
        }],
        providedCompilationUnits: [{
            type : Object
        }],
        compilationUnitsToSubmit: [{
            type : Object
        }]

    })
);
