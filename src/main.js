import todo from './todo/index.js';

// Load up components
import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';
import Roomslist from './components/roomslist.js';
// Load up some DOM elements
const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');

// Add a submit event listener to the form and prevent it from posting back
formElement.addEventListener('submit', evt => {
    evt.preventDefault();

    // Grab the text value of the textbox and trim any whitespace off it
    let value = inputElement.value.trim();

    // If there's some content, trigger the action and clear the field, ready for the next item
    if(value.length) {
        todo.dispatch('addItem', value);
        inputElement.value = '';
        inputElement.focus();
    }
});

// Instantiate components
const countInstance = new Count({'componentElement':'[data-count]'});
const listInstance = new List();
const statusInstance = new Status();

const rooms = new Roomslist({'componentElement':'[room-listing]'});

// Initial renders
countInstance.render();
listInstance.render();
statusInstance.render();
rooms.render();
//
// setInterval(() => {
//     this.age++; // |this| properly refers to the Person object
//   }, 1000);
