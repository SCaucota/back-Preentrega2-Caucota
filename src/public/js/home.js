const socket = io();

document.querySelectorAll(".seeDetailProduct").forEach(button => {
    button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        console.log('Product ID:', productId);
        const productUrl = `/product/${productId}`;
        socket.emit("redirectProductDetail", productUrl)
    })
})

socket.on('redirectProductDetail', (productUrl) => {
    console.log('Recibido redireccionamiento a:', productUrl);
    window.location.href = productUrl;
});