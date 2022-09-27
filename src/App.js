import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  //usesの変数が変わった際に再レンダリング
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const ref = useRef();

  //第二引数にからの配列を挿入することでページがマウントされた一回だけ発火されるっぽい
  useEffect(() => {
    //fetchで呼び出す
    fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
      //resをjson形式で返す
      return res.json();
    })
    .then((data) => setUsers(data));
  },[]);


  function handleSearch() {
    //フィルタリング機能の実装
    setSearchQuery(
    //toLowerCaseで大文字を全て小文字に変換させてからフィルタリング　
    users.filter((user => user.name.toLowerCase().includes(ref.current.value)))
    )
  }

  return (
    <div className="App">
      <div className="main">
        <h2>検索アプリ</h2>
        <input type="text" ref={ref} onChange={() => handleSearch()}/>
        <div className="content">
          {searchQuery.map((user) => (
            <div className="box" key={user.id}>
            <h3>{user.name}</h3>
            <hr />
            <p>{user.email}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
