"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MockContract_1 = require("./MockContract");
var DebtToken = (function (_super) {
    __extends(DebtToken, _super);
    function DebtToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DebtToken;
}(MockContract_1.MockContract));
exports.DebtToken = DebtToken;
//# sourceMappingURL=DebtToken.js.map