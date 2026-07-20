/* ==================================
   TUSHAR GROCERY STORE

   admin-login.js
   Part 3B

   ADMIN AUTHENTICATION
================================== */


const ADMIN_API =

    "http://localhost:5000";






async function adminLogin() {



    const adminId =

        document.getElementById(
            "adminId"
        ).value.trim();





    const password =

        document.getElementById(
            "adminPassword"
        ).value.trim();






    if (!adminId || !password) {


        showMessage(
            "Fill All Details"
        );


        return;


    }








    try {


        const response =

            await fetch(

                `${ADMIN_API}/admin-login`,

                {


                    method: "POST",


                    headers: {


                        "Content-Type": "application/json"


                    },


                    body: JSON.stringify({


                        adminId,

                        password


                    })


                }


            );







        const data =

            await response.json();








        if (!data.success) {


            throw new Error(

                data.message ||

                "Login Failed"

            );


        }







        localStorage.setItem(

            "adminLogin",

            JSON.stringify({

                adminId

            })

        );








        showMessage(
            "Login Successful"
        );







        setTimeout(() => {


            window.location.href =
                "admin.html";


        }, 1000);






    } catch (error) {



        showMessage(

            error.message

        );



    }


}








function showMessage(msg) {



    document.getElementById(

        "message"

    ).innerHTML = msg;


}