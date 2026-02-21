
'use strict' 
 
 // Get a list of items in inventory based on the classification_id 
let classificationList = document.querySelector("#classificationList")
let editAccountLink = document.getElementById('edit')
 
classificationList.addEventListener("change", function () {
    let classification_id = classificationList.value
    console.log(`classification_id is: ${classification_id}`)
    let classIdURL = "/inv/getInventory/" + classification_id
    fetch(classIdURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw Error("Network response was not OK");
        })
        .then(function (data) {
            console.log(data);
            buildInventoryList(data);
        })
        .catch(function (error) {
            console.log('There was a problem: ', error.message)
        })
});

 // Build inventory items into HTML table components and inject into DOM 
function buildInventoryList(data) { 
 let inventoryDisplay = document.getElementById("inventoryDisplay"); 
 // Set up the table labels 
 let dataTable = '<thead>'; 
 dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>'; 
 dataTable += '</thead>'; 
 // Set up the table body 
 dataTable += '<tbody>'; 
 // Iterate over all vehicles in the array and put each in a row 
 data.forEach(function (element) { 
  console.log(element.inv_id + ", " + element.inv_model); 
  dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`; 
  dataTable += `<td><a href='/inv/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`; 
  dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`; 
 }) 
 dataTable += '</tbody>'; 
 // Display the contents in the Inventory Management view 
 inventoryDisplay.innerHTML = dataTable; 
};


const heading = document.getElementById('main-heading');

// function getCookie(name) {
//     // Append '=' to the name to ensure we match the exact cookie name (e.g., 'user=' vs 'username=')
//     const nameEQ = name + "=";
//     // Split the document.cookie string into an array of individual cookies, trimming whitespace
//     const ca = document.cookie.split(';');

//     // Loop through the cookie array
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         // Trim leading whitespace from the cookie string
//         while (c.charAt(0) === ' ') {
//             c = c.substring(1, c.length);
//         }
//         // If the cookie string starts with the desired name, extract and return its value
//         if (c.indexOf(nameEQ) === 0) {
//             // Use decodeURIComponent to handle encoded characters (e.g., spaces as %20)
//             return decodeURIComponent(c.substring(nameEQ.length, c.length));
//         }
//     }
//     // Return null if the cookie is not found
//     return null;
// }
 
// const loginCookieValue = getCookie('jwt');

// if (loginCookieValue) {
//     heading.textContent = "Welcome back, User!";
//     console.log('Login cookie found, value:', loginCookieValue);

//     // You can now use the value in your JavaScript logic
// } else {
//     heading.textContent = "My Account";
//     console.log('Login cookie not found or inaccessible.');
//     // Handle the case where the user is not logged in or the cookie is HttpOnly
// }




editAccountLink.addEventListener("change", function () {
    let accountId = editAccountLink.value
    console.log(`classification_id is: ${accountId}`)
    let classIdURL = "/account/edit" + accountId
    fetch(classIdURL)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw Error("Network response was not OK");
    })
    .then(function (data) {
        console.log(data);
        acountUpdateLink(data);
    })
    .catch(function (error) {
        console.log('There was a problem: ', error.message)
    })
});


function acountUpdateLink(data) {
  let link;

  data.forEach(user => {
    
    link += `<a href="/account/edit/${user.account_id}">Edit Account Information</a>`
  });

  return link

}