let P5;
let canvas3d;
let gridGap = 10;

function CreateCanvas3D() {

    canvas3d = document.getElementById("p3dboard");

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
    P5.beginShape(P5.LINES);
    P5.stroke(255, 0, 0);
    for (let i = -canvas3d.offsetWidth; i < canvas3d.offsetWidth; i += gridGap)
    {
        for (let j = -canvas3d.offsetHeight; j < canvas3d.offsetHeight; j += gridGap) {
            P5.vertex(i, j, 0);
        }
    }
    P5.endShape();
}