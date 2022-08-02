const pedido = document.getElementById("pedido");
const totalPedido = document.getElementById("totalPedido");
const btnPago = document.getElementById("btnPago");
window.addEventListener('DOMContentLoaded', () => {
  renderizarPedido()
})

function renderizarPedido() {
  let recuperarPedido = JSON.parse(localStorage.getItem('carritoLS'));
  if (recuperarPedido) {
    recuperarPedido.forEach(el => {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let tdprecio = document.createElement("td");
      tr.classList.add("cartItem");
      td.classList.add("prodItem");
      tdprecio.classList.add("precioItem");
      td.innerHTML = `${el.nombre}`;
      tdprecio.innerHTML = `${el.precio}`;
      pedido.append(tr, td, tdprecio);
      totalPedido.innerText = recuperarPedido.reduce((acc, el) => acc += el.precio, 0)
    })
  }
}
btnPago.addEventListener("click", () => {
  Swal.fire({
    icon: 'success',
    title: 'Compra Finalizada'
  })
});

