import { useState, useEffect } from 'react'
import './App.css'
import { useApi } from './contexts/ApiProvider'
import { sortBy } from 'lodash';

function App() {
  const [songs, setSongs] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const api = useApi();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    fetchData();
    event.preventDefault();
  };

  const handleNext = () => {
    fetchData(nextPage);
  };

  const handlePrev = () => {
    fetchData(prevPage);
  };

  const fetchData = async (page=0) => {
    const response = await api.get(searchTerm, `page=${page}`)
      if (response.ok) {
        setSongs(response.body.data);
        if (response.body.prev) {
          setPrevPage(response.body.prev)
        }
        if (response.body.next) {
          setNextPage(response.body.next)
        }
      }
      else {
        setSongs(null);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {songs === undefined ?
      <p>Waiting</p> :
      <>
        <form onSubmit={handleSubmit}>
          <Search search={searchTerm} onSearch={handleSearch}/>
          <button type="submit">Submit</button>
        </form>
        <List list={songs}/>
        <button type="button" onClick={handlePrev}>Previous</button>
        <button type="button" onClick={handleNext}>Next</button>
      </>
    }
    </>
  )
}

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
}

const List = ({ list }) => {
  const [sort, setSort] = useState('NONE');
  const handleSort = (sortKey) => {
    setSort(sortKey)
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list)

  return (
  <ul>
    <li style={{ display: 'flex' }}>
      <span style={{ width: '50%' }}>
        <button type="button" onClick={()=>handleSort('TITLE')}>
        Title
        </button>
      </span>
      <span style={{ width: '50%' }}>Artist</span>
    </li>
    {sortedList.map(
      (item) => (<Item key={item.sid} item={item}/>)
    )}
  </ul>
  )
}

const Item = ({ item }) => (
  <li style={{ display: 'flex' }}>
    <span style={{ width: '50%' }}>{item.title}</span>
    <span style={{ width: '50%' }}>{item.artist}</span>
  </li>
)

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={props.search} onChange={props.onSearch}/>
  </div>
);

export default App
