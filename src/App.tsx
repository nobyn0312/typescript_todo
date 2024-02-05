import React, { useState } from 'react';
import './App.css';
import { check } from 'prettier';

function App() {

  type Todo = {
    inputValue: string//タスクの名前
    checked: boolean//タスクの完了状
    id: number//タスクのID
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setinputValue(e.target.value);
  }
  // 入力されたinputのvalueの取得
  const [inputValue, setinputValue] = useState("");

  // Todoリストの初期値
  const [todos, setTodos] = useState<Todo[]>([]);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);

    const newTodos: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false
    };
    //スプレッド構文
    setTodos([...todos, newTodos]);
  }

  const handleEdit = (id: number, inputValue: string) => {
    console.log(inputValue);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue
      };
      return todo;
    });
    setTodos(newTodos);
  }

  const handleChecked = (id: number, checked:boolean)=> {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      };
      return todo;
    });
    setTodos(newTodos);
  }

  const handleRemove =(id:number)=>{
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }



return (
  <div className="App">
    <>
      <div>
        <h2>todo with typescript</h2>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <input type="text"
            onChange={(e) => handleChange(e)}
            className='inputText' />
          <input type="submit"
            value='作成'
            className='submitButton' />
        </form>

        <ul className='todoList'>
          {todos.map(todo => {
            return (
              <li key={todo.id}>
                <input type="text"
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className='inputText'
                  value={todo.inputValue}
                  disabled={todo.checked}
                />
                <input type="checkbox"
                  onChange={
                    (e) => handleChecked(todo.id, todo.checked)}
                />
                <button onClick={()=>handleRemove(todo.id)}>
                  削除
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  </div>
);
}

export default App;
