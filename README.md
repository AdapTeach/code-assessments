code-assessments
===========

API Server providing CRUD functionality for assessments

### Compilation Unit

Compilation Unit represents a single unit of code, and its form can vary greatly depending on the programming language. For example, in Java a compilation unit can be a class, an interface or an enum. For the moment, Java is the only supported language but we are planning to support a great variety of programming languages in the future.

A java compilation unit has the following properties :
-   ``name`` the name (equivalent to the file name, without the .java extension)
-   ``kind`` can be one of ``class``, ``interface`` or ``enum``
-   ``code`` the code (equivalent to the file content)

Note that the compilation unit name is specified in both the ``name`` and ``code`` properties.


### Assessment

Assessment represents a single coding challenge to be tackled by a learner. It has the following properties :
-   ``id`` the id of the assessment resource provided by the code-assessments project
-   ``title`` a short descriptive name for the assessment
-   ``language`` the programming language of the assessment and it's solution (can be ``java``, ``csharp``...)
-   ``instructions``  a textual description of the solution the learner is expected to submit
-   ``providedCompilationUnits`` an array (can be empty) of compilation units which are part of the assessment, but that the learner cannot edit 
-   ``compilationUnitsToSubmit`` an array (can NOT be empty) of compilation units which the learner is able to edit. Typically, these are the compilation units that the learer is expected to modify in order to submit the correct solution. 
-   ``tests`` an array (can NOT be empty) of tests


### Test

Learners submit solutions to assessments. To check if a submission is correct, the assessment's creator writes one or more tests that will be run against the submitted code. If a submission passes all the tests for the assessment, then the solution is considered correct. 

A test has the following properties :
-   ``title`` a description of the tested feature (typically starts with "Should...")
-   ``initializationCode`` (can be empty) a string holding a piece of code that is executed once for each submission. It can be used to create and assign variables that will be used in the assertions.
-   ``assertions`` an array (can NOT be empty) of expressions checking that the submitted code has the expected behavior. For a test to pass, all assertions must pass. An assertion can return a boolean (``true`` means that the behavior is correct, ``false`` means that the submission fails the test). Alternatively, an assertion can throw an exception if the submitted code has an unexpected behavior. This allows the use of assertion libraries for more readable and expressive assertions. 

Typically, code in ``initializationCode`` will call the submitted code and store its output in one or more variables. Assertions will then be run against the values stored in those variables.


### Submission

The code-assessments module sends POST requests to the respective code-assesser-[language] projects. For example, when a learner submits a solution for a java assessment, a request is sent to code-assesser-java. 

The body of such a request is a Submission, and it has the following properties :
-   ``assessment`` the complete assessment for which the submission has been made
-   ``submittedCompilationUnits`` the same compilation units found in the ``compilationUnitsToSubmit`` array, most probably modified by the learner in his attempt to submit a correct solution


### Example Assessment

    {
      "id": "54871ddc27f6fb200ff90a40",
      "title": "Hello World",
      "language": "java",
      "instructions": "In class HelloWorld, declare a method called 'sayHello' which returns 'Hello, World !'",
      "providedCompilationUnits": [],
      "compilationUnitsToSubmit": [
        {
          "name": "HelloWorld",
          "kind": "class",
          "code": "public class HelloWorld { /* Code here */ }"
        }
      ],
      "tests": [
        {
          "title": "Should return 'Hello, World !'",
          "initializationCode": "String result = new HelloWorld().sayHello();",
          "assertions": [
            "\"Hello, World !\".equals(result)"
          ]
        }
      ]
    }

#### Solution

    {
      "assessment": ...,
      "submittedCompilationUnits": [
        {
          "name": "HelloWorld",
          "kind": "class",
          "code": "public class HelloWorld { String sayHello() { return \"Hello, World !\"; } }"
        }
      ]
    }
