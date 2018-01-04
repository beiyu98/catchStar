var Main = /** @class */ (function () {
    function Main() {
        Laya.MiniAdpter.init();
        Laya.init(1280, 720, Laya.WebGL);
        Laya.stage.scaleMode = 'showall';
        Laya.stage.alignH = 'center';
        Laya.stage.screenMode = 'horizontal';
        Laya.loader.load('res/atlas/star.atlas', Laya.Handler.create(this, this.onLoaded), null, Laya.loader.ATLAS);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    Main.prototype.onLoaded = function () {
        this.gameInfo = new Background();
        Laya.stage.addChild(this.gameInfo);
        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        this.hero = new Role();
        this.roleBox.addChild(this.hero);
    };
    Main.prototype.onLoop = function () {
    };
    Main.prototype.restart = function () {
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map