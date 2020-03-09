let P5Object = new Object();
let pointx = [];
let pointy = [];
let radius = 20;
let shouldAddPoints = true;
let undoStackx = [];
let undoStacky = [];

let canvas;

let isMouseOnFirstPoint = false;

function CreateCanvas()
{

    canvas = document.getElementById("drawingBoard");

    const s = (p) => {
        p.setup = function () {
            p.createCanvas(canvas.offsetWidth,
                canvas.offsetHeight);
        }
        p.windowResized = function () {
            p.resizeCanvas(canvas.offsetWidth,
                canvas.offsetHeight);

        }
        p.draw = function () {
            p.background(255);
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
    
    P5Object.smooth();

    P5Object.strokeWeight(3);
    P5Object.stroke(50, 0, 205);
    if (pointx.length != 0) {
        if (pointx[0] == 0 && pointy[0] == 0) {
            pointx.splice(0, 1);
            pointy.splice(0, 1);
            P5Object.background(255);
        }
        if (Math.abs(P5Object.mouseX - pointx[0]) < radius && Math.abs(P5Object.mouseY - pointy[0]) < radius) {
            isMouseOnFirstPoint = true;
        }
        else
            isMouseOnFirstPoint = false;
    }
    for (let i = 0; i < pointx.length; i+=1)
    {
        P5Object.strokeWeight(1);
        P5Object.stroke(0);
        if (i != pointx.length - 1)
            P5Object.line(pointx[i], pointy[i], pointx[i + 1], pointy[i + 1]);
        P5Object.fill(255);
        if (isMouseOnFirstPoint&& i==0)
            P5Object.stroke(250, 0, 54);
        else
            P5Object.stroke(50, 0, 205);

        P5Object.strokeWeight(3);
        P5Object.circle(pointx[i], pointy[i], radius);


    }
}

function onMouseClick()
{
    if (!shouldAddPoints)
        return;

    if (P5Object.mouseX > canvas.offsetWidth || P5Object.mouseX < 0)
        return;
    if (P5Object.mouseY > canvas.offsetHeight || P5Object.mouseY < 0)
        return;

    if (Math.abs(P5Object.mouseX - pointx[0]) < radius && Math.abs(P5Object.mouseY - pointy[0]) < radius)
    {
        pointx.push(pointx[0]);
        pointy.push(pointy[0]);
    }
    else
    {
        pointx.push(P5Object.mouseX);
        pointy.push(P5Object.mouseY);
    }
}

function onDoubleClick() {
    shouldAddPoints = false;
    if (pointx.length >= 2) {
        if (Math.abs(pointx[0] - pointx[pointx.length - 1]) < radius && Math.abs(pointy[0] - pointy[pointy.length - 1]) < radius) {
            pointy.slice(pointy.length - 2, 1);
            pointx.slice(pointx.length - 2, 1);
            pointx[pointx.length - 1] = pointx[0];
            pointy[pointx.length - 1] = pointy[0];

        }
    }
}

function Undo()
{
    if (pointx.length > 0)
    {
        undoStackx.push(pointx[pointx.length - 1]);
        undoStacky.push(pointy[pointy.length - 1]);
        pointy.pop();
        pointx.pop();
    }
}

function Redo()
{
    if (undoStackx.length > 0) {
        pointx.push(undoStackx[undoStackx.length - 1]);
        pointy.push(undoStacky[undoStacky.length - 1]);
        undoStackx.pop();
        undoStacky.pop();
    }
}

function OpenFileDialog()
{
    document.getElementById("file-upload").click();
}