/* ==========================================
   TUSHAR GROCERY STORE
   server.js
   Part 1

   Setup
   Register
   Login
   OTP System
========================================== */


// ===============================
// IMPORTS
// ===============================

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");



// ===============================
// APP CONFIG
// ===============================

const app = express();

const PORT = 5000;



// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());


// Serve frontend files

app.use(express.static(__dirname));




// ===============================
// FILE PATH
// ===============================


const USERS_FILE =
    path.join(__dirname, "users.json");


const ORDERS_FILE =
    path.join(__dirname, "orders.json");





// ===============================
// CREATE FILE IF NOT EXIST
// ===============================


function createFiles() {


    if (!fs.existsSync(USERS_FILE)) {


        fs.writeFileSync(
            USERS_FILE,
            JSON.stringify([], null, 2)
        );


    }



    if (!fs.existsSync(ORDERS_FILE)) {


        fs.writeFileSync(
            ORDERS_FILE,
            JSON.stringify([], null, 2)
        );


    }


}


createFiles();






// ===============================
// READ USERS
// ===============================


function getUsers() {


    try {


        const data =
            fs.readFileSync(
                USERS_FILE,
                "utf-8"
            );


        return JSON.parse(data);



    } catch (error) {


        return [];


    }


}






// ===============================
// SAVE USERS
// ===============================


function saveUsers(users) {


    fs.writeFileSync(

        USERS_FILE,

        JSON.stringify(
            users,
            null,
            2
        )

    );


}








// ===============================
// OTP STORAGE
// ===============================


let otpStore = {};





// ===============================
// HOME ROUTE
// ===============================


app.get("/", (req, res) => {


    res.sendFile(
        path.join(
            __dirname,
            "index.html"
        )
    );


});







// =================================================
// REGISTER USER
// =================================================


app.post("/register", (req, res) => {


    try {


        const {
            name,
            loginId,
            password

        } = req.body;




        if (!name ||
            !loginId ||
            !password
        ) {


            return res.json({

                success: false,

                message: "All fields required"

            });


        }





        let users =
            getUsers();






        const alreadyUser =

            users.find(

                user =>

                user.loginId === loginId

            );





        if (alreadyUser) {


            return res.json({

                success: false,

                message: "User already exists"

            });


        }







        const newUser = {


            id: Date.now(),


            name,


            loginId,


            password,


            createdAt: new Date()
                .toISOString()


        };






        users.push(
            newUser
        );





        saveUsers(
            users
        );







        res.json({


            success: true,


            message: "Registration Successful"



        });






    } catch (error) {



        console.log(error);



        res.json({

            success: false,

            message: "Server Error"


        });


    }



});








// =================================================
// LOGIN USER
// =================================================


app.post("/login", (req, res) => {


    try {


        const {

            loginId,

            password


        } = req.body;







        let users =
            getUsers();







        const user =

            users.find(

                u =>

                u.loginId === loginId

                &&

                u.password === password


            );








        if (!user) {


            return res.json({


                success: false,


                message: "Invalid Login Details"


            });


        }









        res.json({


            success: true,


            message: "Login Successful",



            user: {


                name: user.name,


                loginId: user.loginId



            }



        });







    } catch (error) {


        console.log(error);



        res.json({


            success: false,


            message: "Login Error"



        });


    }



});








// =================================================
// SEND OTP
// =================================================


app.post("/send-otp", (req, res) => {


    try {


        const {

            loginId


        } = req.body;






        if (!loginId) {


            return res.json({


                success: false,


                message: "Login ID Required"


            });


        }







        // Generate OTP

        const otp =

            Math.floor(
                100000 +
                Math.random() * 900000
            )
            .toString();








        otpStore[loginId] = otp;








        console.log("Generated OTP:", otp);

        res.json({
            success: true,
            message: "OTP Sent Successfully"
        });
    } catch (error) {


        res.json({


            success: false,


            message: "OTP Error"


        });


    }



});








// =================================================
// VERIFY OTP
// =================================================


app.post("/verify-otp", (req, res) => {


    try {


        const {

            loginId,

            otp


        } = req.body;








        if (
            otpStore[loginId] ===
            otp
        ) {



            delete otpStore[loginId];




            return res.json({


                success: true,


                message: "OTP Verified"



            });


        }







        res.json({


            success: false,


            message: "Invalid OTP"



        });








    } catch (error) {



        res.json({


            success: false,


            message: "Verification Error"



        });


    }



});






// NEXT PART:
// Orders API
// Place Order
// Get Orders
// Server Start

/* ==========================================
   TUSHAR GROCERY STORE
   server.js
   Part 2

   Orders
   Place Order
   Get Orders
   Server Start
========================================== */



// ===============================
// READ ORDERS
// ===============================


function getOrders() {


    try {


        const data =

            fs.readFileSync(

                ORDERS_FILE,

                "utf-8"

            );



        return JSON.parse(data);



    } catch (error) {


        return [];


    }


}








// ===============================
// SAVE ORDERS
// ===============================


function saveOrders(orders) {


    fs.writeFileSync(

        ORDERS_FILE,

        JSON.stringify(

            orders,

            null,

            2

        )

    );


}









// =================================================
// PLACE ORDER API
// =================================================


app.post("/place-order", (req, res) => {


    try {


        const order = req.body;





        if (!order) {


            return res.json({


                success: false,


                message: "Order Data Missing"



            });


        }








        let orders =

            getOrders();








        const newOrder = {


            id: Date.now(),



            ...order,



            orderStatus: "Pending",



            paymentStatus: "Pending",



            createdAt:

                new Date()

                .toISOString()



        };








        orders.push(

            newOrder

        );








        saveOrders(

            orders

        );








        res.json({



            success: true,



            message: "Order Placed Successfully",



            orderId: newOrder.orderId



        });






    } catch (error) {



        console.log(
            error
        );



        res.json({



            success: false,



            message: "Order Save Error"



        });



    }



});









// =================================================
// GET ALL ORDERS
// =================================================


app.get("/orders", (req, res) => {


    try {


        const orders =

            getOrders();





        res.json(

            orders

        );





    } catch (error) {



        res.json([]);



    }



});









// =================================================
// UPDATE ORDER STATUS (ADMIN USE)
// =================================================


app.put("/update-order/:id", (req, res) => {


    try {


        const id =

            Number(

                req.params.id

            );




        const {

            status

        } = req.body;







        let orders =

            getOrders();







        const order =

            orders.find(

                o =>

                o.id === id

            );







        if (!order) {


            return res.json({


                success: false,


                message: "Order Not Found"


            });


        }








        order.orderStatus =

            status;







        saveOrders(

            orders

        );







        res.json({


            success: true,


            message: "Order Updated"


        });






    } catch (error) {



        res.json({


            success: false,


            message: "Update Error"


        });


    }



});









// =================================================
// DELETE ORDER (ADMIN USE)
// =================================================


app.delete("/delete-order/:id", (req, res) => {


    try {


        const id =

            Number(

                req.params.id

            );





        let orders =

            getOrders();







        orders =

            orders.filter(

                order =>

                order.id !== id

            );








        saveOrders(

            orders

        );







        res.json({


            success: true,


            message: "Order Deleted"



        });





    } catch (error) {



        res.json({


            success: false,


            message: "Delete Error"



        });


    }



});









// =================================================
// SERVER START
// =================================================


app.listen(

    PORT,

    () => {


        console.log(
            `
================================
🛒 Tushar Grocery Server Running
================================

Server:
http://localhost:${PORT}

Status:
ONLINE ✅

`
        );


    }

);