using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrawToMesh
{
    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }
        public Point() { }
        public Point(double X,double Y)
        {
            this.X = X;
            this.Y = Y;
        }
    }
    public class Triangle
    {
        public Point P1 { get; set; }
        public Point P2 { get; set; }
        public Point P3 { get; set; }

    }
    public class PathTriangulation
    {
    }
}
