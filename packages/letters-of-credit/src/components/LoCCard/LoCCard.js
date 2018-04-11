import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './loccard.css';

class LoCCard extends Component {
  constructor(props) {
		super(props);
		this.state = {
      redirect: false
		}
    this.handleOnClick = this.handleOnClick.bind(this);
	}

  handleOnClick() {
    this.props.callback(this.props.letter, false);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.props.user + "/loc"} />;
    }

    let referenceNumberText = 'Ref: ' + this.props.letter.letterId;
    let participantsText = 'Participants: Alice, ' + this.props.letter.issuingBank + ', Bob, ' + this.props.letter.confirmingBank;
    let productsText = 'Product Type: ' + this.props.letter.productDetails.productType;
    return (
      <div className="LoCCard">
        <h3>{referenceNumberText}</h3>
        <p>{participantsText}</p>
        <p>{productsText}</p>
        <button className="viewButton" onClick={() => this.handleOnClick()}>View Letter Of Credit</button>
      </div>
    );
  }
}

export default LoCCard;
