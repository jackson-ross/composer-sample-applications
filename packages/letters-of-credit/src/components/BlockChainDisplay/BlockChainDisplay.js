import React from 'react';
import '../../stylesheets/css/main.css';
import Block from '../../components/Block/Block.js';
import axios from 'axios';

class BlockChainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }

  addLeadingZero(number) {
    return (number < 10) ? "0" + number : number;
  }

  render() {
    let transactions = this.props.transactions;
    let blocks = [];
    if(transactions.length) {
      for (let i = 0; i < transactions.length; i++) {
        let name = transactions[i].transactionType.split(".")[3];
        let blockNumber = this.addLeadingZero(i+1);
        let dateTime = transactions[i].transactionTimestamp;
        let date = dateTime.getFullYear() + '-' + this.addLeadingZero(dateTime.getMonth()+1) + '-' + this.addLeadingZero(dateTime.getDate());
        let time = dateTime.toTimeString().split(' ')[0];
        blocks.push(<Block transactionDetails={name} date={date} time={time} number={blockNumber}/>);
      }
    }

    return (
        <div className="BlockChainDisplay">
          {blocks}
          <div className="greyBlock">
            <div className="greyBlockNumber">x</div>
            <div className="greyBlockLine"/>
          </div>
        </div>
    );
  }
}

export default BlockChainDisplay;
