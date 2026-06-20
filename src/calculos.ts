export interface Producto {
    nombre: string;
    precio: number;
    cantidad: number;
}

export function calcularSubtotal(productos: Producto[]): number {
    return productos.reduce((acumulado, producto) => {
        return acumulado + (producto.precio * producto.cantidad);
    }, 0);
}

export function calcularIva(subtotal: number, tasaIva: number): number {
    return subtotal * (tasaIva / 100);
}

export function calcularTotal(subtotal: number, iva: number): number {
    return subtotal + iva;
}