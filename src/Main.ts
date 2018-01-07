class Main {

    private gameInfo: Background;

    private hero: Laya.Sprite;

    private starBox: Laya.Sprite;

    private score: number = 0;

    private socket: Laya.Socket;
    private byte: Laya.Byte;

    constructor() {
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
    onLoaded(): void {
        this.gameInfo = new Background();
        Laya.stage.addChild(this.gameInfo);

        this.hero = new Laya.Sprite();
        this.hero.loadImage("star/PurpleMonster.png");
        Laya.stage.addChild(this.hero);


        let stageHeight: number = Laya.stage.height;
        let stageWidth: number = Laya.stage.width;

        this.hero.pos(stageWidth / 2 - 38, 397);

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.stageClick);

        setTimeout(() => {
            this.jumpUp();
        }, 500);

        this.starBox = new Laya.Sprite();
        Laya.stage.addChild(this.starBox);

        Laya.stage.frameLoop(20, this, this.createStar);

        Laya.stage.frameLoop(1, this, this.catch);
    }
    catch(): void {
        for (let i: number = this.starBox.numChildren - 1; i > 0; i--) {
            let star: Laya.Sprite = this.starBox.getChildAt(i) as Laya.Sprite;
            if (Math.abs(this.hero.x - star.x) <= 30 && Math.abs(this.hero.y - star.y) <= 30) {
                star.removeSelf();
                this.score += 1;
                this.gameInfo.scoreLabel.text = 'score: ' + this.score;
                Laya.SoundManager.playSound('res/sound/score.wav');
            }
        }
    }
    createStar(): void {
        let x: number = Math.random() * 1000;
        let y: number = 200 * Math.random();
        if (y >= 397) {
            y = 390;
        }
        let star = new Laya.Sprite();
        star.loadImage('star/star.png');
        this.starBox.addChild(star);
        star.pos(x, y);

        this.randomDestroyStar();
    }
    randomDestroyStar(): void {
        let starNum: number = this.starBox.numChildren;
        let destroyIndex: number = Math.ceil(Math.random() * starNum);
        this.starBox.removeChildAt(destroyIndex);
    }
    jumpUp(): void {
        let randomHeight: number = 241 - 200 * Math.random();
        Laya.SoundManager.playSound('res/sound/jump.wav');
        Laya.Tween.from(this.hero, { y: randomHeight }, 2000, Laya.Ease.bounceOut, Laya.Handler.create(this, this.jumpDown));
    }
    jumpDown(): void {
        Laya.Tween.from(this.hero, { y: 397 }, 1500, Laya.Ease.expoInOut, Laya.Handler.create(this, this.jumpUp));
    }
    stageClick(e: Laya.Event): void {
        console.log('click', e.stageX, e.stageY);
        if (this.hero.x < e.stageX && e.stageX < 1204) {
            this.hero.pos(this.hero.x + 30, this.hero.y);
        } else if (this.hero.x > e.stageX) {
            this.hero.pos(this.hero.x - 30, this.hero.y);
        }
    }
    onLoop(): void {
        //241 397
        if (this.hero.y === 241) {
            Laya.Tween.from(this.hero, { y: 391 }, 2500, Laya.Ease.bounceOut);
        } else {
            Laya.Tween.from(this.hero, { y: 241 }, 2500, Laya.Ease.cubicInOut);
        }
        console.log('y:', this.hero.y);
    }
    restart(): void {

    }
    private openHandler(event: any = null): void {
        //正确建立连接；
        console.log('openHandler:', event);
        this.socket.send("hello world");//这是发送字符串的形式。
    }
    private receiveHandler(msg: any = null): void {
        ///接收到数据触发函数
        console.log('receiveHandler:', msg);
    }
    private closeHandler(e: any = null): void {
        //关闭事件
        console.log('closeHandler:', e);
    }
    private errorHandler(e: any = null): void {
        //连接出错
        console.log('errorHandler:', e);
    }
}


new Main();