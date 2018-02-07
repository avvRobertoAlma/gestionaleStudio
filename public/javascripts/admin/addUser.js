const btn = document.querySelector('#addUserButton');
const addUserForm = document.querySelector('#addUserForm');

btn.addEventListener('click', function(){
    if(addUserForm.classList.contains('hidden')){
        return addUserForm.classList.remove('hidden');
    } else {
        return addUserForm.classList.add('hidden');
    }
});