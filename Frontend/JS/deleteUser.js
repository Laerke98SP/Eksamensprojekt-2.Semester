function deleteProfile() {
    let id = localStorage.getItem('email');
    localStorage.clear();
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`http://localhost:4000/profile/${id}`, options)
        window.location.href = "../HTML/frontpage.html";
        alert("Okay, you made your decision. We're letting you go. Have a good life!")
}; 