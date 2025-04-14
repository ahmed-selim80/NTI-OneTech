// var swiper = new Swiper(".slide-content", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   // slidesPerGroup: 3,
//   centerSlide: "true",
//   fade: "true",
//   loop: true,
//   gragCursor: "true",
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

let Products = [];
let eightPros = [];
async function getAllProducts() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let resFinal = await res.json();
  Products = resFinal.data;
  eightPros = Products.slice(0, 8);
  disProEight();
}
getAllProducts();


function disProEight() {
  let pro = ``;
  for (let i = 0; i < eightPros.length; i++) {
    pro += `
        <div class="product">
          <div class="new">New</div>
          <img src="${eightPros[i].imageCover}" alt="">
          <p>$${eightPros[i].price}</p>
          <p class="product-name">${eightPros[i].title}</p>

          <div class="add-cart">
              <button class="addCart" onclick="addToCart('${eightPros[i].id}');">Add to cart</button>
          </div>
          </div>
        </div>
    `;
  }
  document.querySelector(".hot-products-left").innerHTML = pro;
}

async function addToCart(proId) {
  console.log(proId);
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // specify the content type
      token: localStorage.getItem("userToken").slice(1, -1),
    },
    body: JSON.stringify({
      productId: proId,
    }),
  });
  let resFinal = await res.json();
  console.log(resFinal);
}
