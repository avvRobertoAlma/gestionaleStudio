function deleteUser(id){
    const url = `/admin/users/${id}"`;
    return fetch(url, {
        method: 'GET'
    })
    .then(response => console.log(response.json()));
}