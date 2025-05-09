// ==============================
// 🌱 Sélection des éléments
// ==============================
const addBt = document.querySelector('.add-button');
const descriptionInput = document.querySelector('.description');
const amountInput = document.querySelector('.amount');
const categoryInput = document.querySelector('.category');
const depenseList = document.querySelector('.depense-list');
const tot = document.querySelector('.total span');
// ==============================
// 🧠 Variables globales
// ==============================
const depenses = [];
let total = 0;
// ==============================
// 🎊 Fonctionnalités
// ==============================

// Fonction pour reset les champs du formulaire
function resetForm() {
  descriptionInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  descriptionInput.focus();
}

// Fonction pour ajouter une dépense
function addDepense(description, amount, category) {
  depenses.push([description, amount, category]);
  total += parseFloat(amount);
  tot.textContent = `${total}`;
  resetForm();
};

// Fonction pour afficher les dépenses
function displayDepenses() {
  depenseList.innerHTML = ''; // Vider la liste avant de l'afficher
  if (depenses.length === 0) {
    depenseList.innerHTML = '<p>Aucune dépense enregistrée.</p>';
  } else {
    depenses.forEach((depense, index) => {
      const div = document.createElement('div');
      div.className = 'depense-item';
      div.innerHTML = `
      ${depense[0]} - ${depense[1]}€ - ${depense[2]}
      <button class="delete-button" data-index="${index}" title="Supprimer ${depense[0]}">❌</button>
      `;
      depenseList.appendChild(div);
    });
  }
}

// Fonction pour supprimer une dépense
function deleteDepense(index) {
  const montant = parseFloat(depenses[index][1]); // Récupérer le montant avant suppression
  depenses.splice(index, 1); // Supprimer l'élément
  total -= montant; // Soustraire le montant du total
  tot.textContent = `${total}`;
  depenseList.innerHTML = ''; // Vider la liste avant de la réafficher
  displayDepenses();
}

// ==============================
// 🧲 Événements
// ==============================
addBt.addEventListener('click', (e) => {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;

  if (description && !isNaN(amount) && category) {
    addDepense(description, amount, category);
    displayDepenses()
  }
});

depenseList.addEventListener('click', (e) => {
  if (e.target.matches('.delete-button')) {   
    const index = e.target.dataset.index;
    deleteDepense(index);
  }
});