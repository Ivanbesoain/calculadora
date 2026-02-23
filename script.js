let cantidad = 0;
const precioBase = 400000;

const spanCantidad = document.querySelector("#cantidad");
const spanTotal = document.querySelector("#total");
const spanPrecio = document.querySelector("#precio-base");

spanPrecio.innerHTML = "$" + precioBase.toLocaleString("es-CL");

function actualizarDOM() {
    spanCantidad.innerHTML = cantidad;
    spanTotal.innerHTML = "$" + (precioBase * cantidad).toLocaleString("es-CL");

    spanTotal.classList.remove("bump");
    void spanTotal.offsetWidth;
    spanTotal.classList.add("bump");
    setTimeout(() => spanTotal.classList.remove("bump"), 200);
}

function aumentar() {
    cantidad++;
    actualizarDOM();
}

function disminuir() {
    if (cantidad > 0) {
        cantidad--;
        actualizarDOM();
    }
}