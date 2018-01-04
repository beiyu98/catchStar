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
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.startBtn.on(Laya.Event.CLICK, _this, _this.onStartBtnClick);
        _this.start();
        return _this;
    }
    Background.prototype.onStartBtnClick = function (e) {
        e.stopPropagation();
        this.start();
    };
    Background.prototype.reset = function () {
        this.startBtn.visible = true;
    };
    Background.prototype.start = function () {
        this.startBtn.visible = false;
    };
    Background.prototype.resume = function () {
        this.startBtn.visible = false;
    };
    Background.prototype.pause = function () {
        this.startBtn.visible = true;
    };
    return Background;
}(ui.MainPageUI));
//# sourceMappingURL=Background.js.map