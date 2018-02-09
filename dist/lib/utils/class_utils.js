"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Useful class utility functions, borrowed from the 0x.js codebase repo:
 * https://github.com/0xProject/0x.js/tree/a0aa21103b51ad287de1579832a4a490ca90175a/packages/utils
 */
exports.classUtils = {
    // This is useful for classes that have nested methods. Nested methods don't get bound out of the box.
    bindAll: function (self, exclude, thisArg) {
        if (exclude === void 0) { exclude = ['contructor']; }
        for (var _i = 0, _a = Object.getOwnPropertyNames(self); _i < _a.length; _i++) {
            var key = _a[_i];
            var val = self[key];
            if (!_.includes(exclude, key)) {
                if (_.isFunction(val)) {
                    self[key] = val.bind(thisArg || self);
                }
                else if (_.isObject(val)) {
                    exports.classUtils.bindAll(val, exclude, self);
                }
            }
        }
        return self;
    },
};
//# sourceMappingURL=class_utils.js.map