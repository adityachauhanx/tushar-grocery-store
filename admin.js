/* ==================================
   TUSHAR GROCERY STORE
   admin.js
   Part 3A FIXED

   ADMIN DASHBOARD
================================== */


const ADMIN_API =
    "http://localhost:5000";



/* ==========================
   ADMIN CHECK
========================== */


const admin =
    JSON.parse(
        localStorage.getItem("adminLogin")
    );



if (!admin) {

    window.location.href =
        "admin-login.html";

}






/* ==========================
   LOAD DASHBOARD
========================== */


async function loadDashboard() {


    try {


        // ORDERS

        const orderResponse =
            await fetch(
                `${ADMIN_API}/orders`
            );


        const orders =
            await orderResponse.json();




        const orderCount =
            document.getElementById(
                "totalOrders"
            );


        if (orderCount) {

            orderCount.innerHTML =
                orders.length;

        }






        // USERS

        try {


            const userResponse =
                await fetch(
                    `${ADMIN_API}/users`
                );


            const users =
                await userResponse.json();



            const userCount =
                document.getElementById(
                    "totalUsers"
                );



            if (userCount) {

                userCount.innerHTML =
                    users.length;

            }



        } catch (err) {


            console.log(
                "Users API not available"
            );


        }






        displayOrders(orders);



    } catch (error) {


        console.log(
            "Dashboard Error:",
            error
        );


    }


}









/* ==========================
   DISPLAY ORDERS
========================== */


function displayOrders(orders) {



    const box =
        document.getElementById(
            "ordersList"
        );



    if (!box)
        return;



    box.innerHTML = "";




    [...orders]
    .reverse()
        .forEach(order => {



            box.innerHTML += `


<div class="order-card">


<h3>
🧾 ${order.orderId}
</h3>



<p>
👤 ${order.customerName}
</p>



<p>
📞 ${order.customerPhone}
</p>



<p>
🏠 ${order.customerAddress}
</p>



<p>
💰 Total : ₹${order.total}
</p>



<p>

Status :

<span class="status">

${order.orderStatus || "Pending"}

</span>

</p>





<select

onchange="
updateOrderStatus(
'${order.orderId}',
this.value
)
"

>


<option value="Pending">

Pending

</option>


<option value="Processing">

Processing

</option>


<option value="Delivered">

Delivered

</option>


<option value="Cancelled">

Cancelled

</option>



</select>




</div>


`;



        });


}









/* ==========================
   UPDATE ORDER STATUS
========================== */


async function updateOrderStatus(
    orderId,
    status
) {



    try {


        const response =
            await fetch(

                `${ADMIN_API}/update-order-status`,

                {


                    method: "PUT",


                    headers: {

                        "Content-Type": "application/json"

                    },


                    body: JSON.stringify({

                        orderId,

                        status

                    })


                }

            );





        const data =
            await response.json();





        if (data.success) {


            alert(
                "Order Updated"
            );


            loadDashboard();


        } else {


            alert(
                data.message
            );


        }



    } catch (error) {


        console.log(error);


    }



}









/* ==========================
   LOGOUT
========================== */


function adminLogout() {


    localStorage.removeItem(
        "adminLogin"
    );


    window.location.href =
        "admin-login.html";


}









document.addEventListener(

    "DOMContentLoaded",

    () => {


        loadDashboard();


    });