var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Form submit event
form.addEventListener('submit', async (e) => {
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
  try {
    const res = await axios.post('http://localhost:3000/shop/add-item/', myobj)
    createElement(res.data.id, res.data.name, res.data.price, res.data.description, res.data.quantity)
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
  }
  catch { err => console.log(err) }
});

// Delete event
itemList.addEventListener('click', removeItem);

window.addEventListener('load', async () => {
  const response = await axios.get("http://localhost:3000/shop/items/")
  try {
    response.data.map((item) => {
      createElement(item.id, item.name, item.price, item.description, item.quantity)
    })
  }
  catch { (err) => console.log(err) }
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
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-warning btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn1);
  li.appendChild(deleteBtn2);
  li.appendChild(deleteBtn3);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(deleteBtn)
  itemList.appendChild(li);
}


// Remove item from the list
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 0 })
      response.then((res) => {
        location.reload()
      })
        .catch(err => console.log(err))
    }
  }
  if (e.target.classList.contains('delete1')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 1 })
      response.then((res) => {
        console.log(res)
        location.reload()
      })
        .catch(err => console.log(err))
    }
  }
  if (e.target.classList.contains('delete2')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      if (num[num.length - 4] < 2) {
        alert('Only 1 item left')
      } else {
        const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 3 })
        response.then((res) => {
          console.log(res)
          location.reload()
        })
          .catch(err => console.log(err))
      }
    }
  }
  if (e.target.classList.contains('delete3')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      let x = li.textContent
      var num = `${x}`.match(/\d+/g);
      if (num[num.length - 4] < 3) {
        alert('Only 2 item are left')
      } else {
        const response = axios.post('http://localhost:3000/shop/delete-item/', { id: num[0], quantity: 3 })
        response.then((res) => {
          console.log(res)
          location.reload()
        })
          .catch(err => console.log(err))
      }
    }
  }
}



