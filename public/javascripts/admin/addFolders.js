const btn = document.querySelector('#addFolderButton');
const addUserForm = document.querySelector('#addFolderForm');

btn.addEventListener('click', function(){
    if(addFolderForm.classList.contains('hidden')){
        return addFolderForm.classList.remove('hidden');
    } else {
        return addFolderForm.classList.add('hidden');
    }
});