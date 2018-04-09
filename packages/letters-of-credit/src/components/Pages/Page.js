import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './page.css';
import Modal from '../Modal/Modal.js';
import LetterOfCredit from '../LetterOfCredit/LetterOfCredit.js';
import AlicePage from './AlicePage/AlicePage.js';
import BobPage from './BobPage/BobPage.js';
import MatiasPage from './MatiasPage/MatiasPage.js';
import EllaPage from './EllaPage/EllaPage.js';

class Page extends Component {
  render() {
    return (
      <div id="pageContainer" className="Page">
        <Modal />
        {this.props.contents}
      </div>
    );
  }
}

export default Page;
