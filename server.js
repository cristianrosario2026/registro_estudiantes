require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 conexión Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// ============================
// ✅ REGISTRAR ENTRADA
// ============================
app.post("/entrada", async (req, res) => {

  const { nombre, carrera, semestre, matricula } = req.body;

  // verificar si ya está dentro
  const { data: existente } = await supabase
    .from("registros")
    .select("*")
    .eq("matricula", matricula)
    .eq("estado", "dentro")
    .single();

  if (existente) {
    return res.json({ mensaje: "El alumno ya está dentro ⚠️" });
  }

  // guardar entrada
  const { error } = await supabase
    .from("registros")
    .insert([{
      nombre,
      carrera,
      semestre,
      matricula,
      estado: "dentro"
    }]);

  if (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error al guardar" });
  }

  res.json({ mensaje: "Entrada registrada ✅" });

});


// ============================
// ✅ REGISTRAR SALIDA
// ============================
app.post("/salida", async (req, res) => {

  const { matricula } = req.body;

  const { error } = await supabase
    .from("registros")
    .update({
      estado: "fuera",
      hora_salida: new Date()
    })
    .eq("matricula", matricula)
    .eq("estado", "dentro");

  if (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error salida" });
  }

  res.json({ mensaje: "Salida registrada ✅" });

});


// ============================
app.listen(3000, () => {
  console.log("Servidor corriendo 🚀");
});