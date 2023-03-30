const form = document.querySelector('.form');

const nameInput = document.querySelector('#name');
const price = document.querySelector('#price');
const itemId = document.querySelector('#itemId');
const itemList = document.querySelector('.itemList');



form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (itemId.value) {
        item = JSON.parse(localStorage.getItem(itemId.value));
        item.name = nameInput.value
        item.price = price.value
    } else {
        item = {
            name: nameInput.value,
            price: price.value
        }
        itemId.value = `item ${Date.now()}`
    }

    localStorage.setItem(itemId.value, JSON.stringify(item));

    form.reset();
    itemId.value = '';
    renderList();
});

function renderList() {
    itemList.innerHTML = '';

    let totalPrise = 0;
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {

            const item = JSON.parse(localStorage.getItem(key));
            const li = document.createElement('li');

            li.innerHTML = `<span>${item.name}</span> <span>$${item.price}</span>`
            itemList.appendChild(li);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            li.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            li.appendChild(deleteBtn);

            editBtn.addEventListener('click', () => {
                nameInput.value = item.name;
                price.value = item.price;
                itemId.value = key;
            })

            deleteBtn.addEventListener('click', () => {
                localStorage.removeItem(key);

                renderList();
            })
            totalPrise += Number(item.price);

        }


    }

    const totalItem = document.createElement('h4');
    totalItem.textContent = totalPrise;
    itemList.appendChild(totalItem);
}

renderList();