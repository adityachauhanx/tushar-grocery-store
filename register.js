/* ==========================================
   TUSHAR GROCERY STORE
   register.js
========================================== */

const API_URL = "http://localhost:5000";

let otpVerified = false;

/* ===========================
   TOAST
=========================== */

function showToast(message) {

    alert(message);

}

/* ===========================
   SEND OTP
=========================== */

async function sendOTP() {

    const loginId = document
        .getElementById("loginId")
        .value
        .trim();

    if (!loginId) {

        showToast("Please Enter Email or Mobile Number");

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/send-otp`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    loginId

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            showToast(data.message);

            return;

        }

        // Demo Only

        showToast("OTP Sent Successfully");

    } catch (err) {

        console.log(err);

        showToast("Unable To Connect Server");

    }

}

/* ===========================
   VERIFY OTP
=========================== */

async function verifyOTP() {

    const loginId = document
        .getElementById("loginId")
        .value
        .trim();

    const otp = document
        .getElementById("otp")
        .value
        .trim();

    if (!otp) {

        showToast("Enter OTP");

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/verify-otp`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    loginId,

                    otp

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            showToast(data.message);

            otpVerified = false;

            return;

        }

        otpVerified = true;

        showToast("OTP Verified Successfully");

    } catch (err) {

        console.log(err);

        showToast("Server Error");

    }

}

/* ===========================
   REGISTER USER
=========================== */

async function registerUser() {

    const name = document
        .getElementById("regName")
        .value
        .trim();

    const loginId = document
        .getElementById("loginId")
        .value
        .trim();

    const password = document
        .getElementById("regPassword")
        .value
        .trim();

    if (!name || !loginId || !password) {

        showToast("Please Fill All Fields");

        return;

    }

    if (!otpVerified) {

        showToast("Please Verify OTP First");

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/register`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name,

                    loginId,

                    password

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            showToast(data.message);

            return;

        }

        showToast("Registration Successful");

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1200);

    } catch (err) {

        console.log(err);

        showToast("Registration Failed");

    }

}

/* ===========================
   ENTER KEY SUPPORT
=========================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        registerUser();

    }

});