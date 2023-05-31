const loginformhandler = async(event) => {
    event.preventDefault();
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username&&password){
        const response = await fetch("/api/user/login", {
            method:"POST",
        body:JSON.stringify ({username,password}),
        headers:{"Content-Type":"application/json"}})
        if (response.ok){
            document.location.replace("/")
            }
            else {
                alert("Incorrect username or password")
            }
    }
    else {
        alert ("please enter valid data")
    }
}
document.querySelector("#login-btn").addEventListener("click", loginformhandler)

const signupformhandler = async(event) => {
    event.preventDefault();
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username&&password){
        const response = await fetch("/api/user", {
            method:"POST",
        body:JSON.stringify ({username,password}),
        headers:{"Content-Type":"application/json"}})
        if (response.ok){
            document.location.replace("/")
            }
            else {
                alert("Please try again")
            }
    }
    else {
        alert ("please enter valid data")
    }
}
document.querySelector("#signup-btn").addEventListener("click", signupformhandler)