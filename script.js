// ==========================================
// 1. CONFIGURACIÓN COMERCIAL (TU CELULAR)
// ==========================================
// Reemplazá este número por tu celular real de ventas
const NUMERO_WHATSAPP = "5491141701935"; 

// ==========================================
// 2. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const contador = document.getElementById('contador-carrito');
    const totalElemento = document.getElementById('total-carrito');

    if (contador && totalElemento) {
        contador.innerText = carrito.length;
        const total = carrito.reduce((acc, item) => acc + item.precio, 0);
        totalElemento.innerText = `$${total.toLocaleString('es-AR')} ARS`;
    }
}

// ==========================================
// 3. ENVIAR CONSULTA POR WHATSAPP (BOTÓN INDIVIDUAL Y PEDIDO)
// ==========================================

// Consulta desde una tarjeta de producto individual
function consultarWhatsApp(nombreProducto, codigoOEM) {
    const mensaje = `Hola! Vengo de la tienda web. Quiero consultar stock y precio del repuesto: *${nombreProducto}* (OEM: *${codigoOEM}*).`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Procesar pedido completo del carrito por WhatsApp
function procesarPagoMercadoPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agregá algún repuesto antes de consultar.");
        return;
    }

    let listaProductos = "";
    let total = 0;

    carrito.forEach((item, index) => {
        listaProductos += `\n- ${item.nombre}: $${item.precio.toLocaleString('es-AR')} ARS`;
        total += item.precio;
    });

    const mensaje = `Hola! Vengo de la tienda web y me gustaría concretar la compra de los siguientes repuestos:\n${listaProductos}\n\n*Total estimado:* $${total.toLocaleString('es-AR')} ARS\n\n¿Tienen stock disponible para entrega/envío?`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ==========================================
// 4. FILTRO DINÁMICO DE BÚSQUEDA Y CATEGORÍAS
// ==========================================
const inputBuscador = document.getElementById('input-buscador');

if (inputBuscador) {
    inputBuscador.addEventListener('keyup', function () {
        const textoBusqueda = inputBuscador.value.toLowerCase().trim();
        filtrarProductos(textoBusqueda);
    });
}

function filtrarProductos(texto) {
    const productos = document.querySelectorAll('.producto-card');
    let encontrados = 0;

    productos.forEach(producto => {
        const infoBusqueda = producto.getAttribute('data-busqueda').toLowerCase();

        if (infoBusqueda.includes(texto)) {
            producto.style.display = 'flex';
            encontrados++;
        } else {
            producto.style.display = 'none';
        }
    });

    const mensajeSinResultados = document.getElementById('sin-resultados');
    if (mensajeSinResultados) {
        mensajeSinResultados.style.display = encontrados === 0 ? 'block' : 'none';
    }
}

function filtrarPorCategoria(categoria, botonPresionado) {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => btn.classList.remove('activo'));
    botonPresionado.classList.add('activo');

    const productos = document.querySelectorAll('.producto-card');
    let encontrados = 0;

    productos.forEach(producto => {
        const catProducto = producto.getAttribute('data-categoria');

        if (categoria === 'todos' || catProducto === categoria) {
            producto.style.display = 'flex';
            encontrados++;
        } else {
            producto.style.display = 'none';
        }
    });

    if (inputBuscador) inputBuscador.value = '';

    const mensajeSinResultados = document.getElementById('sin-resultados');
    if (mensajeSinResultados) {
        mensajeSinResultados.style.display = encontrados === 0 ? 'block' : 'none';
    }
// Función para el botón flotante directo
function abrirWhatsAppFlotante(event) {
    if (event) event.preventDefault();
    const mensaje = "Hola! Vengo de la tienda web. Necesito realizar una consulta comercial sobre un repuesto.";
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
}// Función para mostrar notificación flotante estilo Toast
function mostrarNotificacion(mensaje) {
    const toast = document.getElementById('toast-notificacion');
    if (!toast) return;

    toast.innerHTML = `✓ ${mensaje}`;
    toast.classList.add('activo');

    setTimeout(() => {
        toast.classList.remove('activo');
    }, 3000);
}
