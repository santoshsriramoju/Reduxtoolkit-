
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addUser, deleteUser, updateUser } from './features/Users';


import './App.css';


function App() {
  const [data, setData] = useState({
    name: '',
    userName: ''
  });
  const [newUsername, setNewUsername] = useState('');
  const usersList = useSelector(state => state.users.value);
  const dispatch = useDispatch();

  const handleData = e => {
    const name = e.target.name;
    setData(data => ({
      ...data,
      [name]: e.target.value
    }))
  }

  return (
    <div className="App">
      {" "}
      <div className="addUser">
        <input type="text" placeholder='Name...' name="name" value={data.name} onChange={handleData} />
        <input type="text" placeholder='Username...' name="userName" value={data.userName} onChange={handleData} />
        <button onClick={() => {
          dispatch(addUser({ id: usersList[usersList.length - 1].id + 1, name: data.name, username: data.userName }))
        }}>Add User</button>
      </div>
      <div className="displayUsers">
        {
          usersList.length > 0 && usersList.map(user => {
            return <div key={user.id}>
              <h1>{user.name}</h1>
              <h1>{user.username}</h1>
              <input type="text" name="newUsername"  placeholder='New Username...' onChange={e=>setNewUsername(e.target.value)} />
              <button onClick={()=>{
                dispatch(updateUser({id: user.id, username: newUsername}))
              }}>Update Username</button>
              <button onClick={() => {
                dispatch(deleteUser({ id: user.id })
                )
              }}>Delete User</button>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
