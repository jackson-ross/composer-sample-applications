import React from 'react';
import './blockchaindisplay.css';
import Block from '../../components/Block/Block.js';
import axios from 'axios';

class BlockChainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }

  render() {
    let transactions = this.props.transactions;
    let blocks = [];
    if(transactions.length) {
      for (let i = 0; i < transactions.length; i++) {
        let name = transactions[i].transactionType.split(".")[3];
        let blockNumber = (i+1 < 10) ? "0"+(i+1) : (i+1);
        let dateTime = transactions[i].transactionTimestamp.split("T");
        let date = dateTime[0];
        let time = dateTime[1].split(".")[0];
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
