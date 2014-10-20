var assessment = {};

assessment.title = "Hello World";

assessment.instructions = 'Write a static method called helloWorld which returns "Hello, World !"';

assessment.startCode = [
    'class HelloWorldAssessment {',
    '',
    '   // Code here',
    '',
    '}'
];

assessment.tests = [
    {
        title: 'Should return \'Hello, World !\'',
        code: [],
        expectations: [
            {
                expression: 'helloWorld().equals("Hello, World !")'
            }
        ]
    }
];

module.exports = assessment;