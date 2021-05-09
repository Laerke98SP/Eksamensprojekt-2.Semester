function logOut(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('votedOn');
    localStorage.removeItem('counter')
}