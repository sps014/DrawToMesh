let P5Object = new Object();

function CreateCanvas()
{
    const s = (p) => {
        p.setup = function () {
            p.createCanvas(document.getElementById("drawingBoard").offsetWidth,
                document.getElementById("drawingBoard").offsetHeight);
            p.background(122,0,0);
        }
        p.windowResized = function () {
            p.resizeCanvas(document.getElementById("drawingBoard").offsetWidth,
                document.getElementById("drawingBoard").offsetHeight);
            p.background(122, 0, 0);

        }
        p.draw = function () {
            onDraw();
        }
    };

    let myp5 = new p5(s,"drawingBoard");
    P5Object = myp5;

}

function onDraw()
{
    P5Object.circle(12, 20, 40);
}

function onMouseClick()
{

}

function onDoubleClick() {

}