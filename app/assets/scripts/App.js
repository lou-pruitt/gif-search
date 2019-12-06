import '../styles/styles.css';
import UserInput from './modules/UserInput.js';

let userInput = new UserInput();

if (module.hot) {
  module.hot.accept();
}
