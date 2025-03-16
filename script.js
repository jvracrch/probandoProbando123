document.addEventListener("DOMContentLoaded", function () {
    cargarApuntes();

    document.getElementById("form-apunte").addEventListener("submit", function (e) {
        e.preventDefault();
        guardarApunte();
    });
});

function cargarApuntes() {
    fetch("posts.json")
        .then(response => response.json())
        .then(apuntes => {
            const contenedor = document.getElementById("posts-container");
            contenedor.innerHTML = "";

            apuntes.forEach(apunte => {
                const div = document.createElement("div");
                div.innerHTML = `<h2>${apunte.title}</h2><p>${apunte.content}</p>`;
                contenedor.appendChild(div);
            });
        })
        .catch(error => console.error("Error cargando los apuntes:", error));
}

function guardarApunte() {
    const titulo = document.getElementById("titulo").value.trim();
    const contenido = document.getElementById("contenido").value.trim();

    if (titulo === "" || contenido === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    fetch("posts.json")
        .then(response => response.json())
        .then(apuntes => {
            apuntes.push({ title: titulo, content: contenido });

            return fetch("posts.json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apuntes, null, 2)
            });
        })
        .then(() => {
            document.getElementById("titulo").value = "";
            document.getElementById("contenido").value = "";
            cargarApuntes();
        })
        .catch(error => console.error("Error guardando el apunte:", error));
}