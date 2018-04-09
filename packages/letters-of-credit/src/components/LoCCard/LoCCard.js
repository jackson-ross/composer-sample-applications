import React, {Component} from 'react';
import './loccard.css';
import axios from 'axios';

class LoCCard extends Component {  
  shipProduct(letterId) {
    let letter = "resource:org.acme.loc.LetterOfCredit#" + letterId;
    axios.post('http://localhost:3000/api/ShipProduct', {
      "$class": "org.acme.loc.ShipProduct",
      "loc": letter,
      "transactionId": "",
      "timestamp": "2018-03-13T11:25:08.043Z" // the transactions seem to need this field in; when submitted the correct time will replace this value
    })
    .catch(error => {
      console.log(error);
    });
  }

  receiveProduct(letterId) {
    let letter = "resource:org.acme.loc.LetterOfCredit#" + letterId;
    axios.post('http://localhost:3000/api/ReceiveProduct', {
      "$class": "org.acme.loc.ReceiveProduct",
      "loc": letter,
      "transactionId": "",
      "timestamp": "2018-03-13T11:25:08.043Z" // the transactions seem to need this field in; when submitted the correct time will replace this value
    })
    .catch(error => {
      console.log(error);
    });
  }

  generateCardContents(letter, user) {
    let contents = (
      <div>
        <h3>{'Ref: ' + letter.letterId}</h3>
        <p>{'Participants: Alice, ' + letter.issuingBank + ', Bob, ' + letter.confirmingBank}</p>
        <p>{'Product Type: ' + letter.productDetails.productType}</p>
        <button className="viewButton" onClick={() => this.props.callback(this.props.letter, false)}>View Letter Of Credit</button>
      </div>
    );

    let messageText, buttonStyle, callback, disableButton;

    if (letter.status === 'APPROVED' || letter.status === 'SHIPPED' || letter.status === 'RECEIVED') {
      if (user === 'bob') {
        messageText = 'Ship this product';
        buttonStyle = 'shipButton';
      } else if (user === 'alice') {
        messageText = 'This product is ready to be accepted';
        buttonStyle = 'acceptButton';
      }
      contents = (
        <div>
          <h3>{'Ref: ' + letter.letterId}</h3>
          <p>{messageText}</p>
          <p>{'Product Type: ' + letter.productDetails.productType}</p>
          <div className="shipButtonDiv">
            <button className={buttonStyle} onClick={() => this.shipProduct(letter.letterId)}>✓</button>
            <span className="shipText">Ship Order</span>
          </div>
        </div>
      );

    }

    // if(letter.status !== 'AWAITING_APPROVAL' && this.props.user === 'bob') {
    //   contents = (
    //     <div>
    //       <h3>{'Ref: ' + letter.letterId}</h3>
    //       <p>{'Ship this product'}</p>
    //       <p>{'Product Type: ' + letter.productDetails.productType}</p>
    //       <div className="shipButtonDiv">
    //         {letter.status === 'APPROVED' &&
    //           <button className="shipButton" onClick={() => this.shipProduct(letter.letterId)}>✓</button>
    //         }
    //         {letter.status === 'SHIPPED' && 
    //           <button className="shipButton" disabled>✓</button>
    //         }
    //         <span className="shipText">Ship Order</span>
    //       </div>
    //     </div>
    //   );
    // } else if(letter.status !== 'AWAITING_APPROVAL' && this.props.user === 'alice') {
    //   contents = (
    //     <div>
    //       <h3>{'Ref: ' + letter.letterId}</h3>
    //       <p>{'This product is ready to be accepted'}</p>
    //       <p>{'Product Type: ' + letter.productDetails.productType}</p>
    //       <div className="shipButtonDiv">
    //         <button className="acceptButton acceptButtonDisabled" onClick={() => this.receiveProduct(letter.letterId)}>✓</button>
    //         <span className="shipText">Receive Order</span>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   contents = (
    //     <div>
    //       <h3>{'Ref: ' + letter.letterId}</h3>
    //       <p>{'Participants: Alice, ' + letter.issuingBank + ', Bob, ' + letter.confirmingBank}</p>
    //       <p>{'Product Type: ' + letter.productDetails.productType}</p>
    //       <button className="viewButton" onClick={() => this.props.callback(this.props.letter, false)}>View Letter Of Credit</button>
    //     </div>
    //   )
    // }

    return contents;
  }

  render() {  
    return (
      <div className = "LoCCard">
        {this.generateCardContents(this.props.letter, this.props.user)}
      </div>
    );
  }
}

export default LoCCard;
