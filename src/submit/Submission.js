var Submission = function (assessment, submittedCode) {

    this.assessment = assessment;
    this.submittedCode = submittedCode;
    this.runnableCode = addMainMethod(assessment, submittedCode);

};

var addMainMethod = function (assessment, submittedCode) {
    var begin = submittedCode.substring(0, submittedCode.lastIndexOf('}'));
    var main = [
            '\t' + 'public static void main(String[] main) {',
            '\t\t' + assessment.mainMethod,
            '\t' + '}'
    ].join('\n');
    var end = '}';
    return [
        begin,
        main,
        end
    ].join('\n');
};

Submission.prototype.checkCorrectOutput = function () {
    console.log('Checking correct output...');
    console.log('output : ' + this.output);
    console.log('correctOutput : ' + this.assessment.correctOutput);
    return this.output === this.assessment.correctOutput;
};

// Hide constructor
var newSubmission = function (assessment, submittedCode) {
    return new Submission(assessment, submittedCode);
};

module.exports = newSubmission;