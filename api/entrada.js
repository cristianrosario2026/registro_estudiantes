import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        mensaje: "Método no permitido"
      });
    }

    const { nombre, carrera, semestre, matricula } = req.body;

    if (!nombre || !carrera || !semestre || !matricula) {
      return res.status(400).json({
        error: "Datos incompletos"
      });
    }

    const { error } = await supabase
      .from("registros")
      .insert([
        {
          nombre,
          carrera,
          semestre,
          matricula,
          estado: "dentro"
        }
      ]);

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    return res.status(200).json({
      mensaje: "Entrada registrada ✅"
    });

  } catch (err) {
    console.error("ERROR GENERAL:", err);
    return res.status(500).json({
      error: err.message
    });
  }
}