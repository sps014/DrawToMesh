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
    P5.stroke(0, 255, 0);
    //P5.strokeWeight(5);

    P5.smooth();
    P5.fill(0, 50, 170);
    P5.beginShape(P5.TRIANGLES);
    let midX = calMidX();
    let midY = calMidY();
    for (let i = 0; i < pointx.length / 2; i++)
    {
        //if (i == 0) {
        //    P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
        //    P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 0);
        //    P5.vertex(pointx[pointy.length - 2 - i] - midX, pointy[pointy.length - 2 - i] - midY, 0);
        //}
        if (i != pointx.length/2-1)
        {
            P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
            P5.vertex(pointx[i+1] - midX, pointy[i+1] - midY, 0);
            P5.vertex(pointx[pointy.length - 2 - i] - midX, pointy[pointy.length - 2 - i] - midY, 0);

            P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 0);
            P5.vertex(pointx[pointy.length - 2 - i] - midX, pointy[pointy.length - 2 - i] - midY, 0);
            P5.vertex(pointx[pointy.length - 3 - i] - midX, pointy[pointy.length - 3 - i] - midY, 0);


            P5.vertex(pointx[i] - midX, pointy[i] - midY, 40);
            P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);
            P5.vertex(pointx[pointy.length - 2 - i] - midX, pointy[pointy.length - 2 - i] - midY, 40);

            P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);
            P5.vertex(pointx[pointy.length - 2 - i] - midX, pointy[pointy.length - 2 - i] - midY, 40);
            P5.vertex(pointx[pointy.length - 3 - i] - midX, pointy[pointy.length - 3 - i] - midY, 40);
        
        }



    }
    for (let i = 0; i < pointx.length-1; i++) {
       

        P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 0);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);

        P5.vertex(pointx[i] - midX, pointy[i] - midY, 0);
        P5.vertex(pointx[i] - midX, pointy[i] - midY, 40);
        P5.vertex(pointx[i + 1] - midX, pointy[i + 1] - midY, 40);


       
        //P5.vertex(pointx[i] - calMidX(), pointy[i] - calMidY(), 0);
        //P5.vertex(pointx[i] - calMidX(), pointy[i] - calMidY(), 40);

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

function createPolygon()
{
    let poly=[];
    for (let i = 0; i < pointx.length-1; i++)
    {
        poly.push({ x: pointx[i], y: pointy[i] })
    }
    return poly;
}

function cross(a,b)
{
    return a.x * b.y - a.y + b.x;
}
function orien(polygon)
{
    let sum = 0;
    for (let i = 0; i < polygon.length-1; i++)
    {
        sum += cross(polygon[i], polygon[i + 1] );
    }
    return sum;
}

function GetAllTrigs(poly)
{
    let poly = createPolygon();
    let isCW = (orien(poly) > 0);
    if (!isCW)
    {
        poly.reverse();
    }

    let Trigs = Object();

    while (poly.length >= 3)
    {
        let l = poly.length;

        for (let i = 0; i < l; i++)
        {
            let p1 = poly[i];
            let p2 = poly[(i+1)%l];
            let p3 = poly[(i + 2) % l];

            let cw = (orien([p1, p2, p3]) > 0);
            if (!cw)
                continue;
        }
    }
    return Trigs;

}