const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Métodos de la API completados
// ============================================================

// POST - Crear un producto nuevo
app.post('/productos', (req, res) => {
    // Sacamos los tres campos del cuerpo de la petición
    const { nombre, descripcion, precio } = req.body

    // Validación: los tres campos son obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === '') {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    // Id nuevo que no se repite: el id más alto que existe + 1
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1

    // Armamos el producto, convirtiendo el precio a número
    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio)
    }

    // Lo agregamos al arreglo y respondemos con 201 (creado)
    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
})

// PUT - Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    // Obtenemos el id de la URL y buscamos la posición del producto
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Si no existe, respondemos 404
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // Sacamos los tres campos del cuerpo de la petición
    const { nombre, descripcion, precio } = req.body

    // Validación: los tres campos son obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === '') {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    // Reemplazamos los datos del producto conservando su mismo id
    productos[indice] = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio)
    }

    // Respondemos 200 con el producto actualizado
    res.status(200).json(productos[indice])
})

// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    // Obtenemos el id de la URL y buscamos la posición del producto
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Si no existe, respondemos 404
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // splice quita 1 elemento en esa posición y lo devuelve dentro de un arreglo
    const productoEliminado = productos.splice(indice, 1)[0]

    // Respondemos con un mensaje y los datos del producto eliminado
    res.json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})