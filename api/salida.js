import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

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
        return res.status(500).json({ mensaje: "Error salida" });
    }

    res.json({ mensaje: "Salida registrada ✅" });
}