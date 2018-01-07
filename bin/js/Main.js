var Main = /** @class */ (function () {
    function Main() {
        this.score = 0;
        Laya.MiniAdpter.init();
        Laya.init(1280, 720, Laya.WebGL);
        Laya.stage.scaleMode = 'showall';
        Laya.stage.alignH = 'center';
        Laya.stage.screenMode = 'horizontal';
        Laya.loader.load('res/atlas/star.atlas', Laya.Handler.create(this, this.onLoaded), null, Laya.loader.ATLAS);
        this.byte = new Laya.Byte();
        //这里我们采用小端
        this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
        this.socket = new Laya.Socket();
        //这里我们采用小端
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
        //建立连接
        this.socket.connectByUrl("ws://127.0.0.1:3000");
        this.socket.on(Laya.Event.OPEN, this, this.openHandler);
        this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
        this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
        this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
    }
    Main.prototype.onLoaded = function () {
        var _this = this;
        this.gameInfo = new Background();
        Laya.stage.addChild(this.gameInfo);
        this.hero = new Laya.Sprite();
        this.hero.loadImage("star/PurpleMonster.png");
        Laya.stage.addChild(this.hero);
        var stageHeight = Laya.stage.height;
        var stageWidth = Laya.stage.width;
        this.hero.pos(stageWidth / 2 - 38, 397);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.stageClick);
        setTimeout(function () {
            _this.jumpUp();
        }, 500);
        this.starBox = new Laya.Sprite();
        Laya.stage.addChild(this.starBox);
        Laya.stage.frameLoop(20, this, this.createStar);
        Laya.stage.frameLoop(1, this, this.catch);
    };
    Main.prototype.catch = function () {
        for (var i = this.starBox.numChildren - 1; i > 0; i--) {
            var star = this.starBox.getChildAt(i);
            if (Math.abs(this.hero.x - star.x) <= 30 && Math.abs(this.hero.y - star.y) <= 30) {
                star.removeSelf();
                this.score += 1;
                this.gameInfo.scoreLabel.text = 'score: ' + this.score;
                Laya.SoundManager.playSound('res/sound/score.wav');
            }
        }
    };
    Main.prototype.createStar = function () {
        var x = Math.random() * 1000;
        var y = 200 * Math.random();
        if (y >= 397) {
            y = 390;
        }
        var star = new Laya.Sprite();
        star.loadImage('star/star.png');
        this.starBox.addChild(star);
        star.pos(x, y);
        this.randomDestroyStar();
    };
    Main.prototype.randomDestroyStar = function () {
        var starNum = this.starBox.numChildren;
        var destroyIndex = Math.ceil(Math.random() * starNum);
        this.starBox.removeChildAt(destroyIndex);
    };
    Main.prototype.jumpUp = function () {
        var randomHeight = 241 - 200 * Math.random();
        Laya.SoundManager.playSound('res/sound/jump.wav');
        Laya.Tween.from(this.hero, { y: randomHeight }, 2000, Laya.Ease.bounceOut, Laya.Handler.create(this, this.jumpDown));
    };
    Main.prototype.jumpDown = function () {
        Laya.Tween.from(this.hero, { y: 397 }, 1500, Laya.Ease.expoInOut, Laya.Handler.create(this, this.jumpUp));
    };
    Main.prototype.stageClick = function (e) {
        console.log('click', e.stageX, e.stageY);
        if (this.hero.x < e.stageX && e.stageX < 1204) {
            this.hero.pos(this.hero.x + 30, this.hero.y);
        }
        else if (this.hero.x > e.stageX) {
            this.hero.pos(this.hero.x - 30, this.hero.y);
        }
    };
    Main.prototype.onLoop = function () {
        //241 397
        if (this.hero.y === 241) {
            Laya.Tween.from(this.hero, { y: 391 }, 2500, Laya.Ease.bounceOut);
        }
        else {
            Laya.Tween.from(this.hero, { y: 241 }, 2500, Laya.Ease.cubicInOut);
        }
        console.log('y:', this.hero.y);
    };
    Main.prototype.restart = function () {
    };
    Main.prototype.openHandler = function (event) {
        if (event === void 0) { event = null; }
        //正确建立连接；
        console.log('openHandler:', event);
        this.socket.send("hello world"); //这是发送字符串的形式。
    };
    Main.prototype.receiveHandler = function (msg) {
        if (msg === void 0) { msg = null; }
        ///接收到数据触发函数
        console.log('receiveHandler:', msg);
    };
    Main.prototype.closeHandler = function (e) {
        if (e === void 0) { e = null; }
        //关闭事件
        console.log('closeHandler:', e);
    };
    Main.prototype.errorHandler = function (e) {
        if (e === void 0) { e = null; }
        //连接出错
        console.log('errorHandler:', e);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map