


const form = document.querySelector("#updateForm")
form.addEventListener("change", function () {
    const updateBtn = document.querySelector("button")
    updateBtn.removeAttribute("disabled")
});


    // Run this after login or on page load
const heading = document.getElementById('main-heading');
// // Example: check for a token
// const cookie =  localStorage.setItem('token', "jninxkjfjkdl");
// const userToken = localStorage.getItem('token');
// console.log(userToken)// Example: check for a token

// if (!userToken) {
//     heading.textContent = "Welcome back, User!";
// } else {
//     heading.textContent = "My Account"
// }

  if (res.locals.loggedin) {
    heading.textContent = "Welcome User"
  } else {
    heading.textContent = "Welcome User"
  }
 