document.addEventListener("DOMContentLoaded", init);
const URL_API = 'http://127.0.0.1:3000/api/'

var customers = []

function init(){
    search()
}

function agregar(){
    clean()
    abrirFormulario()
}

async function search(){
    var url= URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

    var html =''
    for(customer of customers){
        var row = `<tr>
        <td>${customer.firstname}</td>
        <td>${customer.lastname}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>
            <a href="#" onclick="edit(${customer.id})" class="myButton-edit">Editar</a>
            <a href="#" onclick="remove(${customer.id})" class="myButton-delete">Eliminar</a>
        </td>
      </tr>`
      html = html + row;
    }


  document.querySelector('#customers > tbody').outerHTML=html
}

async function remove(id){
    respuesta = confirm('¿Está seguro de eliminarlo?')
    if(respuesta){
        var url= URL_API + 'customers/' + id
        await fetch(url, {
            "method": 'DELETE',
            "headers": {
                "Content-Type": 'application/json'
            }
        })
        window.location.reload();
    }
}

function clean(){
    document.getElementById('txtId').value=''
    document.getElementById('txtFirstname').value=''
    document.getElementById('txtLastname').value=''
    document.getElementById('txtPhone').value=''
    document.getElementById('txtAddress').value=''
    document.getElementById('txtEmail').value=''
}

async function save(){

    var data = {
    "address": document.getElementById('txtAddress').value,
    "email":document.getElementById('txtEmail').value,
    "firstname":document.getElementById('txtFirstname').value,
    "lastname":document.getElementById('txtLastname').value,
    "phone":document.getElementById('txtPhone').value
    }

    var id=document.getElementById('txtId').value
    if(id != ''){
        data.id=id
    }

    var url= URL_API + 'customers'
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(data),
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    window.location.reload();
}


function abrirFormulario(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale opened");
}

function cerrarModal(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale");
}

function edit(id){
    abrirFormulario()
    var customer = customers.find(x => x.id == id)
    document.getElementById('txtId').value=customer.id
    document.getElementById('txtFirstname').value=customer.firstname
    document.getElementById('txtLastname').value=customer.lastname
    document.getElementById('txtPhone').value=customer.phone
    document.getElementById('txtAddress').value=customer.address
    document.getElementById('txtEmail').value=customer.email
}

/*
para declarar variables no es necario poner que tipo es como en python
se puede usar el ";" al final o no.

nombre="Lucas"

asi declara una funcion
function hacerAlgo(var1, var2){
    alerta("asasdsas")
}

document.getElementById("modal"); ->Esto lo que hace es retornar el elemento que tiene ese ID
*/