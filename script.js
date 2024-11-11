let contacts = [];
let currentPage = 1;
const contactsPerPage = 10;

function addContact() {
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const description = document.getElementById('contactDescription').value;

    if (name && phone && email && description) {
        contacts.push({ name, phone, email, description });
        clearForm();
        displayContacts();
    } else {
        alert('Будь ласка, заповніть всі поля.');
    }
} 

function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    const filteredContacts = getFilteredContacts();
    const startIn = (currentPage - 1) * contactsPerPage;
    const endIn = startIn + contactsPerPage;

    const contactsToDisplay = filteredContacts.slice(startIn, endIn);

    contactsToDisplay.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact-item');
        contactDiv.innerHTML = `
            <strong>${contact.name}</strong><br>
            Телефон: ${contact.phone}<br>
            Email: ${contact.email}<br>
            Опис: ${contact.description}<br>
            <button onclick="editContact(${index})">Редагувати</button>
            <button onclick="deleteContact(${index})">Видалити</button>
        `;
        contactList.appendChild(contactDiv);
    });

    displayPagination(filteredContacts.length);
}

function getFilteredContacts() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    return contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(query) ||
            contact.phone.toLowerCase().includes(query) ||
            contact.email.toLowerCase().includes(query) ||
            contact.description.toLowerCase().includes(query)
        );
    });
}

function clearForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactDescription').value = '';
}

function displayPagination(totalContacts) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalContacts / contactsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.onclick = () => {
            currentPage = i;
            displayContacts();
        };
        pagination.appendChild(pageButton);
    }
}
// _______________________________________________________________
function editContact(index) {
    const contact = contacts[index];

    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactDescription').value = contact.description;

    contacts.splice(index, 1); // Видаляємо старий контакт
}

function deleteContact(index) {
    if (confirm('Ви впевнені, що хочете видалити цей контакт?')) {
        contacts.splice(index, 1);
        displayContacts();
    }
}

function searchContacts() {
    displayContacts();
}

function clearSearch() {
    document.getElementById('searchQuery').value = '';
    displayContacts();
}



function sortContacts(order) {
    if (order === 'asc') {
        contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'desc') {
        contacts.sort((a, b) => b.name.localeCompare(a.name));
    }
    displayContacts();
}

displayContacts();



