/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2A-1 FIXED
   API + Constants + Products + Storage
========================================== */


/* ===========================
   API CONFIG
=========================== */

const API_URL = "http://localhost:5000";


/* ===========================
   CONSTANTS
=========================== */

const DELIVERY_CHARGE = 40;

const WHATSAPP_NUMBER = "917817042522";


/* ===========================
   CART DATA
=========================== */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


/* ===========================
   LOGIN USER
=========================== */

let loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    ) || null;



/* ===========================
   PRODUCTS LIST
=========================== */

const products = [

    {
        id: 1,

        name: "Aashirvaad Atta",

        category: "Atta",

        price: 320,

        discount: 10,

        stock: 20,

        image: "images/atta.jpg",

        featured: true,

        bestSeller: false
    },


    {
        id: 2,

        name: "India Gate Rice",

        category: "Rice",

        price: 650,

        discount: 15,

        stock: 15,

        image: "images/rice.jpg",

        featured: true,

        bestSeller: true
    },


    {
        id: 3,

        name: "Fortune Oil",

        category: "Oil",

        price: 180,

        discount: 5,

        stock: 30,

        image: "images/oil.jpg",

        featured: false,

        bestSeller: false
    },


    {
        id: 4,

        name: "Tata Salt",

        category: "Salt",

        price: 30,

        discount: 0,

        stock: 50,

        image: "images/salt.jpg",

        featured: false,

        bestSeller: false
    },


    {
        id: 5,

        name: "Tata Tea",

        category: "Tea",

        price: 210,

        discount: 10,

        stock: 12,

        image: "images/tea.jpg",

        featured: true,

        bestSeller: false
    },


    {
        id: 6,

        name: "Sugar",

        category: "Sugar",

        price: 48,

        discount: 5,

        stock: 40,

        image: "images/sugar.jpg",

        featured: false,

        bestSeller: false
    },


    {
        id: 7,

        name: "Maggi",

        category: "Snacks",

        price: 15,

        discount: 0,

        stock: 25,

        image: "images/maggi.jpg",

        featured: false,

        bestSeller: true
    },


    {
        id: 8,

        name: "Parle-G",

        category: "Biscuits",

        price: 10,

        discount: 0,

        stock: 60,

        image: "images/parleg.jpg",

        featured: false,

        bestSeller: false
    }


];



/* ===========================
   SAVE CART
=========================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* ===========================
   LOGIN CHECK
=========================== */

function isUserLoggedIn() {

    return (
        localStorage.getItem("loggedInUser") !==
        null
    );

}



/* ===========================
   GET FINAL PRODUCT PRICE
=========================== */


function getFinalPrice(product) {

    let discountAmount =
        (product.price * product.discount) / 100;


    return Math.round(
        product.price - discountAmount
    );

}



/* ===========================
   PRODUCT STOCK STATUS
=========================== */


function getStockStatus(product) {


    if (product.stock <= 0) {

        return `
        <span class="stock out">
        ❌ Out Of Stock
        </span>
        `;

    }


    if (product.stock <= 5) {

        return `
        <span class="stock low">
        ⚠ Only ${product.stock} Left
        </span>
        `;

    }


    return `
    <span class="stock available">
    ✅ In Stock
    </span>
    `;


}



/* ===========================
   PRODUCT BADGES
=========================== */


function getProductBadges(product) {

    let badges = "";


    if (product.featured) {

        badges += `

        <span class="badge featured">
        ⭐ Featured
        </span>

        `;

    }


    if (product.bestSeller) {

        badges += `

        <span class="badge bestseller">
        🔥 Best Seller
        </span>

        `;

    }


    if (product.discount > 0) {


        badges += `

        <span class="badge discount">
        ${product.discount}% OFF
        </span>

        `;

    }


    return badges;


}



/* ===========================
   TOAST MESSAGE
=========================== */


function showToast(message) {


    let toast =
        document.getElementById("toast");



    if (!toast) {


        toast =
            document.createElement("div");


        toast.id = "toast";


        toast.style.position = "fixed";

        toast.style.bottom = "25px";

        toast.style.right = "25px";

        toast.style.background = "#222";

        toast.style.color = "#fff";

        toast.style.padding = "12px 20px";

        toast.style.borderRadius = "8px";

        toast.style.zIndex = "99999";

        toast.style.transition = "0.3s";


        document.body.appendChild(toast);

    }



    toast.innerHTML = message;


    toast.style.opacity = "1";


    setTimeout(() => {


        toast.style.opacity = "0";


    }, 2500);



}



/* ===========================
   CART COUNT
=========================== */


function updateCartCount() {


    const count =
        document.getElementById(
            "cartCount"
        );


    if (!count) return;



    let total = 0;



    cart.forEach(item => {


        total += item.quantity;


    });



    count.innerHTML = total;



}
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2A-2 FIXED

   Product Render
   Search
   Category Filter
========================================== */


/* ===========================
   RENDER PRODUCTS
=========================== */


function renderProducts(productList = products) {


    const productContainer =
        document.getElementById(
            "productContainer"
        );


    if (!productContainer) return;



    productContainer.innerHTML = "";



    if (productList.length === 0) {


        productContainer.innerHTML = `

        <div class="no-products">

            <h2>
            No Products Found
            </h2>

        </div>

        `;


        return;

    }




    productList.forEach(product => {


                const finalPrice =
                    getFinalPrice(product);



                productContainer.innerHTML += `


        <div class="product-card">


            <div class="product-badges">

                ${getProductBadges(product)}

            </div>



            <img

            src="${product.image}"

            alt="${product.name}"

            loading="lazy"

            >




            <h3>
            ${product.name}
            </h3>




            <p class="category">

            ${product.category}

            </p>




            <div class="price-box">


                ${
                product.discount > 0

                ?

                `

                <span class="old-price">

                ₹${product.price}

                </span>


                <h2>

                ₹${finalPrice}

                </h2>

                `


                :

                `

                <h2>

                ₹${product.price}

                </h2>

                `

                }


            </div>




            <div class="stock-box">

                ${getStockStatus(product)}

            </div>





            <div class="product-buttons">



            <button

            onclick="addToCart(${product.id})"

            ${product.stock<=0 ? "disabled":""}

            >

            ${
            product.stock<=0

            ?

            "Out Of Stock"

            :

            "Add To Cart"

            }

            </button>





            <button

            class="wishlist-btn"

            onclick="toggleWishlist(${product.id})"

            >

            ${
            isWishlisted(product.id)

            ?

            "❤️"

            :

            "🤍"

            }

            </button>



            </div>



        </div>


        `;


    });


}




/* ===========================
   SEARCH PRODUCTS
=========================== */


function searchProducts(){


    const searchInput =
    document.getElementById(
        "searchInput"
    );



    if(!searchInput) return;




    const keyword =
    searchInput.value
    .trim()
    .toLowerCase();




    const filteredProducts =
    products.filter(product=>{


        return (

        product.name
        .toLowerCase()
        .includes(keyword)



        ||



        product.category
        .toLowerCase()
        .includes(keyword)


        );


    });




    renderProducts(
        filteredProducts
    );


}





/* ===========================
   CATEGORY FILTER
=========================== */


function filterCategory(category){



    if(category==="All"){


        renderProducts(
            products
        );


        return;

    }




    const filteredProducts =
    products.filter(product=>{


        return (

        product.category === category

        );


    });




    renderProducts(
        filteredProducts
    );


}




/* ===========================
   SEARCH EVENT
=========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const searchInput =
    document.getElementById(
        "searchInput"
    );



    if(searchInput){


        searchInput.addEventListener(

            "input",

            searchProducts

        );


    }



});





/* ===========================
   CATEGORY BUTTON EVENT
=========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const buttons =
    document.querySelectorAll(
        ".category-btn"
    );



    buttons.forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            buttons.forEach(btn=>{


                btn.classList.remove(
                    "active"
                );


            });



            button.classList.add(
                "active"
            );



            filterCategory(
                button.dataset.category
            );



        });


    });



});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2A-3 FIXED

   CART SYSTEM
========================================== */


/* ===========================
   ADD TO CART
=========================== */


function addToCart(productId){



    // Login Check

    if(!isUserLoggedIn()){


        showToast(
            "Please Login First"
        );


        setTimeout(()=>{


            window.location.href =
            "register.html";


        },800);


        return;

    }




    const product =
    products.find(
        p=>p.id===productId
    );



    if(!product) return;




    // Stock Check

    if(product.stock <= 0){


        showToast(
            "Product Out Of Stock"
        );


        return;

    }




    const existingItem =
    cart.find(
        item=>item.id===productId
    );





    if(existingItem){



        if(existingItem.quantity >= product.stock){


            showToast(
                "Maximum Stock Reached"
            );


            return;

        }



        existingItem.quantity++;



    }

    else{



        cart.push({


            id:product.id,


            name:product.name,


            price:getFinalPrice(product),


            image:product.image,


            quantity:1


        });


    }





    saveCart();


    updateCartCount();


    renderCart();



    showToast(

    `${product.name} Added`

    );



}






/* ===========================
   REMOVE FROM CART
=========================== */


function removeFromCart(productId){



    cart =
    cart.filter(
        item=>item.id!==productId
    );



    saveCart();


    updateCartCount();


    renderCart();



    showToast(
        "Item Removed"
    );


}





/* ===========================
   INCREASE QUANTITY
=========================== */


function increaseQuantity(productId){



    const item =
    cart.find(
        item=>item.id===productId
    );



    if(!item) return;



    const product =
    products.find(
        p=>p.id===productId
    );



    if(item.quantity >= product.stock){


        showToast(
            "Stock Limit Reached"
        );


        return;

    }




    item.quantity++;



    saveCart();


    updateCartCount();


    renderCart();



}







/* ===========================
   DECREASE QUANTITY
=========================== */


function decreaseQuantity(productId){



    const item =
    cart.find(
        item=>item.id===productId
    );



    if(!item) return;




    item.quantity--;





    if(item.quantity<=0){


        removeFromCart(
            productId
        );


        return;


    }





    saveCart();


    updateCartCount();


    renderCart();



}








/* ===========================
   SUBTOTAL
=========================== */


function calculateSubtotal(){



    return cart.reduce(

        (total,item)=>{


            return total +
            (
            item.price *
            item.quantity
            );


        },

        0

    );


}








/* ===========================
   RENDER CART
=========================== */


function renderCart(){



    const cartContainer =
    document.getElementById(
        "cartItems"
    );



    if(!cartContainer)
    return;





    cartContainer.innerHTML="";





    if(cart.length===0){



        cartContainer.innerHTML=`

        <div class="empty-cart">

        <h3>
        Your Cart is Empty
        </h3>

        </div>

        `;



        updateSummary();


        return;

    }







    cart.forEach(item=>{


        cartContainer.innerHTML +=`


        <div class="cart-item">


            <img

            src="${item.image}"

            alt="${item.name}"

            >




            <div class="cart-details">


                <h4>

                ${item.name}

                </h4>



                <p>

                ₹${item.price}

                </p>




                <div class="qty-box">


                    <button

                    onclick="decreaseQuantity(${item.id})"

                    >

                    -

                    </button>




                    <span>

                    ${item.quantity}

                    </span>





                    <button

                    onclick="increaseQuantity(${item.id})"

                    >

                    +

                    </button>



                </div>


            </div>





            <div class="cart-right">


                <h4>

                ₹${item.price * item.quantity}

                </h4>




                <button

                class="remove-btn"

                onclick="removeFromCart(${item.id})"

                >

                Remove

                </button>


            </div>



        </div>


        `;



    });





    updateSummary();



}







/* ===========================
   ORDER SUMMARY
=========================== */


function updateSummary(){



    const subtotal =
    calculateSubtotal();




    let discount = 0;



    if(
    typeof calculateDiscount === "function"
    ){


        discount =
        calculateDiscount(
            subtotal
        );


    }







    let deliveryCharge =
    DELIVERY_CHARGE;





    if(
    typeof appliedCoupon !== "undefined"
    ){


        if(
        appliedCoupon ===
        "FREEDELIVERY"
        ){


            deliveryCharge=0;


        }


    }






    const grandTotal =
    Math.max(

        0,

        subtotal +
        deliveryCharge -
        discount

    );








    const subtotalBox =
    document.getElementById(
        "subtotal"
    );



    const discountBox =
    document.getElementById(
        "discountAmount"
    );



    const deliveryBox =
    document.getElementById(
        "deliveryCharge"
    );



    const totalBox =
    document.getElementById(
        "grandTotal"
    );







    if(subtotalBox)

    subtotalBox.innerHTML =
    `₹${subtotal}`;





    if(discountBox)

    discountBox.innerHTML =
    `₹${discount}`;





    if(deliveryBox)

    deliveryBox.innerHTML =
    `₹${deliveryCharge}`;





    if(totalBox)

    totalBox.innerHTML =
    `₹${grandTotal}`;



}
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2A-4 FIXED

   CHECKOUT + ORDER API
   WHATSAPP + INITIAL LOAD
========================================== */



/* ===========================
   PLACE ORDER
=========================== */


async function placeOrder(){



    // Login Check

    if(!isUserLoggedIn()){


        showToast(
            "Please Login First"
        );


        setTimeout(()=>{


            window.location.href =
            "register.html";


        },1000);



        return;

    }





    // Cart Check

    if(cart.length===0){


        showToast(
            "Your Cart is Empty"
        );


        return;


    }







    // Customer Details


    const customerName =
    document.getElementById(
        "customerName"
    )?.value.trim()
    ||
    "Customer";





    const customerPhone =
    document.getElementById(
        "customerPhone"
    )?.value.trim();





    const customerAddress =
    document.getElementById(
        "customerAddress"
    )?.value.trim();







    if(!customerPhone || !customerAddress){


        showToast(
            "Fill Customer Details"
        );


        return;


    }








    const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );





    if(checkoutBtn){


        checkoutBtn.disabled=true;


        checkoutBtn.innerHTML =
        "⏳ Processing...";


    }









    try{



        const subtotal =
        calculateSubtotal();





        const discount =
        typeof calculateDiscount === "function"

        ?

        calculateDiscount(subtotal)

        :

        0;







        const deliveryCharge =

        appliedCoupon === "FREEDELIVERY"

        ?

        0

        :

        DELIVERY_CHARGE;







        const total =

        Math.max(

            0,

            subtotal +
            deliveryCharge -
            discount

        );









        const order = {


            orderId:

            "TG-" +
            Date.now(),




            customerName,



            customerPhone,



            customerAddress,



            items:[...cart],




            subtotal,



            discount,



            deliveryCharge,



            total,




            coupon:

            appliedCoupon ||
            "No Coupon",





            paymentStatus:

            "Pending",




            orderStatus:

            "Pending",





            createdAt:

            new Date()
            .toISOString()



        };









        const response =
        await fetch(

            `${API_URL}/place-order`,

            {


                method:"POST",



                headers:{


                    "Content-Type":
                    "application/json"


                },



                body:

                JSON.stringify(order)



            }


        );







        if(!response.ok){


            throw new Error(
                "Server Error"
            );


        }








        const data =
        await response.json();







        if(!data.success){


            throw new Error(

            data.message ||
            "Order Failed"

            );


        }









        // WhatsApp Send


        sendWhatsappOrder(
            order
        );







        // Clear Cart


        cart=[];



        saveCart();



        appliedCoupon=null;






        renderCart();


        updateCartCount();


        updateSummary();







        showToast(

        "✅ Order Placed Successfully"

        );








        setTimeout(()=>{


            window.location.href =
            "index.html";



        },1500);







    }

    catch(error){



        console.error(
            "Order Error:",
            error
        );



        showToast(

        error.message ||
        "Something Went Wrong"

        );



    }

    finally{



        if(checkoutBtn){



            checkoutBtn.disabled=false;



            checkoutBtn.innerHTML =
            "🛒 Place Order";



        }



    }



}









/* ===========================
   WHATSAPP ORDER
=========================== */


function sendWhatsappOrder(order){



    let message="";



    message +=
    "🛒 New Grocery Order%0A%0A";




    message +=
    `👤 Name : ${order.customerName}%0A`;



    message +=
    `📞 Phone : ${order.customerPhone}%0A`;



    message +=
    `🏠 Address : ${order.customerAddress}%0A%0A`;





    message +=
    "Items:%0A";






    order.items.forEach(item=>{


        message +=

        `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;



    });






    message +=

    `%0ASubtotal : ₹${order.subtotal}%0A`;




    message +=

    `Delivery : ₹${order.deliveryCharge}%0A`;




    message +=

    `Total : ₹${order.total}%0A`;







    window.open(



    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,



    "_blank"



    );



}









/* ===========================
   CHECKOUT BUTTON
=========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );



    if(checkoutBtn){


        checkoutBtn.addEventListener(

            "click",

            placeOrder

        );


    }



});









/* ===========================
   FINAL PAGE LOAD
=========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



    renderProducts();



    renderCart();



    updateCartCount();



    if(typeof updateWishlistCount==="function"){


        updateWishlistCount();


    }




    if(typeof renderWishlist==="function"){


        renderWishlist();


    }




    updateSummary();



});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2B-1 FIXED

   WISHLIST SYSTEM
========================================== */



/* ===========================
   WISHLIST STORAGE
=========================== */


let wishlist = JSON.parse(

    localStorage.getItem("wishlist")

) || [];





/* ===========================
   SAVE WISHLIST
=========================== */


function saveWishlist(){


    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );


}






/* ===========================
   WISHLIST COUNT
=========================== */


function updateWishlistCount(){



    const count =
    document.getElementById(
        "wishlistCount"
    );



    if(!count) return;



    count.innerHTML =
    wishlist.length;



}








/* ===========================
   CHECK WISHLIST
=========================== */


function isWishlisted(productId){



    return wishlist.some(

        item =>

        item.id === productId

    );


}








/* ===========================
   TOGGLE WISHLIST
=========================== */


function toggleWishlist(productId){



    const product =
    products.find(

        p =>

        p.id === productId

    );



    if(!product) return;






    const index =
    wishlist.findIndex(

        item =>

        item.id === productId

    );








    if(index !== -1){



        wishlist.splice(

            index,

            1

        );



        showToast(

        "Removed from Wishlist"

        );



    }

    else{



        wishlist.push({



            id:product.id,

            name:product.name,

            category:product.category,

            price:product.price,

            discount:product.discount,

            image:product.image,

            stock:product.stock



        });





        showToast(

        "❤️ Added to Wishlist"

        );



    }








    saveWishlist();



    updateWishlistCount();



    renderProducts();



    renderWishlist();



}









/* ===========================
   ADD WISHLIST ITEM TO CART
=========================== */


function moveToCart(productId){



    const product =
    wishlist.find(

        item =>

        item.id === productId

    );



    if(!product)
    return;





    addToCart(
        productId
    );





    removeWishlist(
        productId
    );



}









/* ===========================
   REMOVE WISHLIST ITEM
=========================== */


function removeWishlist(productId){



    wishlist =

    wishlist.filter(

        item =>

        item.id !== productId

    );





    saveWishlist();



    updateWishlistCount();



    renderWishlist();



    renderProducts();



}








/* ===========================
   CLEAR ALL WISHLIST
=========================== */


function clearWishlist(){



    wishlist=[];



    saveWishlist();



    updateWishlistCount();



    renderWishlist();



    renderProducts();



    showToast(

    "Wishlist Cleared"

    );


}








/* ===========================
   RENDER WISHLIST
=========================== */


function renderWishlist(){



    const container =
    document.getElementById(

        "wishlistContainer"

    );



    if(!container)
    return;





    container.innerHTML="";






    if(wishlist.length===0){



        container.innerHTML=`

        <div class="empty-cart">

            <h3>
            Your Wishlist is Empty
            </h3>

        </div>

        `;



        return;

    }









    wishlist.forEach(product=>{



        container.innerHTML +=`



        <div class="product-card">



            <img

            src="${product.image}"

            alt="${product.name}"

            >





            <h3>

            ${product.name}

            </h3>





            <p>

            ${product.category}

            </p>





            <h2>

            ₹${getFinalPrice(product)}

            </h2>







            <button

            onclick="moveToCart(${product.id})"

            >

            🛒 Move To Cart

            </button>








            <button

            class="remove-btn"

            onclick="removeWishlist(${product.id})"

            >

            ❌ Remove

            </button>





        </div>



        `;



    });



}









/* ===========================
   INITIAL LOAD
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    updateWishlistCount();



    renderWishlist();



});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2B-2 FIXED

   PRODUCT SORTING SYSTEM
========================================== */



/* ===========================
   CURRENT SORT TYPE
=========================== */


let currentSort = "default";





/* ===========================
   SORT PRODUCTS
=========================== */


function sortProducts(sortType){



    currentSort = sortType;



    let sortedProducts =
    [...products];







    switch(sortType){



        /* PRICE LOW TO HIGH */

        case "low":


            sortedProducts.sort(

                (a,b)=>

                getFinalPrice(a) -
                getFinalPrice(b)

            );


        break;






        /* PRICE HIGH TO LOW */

        case "high":


            sortedProducts.sort(

                (a,b)=>

                getFinalPrice(b) -
                getFinalPrice(a)

            );


        break;







        /* NAME A-Z */

        case "az":


            sortedProducts.sort(

                (a,b)=>

                a.name.localeCompare(
                    b.name
                )

            );


        break;







        /* NAME Z-A */

        case "za":


            sortedProducts.sort(

                (a,b)=>

                b.name.localeCompare(
                    a.name
                )

            );


        break;







        /* BIGGEST DISCOUNT */


        case "discount":


            sortedProducts.sort(

                (a,b)=>

                b.discount -
                a.discount

            );


        break;







        /* MOST STOCK AVAILABLE */


        case "stock":


            sortedProducts.sort(

                (a,b)=>

                b.stock -
                a.stock

            );


        break;







        /* DEFAULT */


        default:


            sortedProducts =
            [...products];


        break;



    }







    renderProducts(
        sortedProducts
    );



}








/* ===========================
   SORT WITH CATEGORY
=========================== */


function sortCategoryProducts(
    category,
    sortType
){



    let filteredProducts;



    if(category==="All"){


        filteredProducts =
        [...products];


    }

    else{


        filteredProducts =

        products.filter(

            product =>

            product.category === category

        );


    }







    switch(sortType){


        case "low":


        filteredProducts.sort(

            (a,b)=>

            getFinalPrice(a)
            -
            getFinalPrice(b)

        );


        break;





        case "high":


        filteredProducts.sort(

            (a,b)=>

            getFinalPrice(b)
            -
            getFinalPrice(a)

        );


        break;




        case "discount":


        filteredProducts.sort(

            (a,b)=>

            b.discount -
            a.discount

        );


        break;



    }






    renderProducts(
        filteredProducts
    );



}








/* ===========================
   SORT DROPDOWN EVENT
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{



    const sortSelect =

    document.getElementById(

        "sortProducts"

    );





    if(!sortSelect)
    return;







    sortSelect.addEventListener(

        "change",

        function(){



            sortProducts(
                this.value
            );



        }


    );



});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2B-3 FIXED

   FEATURED + BEST SELLER
   DISCOUNT + STOCK + RATING
========================================== */



/* ===========================
   PRODUCT EXTRA DATA
=========================== */


/*
   Product data already exists
   in Part 2A-1

   Here we only add extra
   information
*/



products.forEach(product=>{


    // Featured Products

    if(
        [1,2,5].includes(product.id)
    ){

        product.featured = true;

    }

    else{

        product.featured = false;

    }






    // Best Seller

    if(
        [2,7].includes(product.id)
    ){

        product.bestSeller = true;

    }

    else{

        product.bestSeller = false;

    }







    // Rating

    const ratings = {

        1:4.5,

        2:4.8,

        3:4.3,

        4:4.6,

        5:4.7,

        6:4.4,

        7:4.5,

        8:4.2

    };



    product.rating =
    ratings[product.id];



});









/* ===========================
   PRODUCT BADGES
=========================== */


function getProductBadges(product){


    let badges="";






    if(product.featured){


        badges += `


        <span class="badge featured">


        ⭐ Featured


        </span>


        `;


    }








    if(product.bestSeller){



        badges += `


        <span class="badge bestseller">


        🔥 Best Seller


        </span>


        `;



    }








    if(product.discount > 0){



        badges += `


        <span class="badge discount">


        ${product.discount}% OFF


        </span>


        `;



    }







    return badges;



}









/* ===========================
   STOCK STATUS
=========================== */


function getStockStatus(product){



    if(product.stock <=0){



        return `


        <span class="stock out">


        ❌ Out Of Stock


        </span>


        `;



    }







    if(product.stock <=5){



        return `


        <span class="stock low">


        ⚠ Only ${product.stock} Left


        </span>


        `;



    }







    return `


    <span class="stock available">


    ✅ In Stock


    </span>


    `;



}









/* ===========================
   FINAL PRICE
=========================== */


function getFinalPrice(product){



    if(
        !product.discount ||
        product.discount <=0
    ){


        return product.price;


    }







    const discountAmount =


    (

        product.price *

        product.discount

    )

    /

    100;







    return Math.round(

        product.price -

        discountAmount

    );



}









/* ===========================
   PRODUCT RATING HTML
=========================== */


function getProductRating(product){



    if(!product.rating)
    return "";





    return `


    <div class="rating">


    ⭐ ${product.rating}/5


    </div>


    `;



}









/* ===========================
   FEATURED PRODUCTS
=========================== */


function getFeaturedProducts(){



    return products.filter(

        product =>

        product.featured === true

    );



}









/* ===========================
   BEST SELLER PRODUCTS
=========================== */


function getBestSellerProducts(){



    return products.filter(

        product =>

        product.bestSeller === true

    );


}









/* ===========================
   RENDER FEATURED SECTION
=========================== */


function renderFeaturedProducts(){



    const container =

    document.getElementById(

        "featuredProducts"

    );




    if(!container)
    return;






    container.innerHTML="";







    getFeaturedProducts()

    .forEach(product=>{



        container.innerHTML += `


        <div class="product-card">


        ${getProductBadges(product)}



        <img src="${product.image}">



        <h3>

        ${product.name}

        </h3>




        <h2>

        ₹${getFinalPrice(product)}

        </h2>




        ${getProductRating(product)}



        <button

        onclick="addToCart(${product.id})"

        >

        Add Cart

        </button>



        </div>



        `;



    });



}









/* ===========================
   INITIAL LOAD
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    renderFeaturedProducts();



});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2B-4 FIXED

   COUPON SYSTEM
========================================== */



/* ===========================
   COUPON STORAGE
=========================== */


let appliedCoupon =

localStorage.getItem(
    "appliedCoupon"
)

|| null;







/* ===========================
   COUPON LIST
=========================== */


const coupons = {



    SAVE10:{


        type:"percentage",


        value:10,


        minCart:200,


        message:
        "10% Discount Applied"


    },





    SAVE100:{


        type:"flat",


        value:100,


        minCart:500,


        message:
        "₹100 Discount Applied"


    },





    FREEDELIVERY:{


        type:"delivery",


        value:40,


        minCart:300,


        message:
        "Free Delivery Applied"


    }



};









/* ===========================
   APPLY COUPON
=========================== */


function applyCoupon(){



    const input =

    document.getElementById(
        "couponCode"
    );




    if(!input)
    return;






    const code =

    input.value

    .trim()

    .toUpperCase();






    if(!code){



        showToast(
            "Enter Coupon Code"
        );


        return;


    }









    if(!coupons[code]){



        showToast(
            "Invalid Coupon"
        );


        return;


    }








    const coupon =

    coupons[code];





    const subtotal =

    calculateSubtotal();








    if(subtotal < coupon.minCart){



        showToast(

        `Minimum cart value ₹${coupon.minCart}`

        );


        return;


    }







    appliedCoupon = code;





    localStorage.setItem(

        "appliedCoupon",

        code

    );






    updateSummary();






    showToast(

    coupon.message

    );



}









/* ===========================
   REMOVE COUPON
=========================== */


function removeCoupon(){



    appliedCoupon = null;





    localStorage.removeItem(

        "appliedCoupon"

    );





    const input =

    document.getElementById(
        "couponCode"
    );




    if(input){


        input.value="";


    }






    updateSummary();






    showToast(

    "Coupon Removed"

    );



}









/* ===========================
   CALCULATE DISCOUNT
=========================== */


function calculateDiscount(
    subtotal
){



    if(!appliedCoupon)
    return 0;







    const coupon =

    coupons[appliedCoupon];






    if(!coupon)
    return 0;








    switch(
        coupon.type
    ){



        case "percentage":



        return Math.round(

            subtotal *

            coupon.value /

            100

        );








        case "flat":



        return coupon.value;








        case "delivery":



        return 0;








        default:



        return 0;



    }



}









/* ===========================
   DELIVERY CALCULATION
=========================== */


function calculateDelivery(){



    if(
        appliedCoupon ===
        "FREEDELIVERY"
    ){


        return 0;


    }




    return DELIVERY_CHARGE;



}









/* ===========================
   COUPON STATUS DISPLAY
=========================== */


function showCouponStatus(){



    const box =

    document.getElementById(
        "couponStatus"
    );




    if(!box)
    return;






    if(appliedCoupon){



        box.innerHTML =

        `✅ ${appliedCoupon} Applied`;



    }

    else{



        box.innerHTML="";



    }



}









/* ===========================
   PAGE LOAD
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    showCouponStatus();


    updateSummary();


});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2C-1 FIXED

   USER PROFILE SYSTEM
   LOGIN STATE
   LOGOUT
========================================== */


/* ===========================
   USER DATA
=========================== */


let currentUser = JSON.parse(

    localStorage.getItem(
        "loggedInUser"
    )

) || null;







/* ===========================
   CHECK LOGIN
=========================== */


function checkLogin(){


    return currentUser !== null;


}







/* ===========================
   GET USER NAME
=========================== */


function getUserName(){



    if(!currentUser){


        return "Guest";


    }




    return (

        currentUser.name

        ||

        "User"

    );


}








/* ===========================
   UPDATE HEADER USER
=========================== */


function updateUserUI(){



    const userName =
    document.getElementById(
        "userName"
    );



    const loginBtn =
    document.getElementById(
        "loginBtn"
    );



    const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );







    if(currentUser){



        if(userName){


            userName.innerHTML =

            `👤 ${getUserName()}`;


        }






        if(loginBtn){


            loginBtn.style.display =
            "none";


        }






        if(logoutBtn){


            logoutBtn.style.display =
            "block";


        }



    }

    else{



        if(userName){


            userName.innerHTML =
            "👤 Guest";


        }






        if(loginBtn){


            loginBtn.style.display =
            "block";


        }






        if(logoutBtn){


            logoutBtn.style.display =
            "none";


        }



    }





}









/* ===========================
   LOGOUT USER
=========================== */


function logoutUser(){



    localStorage.removeItem(

        "loggedInUser"

    );



    currentUser=null;





    showToast(

        "Logout Successful"

    );





    updateUserUI();






    setTimeout(()=>{


        window.location.href =
        "index.html";


    },1000);



}









/* ===========================
   LOGIN REDIRECT
=========================== */


function openLogin(){



    window.location.href =
    "register.html";



}









/* ===========================
   AUTO LOAD USER
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    updateUserUI();


});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2C-2 FIXED

   USER ORDER HISTORY SYSTEM
========================================== */



/* ===========================
   LOAD ORDERS
=========================== */


async function loadUserOrders(){


    const container =

    document.getElementById(
        "ordersContainer"
    );



    if(!container)
    return;




    if(!currentUser){


        container.innerHTML = `

        <div class="empty-cart">

            <h3>
            Please Login To View Orders
            </h3>

        </div>

        `;


        return;


    }





    try{


        const response =

        await fetch(

            `${API_URL}/orders`

        );





        if(!response.ok){


            throw new Error(
                "Unable To Load Orders"
            );


        }






        const orders =

        await response.json();








        const userOrders =

        orders.filter(order=>{


            return (

            order.customerPhone ===
            currentUser.loginId

            ||

            order.customerEmail ===
            currentUser.loginId

            );


        });









        if(userOrders.length===0){



            container.innerHTML = `


            <div class="empty-cart">


                <h3>
                No Orders Found
                </h3>


            </div>


            `;


            return;


        }









        container.innerHTML="";








        userOrders.reverse()
        .forEach(order=>{





            container.innerHTML += `


            <div class="order-card">



                <div class="order-header">


                    <h3>

                    🧾 ${order.orderId}

                    </h3>


                    <span>

                    ${getOrderStatus(
                        order.orderStatus
                    )}

                    </span>


                </div>






                <p>

                📅

                ${

                new Date(
                    order.createdAt
                )
                .toLocaleDateString()

                }

                </p>







                <div class="order-items">


                ${
                    order.items.map(item=>`

                    <p>

                    ${item.name}

                    ×

                    ${item.quantity}

                    -

                    ₹${item.price *
                    item.quantity}

                    </p>


                    `).join("")
                }


                </div>







                <h3>

                Total :

                ₹${order.total}

                </h3>





            </div>


            `;




        });






    }

    catch(error){


        console.error(
            error
        );


        container.innerHTML = `


        <h3>

        Failed Loading Orders

        </h3>


        `;


    }



}









/* ===========================
   ORDER STATUS DESIGN
=========================== */


function getOrderStatus(status){



    switch(status){



        case "Delivered":


            return `

            <span class="status delivered">

            ✅ Delivered

            </span>

            `;





        case "Cancelled":


            return `

            <span class="status cancelled">

            ❌ Cancelled

            </span>

            `;







        case "Processing":


            return `

            <span class="status processing">

            🔄 Processing

            </span>

            `;







        default:


            return `

            <span class="status pending">

            ⏳ Pending

            </span>

            `;



    }


}









/* ===========================
   ORDER PAGE LOAD
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    loadUserOrders();


});
/* ==========================================
   TUSHAR GROCERY STORE
   script.js
   Part 2C-3 FIXED

   ADVANCED USER AUTH SYSTEM
   LOGIN + OTP + SESSION
========================================== */


/* ===========================
   AUTH API
=========================== */


const AUTH_API = API_URL;





/* ===========================
   SAVE USER SESSION
=========================== */


function saveUserSession(user){


    localStorage.setItem(

        "loggedInUser",

        JSON.stringify(user)

    );


    currentUser = user;


}








/* ===========================
   GET CURRENT USER
=========================== */


function getCurrentUser(){


    return JSON.parse(

        localStorage.getItem(
            "loggedInUser"
        )

    );


}









/* ===========================
   REGISTER USER
=========================== */


async function registerUser(){



    const name =

    document.getElementById(
        "regName"
    )?.value.trim();





    const loginId =

    document.getElementById(
        "loginId"
    )?.value.trim();






    const password =

    document.getElementById(
        "regPassword"
    )?.value.trim();







    if(
        !name ||
        !loginId ||
        !password
    ){


        showToast(
            "Fill All Details"
        );


        return;


    }








    try{



        const response =

        await fetch(

        `${AUTH_API}/register`,

        {

            method:"POST",


            headers:{


                "Content-Type":
                "application/json"


            },


            body:JSON.stringify({

                name,

                loginId,

                password

            })


        }

        );






        const data =

        await response.json();







        if(!data.success){


            throw new Error(
                data.message
            );


        }








        saveUserSession({

            name,

            loginId


        });








        showToast(

        "Registration Successful"

        );







        setTimeout(()=>{


            window.location.href =
            "index.html";


        },1200);




    }

    catch(error){



        showToast(

        error.message ||

        "Register Failed"

        );


    }



}









/* ===========================
   LOGIN USER
=========================== */


async function loginUser(){



    const loginId =

    document.getElementById(
        "loginEmail"
    )?.value.trim();





    const password =

    document.getElementById(
        "loginPassword"
    )?.value.trim();







    if(
        !loginId ||
        !password
    ){


        showToast(
            "Enter Login Details"
        );


        return;


    }







    try{


        const response =

        await fetch(

        `${AUTH_API}/login`,

        {


            method:"POST",


            headers:{


                "Content-Type":
                "application/json"


            },


            body:JSON.stringify({

                loginId,

                password


            })


        }


        );







        const data =

        await response.json();








        if(!data.success){



            throw new Error(

            data.message ||

            "Login Failed"

            );


        }








        saveUserSession(

            data.user

        );









        showToast(

        "Login Successful"

        );







        setTimeout(()=>{


            window.location.href =
            "index.html";


        },1000);






    }


    catch(error){



        showToast(

        error.message

        );



    }



}









/* ===========================
   OTP VERIFY STATUS
=========================== */


let otpVerified = false;









/* ===========================
   SEND OTP
=========================== */


async function sendOTP(){



    const loginId =

    document.getElementById(
        "loginId"
    )?.value.trim();





    if(!loginId){


        showToast(
            "Enter Email/Phone"
        );


        return;


    }







    try{


        const response =

        await fetch(

        `${AUTH_API}/send-otp`,

        {


            method:"POST",


            headers:{


                "Content-Type":
                "application/json"


            },


            body:JSON.stringify({

                loginId

            })


        }


        );






        const data =

        await response.json();







        if(!data.success){


            throw new Error(
                data.message
            );


        }






        showToast(

        "OTP Sent Successfully"

        );




    }


    catch(error){


        showToast(

        error.message ||

        "OTP Error"

        );


    }


}









/* ===========================
   VERIFY OTP
=========================== */


async function verifyOTP(){



    const loginId =

    document.getElementById(
        "loginId"
    )?.value.trim();





    const otp =

    document.getElementById(
        "otp"
    )?.value.trim();






    if(
        !loginId ||
        !otp
    ){


        showToast(
            "Enter OTP"
        );


        return;


    }







    try{



        const response =

        await fetch(

        `${AUTH_API}/verify-otp`,

        {


            method:"POST",


            headers:{


                "Content-Type":
                "application/json"


            },


            body:JSON.stringify({

                loginId,

                otp


            })


        }


        );








        const data =

        await response.json();








        if(!data.success){


            throw new Error(

            "Wrong OTP"

            );


        }







        otpVerified=true;






        showToast(

        "OTP Verified"

        );





    }


    catch(error){



        showToast(

        error.message

        );


    }



}









/* ===========================
   AUTO USER CHECK
=========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    const user =

    getCurrentUser();




    if(user){


        currentUser=user;


        updateUserUI();


    }



});
document.addEventListener("DOMContentLoaded",()=>{


const loginBtn=document.getElementById("loginBtn");

if(loginBtn){
loginBtn.onclick=openLogin;
}



const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){
logoutBtn.onclick=logoutUser;
}



const applyBtn=document.getElementById("applyCouponBtn");

if(applyBtn){
applyBtn.onclick=applyCoupon;
}



const removeBtn=document.getElementById("removeCouponBtn");

if(removeBtn){
removeBtn.onclick=removeCoupon;
}



const checkoutBtn=document.getElementById("checkoutBtn");

if(checkoutBtn){
checkoutBtn.onclick=placeOrder;
}



});