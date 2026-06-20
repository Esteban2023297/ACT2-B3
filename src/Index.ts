import type { Producto } from './calculos.js';
import { calcularSubtotal, calcularIva, calcularTotal } from './calculos.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

async function ejecutarPrograma() {
    const rl = readline.createInterface({ input, output });

    console.log("=== BIENVENIDO AL SISTEMA DE FACTURACIÓN ===");
    
    const respuestaIva = await rl.question("Introduce la tasa de IVA a aplicar (ejemplo: 12 o 16): ");
    const tasaIva = parseFloat(respuestaIva) || 0;

    const carritoDeCompras: Producto[] = [];
    let agregarMas = true;

    while (agregarMas) {
        console.log(`\n--- Ingresando el Producto #${carritoDeCompras.length + 1} ---`);
        
        const nombre = await rl.question("Nombre del producto: ");
        const precioInput = await rl.question("Precio unitario ($): ");
        const cantidadInput = await rl.question("Cantidad: ");

        const precio = parseFloat(precioInput) || 0;
        const cantidad = parseInt(cantidadInput) || 1;

        carritoDeCompras.push({ nombre, precio, cantidad });

        const continuar = await rl.question("\n¿Deseas agregar otro producto? (s/n): ");
        if (continuar.toLowerCase() !== 's') {
            agregarMas = false;
        }
    }

    rl.close();

    const subtotal = calcularSubtotal(carritoDeCompras);
    const iva = calcularIva(subtotal, tasaIva);
    const total = calcularTotal(subtotal, iva);

    console.log("\n======= RECIBO DE COMPRA =======");
    console.log("Productos detallados:");
    carritoDeCompras.forEach(p => {
        console.log(`- ${p.nombre} (x${p.cantidad}): $${(p.precio * p.cantidad).toFixed(2)}`);
    });
    console.log("--------------------------------");
    console.log(`Subtotal:  $${subtotal.toFixed(2)}`);
    console.log(`IVA (${tasaIva}%): $${iva.toFixed(2)}`);
    console.log("--------------------------------");
    console.log(`TOTAL:     $${total.toFixed(2)}`);
    console.log("================================");
}

ejecutarPrograma();