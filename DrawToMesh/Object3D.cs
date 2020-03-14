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
        public double Z { get; set; }

        public Point() { }
        public Point(double X,double Y,double Z)
        {
            this.X = X;
            this.Y = Y;
            this.Z = Z;
        }
    }
    public class Triangle
    {
        /// <summary>
        /// index
        /// </summary>
        public int P1 { get; set; }
        /// <summary>
        /// index p2 
        /// </summary>
        public int P2 { get; set; }
        /// <summary>
        /// index p3
        /// </summary>
        public int P3 { get; set; }
        /// <summary>
        /// pass indexea
        /// </summary>
        /// <param name="p1">index p1</param>
        /// <param name="p2"></param>
        /// <param name="p3"></param>
        public Triangle(int p1, int p2, int p3)
        {
            this.P1 = p1;
            this.P2 = p2;
            this.P3 = p3;
        }

    }
}
