class UserInput {
  constructor() {
    this.searchBtn = document.querySelector('.main__search-btn');
    this.eventHandlers();
  }

  eventHandlers() {
    this.searchBtn.addEventListener('click', () => this.searchTerm());
  }

  searchTerm() {
    this.query = document.getElementById('query').value;
    this.gifSearch();
    console.log('searchTerm(): success ');
  }

  gifSearch() {
    console.log('gifSearch(): success ', this.query);
    let apiKey = 'dc6zaTOxFJmzC';
    let searchEndPoint = 'https://api.giphy.com/v1/gifs/search?';
    let limit = 1;
    let rating = 'pg';
    let offset = this.randomNumber();

    let url = `${searchEndPoint}&api_key=${apiKey}&q=${this.query}&limit=${limit}&rating=${rating}&offset=${offset}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.buildGifs(json);
        console.log(json, 'json');
      })
      .catch(err => {
        console.log(err, 'error');
      });
    this.injectGifs();
    this.url = url;
  }

  randomNumber() {
    let number = Math.floor(Math.random() * 100);
    return number;
  }

  buildGifs(json) {
    this.gifs = json.data
      .map(gif => gif.id)
      .map(gifId => {
        this.theGif = `https://media.giphy.com/media/${gifId}/giphy.gif`;
      });
    this.gifData = json.data[0];
    this.imgAlt = json.data[0].title;
    this.injectGifs();
  }

  injectGifs() {
    console.log(this.imgAlt, 'imgAlt');
    this.changeSrc = document.getElementById('gif');
    this.changeSrc.src = this.theGif;
    this.changeSrc.alt = this.imgAlt;
  }
}

export default UserInput;
