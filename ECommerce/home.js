// getting elements using descendents and child
let signupbtn = document.querySelector('.container>div>input:nth-child(1)');
let loginbtn = document.querySelector('.container>div>input:nth-child(2)');
// getting form separately
let signup = document.getElementById('signup')

let signin = document.getElementById('signin')
signin.style.display = 'grid';
signin.style.gap = '0.2rem'
signin.style.border = '0px solid #032f4b';
signin.style.padding = '2rem';
signin.style.boxShadow = '0px 0px 10px 5px #002a46';
signin.style.borderRadius = '10px';
signin.style.backgroundColor = '#00406b';
// hiding signin form 
signin.style.display = 'none';
// trigrrring an event to display only signup form
signupbtn.addEventListener('click', function () {
    // signup.style.display = 'block';
    signup.style.display = 'grid';
    signup.style.marginRight = '10rem';
    signup.style.gap = '0.2rem';
    signup.style.border = '0px solid #032f4b';
    signup.style.padding = '2rem';
    signup.style.boxShadow = '0px 0px 10px 5px #002a46';
    signup.style.borderRadius = '10px';
    signup.style.backgroundColor = '#00406b';
    signin.style.display = 'none';
    document.title = 'signUp';
})

loginbtn.addEventListener('click', function () {
    signin.style.display = 'grid';
    signin.style.gap = '0.2rem'
    signin.style.border = '0px solid #032f4b';
    signin.style.padding = '2rem';
    signin.style.boxShadow = '0px 0px 10px 5px #002a46';
    signin.style.borderRadius = '10px';
    signin.style.backgroundColor = '#00406b';
    signup.style.display = 'none';
    document.title = 'signIn';
})
// triggring submit event to store form data
signup.addEventListener('submit', function (event) {
    event.preventDefault();
    // fetching user input value
    let name = signup.name.value;
    let email = signup.email.value;
    let password = signup.password.value;

    if (password != signup.passwordchk.value) {
        alert("password not same!");
    }
    else {
        // storing form data into local storage
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        alert("signUP successful!")
        // resetting the form after submit successful
        signup.reset();
        // signup.style.display = 'none'
        // signin.style.display = 'block'
    }
})

signin.addEventListener('submit', function (event) {
    event.preventDefault();
    let email = signin.email1.value;
    let password = signin.password1.value;

    let storedemail = localStorage.getItem('email');
    let storedpassword = localStorage.getItem('password');
    // comparing signup data with signin input value
    if (email != storedemail) {
        alert("user not found!");
    }
    else {
        if (password != storedpassword) {
            alert("wrong password!");
        }
        else {
            alert("signIN successful!")
            signin.reset();
            // switching window to next page
            window.location.assign('./index.html')
        }
    }

})
