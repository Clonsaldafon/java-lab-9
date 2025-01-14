let apiUrl = 'http://localhost:8080/products';

async function getProduct() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function addProduct() {1
    let item = document.getElementById("new_product_name").value;

    try {

        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: item })
        });

        if (!response.ok) {
            throw new Error(`Failed to add product with name=${newItemName}`);
        }

        getProduct().then(data => {
            displayList(data);
        });

    } catch (error) {
        console.log(error);
    }
}

async function deleteItem(uuid) {
    try {
        let response = await fetch(apiUrl + '/' + encodeURIComponent(uuid), { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Failed to delete product with id=${uuid}`);
        }

        getProduct().then(data => {
            displayList(data);
        });

    } catch (error) {
        console.log(error);
    }
}

async function editItem(uuid) {
    try {
        let response = await fetch(apiUrl + '/' + encodeURIComponent(uuid), { method: 'PUT'});
        if (!response.ok) {
            throw new Error(`Failed to mark product with id=${uuid}`);
        }

        getProduct().then(data => {
            displayList(data);
        });

    } catch (error) {
        console.log(error);
    }
}

function displayList(products) {
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        let li = document.createElement("li");
        li.classList.add("list-group-item")
        li.appendChild(document.createTextNode(product.name));

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");
        deleteButton.appendChild(document.createTextNode("Удалить"));
        deleteButton.onclick = function() {
            deleteItem(product.id);
        };
        li.appendChild(deleteButton);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.checked = product.isMarked;
        checkbox.onclick = function() {
            editItem(product.id);
        };
        li.insertBefore(checkbox, li.firstChild);

        list.appendChild(li);
    }
}

getProduct().then(data => {
    displayList(data);
});