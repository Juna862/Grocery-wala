//const api_url = "<heroku_app_url>"
const api_url = "https://groceries-wala.herokuapp.com/groceries"

function loadData(records = []) {
        var table_data = "";
                for(let i=0; i<records.length; i++) {
                    table_data += `<tr>`;
                    table_data += `<td>${records[i].item}</td>`;
                    table_data += `<td>${records[i].price}</td>`;
                    table_data += `<td>${records[i].quantity}</td>`;
                    table_data += `<td>`;
                    table_data += `<a href="edit.html?id=${records[i].id}"><button class="btn btn-primary">Edit</button></a>`;
                    table_data += '&nbsp;&nbsp;';
                    table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i].id}')>Delete</button>`;
                    table_data += `</td>`;
                    table_data += `</tr>`;
                }
                //console.log(table_data);
                document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
    fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
        console.table(data);
        loadData(data);
    });
}

function getDataById(id) {
    fetch(`${api_url}?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data=data[0]
        document.getElementById("id").value = data.id;
        document.getElementById("item").value = data.item;
        document.getElementById("price").value = data.price;
        document.getElementById("quantity").value = data.quantity;
    })
}

function postData() {
    var item = document.getElementById("item").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;

    data = {item: item, price: price, quantity: quantity};

    fetch(api_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        window.location.href = "index.html";
    })
}

function putData() {
    var id = document.getElementById("id").value;
    var item = document.getElementById("item").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
 
    data = {id: id, item: item, price: price, quantity: quantity};
    console.log(data)

    fetch(api_url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        console.table(data);
        window.location.href = "index.html";
    })
}

function deleteData(id) {
    user_input = confirm(`${id} Are you sure you want to delete this record?`);
    if(user_input) {
        fetch(`${api_url}?id=${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": id})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
    }
}