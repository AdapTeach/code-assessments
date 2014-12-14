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
-   ``language`` the programming language of the assessment and it's solution (can be ``java``, ``csharp``...)
-   ``instructions``  a textual description of the solution the learner is expected to submit
-   ``providedCompilationUnits`` an array (can be empty) of compilation units which are part of the assessment, but that the learner cannot edit 
-   ``compilationUnitsToSubmit`` an array (can NOT be empty) of compilation units which the learner is able to edit. Typically, these are the compilation units that the learer is expected to modify in order to submit the correct solution. 
-   ``tests`` an array (can NOT be empty) of tests
