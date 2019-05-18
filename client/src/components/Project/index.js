import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './Project.module.scss';

export default class Counter extends Component {

  render()  {
    const { project, number_of_total_proposer, proposer_name, proposer_address, proposal_by, proposal_title, proposal_content } = this.props;
    return (
      <div className={styles.counter}>
        <h3> Your Project Contract Instance </h3>
        <div className={styles.buttons}>
          <Button
            onClick={() => this.props.getNumberOfTotalProposer()}
            size="small">getNumberOfTotalProposer</Button>

          <Button
            onClick={() => this.props.createProposer("Taro Suzuki", "0xfed9ead1d8b7d7e7563903c3120c9b58e5c5d5aa")}
            size="small">createProposer</Button>
          <Button
            onClick={() => this.props.createProposal("0xfed9ead1d8b7d7e7563903c3120c9b58e5c5d5aa", "This is proposalTitle", "This is proposalContent")}
            size="small">createProposal</Button>
        </div>

        <div className={styles.label}>
          <p>getNumberOfTotalProposer</p>
          {number_of_total_proposer}
        </div>
        
        <div className={styles.label}>
          <p>createProposer</p>
          {proposer_name} <br />
          {proposer_address}
        </div>

        <div className={styles.label}>
          <p>createProposal</p>
          {proposal_by} <br />
          {proposal_title} <br />
          {proposal_content}
        </div>
        
      </div>
    );
  }
}
