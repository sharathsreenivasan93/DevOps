var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var fs = require("fs");
var walk = require('fs-walk');
var path = require('path');

function main()
{
	var args = process.argv.slice(2);
	var fileList = [];

	if( args.length == 0 )
	{
		args = ["analysis.js"];
	}
	if (!fs.existsSync(args[0])) {
		console.log('The path ' + args[0] + ' doesnt exist')
		process.exit(0)
	}

	if (fs.statSync(args[0]).isDirectory()) {
		walk.walkSync(args[0], function(basedir, filename, stat) {
		if ( filename.lastIndexOf('.')!=-1 && filename.substr(filename.lastIndexOf('.')+1) === 'js') {
				fileList.push(path.join(basedir, filename))
			}

		})

	}

	if (fs.statSync(args[0]).isFile()) {
		fileList.push(args[0]);
	}

	//console.log(fileList)
	for (var i = 0; i < fileList.length; i++) {

		 filePath = fileList[i]
		// try{
			builders = {}
			complexity(filePath);

			for (var node in builders) {
					var builder = builders[node];
					builder.report();
			}

			console.log('\n\nMax loop nesting is:' + maxLoopNesting)
			console.log('Max if conditions is:' + (maxIfCondition))
			console.log('Max function size is:' + maxFunctionSize)
			console.log("========")
	}
}



var builders = {};

// Represent a reusable "class" following the Builder pattern.
function FunctionBuilder()
{
	this.StartLine = 0;
	this.EndLine = 0;
	this.FunctionName = "";
	// The number of parameters for functions
	this.ParameterCount  = 0,
	// Number of if statements/loops + 1
	this.SimpleCyclomaticComplexity = 0;

	// The max depth of scopes (nested ifs, loops, etc)
	this.MaxNestingDepth = 0;

	// The max number of conditions in one if decision statement.
	this.MaxConditions = 0;

	// The max number of conditions in one if decision statement.
	this.MaxIfConditions = 0;

	//Method length greater than 100
	this.LongMethod = false;

	//Method with big O greater than 3
	this.BigO = false;


	// The max chain length
	this.MaxChainLength = 0;

	this.report = function()
	{
		console.log(
		   (
		   	"{0}(): {1}\n" +
		   	"============\n" +
			   "MaxConditions: {2}\t" +
				"Long Methos: {3}\t" +
				"Big O: {4}\n\n"
			)
			.format(this.FunctionName, this.StartLine,
				    this.MaxIfConditions, this.LongMethod,
			        this.BigO)
		);
	}
};

// A builder for storing file level information.
function FileBuilder()
{
	this.FileName = "";
	// Number of strings in a file.
	this.Strings = 0;
	// Number of imports in a file.
	this.ImportCount = 0;
	// Number of conditions in the entire file
	this.MaxConditions = 0;

	this.report = function()
	{
		/*console.log (
			( "{0}\n" +
			  "~~~~~~~~~~~~\n"+
			  "ImportCount {1}\t" +
			  "Strings {2}\t" +
			  "All Conditions {3}\n"
			).format( this.FileName, this.ImportCount, this.Strings, this.MaxConditions ));*/
	}
}

var loopNesting = 0;
var maxLoopNesting = 0;
var maxFunctionSize = 0;
var maxIfCondition = 0;

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    if (isLoop(object)) {
        // console.log(object)
        loopNesting++;

        if (loopNesting > 3)
            printMessage('Method with big O greater than 3 detected', object.loc.start.line)

        maxLoopNesting = loopNesting > maxLoopNesting ? loopNesting : maxLoopNesting
    }

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
            	traverseWithParents(child, visitor);
            }
        }
    }
}


function traverseChildrenOfFunction(object, builder, checkNumberDecision, checkTotalConditions)
{
    var key, child;
    //visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
            	if (isDecision(child) && checkNumberDecision) 
				{
					builder.SimpleCyclomaticComplexity++;
				}
				if(isDecision(child)) {
					builder.MaxConditions++;
					traverseChildrenOfFunction(child, builder, checkNumberDecision, true);
				}
				else if(child.type === 'LogicalExpression' && (child.operator === '&&' || child.operator === '||')
					&& checkTotalConditions) {
					//console.log("Inside Decision 2 : "+ child.loc.start.line)
					builder.MaxConditions++;
					traverseChildrenOfFunction(child, builder, checkNumberDecision, checkTotalConditions);
				}
				else if(child.type === 'VariableDeclarator') {
					traverseChildrenOfFunction(child, builder, checkNumberDecision, false);
				}
				else {
					traverseChildrenOfFunction(child, builder, checkNumberDecision, checkTotalConditions);					
				}
				
            }
            
        }
    }
}

function maxIfConditions(object, builder, count, checkTotalConditions)
{
    var key, child;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
				if(isIfCondition(child)) {
					var temp = maxIfConditions(child, builder, 0, true)
					temp = temp + 1;
					if(builder.MaxIfConditions < temp) {
						builder.MaxIfConditions = temp;
					}
				}
				else if(child.type === 'LogicalExpression' && (child.operator === '&&' || child.operator === '||')
					&& checkTotalConditions) {
					var temp = maxIfConditions(child, builder, count, checkTotalConditions);
					temp = temp + 1;
					count  = temp;
					maxIfCondition = count > maxIfCondition ? count : maxIfCondition;
					if (count > 8) {
						printMessage("Max number of conditions encountered at line ", grandChildNode.loc.start.line)
					}
			
				}
				else if(child.type === 'VariableDeclarator') {
					count = maxIfConditions(child, builder, count, false);
				}
				else 
				{
					count = maxIfConditions(child, builder, count, checkTotalConditions);
				}
            }
        }
    }    
}

function isIfCondition(node) {
	if(node.type == 'IfStatement'){
		return true;
	}
	return false;

} 

function printMessage(message, lineOrFuncName) {
	console.log("\n=====================\n");
	console.log(filePath);
	console.log(message );

	if(lineOrFuncName)
		console.log("Error: Function name or line number causing error: "+ lineOrFuncName)

	console.log("\n=====================\n");
	//throw("Error");
    process.exit(1)
}

function complexity(filePath)
{
	var buf = fs.readFileSync(filePath, "utf8");
	var ast = esprima.parse(buf, options);

	var i = 0;

	// A file level-builder:
	var fileBuilder = new FileBuilder();
	fileBuilder.FileName = filePath;
	builders[fileBuilder.filePath] = fileBuilder;

	// Tranverse program with a function visitor.
	traverseWithParents(ast, function (node) 
	{
		if (node.type === 'FunctionExpression') {
			var functionSize = (node.loc.end.line - node.loc.start.line) + 1

			maxFunctionSize = functionSize > maxFunctionSize ? functionSize : maxFunctionSize

			if (functionSize > 100) {
				printMessage("Function found with more than 100 lines of code", node.loc.start.line)
			}
		}
		if (node.type === 'FunctionDeclaration') 
		{
			var builder = new FunctionBuilder();
			builder.FunctionName = functionName(node);
			builder.StartLine    = node.loc.start.line;
			builder.EndLine = node.loc.end.line;
			var functionSize = (node.loc.end.line - node.loc.start.line) + 1
			//console.log("start ",builder.StartLine," end ",builder.EndLine);


			maxFunctionSize = functionSize > maxFunctionSize ? functionSize : maxFunctionSize

            if (functionSize > 100) {
                printMessage("Function found with more than 100 lines of code",  builder.FunctionName)
            }

			builder.ParameterCount = node.params.length;
			builders[builder.FunctionName] = builder;
			traverseChildrenOfFunction(node, builder, true, false)
			//fileBuilder.MaxConditions += builder.MaxConditions;
			maxIfConditions(node, builder, 0, false)
		}
	});

	traverseChildrenOfFunction(ast, fileBuilder, true, false);	
}

// Helper function for checking if a node is a "decision type node"
function isDecision(node)
{
	if( node.type == 'IfStatement' || node.type == 'ForStatement' || node.type == 'WhileStatement' ||
		 node.type == 'ForInStatement' || node.type == 'DoWhileStatement')
	{
		return true;
	}
	return false;
}

function isLoop(node) {
    if (!node)
        return false
    if (node.type == 'ForStatement' || node.type == 'WhileStatement' ||
        node.type == 'ForInStatement' || node.type == 'DoWhileStatement' || node.type == 'ForOfStatement') {
        return true;
    }
    return false;
}

// Helper function for printing out function name.
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}

// Helper function for allowing parameterized formatting of strings.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();

function Crazy (argument) 
{

	var date_bits = element.value.match(/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/);
	var new_date = null;
	if(date_bits && date_bits.length == 4 && parseInt(date_bits[2]) > 0 && parseInt(date_bits[3]) > 0)
    new_date = new Date(parseInt(date_bits[1]), parseInt(date_bits[2]) - 1, parseInt(date_bits[3]));

    var secs = bytes / 3500;

      if ( secs < 59 )
      {
          return secs.toString().split(".")[0] + " seconds";
      }
      else if ( secs > 59 && secs < 3600 )
      {
          var mints = secs / 60;
          var remainder = parseInt(secs.toString().split(".")[0]) -
(parseInt(mints.toString().split(".")[0]) * 60);
          var szmin;
          if ( mints > 1 )
          {
              szmin = "minutes";
          }
          else
          {
              szmin = "minute";
          }
          return mints.toString().split(".")[0] + " " + szmin + " " +
remainder.toString() + " seconds";
      }
      else
      {
          var mints = secs / 60;
          var hours = mints / 60;
          var remainders = parseInt(secs.toString().split(".")[0]) -
(parseInt(mints.toString().split(".")[0]) * 60);
          var remainderm = parseInt(mints.toString().split(".")[0]) -
(parseInt(hours.toString().split(".")[0]) * 60);
          var szmin;
          if ( remainderm > 1 )
          {
              szmin = "minutes";
          }
          else
          {
              szmin = "minute";
          }
          var szhr;
          if ( remainderm > 1 )
          {
              szhr = "hours";
          }
          else
          {
              szhr = "hour";
              for ( i = 0 ; i < cfield.value.length ; i++)
				  {
				    var n = cfield.value.substr(i,1);
				    if ( n != 'a' && n != 'b' && n != 'c' && n != 'd'
				      && n != 'e' && n != 'f' && n != 'g' && n != 'h'
				      && n != 'i' && n != 'j' && n != 'k' && n != 'l'
				      && n != 'm' && n != 'n' && n != 'o' && n != 'p'
				      && n != 'q' && n != 'r' && n != 's' && n != 't'
				      && n != 'u' && n != 'v' && n != 'w' && n != 'x'
				      && n != 'y' && n != 'z'
				      && n != 'A' && n != 'B' && n != 'C' && n != 'D'
				      && n != 'E' && n != 'F' && n != 'G' && n != 'H'
				      && n != 'I' && n != 'J' && n != 'K' && n != 'L'
				      && n != 'M' && n != 'N' &&  n != 'O' && n != 'P'
				      && n != 'Q' && n != 'R' && n != 'S' && n != 'T'
				      && n != 'U' && n != 'V' && n != 'W' && n != 'X'
				      && n != 'Y' && n != 'Z'
				      && n != '0' && n != '1' && n != '2' && n != '3'
				      && n != '4' && n != '5' && n != '6' && n != '7'
				      && n != '8' && n != '9'
				      && n != '_' && n != '@' && n != '-' && n != '.' )
				    {
				      window.alert("Only Alphanumeric are allowed.\nPlease re-enter the value.");
				      cfield.value = '';
				      cfield.focus();
				    }
				    cfield.value =  cfield.value.toUpperCase();
				  }
				  return;
          }
          return hours.toString().split(".")[0] + " " + szhr + " " +
mints.toString().split(".")[0] + " " + szmin;
      }
  }