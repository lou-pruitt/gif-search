import Modal from './Modal';
let modal = new Modal();

class UserInput {
  constructor() {
    this.searchBtn = document.querySelector('.main__search-btn');
    this.image = document.getElementsByTagName('img');
    this.imgContainerWidth = window.innerWidth;
    this.gifId = 0;
    this.eventHandlers();
    this.setWidth();
  }

  eventHandlers() {
    this.searchBtn.addEventListener('click', () => this.searchTerm());
  }

  setWidth() {
    this.gifArea = document.getElementById(
      'gif-area'
    ).style.width = this.windowWidth;
  }

  searchTerm() {
    this.validInput = document.getElementById('query').validity.valid;
    if (this.validInput) {
      this.query = document.getElementById('query').value;
      this.gifSearch();
    } else {
      this.query = 'Christmas';
      this.gifSearch();
    }
  }

  gifSearch() {
    let searchEndPoint = 'https://api.giphy.com/v1/gifs/search?';
    let limit = 1;
    let rating = 'g';
    let offset = this.randomNumber();

    let url = `${searchEndPoint}&api_key=${JSON.stringify(
      process.env.API_KEY
    )}&q=${this.query}&limit=${limit}&rating=${rating}&offset=${offset}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.buildGifs(json);
      })
      .catch(err => {
        console.log(err, 'error');
      });
  }

  randomNumber() {
    let number = Math.floor(Math.random() * 300);
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
    this.createGifElement();
  }

  createGifElement() {
    this.gifArea = document.getElementById('gif-area');
    this.gifElement = document.createElement('img');
    this.gifElement.classList.add('main__gif');
    this.gifId++;
    this.gifElement.setAttribute('id', this.gifId);
    this.gifElement.src = this.theGif;
    this.gifElement.alt = this.imgAlt;
    this.injectGifs();
  }

  injectGifs() {
    if (this.gifArea.hasChildNodes()) {
      this.gifArea.prepend(this.gifElement);
    } else {
      this.gifArea.appendChild(this.gifElement);
    }
  }
}

export default UserInput;
