

// start cart

let Products = [];


async function getAllProducts() {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    let resFinal = await res.json();
    Products = resFinal.data;
    eightPros = Products.slice(0, 8);
    disProEight();
  }
  getAllProducts();


async function getCartPro() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      "Content-Type": "application/json", // specify the content type
      token: localStorage.getItem("userToken").slice(1, -1),
    },
  });
  let resFinal = await res.json();
  Products = resFinal.data.products;
  console.log(Products);
  disCartPro();
}
getCartPro();



// `
//           <div class="product d-flex justify-content-center align-items-center">
//                   <div class="col-md-2">
//                     <img class="w-100" src="${Products[i].product.imageCover}" alt="">
//                   </div>
//                   <div class="col-md-2">${Products[i].product.title}</div>
//                   <div class="col-md-2">${Products[i].price}</div>
//                   <div class="col-md-2">${Products[i].count}</div>
//                   <div class="col-md-2">Total</div>
//                   <div class="col-md-2">
//                     <button class="btn btn-danger">Delete</button>
//                   </div>
//                 </div>
//     `;



function disCartPro() {
  let pro = ``;
  for (let i = 0; i < Products.length; i++) {
    pro += `
        <div class="cart-object">
                <i class="fa-solid fa-trash"></i>
                <img src="${Products[i].product.imageCover}" alt="">
                <div class="cart-details">
                    <div class="cart-detail">
                        <p>Name</p>
                        <p>${Products[i].product.title}</p>
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Quantity</p>
                        <p>${Products[i].count}</p>
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Price</p>
                        <p>${Products[i].price}</p>
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Total</p>
                        <p>500$</p>
                    </div><!-- cart-detail -->
                </div><!-- cart-details -->
            </div><!-- cart-object -->
    `
  }
  document.querySelector(".cart-body").innerHTML = pro;
}


// end cart.

