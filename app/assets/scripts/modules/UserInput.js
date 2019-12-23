import Modal from './Modal';
let modal = new Modal();

class UserInput {
  constructor() {
    this.searchBtn = document.querySelector(
      '.header__search-container__search-btn'
    );
    this.image = document.getElementsByTagName('img');
    this.imgContainerWidth = window.innerWidth;
    this.gifId = 0;
    this.eventHandlers();
    this.setWidth();
    document.onload = this.searchTerm();
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
    this.gifId = 0;
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
    this.gifArea = document.getElementById('gif-area');
    if (this.gifArea.hasChildNodes()) {
      for (let index = 20; index > 0; index--) {
        this.gifArea.removeChild(this.gifArea.childNodes[0]);
      }
    }
    let searchEndPoint = 'https://api.giphy.com/v1/gifs/search?';
    let limit = 20;
    let rating = 'g';
    let offset = this.randomNumber();
    let api_key = process.env.API_KEY;

    let url = `${searchEndPoint}&api_key=${api_key}&q=${this.query}&limit=${limit}&rating=${rating}&offset=${offset}&downsized`;
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
    this.gifArray = json.data;
    for (
      this.gifIndex = 0;
      this.gifIndex < this.gifArray.length;
      this.gifIndex++
    ) {
      const gif = this.gifArray[this.gifIndex];
      if (this.imgContainerWidth > 992) {
        this.gifImage = gif.images.original.url;
      } else {
        this.gifImage = gif.images.downsized_medium.url;
      }
      this.imgAlt = gif.title;
      this.createGifElement();
      this.injectGifs();
    }
  }

  createGifElement() {
    this.gifElement = document.createElement('img');
    this.gifElement.classList.add('main__img-container__gif');
    this.gifId++;
    this.gifElement.setAttribute('id', this.gifId);
    this.gifElement.src = this.gifImage;
    this.gifElement.alt = this.imgAlt;
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
