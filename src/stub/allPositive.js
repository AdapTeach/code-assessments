var assessment = {};

assessment.id = 'allPositive';

assessment.title = 'All Positive';

assessment.instructions = 'Implement the static method allPositive() which takes an array of integers as input' +
' and returns true if all the elements in the array are positive, false otherwise';

assessment.className = 'AllPositive';

assessment.startCode =
    'class ' + assessment.className + ' {' +
    '' +
    '   public boolean allPositive(int[] array) {' +
    '       // Code here' +
    '   }' +
    '' +
    '}'
;

assessment.tips = [];

assessment.guides = [
    [
        'class AllPositiveAssessment {',
        '',
        '   static boolean allPositive(int[] array) {',
        '       for (int element : array) {',
        '           // Code here',
        '       }',
        '   }',
        '',
        '}'
    ]
];

assessment.tests = [
    {
        title: 'Should return true when passed an array containing positive integers only',
        initializationCode: 'int[] array = {1, 5, 3, 7, 4, 9, 2};',
        expectations: [
            'allPositive(array)'
        ]
    },
    {
        title: 'Should return false when passed an array containing a mix of positive and negative integers',
        initializationCode: 'int[] array = {1, 5, 3, -7, 4, -9, 2};',
        expectations: [
            '!allPositive(array)'
        ]
    }
];

module.exports = assessment;