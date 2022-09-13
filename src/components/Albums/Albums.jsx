import { Component } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/users/1/albums';
class Albums extends Component {
  state = {
    page: 1,
    albums: [],
  };
  componentDidMount(){
      this.searchAlbums()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.page !== this.state.page){
        this.searchAlbums()
    }
  }
  searchAlbums = async () => {
    const { page } = this.state;
    try {
      const response = await axios.get(`?_page=${page}&_limit=3`);
      this.setState(state => ({
        albums: page === 1 ? response.data : [...state.albums, ...response.data],
      }));
      console.log(response.data)
    } catch {
      alert('Error');
    }
  };
  handleClickLoadMore = () => {
      this.setState(state => ({page: state.page + 1}))
  }

  render() {
    const { albums } = this.state;
    const {handleClickLoadMore} = this
    return (
      <div>
        <ul>
          {albums.map(({ id, title }) => (
            <li key={id}>
              <p>{title}</p>
            </li>
          ))}
        </ul>
        <button onClick={handleClickLoadMore}>Load more</button>
      </div>
    );
  }
}

export default Albums
