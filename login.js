// ===============================
// Tushar Grocery Store
// login.js
// ===============================

const API_URL = "http://localhost:5000";


// Login Function
async function loginUser() {

    const loginId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("loginPassword").value.trim();


    if (loginId === "" || password === "") {
        alert("Please enter Login ID and Password");
        return;
    }


    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                loginId: loginId,
                password: password

            })

        });



        const data = await response.json();



        if (data.success) {


            // Save Login User

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );


            alert("Login Successful ✅");


            // Redirect Home

            window.location.href = "index.html";


        } else {

            alert(
                data.message ||
                "Invalid Login Details"
            );

        }



    } catch (error) {

        console.log(error);

        alert(
            "Server not connected. Start node server.js"
        );

    }


}



// Enter key support

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            loginUser();

        }

    });