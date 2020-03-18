let pointx = [];
let pointy = [];
let undoStackx = [];
let undoStacky = [];

let canvas;
let refImage;

let radius = 20;
let pencilSize = 3;
let P5Object = new Object();

let hasRef = false;
let shouldAddPoints = true;
let isMouseOnFirstPoint = false;
let maintainAspect = true;


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
        p.keyPressed = function ()
        {
            if (p.keyIsDown(p.CONTROL) && p.key.toLowerCase() == 'z') Undo();
            if (p.keyIsDown(p.CONTROL) && p.key.toLowerCase() == 'y') Redo();

        }
    };

    let myp5 = new p5(s,"drawingBoard");
    P5Object = myp5;
    pointx = [];
    pointy = [];
}

function onDraw()
{
    if (refImage)
    {
        if (!maintainAspect)
            P5Object.image(refImage, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        else
            P5Object.image(refImage, Math.abs(canvas.offsetWidth - refImage.width) / 2,
                Math.abs(canvas.offsetHeight - refImage.height) / 2,
                refImage.width, refImage.height);

    }
    
    P5Object.smooth();

    P5Object.strokeWeight(pencilSize);
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
    if (pointx.length >= 2)
    {
        if (pointx[0] == pointx[pointx.length - 1] && pointy[0] == pointy[pointy.length - 1]) {
            P5Object.fill(0, 0, 250,120);
            P5Object.beginShape();

            for (let i = 0; i < pointx.length; i++) {
                P5Object.vertex(pointx[i], pointy[i]);
            }

            P5Object.endShape(P5Object.CLOSE);
        }
    }
    for (let i = 0; i < pointx.length; i+=1)
    {
        P5Object.strokeWeight(pencilSize);
        P5Object.stroke(255,0,0);
        if (i != pointx.length - 1)
            P5Object.line(pointx[i], pointy[i], pointx[i + 1], pointy[i + 1]);
        P5Object.fill(255);
        if (isMouseOnFirstPoint && i == 0) {
            P5Object.stroke(250, 120, 54);
        }
        else
            P5Object.stroke(50, 0, 205);

        P5Object.strokeWeight(pencilSize);
        if (i != 0)
            continue;
        if (isMouseOnFirstPoint && i == 0)
            P5Object.circle(pointx[i], pointy[i], radius+5);
        else
            P5Object.circle(pointx[i], pointy[i], radius);

    }

    P5Object.stroke(255, 0, 0);
    if (shouldAddPoints && pointx.length >= 1 && P5Object.mouseX >= 0 && P5Object.mouseY >= 0 && P5Object.mouseX <= canvas.offsetWidth && P5Object.mouseY <= canvas.offsetHeight)
    {
        P5Object.line(pointx[pointx.length - 1], pointy[pointx.length - 1], P5Object.mouseX, P5Object.mouseY);
    }
}

function onMouseClick()
{
    if (!(Math.abs(pointx[pointx.length - 1] - pointx[0]) < radius &&
        Math.abs(pointy[pointx.length - 1] - pointy[0]) < radius))
    {
        shouldAddPoints = true;
    }
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
        shouldAddPoints = false;
    }
    else
    {
        pointx.push(P5Object.mouseX);
        pointy.push(P5Object.mouseY);
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
    document.getElementById("customSwitches").onchange = function () {
        maintainAspect = !document.getElementById("customSwitches").checked;
    };

    let filedialog = document.getElementById("file-upload");
    shouldAddPoints = false;
    filedialog.onclick = function ()
    {
        this.value = null;
    };
    filedialog.click();
    filedialog.onchange = function ()
    {
        let file = filedialog.files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (evt)
            {
                if (file.type.indexOf("image") < 0) {
                    alert('you choose file of type:' + file.type);
                    refImage = null;
                    return;
                }

                var raw = new Image();
                raw.src = evt.target.result; // base64 data here
                raw.onload = function ()
                {

                    if (!maintainAspect)
                    {
                        refImage = P5Object.createImage(canvas.offsetWidth, canvas.offsetHeight);
                        refImage.drawingContext.drawImage(raw, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
                    }
                    else
                    {
                        refImage = P5Object.createImage(raw.width, raw.height);
                        refImage.drawingContext.drawImage(raw, 0, 0);
                    }
                    shouldAddPoints = true;
                }
                reader.onerror = function (evt)
                {
                    alert("error reading file");
                }
            }
        }

    }
}

function Check1stAndLastPoint()
{
    if (pointx.length <= 2)
        return false;

    if (Math.abs(pointx[pointx.length - 1] - pointx[0]) < radius && Math.abs(pointy[pointx.length - 1] - pointy[0]) < radius) {
        P5Object.remove();
        return true;
    }
    else
        return false;
}

function ClearReference()
{
    refImage = null;

}
function sendVerticesX()
{
    return pointx;
}
function sendVerticesY() {
    return pointy;
}
function loadVerticesX(x) {
    pointx = x;
}
function loadVerticesY(y) {
    pointy = y;
    shouldAddPoints = false;
} 

function DeleteAll() {
    pointx = [];
    pointy = [];
    shouldAddPoints = true;
}
function Remove2D()
{
    P5Object.remove();
}

function GetWindowWidth() {
    return window.innerWidth;
}