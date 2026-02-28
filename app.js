document
    .getElementById("registroForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const datos = {
            nombre: document.getElementById("nombre").value,
            carrera: document.getElementById("carrera").value,
            semestre: document.getElementById("semestre").value,
            matricula: document.getElementById("matricula").value
        };

        await fetch("http://localhost:3000/entrada", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        alert("Entrada registrada ✅");

    });


// ✅ SALIDA
async function registrarSalida() {

    const matricula =
        document.getElementById("matricula").value;

    await fetch("http://localhost:3000/salida", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ matricula })
    });

    alert("Salida registrada ✅");
}