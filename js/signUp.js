
    let userLi = document.getElementById('user');
    let userMob = document.getElementById('userMob');
    let checkEnroll = document.querySelectorAll(".enrollCheck")
    let successMsg = document.getElementById("liveToast");
    let successTxt = document.getElementById("successTxt");
    let toastBody = document.querySelector(".toast-body");
    
        checkEnroll.forEach((ele, idx) => {
            if (sessionStorage.getItem("LogedUser")) {
                ele.innerHTML = `<a onclick="enrollSuccess(${idx})" class="btn btn-primary custom-btn enrollTo${idx} text-white">Enroll</a>`;
            } else {
                ele.innerHTML = `<a href="login.html" class="btn btn-primary custom-btn text-white">Enroll</a>`;
            }
        })
    
    
    function  enrollSuccess(idx) {
        let CourseName;
        switch(idx) {
            case 0:
                CourseName = "React Native"
                break;
            case 1:
                CourseName = "Angular JS "
                break;
            case 2:
            CourseName = "Photoshop"
                break;
            default:
                CourseName = "No course"
            }
            successTxt.innerHTML = `Congratulation! You have successfully Enrolled to  <span class=" font-weight-bold ">  ${CourseName} </span>`
            successMsg.classList.remove("hide")
            successMsg.classList.add("show")
    
            setTimeout(() => {
            successMsg.classList.add("hide")
            successMsg.classList.remove("show")
            }, 2000)
    
        // alert(`Congratulation! You have successfully Enrolled to ${CourseName}`);
    }







// if user data is in not session storage 
let noUser = `
<a href="signup.html" class="nav-link">Signup</a>
<a href="login.html" class="nav-link">Login</a>
`


function displayUser(dataURL) {

// if user data is in session storage navbar ul will be like this  there is Logout button
    userLi.innerHTML = `
    <a  class="nav-link  userAvatar"> <img src=${dataURL} /> </a>
    <a onClick="logOut()" class="nav-link" >Logout</a> `;

    userMob.innerHTML = `
    <a  class="nav-link userAvatar"> <img src=${dataURL} /> </a>
    <a onClick="logOut()" class="nav-link" >Logout</a> `;

}


// check if there is user  in session storage 
if (sessionStorage.getItem("LogedUser")) {

    displayUser(JSON.parse(sessionStorage.getItem("LogedUser"))[0].userImage)

} else {
    userLi.innerHTML = noUser;
    userMob.innerHTML = noUser;
}


function signUp (e) {
    e.preventDefault();


     // Get the input values
    const username = document.getElementById('fname').value;
    const password = document.getElementById('pwd').value;
    const email = document.getElementById('email').value;
    const lastName = document.getElementById('lname').value;

    const nameError = document.getElementById("nameError")
    const LastNameError = document.getElementById("LastNameError")
    const emailError = document.getElementById("emailError")
    const passError = document.getElementById("passError")

    let errors = []

    if(username.length < 3 && username.length < 16  ) {
        nameError.classList.remove("d-none")
        errors.push("nameError")
    }

    if(lastName.length < 3 && lastName.length < 16  ) {
        LastNameError.classList.remove("d-none")
        errors.push("LastNameError")

    }

    if(email.length < 3 && username.length < 16  ) {
        emailError.classList.remove("d-none")
        errors.push("emailError")
    }

    if(password.length < 6 && password.length < 18  ) {
        passError.classList.remove("d-none")
        errors.push("passError")

    }

    
    if(errors.length == 0) {


        // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {

        toastBody.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
        </svg>
        Email already exists. Please choose a different email. `

        successMsg.classList.remove("hide")
        successMsg.classList.add("show")
        setTimeout(() => {
        successMsg.classList.add("hide")
        successMsg.classList.remove("show")
        }, 2000)

    } else {


        const imageInput = document.getElementById('imageInput');
        const file = imageInput.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function (e) {
                const dataURL = e.target.result;

                // Add the new user to the array
                users.push({ username, lastName, password, email, dataURL });

                // Update the users array in localStorage 
                localStorage.setItem('users', JSON.stringify(users));
    
            };
    
            // Read the file as a data URL
            reader.readAsDataURL(file);
        } 

        toastBody.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#4caf50"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#ccff90"
            d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z">
        </path>
    </svg>


        User successfully signed up ! `
        successMsg.classList.remove("hide")
        successMsg.classList.add("show")

        setTimeout(() => {
        successMsg.classList.add("hide")
        successMsg.classList.remove("show")
        // go to home page 
        window.location.href = './login.html'
        }, 2000)



    }


    } else {
        let socialLogin = document.querySelector(".loginSocial");


        socialLogin.innerHTML = ""
    }



    
}


function signIn(e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;




    // get user data from localStorage 
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username and password found in the data base 
    const user = users.find(user => user.email === email && user.password === password);

        // store Loged user info in object  
        let LogedUser = [{
            username: email,
            lastName: password,
            userImage: user?.dataURL,
        }]

    if (user) {

        // if user found  store the loged user data in session storage to logout later or if closed the window can come back and still loged in  
        sessionStorage.setItem('LogedUser', JSON.stringify(LogedUser))

        toastBody.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#4caf50"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#ccff90"
            d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z">
        </path>
    </svg>

    successfull Login Welcome !  `

        successMsg.classList.remove("hide")
        successMsg.classList.add("show")

        setTimeout(() => {
        successMsg.classList.add("hide")
        successMsg.classList.remove("show")
        // go to home page 
        window.location.href = './tutorial-single.html'
        }, 2000)



    } else {



        toastBody.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
        </svg>
        Invalid username or password. Please try again. `

        successMsg.classList.remove("hide")
        successMsg.classList.add("show")
        setTimeout(() => {
        successMsg.classList.add("hide")
        successMsg.classList.remove("show")
        }, 2000)
    }
}


function logOut() {

    // when click logout remove user data from "session storage" only and reload page 
    sessionStorage.removeItem("LogedUser");
    window.location.reload();
}




