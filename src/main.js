import { v4 as uuid4 } from "uuid"
import './style.css';

// Henter elementene vi trenger fra HTML
const form = document.getElementById(`form`)
const input = document.getElementById(`item-input`)
const list = document.getElementById(`list`)

const STORAGE_KEY = `Shopping-list`

// Henter lagrede varer fra localStorage, eller starter med tom liste
let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

// Lagrer nåværende liste til localStorage
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Legger til en ny vare med unik id
function addItem(name) {
  items.push({id: uuid4(), name});
  save();
  render();
}

// Fjerner en vare basert på id
function removeItem(id) {
  items = items.filter((item) => item.id !== id);
  save();
  render();
}

// Tømmer listen uten å bruke innerHTML
function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// Tegner listen på nytt basert på items-arrayet
function render() {
  clearList();

  // Lager listeelement og tekst for varenavnet
 items.forEach((item) => {
  const li = document.createElement(`li`)
  const span = document.createElement(`span`)
  span.textContent = item.name;

  // Lager slett-knapp
  const button = document.createElement('button');
    button.textContent = 'Slett vare';
    
  // Ber om bekreftelse før varen faktisk slettes
  button.addEventListener(`click`, () => {
    const confirmed = confirm(`Slette "${item.name}"?`);
    if (confirmed) {
      removeItem(item.id);
    }
  });

  li.appendChild(span); // Legger tekst-spannet inn i listeelemente
  li.appendChild(button); // Legger slett-knappen inn i listeelementet
  list.appendChild(li); // Legger hele listeelementet inn i selve listen
 });
}

// Kjøres når skjemaet sendes inn (legg til-knappen trykkes)
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return; // ignorer tomt input

  addItem(name);
  input.value = '';
  input.focus();
});

// Viser listen med en gang siden lastes (henter fra localStorage)
render();