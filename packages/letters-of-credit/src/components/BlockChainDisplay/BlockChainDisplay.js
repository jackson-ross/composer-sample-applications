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

  render() {
    let transactions = this.props.transactions;
    let blocks = [];
    if(transactions.length) {
      for (let i = 0; i < transactions.length; i++) {
        let name = transactions[i].transactionType.split(".")[3];
        let blockNumber = (i+1 < 10) ? "0"+(i+1) : (i+1);
        let dateTime = transactions[i].transactionTimestamp.toLocaleString().split(', ');
        blocks.push(<Block transactionDetails={name} date={dateTime[0]} time={dateTime[1]} number={blockNumber}/>);
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
