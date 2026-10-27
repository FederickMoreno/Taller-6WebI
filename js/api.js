var urlAPI = 'https://dummyjson.com'
var listaProductos = []



function extraerProductos() {

    let endPoint = urlAPI + "/products"

    console.info(endPoint)

    fetch(endPoint)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

        listaProductos = respuestaJSON.products
        mostrarProductos(listaProductos)

    })
    .catch(error => console.error("Error al consultar la API:", error))

}

function mostrarProductos(productos) {

    let divPadre = document.getElementById("gridContainer")
    divPadre.innerHTML = ""

    productos.forEach(producto => {

        let divProducto = crearDivProducto(producto)
        adicionarElementoAContenedor(divProducto, divPadre)

    })

}

function crearDivProducto(producto) {

    let div = crearElemento('div')
    div.classList.add('tarjeta')

   
    let divImagen = crearElemento('div')
    divImagen.classList.add('tarjetaImagen')
    let imagen = crearImagen(producto.thumbnail, producto.title)
    adicionarElementoAContenedor(imagen, divImagen)
    adicionarElementoAContenedor(divImagen, div)

    
    let divInfo = crearElemento('div')
    divInfo.classList.add('tarjetaInfo')

    let pCategoria = crearNodoConTexto('p', producto.category)
    pCategoria.classList.add('categoria')
    adicionarElementoAContenedor(pCategoria, divInfo)

    let pNombre = crearNodoConTexto('p', producto.title)
    pNombre.classList.add('nombreProducto')
    adicionarElementoAContenedor(pNombre, divInfo)

    
    let divPrecio = crearElemento('div')
    divPrecio.classList.add('filaPrecio')

    let pPrecio = crearNodoConTexto('span', '$' + producto.price)
    pPrecio.classList.add('precio')
    adicionarElementoAContenedor(pPrecio, divPrecio)

    let pRating = crearNodoConTexto('span', '★ ' + producto.rating)
    pRating.classList.add('calificacion')
    adicionarElementoAContenedor(pRating, divPrecio)

    adicionarElementoAContenedor(divPrecio, divInfo)

    let pStock = crearNodoConTexto('p', 'Stock: ' + producto.stock)
    pStock.classList.add('stock')
    adicionarElementoAContenedor(pStock, divInfo)

    
    let boton = crearNodoConTexto('button', 'Ver producto')
    boton.classList.add('botonVer')
    boton.addEventListener("click", function () {
        window.location.href = 'html/producto.html?id=' + producto.id
    })
    adicionarElementoAContenedor(boton, divInfo)

    adicionarElementoAContenedor(divInfo, div)

    return div

}

function filtrarProductos(texto) {

    let busqueda = texto.toLowerCase().trim()

    let filtrados = listaProductos.filter(producto =>
        producto.title.toLowerCase().includes(busqueda) ||
        producto.category.toLowerCase().includes(busqueda)
    )

    mostrarProductos(filtrados)

}



function extraerDatosProducto(idProducto) {

    let endPoint = urlAPI + "/products/" + idProducto

    console.info(endPoint)

    fetch(endPoint)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

        mostrarDatosProducto(respuestaJSON)

    })
    .catch(error => console.error("Error al consultar la API:", error))

}

function mostrarDatosProducto(producto) {

  
    let divImagen = document.getElementById('divImagen')
    let imagen = crearImagen(producto.thumbnail, producto.title)
    adicionarElementoAContenedor(imagen, divImagen)

    document.getElementById('categoria').textContent = producto.category
    document.getElementById('nombre').textContent = producto.title
    document.getElementById('precio').textContent = '$' + producto.price
    document.getElementById('descripcion').textContent = producto.description

   
    document.getElementById('calificacion').textContent = '★ ' + producto.rating
    document.getElementById('stock').textContent = producto.stock
    document.getElementById('marca').textContent = producto.brand
    document.getElementById('descuento').textContent = producto.discountPercentage + '%'

    document.title = producto.title

}
//cabe aclarar que los simbolos ★, $, ←,  los tuve que sacar de internet 
