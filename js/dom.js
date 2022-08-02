const contenedorProductos = document.getElementById('contenedor-productos');
const titulo = document.getElementById('titulo');
const selecTipoDeProd = document.getElementById('selecTipoDeProd');
const buscador = document.getElementById('buscadorProductos');
const btnFinCompras = document.getElementById('btnFinCompras');
window.addEventListener('DOMContentLoaded', () => {
  mostrarProductos()
})

titulo.innerHTML = 'ARMA TU PC!!';

const traerDatos = async () => {
  let respuesta = await fetch("/js/stock.json")
  return respuesta.json()
}

async function mostrarProductos() {
  let listaProductos = await traerDatos()
  contenedorProductos.innerHTML = ""
  listaProductos.forEach((producto) => {
    const { img, nombre, tipoDeProduccto, precio, id } = producto
    let div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src =${img} alt="">
    <h3>${nombre}</h3>
    <p class="productos">Tipo: ${tipoDeProduccto}</p>
    <p class="productos">Precio: $${precio}</p>
    <button onclick=agregarAlCarrito(${id}) class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)
  })
}

async function agregarAlCarrito(id) {
  let productos = await traerDatos()
  const productoElegido = productos.find(el => el.id == parseInt(id))
  if (productoElegido) {
    carritoCompras.push(productoElegido)
  }
  actualizarCarrito()
  localStorage.setItem('carritoLS', JSON.stringify(carritoCompras))
}

function eliminarProducto(id) {
  const productoEliminar = carritoCompras.find(el => el.id == parseInt(id))
  const indice = carritoCompras.indexOf(productoEliminar)
  carritoCompras.splice(indice, 1)
  actualizarCarrito()
  localStorage.setItem('carritoLS', JSON.stringify(carritoCompras))
}

function actualizarCarrito() {
  const contenedorCarrito = document.getElementById('carrito-contenedor')
  const precioTotal = document.getElementById('precioTotal')
  const contadorCarrrito = document.getElementById('contadorCarrito')

  contenedorCarrito.innerHTML = ''

  carritoCompras.forEach((producto) => {
    contenedorCarrito.innerHTML += `
    <div class="productoEnCarrito">
    <p>${producto.nombre}</p>
    <p>Precio: $${producto.precio}</p>
    <button onclick=eliminarProducto(${producto.id})  class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    </div>
    `
  })

  precioTotal.innerText = carritoCompras.reduce((acc, el) => acc += el.precio, 0)
  contadorCarrrito.innerText = carritoCompras.length
}

let carritoCompras = []

function recuperar() {
  let recuperarDeLocalS = JSON.parse(localStorage.getItem('carritoLS'));
  if (recuperarDeLocalS) {
    recuperarDeLocalS.forEach(el => {
      carritoCompras.push(el)
      actualizarCarrito()
    })
  }
}

recuperar();

btnFinCompras.addEventListener('click', () => {
  window.location = "/pages/presupuesto.html"
});


