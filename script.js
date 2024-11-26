import { createStore } from "redux"
import cartReducer from "./cartReducer"
import { addToCart, removeFromCart, calculateTotal } from "./actions";

const store = createStore(cartReducer)

const products = [  

  { id: 1, name: "Product A", price: 10 },  
  
  { id: 2, name: "Product B", price: 20 },  
  
  { id: 3, name: "Product C", price: 15 } 
  
  ];

  store.subscribe(() => { // get the current state of the store or notify the changes..
    console.log("updated:",store.getState())
    updateCart()
  
  })
 
 

 const productList = document.querySelector("#productList")
 const cartList = document.querySelector("#cartList")
 const totalPriceElement = document.querySelector("#totalPrice")



const renderProducts = (products) => {

  productList.innerHTML = "" // initially clear the list...

  products.map((product) => {
    const listProduct = document.createElement("li");
    listProduct.innerHTML = `${product.name} - ${product.price}`;

    // add button..
    const addButton = document.createElement("button")
    addButton.textContent = "Add to Cart"
    addButton.className = "mx-2"
    addButton.addEventListener("click", () => {
      store.dispatch(addToCart(product))
      store.dispatch(calculateTotal())
    })
    listProduct.appendChild(addButton)
    productList.appendChild(listProduct); 
  });
};


window.removeItemHandler = (id) => {
  store.dispatch(removeFromCart({ id }))
  store.dispatch(calculateTotal()) // recalculate total price after removed items from the cart..
}

const updateCart = () => {
  cartList.innerHTML = "" // clear the existing cart list..
  const state = store.getState() // get the current cart state..
  const cartItems = state.cartItems
  console.log(cartItems)
  const totalPrice = state.totalPrice
  console.log(totalPrice)
  cartItems.map((item, id) => {
    const listItem = document.createElement("li")
    listItem.innerHTML = `${item.name} -Rs. ${item.price} - Quantity: ${item.quantity} <button class="mx-1" onClick="removeItemHandler(${item.id})">Remove</button>`
    cartList.appendChild(listItem)
  })

  totalPriceElement.textContent = `Total: Rs.${totalPrice}`
}


store.subscribe(updateCart);
renderProducts(products);


store.dispatch(addToCart({ id: 1, name: "Product A", price: 10 }));
store.dispatch(calculateTotal());
store.dispatch(addToCart({id:2, name: "Product B", price: 20}))
store.dispatch(calculateTotal());
store.dispatch(addToCart({id: 1, name: "Product A", price: 10}))
store.dispatch(calculateTotal())
store.dispatch(removeFromCart({id: 1, name: "Product A", price: 10}))
store.dispatch(calculateTotal())
