using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawToMesh
{
    public class ObjBuilder
    {
        public string Export(Point[] vertex,Triangle[] triangles)
        {
            string exported="";

            exported += GetVertexData(vertex);
            exported += GetTriangleData(triangles);
            return exported;
        }

        private string GetVertexData(Point[] vertex)
        {
            StringBuilder vert = new StringBuilder("");
            for (int i = 0; i < vertex.Length; i++)
            {
                vert.Append("v  " + vertex[i].X.ToString("0.0000000") + " " + vertex[i].Y.ToString("0.0000000") + " " + vertex[i].Z.ToString("0.0000000") + "\r\n");
            }
            return vert.ToString();
        }

        private string GetTriangleData(Triangle[] trigs)
        {
            StringBuilder trig = new StringBuilder("");

            //1 based indexing 
            for (int i = 0; i < trigs.Length; i++)
            {
                trig.Append("f " + (trigs[i].P1 + 1) + " " + (trigs[i].P2 + 1) + " " + (trigs[i].P3 + 1)+"\r\n");
            }

            return trig.ToString();
        }
    }
}
