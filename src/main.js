import { v4 as uuid4 } from "uuid"

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

