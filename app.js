// Simple notes app using localStorage
const LS_KEY = 'notes_app_v1';
let notes = [];
let activeId = null;


// DOM
const notesList = document.getElementById('notesList');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const saveBtn = document.getElementById('save');
const deleteBtn = document.getElementById('delete');
const newNoteBtn = document.getElementById('newNote');
const searchInput = document.getElementById('search');
const charCount = document.getElementById('charCount');


function load(){
try{
notes = JSON.parse(localStorage.getItem(LS_KEY)) || [];
}catch(e){notes = []}
}


function saveStorage(){
localStorage.setItem(LS_KEY, JSON.stringify(notes));
}


function createNote(title = '', body = ''){
const id = Date.now().toString();
const note = {id,title,body,modified: new Date().toISOString()};
notes.unshift(note);
saveStorage();
setActive(id);
renderList();
}


function setActive(id){
activeId = id;
const note = notes.find(n=>n.id===id);
if(note){
titleInput.value = note.title;
bodyInput.value = note.body;
updateCharCount();
} else {
titleInput.value = '';
bodyInput.value = '';
activeId = null;
}
renderList();
}


function updateCharCount(){
charCount.textContent = bodyInput.value.length + ' chars';
}


function saveActive(){
if(!activeId) return;
const note = notes.find(n=>n.id===activeId);
if(!note) return;
note.title = titleInput.value;
note.body = bodyInput.value;
note.modified = new Date().toISOString();
// move to top
notes = [note, ...notes.filter(n=>n.id!==activeId)];
saveStorage();
renderList();
updateCharCount();