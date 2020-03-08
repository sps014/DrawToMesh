let P5Object = new Object();
let pointx = [];
let pointy = [];

function CreateCanvas()
{
 
    const s = (p) => {
        p.setup = function () {
            p.createCanvas(document.getElementById("drawingBoard").offsetWidth,
                document.getElementById("drawingBoard").offsetHeight);
            p.background(255);
        }
        p.windowResized = function () {
            p.resizeCanvas(document.getElementById("drawingBoard").offsetWidth,
                document.getElementById("drawingBoard").offsetHeight);
            p.background(255);

        }
        p.draw = function () {
            onDraw();
        }
        p.mouseClicked = function () {
            onMouseClick();
        }
    };

    let myp5 = new p5(s,"drawingBoard");
    P5Object = myp5;
    pointx = [];
    pointy = [];
}

function onDraw()
{
    if (pointx[0] == 0 && pointy[0] == 0) {
        pointx.splice(0, 1);
        pointy.splice(0, 1);
    }
    for (let i = 0; i < pointx.length; i+=1)
    {
        P5Object.circle(pointx[i], pointy[i],40);
    }
}

function onMouseClick()
{
    pointx.push(P5Object.mouseX);
    pointy.push(P5Object.mouseY);
}

function onDoubleClick() {

}