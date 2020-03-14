let P5;
let canvas3d;
let gridGap = 10;
let mode;
let distToCam = 0;
let wireFrameControl;
let showWireFrame = true;

function CreateCanvas3D(Mode=0) {

    mode = Mode;
    canvas3d = document.getElementById("p3dboard");
    wireFrameControl = document.getElementById("wireFrame");
    wireFrameControl.onchange = WireFrameBox;

    const s = (p) => {
        p.setup = function () {
            p.createCanvas(canvas3d.offsetWidth,
                canvas3d.offsetHeight, p.WEBGL);
            p.background(255);

        }
        p.windowResized = function () {
            p.resizeCanvas(canvas3d.offsetWidth,
                canvas3d.offsetHeight);
        }
        p.draw = function () {
            p.background(255);
            Draw3D();

        }

    };
    let myp5 = new p5(s, "p3dboard");
    P5 = myp5;
}

function Draw3D()
{

    if (!showWireFrame) {
        P5.strokeWeight(0);
    }
    else {
        P5.strokeWeight(2);
    }

    //camera offset
    P5.camera(0, 0, distToCam + (canvas3d.offsetHeight / 2.0) / Math.tan(P5.PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    if (mode == 0)
    {
        DrawFromShape();
    }
}

function DrawFromShape()
{
    P5.stroke(0, 255, 0);
    //P5.strokeWeight(5);

    P5.smooth();
    P5.fill(0, 50, 170);
    P5.beginShape(P5.TRIANGLES);
    let midX = calMidX();
    let midY = calMidY();

    let parr = [];
    for (let i = 0; i < pointx.length - 1; i++) {
        parr.push(pointx[i]);
        parr.push(pointy[i]);
    }

    let res = earcut(parr);
    for (let i = 0; i < res.length; i += 3) {
        P5.vertex(pointx[res[i]] - midX, pointy[res[i]] - midY);
        P5.vertex(pointx[res[i + 1]] - midX, pointy[res[i + 1]] - midY);
        P5.vertex(pointx[res[i + 2]] - midX, pointy[res[i + 2]] - midY);

        P5.vertex(pointx[res[i + 2]] - midX, pointy[res[i + 2]] - midY,40);
        P5.vertex(pointx[res[i + 1]] - midX, pointy[res[i + 1]] - midY,40);
        P5.vertex(pointx[res[i]] - midX, pointy[res[i]] - midY,40);

    }



    for (let i = 0; i < pointx.length - 1; i++) {


        P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 0);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);

        P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
        P5.vertex(pointx[i] - midX, pointy[i] - midY, 40);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);




    }
    P5.rotateY(P5.millis() / 1000);
    P5.endShape(P5.CLOSE);
}

function calMidX() {
    let mid = 0;
    for (let i = 0; i < pointx.length; i++) {
        mid += pointx[i];
    }
    mid = mid / pointx.length;
    return mid;
}
function calMidY() {
    let mid = 0;
    for (let i = 0; i < pointy.length; i++) {
        mid += pointy[i];
    }
    mid = mid / pointy.length;
    return mid;
}
function Remove3D() {
    P5.remove();
}
function CamDistanceChanged(value) {
    distToCam = value;
}
function WireFrameBox() {
    showWireFrame = wireFrameControl.checked;
}