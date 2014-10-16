var Submission = function (assessment, submittedCode) {

    this.assessment = assessment;
    this.submittedCode = submittedCode;
    this.executableCode = wrapSubmission(assessment, submittedCode);

};

var wrapSubmission = function (assessment, submittedCode) {
    return assessment.preCode + submittedCode + assessment.postCode;
};

Submission.prototype.checkCorrectOutput = function () {
    console.log('Checking correct output...');
    console.log('output : ' + this.output);
    console.log('correctOutput : ' + this.assessment.correctOutput);
    return this.output === this.assessment.correctOutput;
};

module.exports = Submission;