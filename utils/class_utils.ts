import * as includes from "lodash.includes";
import * as isObject from "lodash.isobject";
import * as isFunction from "lodash.isfunction";

/**
 * Useful class utility functions, borrowed from the 0x.js codebase repo:
 * https://github.com/0xProject/0x.js/tree/a0aa21103b51ad287de1579832a4a490ca90175a/packages/utils
 */
export const classUtils = {
    // This is useful for classes that have nested methods. Nested methods don't get bound out of the box.
    bindAll(self: any, exclude: string[] = ['contructor'], thisArg?: any): void {
        for (const key of Object.getOwnPropertyNames(self)) {
            const val = self[key];
            if (!includes(exclude, key)) {
                if (isFunction(val)) {
                    self[key] = val.bind(thisArg || self);
                } else if (isObject(val)) {
                    classUtils.bindAll(val, exclude, self);
                }
            }
        }
        return self;
    },
};
