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
}

interface TypedocInput {
    title: string;
    children: Reflection[];
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

        return `${methodName}(
  ${params},
): ${returnType}`;
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
        return _.map(params, (param) => {
            return `${param.name}: ${param.type.name}`;
        }).join(",<br/>");
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
        return signature.type === "Promise" &&
            signature.type.typeArguments &&
            signature.type.typeArguments.length;
    }

    private static returnType(signature) {
        const type = signature.type.name;

        const isPromise = TypedocParser.isPromise(signature);

        const promiseTarget = isPromise ? ("<" + signature.type.typeArguments[0].name + ">") : "";

        return type + promiseTarget;
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
        this.output = { sections: this.getSections() };
    }

    private getSections(): SectionDocumentation[] {
        const groupedClasses = this.classesPerSection();

        return _.map(groupedClasses, this.getSectionData.bind(this));
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

            return {
                name: method.name,
                description: signature.comment ? signature.comment.shortText : "",
                params,
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
