var Q = require('q');

var ideone = require('./../ideone');

var helloWorld = {};

helloWorld.instructions = 'Write a static method called helloWorld which returns "Hello, World !"';

helloWorld.preCode = 'class Program {\n\n';

helloWorld.postCode = '\n\npublic static void main (String[] args) {\n      System.out.println(helloWorld());\n}}';

helloWorld.correctOutput = "Hello, World !";

module.exports = helloWorld;