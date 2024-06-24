import React, { useState } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [edit, setEdit] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPassword = { title, password };

    if (edit !== null) {
      const updatedPasswords = [...list];
      updatedPasswords[edit] = newPassword;
      setList(updatedPasswords);
      setEdit(null);
    } else {
      setList([...list, newPassword]);
    }

    setTitle('');
    setPassword('');
  };

  const handleDelete = (index) => {
    const updatedPasswords = list.filter((prevIndex, currindex) => currindex !== index);
    setList(updatedPasswords);
  };

  const handleEdit = (index) => {
    setTitle(list[index].title);
    setPassword(list[index].password);
    setEdit(index);
  };

  const filteredPasswords = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Password Keeper</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit">Add</button>
      </form>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <p>Total passwords: {list.length}</p>

      <ul>
        {filteredPasswords.map((item, index) => (
          <li key={index}>
            {item.title} - {item.password}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
