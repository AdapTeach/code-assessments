var assessment = {};

assessment.id = 'helloWorld';

assessment.title = "Hello World";

assessment.instructions = 'Write a static method called helloWorld which returns "Hello, World !"';

assessment.className = 'HelloWorld';

assessment.startCode =
    'public class ' + assessment.className + ' {\n' +
    '\n' +
    '   // Code here\n' +
    '\n' +
    '}\n';

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