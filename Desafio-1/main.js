//* Primer desafio Backend

//* Consigna: Realizar una clase "Product Manager" que gestione un conjunto de productos

class ProductManager {
    static ultimoId = 0;

    //debe crearse desde su constructor con el elemento products, el cual será un arreglo vacio
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, img, code, stock) {
        //el producto que recibo por parametro lo meto en el array:
        //validar que cada campo este completo y no se repita el codigo

        //1) Validacion:

        if (!title || !description || !price || !img || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        //2) Validacion:

        if (this.products.some((item) => item.code === code)) {
            console.log('El codigo debe ser unico, no se pueden repetir');
            return;
        }

        //3) Crear el producto con un id autoincrementable:

        const nuevoProducto = {
            id: ++ProductManager.ultimoId,
            title,
            description,
            price,
            img,
            code,
            stock,
        };

        //4) Meter el producto en el array
        this.products.push(nuevoProducto);
    }

    getProducts() {
        // Devolver el array con los productos agregados
        return this.products;
    }

    //Debe tener un metodo de getProductById el cual debe buscar en el arreglo el producto que coincida con el id
    //en caso de que no coincida ningun id, mostrar en consola un error "not found"

    getProductById(id) {
        const producto = this.products.find((item) => item.id === id);

        if (!producto) {
            console.log('Producto not found');
        } else {
            console.log(
                'Se encontró el producto! Te dejo el detalle aqui abajo:'
            );
            console.log(producto);
        }
    }
}

//* Apuntes: Debe incluir lo siguiente:
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

//* Testing

//1) Se creará una instancia de la clase "ProductManager":

const manager = new ProductManager();

//2) Se llamará "getProducts" recien creada la instancia, debe devolver un arreglo vacio []

//3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct(
    'producto prueba',
    'este es un producto prueba',
    500,
    'sin imagen',
    'abc123',
    25
);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

// manager.addProduct("Mesa", "De la mejor calidad", 300, "sin imagen", "abc124", 150);
manager.addProduct(
    'Mesa',
    'De la mejor calidad',
    300,
    'sin imagen',
    'abc124',
    150
);

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(manager.getProducts());

//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

manager.getProductById(2);
