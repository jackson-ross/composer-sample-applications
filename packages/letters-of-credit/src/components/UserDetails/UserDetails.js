import React, { Component } from 'react';
import '../../stylesheets/css/main.css';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      companyName: this.props.companyName,
      swiftCode: this.props.swiftCode,
      IBAN: this.props.IBAN,
    }
  }

  render() {
    let nameText = 'Name: ' ;
    let companyNameText = 'Company Name: ';
    let ibanText = 'IBAN : ';
    let swiftCodeText = 'SWIFT code: ';
    
    return (
      <div className="UserDetails">
        <h1>Business Account</h1>
        {nameText}<b>{this.state.name}</b><br/>
        {companyNameText}<b>{this.state.companyName}</b><br/>
        {ibanText}<b>{this.state.IBAN}</b><br/>
        {swiftCodeText}<b>{this.state.swiftCode}</b>
      </div>
    );
  }
}

export default UserDetails;
