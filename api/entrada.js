import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ mensaje: "Método no permitido" });
    }

    const { nombre, carrera, semestre, matricula } = req.body;

    const { data: existente } = await supabase
        .from("registros")
        .select("*")
        .eq("matricula", matricula)
        .eq("estado", "dentro")
        .single();

    if (existente) {
        return res.json({ mensaje: "Alumno ya dentro" });
    }

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
        return res.status(500).json({ mensaje: "Error" });
    }

    res.json({ mensaje: "Entrada registrada ✅" });
}