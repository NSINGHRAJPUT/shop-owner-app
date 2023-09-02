var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);


window.addEventListener('load', () => {
  const response = axios.get("http://localhost:3000/shop/items/")
  response.then((response) => {
    response.data.map((item) => {
      createElement(item.id, item.name, item.price, item.description, item.quantity)
    })
  })
    .catch((err) => console.log(err))
})
////////////// for creating dom element
function createElement(id, name, price, description, quantity) {
  var li = document.createElement('li');
  let subLi = document.createElement('div');
  subLi.setAttribute('hidden', 'true');
  subLi.appendChild(document.createTextNode(id))
  li.appendChild(subLi)
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(name));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" - "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(price));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" - "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(description));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" - "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(quantity));
  li.appendChild(document.createTextNode(" "));
  var deleteBtn1 = document.createElement('button');
  deleteBtn1.className = 'btn btn-danger btn-sm float-right delete1';
  deleteBtn1.appendChild(document.createTextNode('Buy 1'));
  var deleteBtn2 = document.createElement('button');
  deleteBtn2.className = 'btn btn-danger btn-sm float-right delete2';
  deleteBtn2.appendChild(document.createTextNode('Buy 2'));
  var deleteBtn3 = document.createElement('button');
  deleteBtn3.className = 'btn btn-danger btn-sm float-right delete3';
  deleteBtn3.appendChild(document.createTextNode('Buy 3'));
  li.appendChild(deleteBtn1);
  li.appendChild(deleteBtn2);
  li.appendChild(deleteBtn3);
  itemList.appendChild(li);
}


// Add item to the list
function addItem(e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var price = document.getElementById('price').value;
  var description = document.getElementById('description').value;
  var quantity = document.getElementById('quantity').value;
  myobj = {
    name: name,
    price: price,
    description: description,
    quantity: quantity
  }
  console.log(myobj)
  const response = axios.post('http://localhost:3000/shop/add-item/', myobj)
  response.then((res) => {
    createElement(res.data.id, res.data.name, res.data.price, res.data.description, res.data.quantity)
  }).catch(err => console.log(err))
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('description').value = '';
  document.getElementById('quantity').value = '';
}

// Remove item from the list
function removeItem(e) {
  if (e.target.classList.contains('delete1')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 1 })
      response.then((res) => console.log(res.data.dataValues)).catch(err => console.log(err))
    }
  }
  if (e.target.classList.contains('delete2')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 2 })
      response.then((res) => console.log(res.data.dataValues)).catch(err => console.log(err))
    }
  }
  if (e.target.classList.contains('delete3')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 3 })
      response.then((res) => console.log(res.data.dataValues)).catch(err => console.log(err))

    }
  }
}



