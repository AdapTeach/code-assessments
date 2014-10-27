var mongoose = require("mongoose-q")(),
    Schema = mongoose.Schema;

mongoose.model('Assessment',
    new Schema({
        title: {
            type : String,
            unique : true,
            required : 'title is required'
        },
        instructions : {
            type: String,
            required : 'instructions are required'
        },
        startCode : {
            type: String,
            required: 'startCode is required'
        },
        tips : [{
            type : String
        }],
        guides: [{
            type : Schema.ObjectId,
            ref : 'Guide'
        }],
        tests: [{
            type : Schema.ObjectId,
            ref : 'Test'
        }]

    })
);

mongoose.model('Test',
    new Schema({
        title : {
            type : String,
            required : 'the title is required'
        },
        code : {
            type : String,
            required : 'Code is required'
        },
        expectations : [{
            type : String,
            required : 'Expectations is required'
        }]

    })
);

mongoose.model('Guide',
    new Schema({
        title : {
            type : String
        },
        code : {
            type : String
        }
    })
);