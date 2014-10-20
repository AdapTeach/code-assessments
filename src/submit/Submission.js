var Submission = function (assessment, submittedCode) {

    this.assessment = assessment;
    this.submittedCode = submittedCode;
    this.runnableCode = mergeCodes(assessment, submittedCode);

};

var mergeCodes = function (assessment, submittedCode) {
    var codeToAppend = assessment.testMethods + buildMainMethod(assessment.mainMethod);
    return appendCode(submittedCode, codeToAppend);
};

var buildMainMethod = function (mainMethod) {
    return [
            '\t' + 'public static void main(String[] main) {',
            '\t\t' + mainMethod,
            '\t' + '}'
    ].join('\n');
};

var appendCode = function (submittedCode, codeToAppend) {
    var begin = submittedCode.substring(0, submittedCode.lastIndexOf('}'));
    var end = '}';
    return [
        begin,
        codeToAppend,
        end
    ].join('\n');
};

Submission.prototype.checkOutput = function () {
    console.log('Checking output...');
    console.log('output : ' + this.output);
    if (!this.output) return false;
    var outputLength = this.output.length;
    var outputEnd = this.output.substring(outputLength - 4, outputLength);
    return outputEnd === 'true';
};

// Hide constructor
var newSubmission = function (assessment, submittedCode) {
    return new Submission(assessment, submittedCode);
};

module.exports = newSubmission;