export function isAuthenticated() {
    let token = window.localStorage.getItem("token")
    return (token != null)
}

export function clearStorage() {
    window.localStorage.clear()
}

export function setStorage(name, value) {
    window.localStorage.setItem(name, value)
}

export function getStorage(name){
    return window.localStorage.getItem(name);
}

export function isOrganiser(organiser){
    return (organiser)
}




