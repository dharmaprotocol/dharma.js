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
var RepaymentRouter = /** @class */ (function (_super) {
    __extends(RepaymentRouter, _super);
    function RepaymentRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RepaymentRouter;
}(MockContract_1.MockContract));
exports.RepaymentRouter = RepaymentRouter;
//# sourceMappingURL=RepaymentRouter.js.map