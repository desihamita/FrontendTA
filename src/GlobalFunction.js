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
    },
    isSales(){
        if (localStorage.role != undefined && localStorage.role == '2') {
            return true;
        } 
        return false;
    },
    formatRupiah(number){
        return `Rp.${number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    },
}

export default GlobalFunction