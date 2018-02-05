var viewFolders = document.querySelector('#viewFolders');
var elencoPratiche = document.querySelector('#elencoPratiche');




viewFolders.addEventListener('click', function(){
    fetch(`/users/${viewFolders.dataset.userid}`)
        .then((response)=>{
            return response.json();
        })
        .then((user) => {
            const { folders } = user;
            console.log(folders);
            if (folders.length > 0){
                for(i=0; i<folders.length; i++){
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    var txtNode = document.createTextNode(`${folders[i].name}`);
                    a.appendChild(txtNode);
                    a.setAttribute('href', `/folders/${folders[i]._id}`);
                    li.appendChild(a);
                    elencoPratiche.appendChild(li);
                    elencoPratiche.classList.remove('hidden');
                }
            }
            else if(!folders || folders.length == 0){
                var li = document.createElement('li');
                var txtNode = document.createTextNode(`Non ci sono pratiche in gestione`);
                li.appendChild(txtNode);
                elencoPratiche.appendChild(li);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
});

