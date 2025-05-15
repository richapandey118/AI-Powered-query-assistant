function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // User Message
    let userMessage = <p class="user-message">${userInput}</p>;
    chatBox.innerHTML += userMessage;

    // Bot Response (Simple Reply)
    setTimeout(() => {
        let botReply = <p class="bot-message">Your query has been received!</p>;
        chatBox.innerHTML += botReply;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);

    document.getElementById("user-input").value = "";
}
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    alert("Login Successful (Backend Connection Needed)");
}

function signup() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    alert("Signup Successful (Backend Connection Needed)");
}
function checkStatus() {
    let queryId = document.getElementById("query-id").value;
    let statusResult = document.getElementById("status-result");

    if (queryId.trim() === "") {
        statusResult.innerText = "Please enter a valid Query ID.";
        return;
    }

}
function resolveQuery(queryId) {
    let rows = document.querySelectorAll("#query-table tr");
    rows.forEach(row => {
        if (row.cells[0].innerText == queryId) {
            row.cells[2].innerText = "Resolved";
            row.cells[3].innerHTML = "✅";
        }
    });
    alert("Query ${queryId} marked as resolved!");
}
