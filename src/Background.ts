class Background extends ui.MainPageUI {
    constructor() {
        super();
        this.startBtn.on(Laya.Event.CLICK, this, this.onStartBtnClick);
    }
    onStartBtnClick(e: Laya.Event): void {
        e.stopPropagation();
        this.start();
    }
    public reset(): void {
        this.startBtn.visible = true;
    }
    public start(): void {
        this.startBtn.visible = false;
    }
    public resume(): void {
        this.startBtn.visible = false;
    }
    public pause(): void {
        this.startBtn.visible = true;
    }
}