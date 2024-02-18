import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const BASE_API_URL = 'http://localhost:5001/flask/api/songs/search/';

  const [songs, setSongs] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL+searchTerm);
      if (response.ok) {
        const results = await response.json();
        setSongs(results.data);
      }
      else {
        setSongs(null);
      }
    })();
  }, [searchTerm]);

  return (
    <>
    {songs === undefined ?
      <p>Waiting</p> :
      <>
        <Search search={searchTerm} onSearch={handleSearch}/>
        <List list={songs}/>
      </>
    }
    </>
  )
}

const List = ({ list }) => (
  <ul>
    {list.map(
      (item) => (<Item key={item.sid} item={item}/>)
    )}
  </ul>
)

const Item = ({ item }) => (
  <li>
    <span>{item.title}</span>-
    <span>{item.artist}</span>
  </li>
)

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={props.search} onChange={props.onSearch}/>
  </div>
);

export default App
