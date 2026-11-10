document.addEventListener("DOMContentLoaded", () => {

    let carrito = []; 

    const listaCarrito = document.getElementById("listaCarrito");
    const totalTexto = document.getElementById("totalCarrito");
    const btnVaciar = document.getElementById("btnVaciar");

    function mostrarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
        }

        for (let i = 0; i < carrito.length; i++) {
            const li = document.createElement("li");
            li.textContent = carrito[i].nombre + " - " + carrito[i].precio.toFixed(2) + " bs ";

            const btnQuitar = document.createElement("button");
            btnQuitar.type = "button";
            btnQuitar.textContent = "Quitar";
            btnQuitar.addEventListener("click", () => {
                carrito.splice(i, 1);
                mostrarCarrito();
            });

            li.appendChild(btnQuitar);
            listaCarrito.appendChild(li);

            total = total + carrito[i].precio;  
        }

        totalTexto.textContent = "Total: " + total.toFixed(2) + " bs";
    }

    const botones = document.querySelectorAll(".catalogo-grid button, .zodiac-grid button, .promo-grid button");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const tarjeta = boton.closest("article, div");
            const nombre = tarjeta.querySelector("h3").textContent;
            const textoPrecio = tarjeta.querySelector("strong").textContent;   
            const precio = parseFloat(textoPrecio.replace("Precio:", ""));     

            carrito.push({ nombre: nombre, precio: precio });
            mostrarCarrito();
        });
    });

    btnVaciar.addEventListener("click", () => {
        carrito = [];
        mostrarCarrito();
    });

    mostrarCarrito();


    const formulario = document.getElementById("formulario");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const mensaje = document.getElementById("mensaje");
    const listaUsuarios = document.getElementById("listaUsuarios");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    function mostrarUsuarios() {
        listaUsuarios.innerHTML = "";
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = usuario.nombre + " (" + usuario.correo + ")";
            listaUsuarios.appendChild(li);
        });
    }

    mostrarUsuarios();

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        if (nombre.value.trim() === "" || correo.value.trim() === "" || password.value.trim() === "") {
            mensaje.textContent = "Por favor, completa todos los campos.";
            return;
        }

        usuarios.push({ nombre: nombre.value.trim(), correo: correo.value.trim() });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mostrarUsuarios();
        mensaje.textContent = "¡Usuario registrado correctamente!";
        formulario.reset();
    });

});