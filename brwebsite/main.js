let carts = document.querySelectorAll('.add-cart');

let product = [
    {
        name: 'Hamburger',
        tag: 'hambur',
        price: 5,
        inCart: 0
    },
    {
        name: 'Veggie Burger',
        tag: 'vegbur',
        price: 4,
        inCart: 0
    },
    {
        name: 'Classic Burger',
        tag: 'classbur',
        price: 3,
        inCart: 0
    },
    {
        name: 'Double Patty Burger',
        tag: 'dopbur',
        price: 10,
        inCart: 0
    },
    {
        name: 'Cheese Burger',
        tag: 'cheesebur',
        price: 3,
        inCart: 0
    },
    {
        name: 'Double Cheeseburger',
        tag: 'docbur',
        price: 6,
        inCart: 0
    },

]

for(let i=0; i< carts.length;i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(product[i]);
        totalCost(product[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart-add span').textContent = productNumbers;

    }

}


function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    


    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart-add span').textContent = productNumbers+1;

    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-add span').textContent= 1;

    }
    setItem(product);
    
}

function setItem(product){
  let cartItems = localStorage.getItem('productInCart');
  cartItems = JSON.parse(cartItems);
  
  if(cartItems != null){

    if(cartItems[product.tag] == undefined){
        cartItems={
            ...cartItems,
            [product.tag]: product
        }
    }
    cartItems[product.tag].inCart += 1;

  }else{
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }

  }
    
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}
function totalCost(product){
    //console.log("the price is", product.price);

    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);


    }else{

    localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".product");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="productt">
            <ion-icon  class='fa-solid fa-burger'></ion-icon>   
            <span> ${item.name}</span>
            </div>
            <div class="pricee">$${item.price}</div>
            <div class="quantityy">
            <ion-icon class="decrease" name="chevron-back-outline">
            </ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase" name="chevron-forward-outline"></ion-icon>
            
            </div>
            <div class="totall">
            $${item.inCart * item.price}</div>
            `;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Total
        </h4>
        <h4 class="basketTotal">
        $${cartCost}
        </h4></div>
        `;


    }
}


onLoadCartNumbers();
displayCart();