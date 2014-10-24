var assessment = {};

assessment.title = "Hello World";

assessment.instructions = 'Write a static method called helloWorld which returns "Hello, World !"';

assessment.className = 'HelloWorld';

assessment.startCode = [
    'class ' + assessment.className + ' {',
    '',
    '   // Code here',
    '',
    '}'
];

assessment.tests = [
    {
        title: 'Should return \'Hello, World !\'',
        initializationCode: '',
        expectations: [
            'helloWorld().equals("Hello, World !")'
        ]
    }
];

module.exports = assessment;