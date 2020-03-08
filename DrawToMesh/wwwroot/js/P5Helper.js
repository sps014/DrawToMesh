let P5Object = new Object();
let pointx = [];
let pointy = [];
let radius = 25;
let shouldAddPoints = true;

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
        p.doubleClicked = function () {
            shouldAddPoints = false;
        }
    };

    let myp5 = new p5(s,"drawingBoard");
    P5Object = myp5;
    pointx = [];
    pointy = [];
}

function onDraw()
{
    P5Object.strokeWeight(3);
    P5Object.stroke(50, 0, 255);
    if (pointx.length != 0) {
        if (pointx[0] == 0 && pointy[0] == 0) {
            pointx.splice(0, 1);
            pointy.splice(0, 1);
            P5Object.background(255);
        }
    }
    for (let i = 0; i < pointx.length; i+=1)
    {
        if (i != pointx.length - 1)
            P5Object.line(pointx[i], pointy[i], pointx[i + 1], pointy[i + 1]);
        P5Object.fill(255);
        P5Object.circle(pointx[i], pointy[i], radius);


    }
}

function onMouseClick()
{
    if (!shouldAddPoints)
        return;

    pointx.push(P5Object.mouseX);
    pointy.push(P5Object.mouseY);
}

function onDoubleClick() {

}