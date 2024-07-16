const fs = require('fs').promises;

class ProductManager {
    static ultimoId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, img, code, stock) {
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

        //5) guardamos el producto en el archivo

        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    //Debe tener un metodo de getProductById el cual debe buscar en el arreglo el producto que coincida con el id
    //en caso de que no coincida ningun id, mostrar en consola un error "not found"

    async getProductById(id) {
        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find((item) => item.id === id);

        if (!buscado) {
            return 'producto no encontrado!';
        } else {
            return buscado;
        }
    }

    //metodos auxiliares:
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, 'utf-8');
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }
}

module.exports = ProductManager;
