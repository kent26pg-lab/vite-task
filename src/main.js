import { v4 as uuid4 } from "uuid"
import './style.css';

const form = document.getElementById(`form`)
const input = document.getElementById(`item-input`)
const list = document.getElementById(`list`)

const STORAGE_KEY = `Shopping-list`

let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addItem(name) {
  items.push({id: uuid4(), name});
  save();
  render();
}

function removeItem(id) {
  items = items.filter((item) => item.id !== id);
  save();
  render();
}

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function render() {
  clearList();

 items.forEach((item) => {
  const li = document.createElement(`li`)
  const span = document.createElement(`span`)
  span.textContent = item.name;
  const button = document.createElement('button');
    button.textContent = 'Slett vare';
    
button.addEventListener(`click`, () => {
  removeItem(item.id);
});
li.appendChild(span);
li.appendChild(button);
list.appendChild(li);
 });
}

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;

  addItem(name);
  input.value = '';
  input.focus();
});

render();