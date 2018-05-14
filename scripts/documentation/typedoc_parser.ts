// External libraries
import * as fs from "fs";
import * as _ from "lodash";

// External types
import { Reflection } from "typedoc";

/**
 * The final documentation JSON will contain an array of sections,
 * e.g. one for adapters, one for wrappers, etc. Each section will contain
 * documentation for classes that belong to that section.
 */
interface Documentation {
    sections: SectionDocumentation[];
    interfaces: Interface[];
}

interface SectionDocumentation {
    // The section title, e.g. "adapters".
    title: string;
    classes: ClassDocumentation[];
}

interface ClassDocumentation {
    // The name of the class, e.g. "CollateralizedSimpleInterestLoanAdapter".
    name: string;
    methods: MethodDocumentation[];
}

interface MethodDocumentation {
    // The method's name, e.g. "returnCollateral"
    name: string;
    // The description of the method, as provided in comments (doc block.)
    description: string;
    // An example of how to use the method.
    example: string;
    // The typescript-formatted parameters list, e.g. "agreementId: string".
    params: string;
    // The location of the method definition,
    // e.g. "adapters/collateralized_simple_interest_loan_adapter.ts#L348"
    source: string;
    // The method's signature, in Typescript format,
    // e.g. "canReturnCollateral(agreementId: string): Promise<boolean>"
    signature: string;
}

interface SectionToTypedocClasses {
    // E.g. { "adapters": [], "wrappers": [], ... }
    [sectionName: string]: any[];
}

interface SignatureParameter {
    name: string;
    type: ParameterType;
}

interface ParameterType {
    name: string;
    type: any;
    elementType: any;
}

interface TypedocInput {
    title: string;
    children: Reflection[];
}

interface Interface {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: any;
    children: any[];
    groups: any[];
    sources: any[];
    extendedTypes: any[];
}

/**
 * Given a file path to a Typedoc JSON output file, the
 * TypedocParser reads that file, generates a new more user-friendly
 * documentation JSON file.
 *
 * Example:
 *
 * const parser = TypedocParser.new("input/0.0.51.json");
 * await parser.parse();
 * await parser.saveFile("output/0.0.51.json");
 */
class TypedocParser {
    /**
     * Given a typedoc representation of an object, returns true if that
     * representation is of a class.
     *
     * @param typedocObj
     * @returns {boolean}
     */
    private static isClass(typedocObj): boolean {
        // All class representations have child data.
        if (!typedocObj.children) {
            return false;
        }

        const firstChild = typedocObj.children[0];
        // All class representations are referred to as "Class".
        return firstChild.kindString === "Class" && typedocObj.name !== '"index"';
    }

    private static methodSignature(methodName: string, signature: any, params: string) {
        const returnType = TypedocParser.returnType(signature);

        if (params === "") {
            return `${methodName}(): ${returnType}`;
        }

        return `${methodName}(
  ${params},
): ${returnType || "void"}`;
    }

    /**
     * Given a set of signature parameters, returns a Typescript-style parameter signature.
     *
     * Examples:
     * TypedocParser.paramsString(params);
     * => "agreementId: string"
     *
     * @param {SignatureParameter[]} params
     * @returns {string}
     */
    private static paramsString(params: SignatureParameter[]) {
        if (!params || !params.length) {
            return "";
        }

        return _.map(params, (param) => {
            // Handle case of array.
            const isArray = param.type && param.type.type === "array";

            if (isArray) {
                return `${param.name}: ${param.type.elementType.name}`;
            }

            // Handle case of function param..
            const isReflection = param.type && param.type.type === "reflection";
            const paramType = isReflection ? "Function" : param.type.name;

            return `${param.name}: ${paramType}`;
        }).join(",<br/>  ");
    }

    private static sectionName(classObj): string {
        // E.g. "adapters" from Typedoc name "adapters/simple_interest_loan_adapter".
        return classObj.name.split("/")[0].substr(1);
    }

    private static getClassMethods(classObj) {
        return _.filter(classObj.children[0].children, (child) => {
            return child.kindString === "Method";
        });
    }

    private static isPromise(signature): boolean {
        return signature.type.name === "Promise" &&
            signature.type.typeArguments &&
            signature.type.typeArguments.length;
    }

    private static returnType(signature) {
        const isArray = signature.type.type && signature.type.type === "array";

        // Deal with special case for arrays.
        if (isArray) {
            return `${signature.type.elementType.name}[]`;
        }

        const isPromise = TypedocParser.isPromise(signature);

        let promiseTargetType: string;

        if (isPromise) {
            const typeArgs = signature.type.typeArguments;
            const isArrayTarget = typeArgs && typeArgs[0].type === "array";

            promiseTargetType = isArrayTarget ? `${typeArgs[0].elementType.name}[]` : typeArgs[0].name;
        }

        const promiseTarget = _.escape(isPromise ? `<${promiseTargetType}>` : "");

        return signature.type.name + promiseTarget;
    }

    private static getExample(signature): string {
        if (!(signature.comment && signature.comment.tags)) {
            return "";
        }

        const example = _.find(signature.comment.tags, (tag) => tag.tag === "example");
        const text = example.text;

        if (text.startsWith("\n ")) {
            return text.substr(2);
        }

        return text;
    }

    private static deepFilter(obj: any, predicate: (obj) => boolean) {
        // Base case:
        if (predicate(obj)) {
            return [obj];
        }

        // Recursively:
        return _.flatten(_.map(obj, (v) => {
            return typeof v === "object" ? this.deepFilter(v, predicate) : [];
        }), true);
    }

    private static interfacesInSignature(signature): string[] {
        const params: SignatureParameter[] = signature.parameters;

        const paramInterfaces = _.compact(
            _.map(params, (param) => {
                if (param.type.name === "reference") {
                    return param.name;
                }
            }),
        );

        return paramInterfaces || [];
    }

    // The path to the Typedoc input JSON file.
    private readonly filePath;
    // The typedoc JSON input, as read from the JSON file at `filePath`.
    private input: TypedocInput;
    // The documentation output, based on the Typedoc data.
    private output: Documentation;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public parse(): void {
        // Read the contents of the Typedoc file.
        this.readFile();
        // Transform the Typedoc JSON into human-friendly output.
        this.parseData();
    }

    /**
     * Given a the desired output path, saves a file there containing
     * the human-friendly JSON data.
     *
     * @param {string} outputPath
     */
    public writeToFile(outputPath: string): void {
        // Convert the documentation object into a string, so we can write it to a file.
        const contents = JSON.stringify(this.output);

        fs.writeFileSync(outputPath, contents);
    }

    private parseData(): void {
        this.output = { sections: this.getSections(), interfaces: this.getInterfaces() };
    }

    private getSections(): SectionDocumentation[] {
        const groupedClasses = this.classesPerSection();

        return _.map(groupedClasses, this.getSectionData.bind(this));
    }

    private getInterfaces(): Interface[] {
        return TypedocParser.deepFilter(
            this.input,
            (obj) => obj.kindString === "Interface" && obj.name !== "Interface",
        );
    }

    private getSectionData(classes: object[], groupName: string): SectionDocumentation {
        return {
            title: groupName,
            classes: this.getClassData(classes),
        };
    }

    private classesPerSection(): SectionToTypedocClasses {
        const allClasses = this.getClasses();

        return _.groupBy(allClasses, TypedocParser.sectionName);
    }

    private getClasses(): object[] {
        // Return all of the typedoc objects that refer to classes.
        return _.filter(this.input.children, TypedocParser.isClass.bind(this));
    }

    private getClassData(classes): ClassDocumentation[] {
        return classes.map((klass) => {
            const name = klass.children[0].name;

            return {
                name,
                methods: this.getMethodData(klass),
            };
        });
    }

    private getMethodData(classObj): MethodDocumentation[] {
        const methods = TypedocParser.getClassMethods(classObj);

        return _.map(methods, (method) => {
            const signature = method.signatures[0];
            const params = TypedocParser.paramsString(signature.parameters);

            let description = "";
            if (signature.comment) {
                description = signature.comment.shortText;

                if (signature.comment.text) {
                    description += `\n\n${signature.comment.text}`;
                }
            }

            return {
                name: method.name,
                description,
                example: TypedocParser.getExample(signature),
                params,
                interfaces: TypedocParser.interfacesInSignature(signature),
                source: `${method.sources[0].fileName}#L${method.sources[0].line}`,
                signature: TypedocParser.methodSignature(method.name, signature, params),
            };
        });
    }

    private readFile(): void  {
        const rawData = fs.readFileSync(this.filePath, "utf8");
        this.input = JSON.parse(rawData);
    }
}

module.exports = TypedocParser;
