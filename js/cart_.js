let Products = [];
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


function disCartPro() {
  let pro = ``;
  for (let i = 0; i < Products.length; i++) {
    pro += `
        <div class="cart-object">
                <i onclick="deleteProduct(${i})" class="fa-solid fa-trash"></i>
                <img src="${Products[i].product.imageCover}" alt="">
                <div class="cart-details">
                    <div class="cart-detail">
                        <p>Name</p>
                        <p>${Products[i].product.title}</p>
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Quantity</p>
                        <input min="1" onclick = "price(${i})" placeholder="1" class="cart-quantity" type="number">
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Price</p>
                        <p class = "prices">${Products[i].price}</p>
                    </div><!-- cart-detail -->
                    <div class="cart-detail">
                        <p>Total</p>
                        <p class = "productTotals"></p>
                    </div><!-- cart-detail -->
                </div><!-- cart-details -->
            </div><!-- cart-object -->
    `
  }
  document.querySelector(".cart-body").innerHTML = pro;
}


// delete 

async function deleteProduct(index){
  const productId = Products[index].product._id; // Assuming each product has a unique ID

  try {
    // Corrected DELETE request
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken").slice(1, -1),
      },
    });

    // Check if the delete was successful
    if (res.ok) {
      // Remove the product from the local Products array
      Products.splice(index, 1);
      // Update the UI after the product has been deleted
      disCartPro();
    } else {
      console.error("Failed to delete product from cart");
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}

// counter
let counts = document.getElementsByClassName(`cart-quantity`);
let prices = document.getElementsByClassName("prices");
let productTotals = document.getElementsByClassName("productTotals")
let sum = 0
function price(index){
  for(let i = 0 ; i < counts.length ; i++)
  {
    
    countVal = Number(counts[index].value);
    // console.log(countVal)
    // console.log(prices[index])
    productTotals[index].innerHTML = `$${ Number(prices[index].innerHTML) * countVal}`;
    // console.log(productTotals.innerHTML);

    sum += Number(prices[index].innerHTML) * countVal;
    console.log(sum);
  }


}




