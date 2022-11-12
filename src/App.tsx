import React from 'react';
import logo from './logo.svg';
import './App.css';


import Todo from './components/Todo';

function App() {
  return (
<>
<div className='bg-black'>
  <h1 className='text-white p-5 font-semibold text-xl'>Task Management</h1>
</div>
<Todo />
</>
  );
}

export default App;
