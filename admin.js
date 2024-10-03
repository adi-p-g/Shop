const API_KEY = "AIzaSyBOWnmO2SpHc9Gpn9MJ_uQ63Oib4hpCiRs"; 
const PROJECT_ID = "student-crud-5899b"; 

// Base Firestore URL
const firestoreBaseUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Add new item to the inventory
document.getElementById("addItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryID = document.getElementById("category-id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    const data = {
        fields: {
            categoryID: { stringValue: categoryID },
            title: { stringValue: title },
            description: { stringValue: description },
            quantity: { integerValue: quantity.toString() },
            price: { doubleValue: price }
        }
    };

    fetch(`${firestoreBaseUrl}/inventory?key=${API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Item added successfully!");
        displayInventory();
    })
    .catch(error => console.error("Error adding item:", error));
});

// Fetch and display inventory
function displayInventory() {
    fetch(`${firestoreBaseUrl}/inventory?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const inventoryList = document.getElementById("inventory-list");
        inventoryList.innerHTML = "<table><tr><th>Category ID</th><th>Title</th><th>Description</th><th>Quantity</th><th>Price</th><th>Actions</th></tr>";
        
        data.documents.forEach(doc => {
            const item = doc.fields;
            const itemId = doc.name.split('/').pop(); // Extract item ID from document path

            inventoryList.innerHTML += "<table><tr><th>Category ID</th><th>Title</th><th>Description</th><th>Quantity</th><th>Price</th><th>Actions</th></tr>"+`
            <tr>
                <td>${item.categoryID.stringValue}</td>
                <td>${item.title.stringValue}</td>
                <td>${item.description.stringValue}</td>
                <td>${item.quantity.integerValue}</td>
                <td>${item.price.doubleValue}</td>
                <td>
                    <button onclick="editItem('${itemId}', '${item.title.stringValue}', '${item.description.stringValue}', ${item.quantity.integerValue}, ${item.price.doubleValue})">Edit</button>
                    <button onclick="deleteItem('${itemId}')">Delete</button>
                </td>
            </tr>`;
        });
        inventoryList.innerHTML += "</table>";
    })
    .catch(error => console.error("Error fetching inventory:", error));
}

// Open edit modal with existing item details
function editItem(itemId, title, description, quantity, price) {
    document.getElementById("edit-title").value = title;
    document.getElementById("edit-description").value = description;
    document.getElementById("edit-quantity").value = quantity;
    document.getElementById("edit-price").value = price;

    document.getElementById("editModal").style.display = "block";

    // Handle form submission for update
    document.getElementById("editItemForm").onsubmit = function (event) {
        event.preventDefault();
        updateItem(itemId);
    };
}

// Update item in Firestore
function updateItem(itemId) {
    const title = document.getElementById("edit-title").value;
    const description = document.getElementById("edit-description").value;
    const quantity = parseInt(document.getElementById("edit-quantity").value);
    const price = parseFloat(document.getElementById("edit-price").value);

    const data = {
        fields: {
            title: { stringValue: title },
            description: { stringValue: description },
            quantity: { integerValue: quantity.toString() },
            price: { doubleValue: price }
        }
    };

    fetch(`${firestoreBaseUrl}/inventory/${itemId}?key=${API_KEY}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Item updated successfully!");
        document.getElementById("editModal").style.display = "none"; // Hide modal
        displayInventory();  // Refresh the inventory list
    })
    .catch(error => console.error("Error updating item:", error));
}

// Confirm delete and delete item from Firestore
function deleteItem(itemId) {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
        fetch(`${firestoreBaseUrl}/inventory/${itemId}?key=${API_KEY}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            alert("Item deleted successfully!");
            displayInventory();  // Refresh the inventory list
        })
        .catch(error => console.error("Error deleting item:", error));
    }
}

// Initial data load
displayInventory();
