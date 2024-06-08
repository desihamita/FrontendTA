const GlobalFunction = {
    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('phone')
        localStorage.removeItem('photo')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        window.location.href = window.location.origin
    },
    isAdmin(){
        if (localStorage.role != undefined && localStorage.role == '1') {
            return true;
        }
        return false;
    }
}

export default GlobalFunction