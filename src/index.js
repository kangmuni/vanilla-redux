import { createStore } from 'redux';

// PURE-REDUX : COUNTER

// const add = document.getElementById('add');
// const minus = document.getElementById('minus');
// const num = document.getElementById('num');

// const ADD = 'ADD';
// const MINUS = 'MINUS';

// const countModifier = (count = 0, action) => {
//   switch (action.type) {
//     case ADD:
//       return count + 1;
//     case MINUS:
//       return count - 1;
//     default:
//       return count;
//   }
// };

// const countStore = createStore(countModifier);

// const onChange = () => {
//   num.innerText = countStore.getState();
// };

// countStore.subscribe(onChange);

// const handleAdd = () => {
//   countStore.dispatch({ type: ADD });
// };

// const handleMinus = () => {
//   countStore.dispatch({ type: MINUS });
// };

// add.addEventListener('click', handleAdd);
// minus.addEventListener('click', handleMinus);

// PURE-REDUX : TO DO LIST
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [...state, newToDoObj];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach((toDo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DELETE';
    btn.addEventListener('click', dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddTodo(toDo);
};

form.addEventListener('submit', onSubmit);
