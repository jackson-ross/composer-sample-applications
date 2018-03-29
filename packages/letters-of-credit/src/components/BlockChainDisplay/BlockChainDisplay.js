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

  componentWillMount() {
		axios.get('http://localhost:3000/api/system/historian')
		.then((response) => {
      let relevantTransactions = [];
      let transactionTypes = ["InitialApplication", "Approve", "Reject", "Close"];
      response.data.map((i) => {
        let longName = i.transactionType.split(".")
        let name = longName[longName.length - 1];
        if(transactionTypes.includes(name)) {
          relevantTransactions.push(i);
        }
      });
      relevantTransactions.sort((a,b) => a.transactionTimestamp.localeCompare(b.transactionTimestamp));
      this.setState ({
        transactions: relevantTransactions
      });
		})
		.catch(error => {
			console.log(error);
		});
  }

  render() {
    let transactions = this.state.transactions;
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
    )
  }
}

export default BlockChainDisplay;
