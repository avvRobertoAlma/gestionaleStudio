const form = document.querySelector('#signup');
const cancelbtn = document.querySelector('#cancelbtn');


function validate() {
    const email = document.querySelector('#email');
    const repeatEmail = document.querySelector('#repeat-email');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#psw-repeat');


    if(email.value !== repeatEmail.value){
        alert('Email does not match');
        return false;
    } else if(password.value !== repeatPassword.value){
        alert('Password Mismatch');
        return false;
    } 
    else {
        return true;
    }
}

cancelbtn.addEventListener('click', function(){
    location.reload();
})