const logoutformhandler = async(event) => {
    event.preventDefault();
    const response = await fetch ("/api/user/logout", {
        method:"POST",
        headers: {"Content-Type":"application/json"}
    } ) 
    
    if (response.ok){
        document.location.replace("/")
        }
        else {
            alert("Incorrect username or password")
        }

}
document.querySelector("#logout").addEventListener("click", logoutformhandler)

