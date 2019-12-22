class Modal {
  constructor() {
    this.eventHandlers();
    this.gifModal();
  }

  eventHandlers() {
    document.addEventListener(
      'click',
      event => {
        if (event.target.matches('.main__gif')) {
          this.currentGif = event.target;
          this.createModal();
        }
      },
      false
    );
  }

  gifModal() {
    this.modal = document.getElementById('gif-modal');
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    this.modalImg = document.getElementById('img01');
    this.captionText = document.getElementById('caption');
    // Get the <span> element that closes the modal
    this.span = document.getElementsByClassName('modal__close')[0];
    // When the user clicks on <span> (x), close the modal
    this.span.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
  }

  createModal() {
    this.modal.style.display = 'block';
    this.modalImg.src = this.currentGif.src;
    this.captionText.innerHTML = this.currentGif.alt;
  }
}

export default Modal;
