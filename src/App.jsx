import { useState, useEffect } from 'react'
import './App.css'
import { useApi } from './contexts/ApiProvider'

function App() {
  const [songs, setSongs] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const api = useApi();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await api.get(searchTerm)
      if (response.ok) {
        setSongs(response.body.data);
      }
      else {
        setSongs(null);
      }
    })();
  }, [searchTerm, api]);

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
