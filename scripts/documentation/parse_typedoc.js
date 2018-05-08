/**
 * Script usage:
 *
 * node scripts/documentation/parse_typedoc.js
 */

const Parser = require("./typedoc_parser");

/**
 * The location of a Typedoc generated JSON file, that contains documentation
 * data for the API.
 *
 * @type {string}
 */
const inputFile = "./scripts/documentation/output/typedoc.json";

/**
 * The writeable location of the human-readable documentation JSON data.
 *
 * @type {string}
 */
const outputFile = "./scripts/documentation/output/documentation.json";

/**
 * An instance of a TypedocParser, which is capable of turning Typedoc JSON
 * into more human-friendly documentation instructions.
 */
const parser = new Parser(inputFile);

console.log(`Parsing "${inputFile}"`);
parser.parse();

console.log(`Writing to "${outputFile}"`);
parser.writeToFile(outputFile);

console.log("Complete, exiting.");

