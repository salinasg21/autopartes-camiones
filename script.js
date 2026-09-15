// Configuración de la tienda
const NUMERO_WHATSAPP = "5491112345678"; // Reemplazá con tu número real (código de país 54 + 9 + área + número)

let carrito = [];
let total = 0;

// 1. Funcionalidad para enviar consulta directa por WhatsApp
function consultarWhatsApp(nombreProducto, oem) {
    const mensaje = `Hola! Quisiera consultar stock y detalles sobre el repuesto: *${nombreProducto}* (OEM: ${oem}).`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// 2. Funcionalidad del Carrito de Compras
function agregarAlCarrito(nombreProducto, precio) {
    carrito.push({ nombre: nombreProducto, precio: precio });
    total += precio;
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const contador = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('total-carrito');
    
    if (contador && precioTotal) {
        contador.textContent = carrito.length;
        precioTotal.textContent = `$${total.toLocaleString('es-AR')} ARS`;
    }
}// 3. Integración y Procesamiento de Pago con Mercado Pago
function procesarPagoMercadoPago() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá algún repuesto antes de pagar.");
        return;
    }

    // Armamos un resumen textual con lo que el cliente lleva en el carrito
    let detallePedido = carrito.map(item => `- ${item.nombre}: $${item.precio}`).join('%0A');
    
    // Mensaje formateado para confirmación
    let mensajeCobro = `Hola! Quiero abonar mi pedido por un total de *$${total.toLocaleString('es-AR')} ARS* con Mercado Pago.%0A%0A*Detalle del pedido:*%0A${detallePedido}`;

    // Opción A: Abrir chat directo con el vendedor con la solicitud de cobro armada
    const urlMercadoPago = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCobro}`;

    // Notificamos al usuario y abrimos la plataforma de cobro
    alert(`Redirigiendo a la confirmación de pago de tu pedido ($${total.toLocaleString('es-AR')} ARS)...`);
    window.open(urlMercadoPago, '_blank');
}// ==========================================
// 4. FILTRO DINÁMICO DE BÚSQUEDA Y CATEGORÍAS
// ==========================================

// Buscador en tiempo real
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

    // Mostrar u ocultar mensaje de "Sin resultados"
    const mensajeSinResultados = document.getElementById('sin-resultados');
    if (mensajeSinResultados) {
        mensajeSinResultados.style.display = encontrados === 0 ? 'block' : 'none';
    }
}

// Filtro rápido por botones de Categoria
function filtrarPorCategoria(categoria, botonPresionado) {
    // Cambiar la clase activa de los botones
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

    // Limpiar el buscador de texto al hacer clic en una categoría
    if (inputBuscador) inputBuscador.value = '';

    const mensajeSinResultados = document.getElementById('sin-resultados');
    if (mensajeSinResultados) {
        mensajeSinResultados.style.display = encontrados === 0 ? 'block' : 'none';
    }
}