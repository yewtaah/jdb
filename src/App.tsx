import React from 'react'; 
import './App.css'; 
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

function App() { 
  
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  
  return (<div className="App"> 
    <main> 
      <div className="App-header"> 
        <h1>Jackson Bateman</h1> 
        <h2>Musical Theatre Artist</h2> 
      </div> 
      <div className="headshot-container"> 
        <div className="headshot-placeholder"> Headshot Here </div> 
      </div> 
      <div>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>

      </div>
    </main> 
  </div> 
  ); 
  
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

} 
export default App; 
