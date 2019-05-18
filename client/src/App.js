import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Wallet from "./components/Wallet/index.js";
import Project from "./components/Project/index.js";  // Load Project components
import Instructions from "./components/Instructions/index.js";
import { Loader, Button, Card, Input, Heading } from 'rimble-ui';

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';

class App extends Component {
  // state = {
  //   storageValue: 0,
  //   web3: null,
  //   accounts: null,
  //   contract: null,
  //   proposer_name: "",
  //   proposer_address: "",
  //   route: window.location.pathname.replace("/","")
  // };

  constructor(props) {
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      route: window.location.pathname.replace("/",""),

      /////// Added state
      proposer_name: '',
      proposer_address: '',
      value: '',
      valueOfProposerAddress: '',

      /////// List of result of executing createProposer function 
      proposer_name_list: [],
      proposer_address_list: [],

      //////
      proposer_id: '',
      valueOfProposerId: '',

      ////// Proposal
      proposal_by: '',
      proposal_title: '',
      proposal_content: '',
      proposal_voting_count: '',
      adopt_status: '',
      //adopt_status: false,

      valueOfProposalBy: '',
      valueOfProposalTitle: '',
      valueOfProposalContent: '',
      valueOfProposalVotingCount: '',
      
      proposal_by_list: [],
      proposal_title_list: [],
      proposal_content_list: [],
      proposal_voting_count_list: [],
      adopt_status_list: [],

      ////// Budget
      budget: 0,
      asking_price_of_budget: 0,

      valueOfAskingPriceOfBudget: '',

      budget_list: [],
      asking_price_of_budget_list: [],

      ////// Using Budget
      proposal_id_of_using_budget: '',
      token_of_using_budget: '',
      valueOfProposalIdOfUsingBudget: '',
      valueOfTokenOfUsingBudget: '',
      remaining_budget: 0,

      ////// newVoting
      new_voting_proposal_id: 0,
      valueOfNewVotingProposerId: 0,

      ////// votingStatus
      voting_status_proposal_id: 0,
      valueOfVotingStatusProposerId: 0,

      ////// OrganizationToken
      valueOfMintBy: '',
      valueOfMintToken: '',
      value_of_mint_by: '',
      value_of_mint_token: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleInputProposerAddress = this.handleInputProposerAddress.bind(this);
    this.send = this.send.bind(this);

    this.handleInputGetProposer = this.handleInputGetProposer.bind(this);
    this.sendGetProposer = this.sendGetProposer.bind(this);

    this.handleInputProposalBy = this.handleInputProposalBy.bind(this);
    this.handleInputProposalTitle = this.handleInputProposalTitle.bind(this);
    this.handleInputProposalContent = this.handleInputProposalContent.bind(this);
    this.handleInputProposalVotingCount = this.handleInputProposalVotingCount.bind(this);
    this.handleInputAskingPriceOfBudget = this.handleInputAskingPriceOfBudget.bind(this);
    this.sendCreateProposal = this.sendCreateProposal.bind(this);

    this.handleInputProposalIdOfUsingBudget = this.handleInputProposalIdOfUsingBudget.bind(this);    
    this.handleInputTokenOfUsingBudget = this.handleInputTokenOfUsingBudget.bind(this);

    this.handleInputNewVoting = this.handleInputNewVoting.bind(this);
    this.sendNewVoting = this.sendNewVoting.bind(this);

    this.handleInputVotingStatus = this.handleInputVotingStatus.bind(this);
    this.sendVotingStatus = this.sendVotingStatus.bind(this);

    this.handleInputMintBy = this.handleInputMintBy.bind(this);
    this.handleInputMintToken = this.handleInputMintToken.bind(this);
  }



  ////// New
  // handleInput(event) {
  //   let value = event.target.value; 
  //   this.setState({ value: value });  // { "value": value } 
  // }

  ////// Oridinal
  handleInput({ target: { value } }) {
    this.setState({ value: value });  // { "value": value } 
    console.log("=== [handleInput]： value ===", value);
  }

  handleInputProposerAddress({ target: { value } }) {
    this.setState({ valueOfProposerAddress: value });
    console.log("=== [handleInputProposerAddress]： valueOfProposerAddress ===", value); 
  }

  send = async (_proposerName, _proposerAddress) => {
    const { project, accounts, value, valueOfProposerAddress, proposer_name_list, proposer_address_list } = this.state;

    this.setState({
      proposer_name: value,
      proposer_address: valueOfProposerAddress,
      value: '',
      valueOfProposerAddress: ''
    });
    console.log("=== valueOfProposerAddress ===", valueOfProposerAddress)

    const response_1 = await project.methods.createProposer(value, valueOfProposerAddress).send({ from: accounts[0] })
    console.log('=== response of createProposer function ===', response_1);

    const proposerId = await project.methods.getProposerId().call();
    console.log('=== response of getProposerId function ===', proposerId);
        
    const response_2 = await project.methods.saveProposer(proposerId).send({ from: accounts[0] });
    console.log('=== response of saveProposer function ===', response_2);

    /////// Update state with the result.
    this.setState({ proposer_name: value });
    this.setState({ proposer_address: valueOfProposerAddress });

    /////// List of result of executing createProposer function 
    this.state.proposer_name_list.push(value);                                  // Push to this.state.proposer_name_list
    this.setState({ proposer_name_list: this.state.proposer_name_list });       // Save this.state.proposer_name_list which is pushed
    this.state.proposer_address_list.push(valueOfProposerAddress);              // Push to this.state.proposer_address_list
    this.setState({ proposer_address_list: this.state.proposer_address_list }); // Save this.state.proposer_address_list which is pushed
  }  

  handleInputGetProposer({ target: { value } }) {
    this.setState({ valueOfProposerId: value });
    console.log("=== [handleInputGetProposer]： value ===", value); 
  }

  sendGetProposer = async (_proposerId) => {
    const { project, accounts, value } = this.state;

    this.setState({
      proposer_id: value,
      valueOfProposerId: '',
    });

    const response = await project.methods.getProposer(value).call();
    //const response = await project.methods.getProposer(value).send({ from: accounts[0] })

    console.log('=== response of getProposer function ===', response);
    console.log('=== response of getProposer function（response._proposerName） ===', response._proposerName);
    console.log('=== response of getProposer function（response._proposerAddress） ===', response._proposerAddress);    

    /////// Update state with the result.
    this.setState({ proposer_id: Number(value) });
    this.setState({ proposer_name_call: response._proposerName });
    this.setState({ proposer_address_call: response._proposerAddress });
  }  

  handleInputProposalBy({ target: { value } }) {
    this.setState({ valueOfProposalBy: value });
  }

  handleInputProposalTitle({ target: { value } }) {
    this.setState({ valueOfProposalTitle: value });
  }

  handleInputProposalContent({ target: { value } }) {
    this.setState({ valueOfProposalContent: value });
  }

  handleInputProposalVotingCount({ target: { value } }) {
    this.setState({ valueOfProposalVotingCount: value });
  }

  handleInputAskingPriceOfBudget({ target: { value } }) {
    this.setState({ valueOfAskingPriceOfBudget: value });
  }

  sendCreateProposal = async (_proposalBy, _proposalTitle, _proposalContent, _votingCountOfProposal, _askingPriceOfBudget) => {
    const { project, organization_token, accounts, proposal_by, proposal_title, proposal_content, valueOfProposalBy, valueOfProposalTitle, valueOfProposalContent, valueOfProposalVotingCount, valueOfAskingPriceOfBudget } = this.state;

    const response_1 = await project.methods.createProposal(valueOfProposalBy, valueOfProposalTitle, valueOfProposalContent, valueOfProposalVotingCount).send({ from: accounts[0] })

    const proposalId = await project.methods.getProposalId().call();
        
    const response_2 = await project.methods.saveProposal(proposalId).send({ from: accounts[0] });

    const response_3 =  await project.methods.createAskingPriceOfBudget(proposalId, valueOfAskingPriceOfBudget).send({ from: accounts[0] });

    switch(response_2.events.SaveProposal.returnValues.adoptStatus) {
      case true:
        this.setState({ adopt_status: 'Adopted' });
        break;
      case false:
        this.setState({ adopt_status: 'Not adopted' });
        break;
    }

    const response_4 = await organization_token.methods.transfer(valueOfProposalBy, valueOfAskingPriceOfBudget).send({ from: accounts[0] });
    //const response_4 = await organization_token.methods.mintToken(valueOfProposalBy, valueOfAskingPriceOfBudget).send({ from: accounts[0] });

    const quantityOfProvidedToken = response_4.events.Transfer.returnValues.value;

    const response_5 =  await project.methods.depositToBudget(proposalId, quantityOfProvidedToken).send({ from: accounts[0] });

    console.log('=== response of createProposal function ===', response_1);  // Debug
    console.log('=== response of saveProposal function ===', response_2);  // Debug
    console.log('=== response of createAskingPriceOfBudget function ===', response_3);  // Debug
    console.log('=== response of mintToken function ===', response_4);  // Debug 
    console.log('=== response of depositToBudget function ===', response_5);  // Debug    

    console.log('=== response of adoptStatus of saveProposal function ===', response_2.events.SaveProposal.returnValues.adoptStatus);  // Debug
    console.log('=== response of budget of saveProposal function ===', response_2.events.SaveProposal.returnValues.budget);  // Debug
    console.log('=== response of budget of createAskingPriceOfBudget function ===', response_3.events.CreateAskingPriceOfBudget.returnValues.askingPriceOfBudget);  // Debug

    console.log('=== response of transactionHash of saveProposal function ===', response_2.transactionHash);  // Debug


    /////// Update state with the result.
    //this.setState({ proposal_by: valueOfProposalBy });
    //this.setState({ proposal_title: valueOfProposalTitle });
    //this.setState({ proposal_content: valueOfProposalContent });
    this.setState({
      proposal_by: valueOfProposalBy,
      proposal_title: valueOfProposalTitle,
      proposal_content: valueOfProposalContent,
      proposal_voting_count: valueOfProposalVotingCount,
      budget: quantityOfProvidedToken,
      asking_price_of_budget: valueOfAskingPriceOfBudget,

      valueOfProposalBy: '',
      valueOfProposalTitle: '',
      valueOfProposalContent: '',
      valueOfProposalVotingCount: '',
      valueOfAskingPriceOfBudget: ''
    });

    /////// List of result of executing createProposer function 
    this.state.proposal_by_list.push(valueOfProposalBy);                                  // Push to this.state.proposer_name_list
    this.setState({ proposal_by_list: this.state.proposal_by_list });       // Save this.state.proposer_name_list which is pushed
    this.state.proposal_title_list.push(valueOfProposalTitle);              // Push to this.state.proposer_address_list
    this.setState({ proposal_title_list: this.state.proposal_title_list }); // Save this.state.proposer_address_list which is pushed
    this.state.proposal_content_list.push(valueOfProposalContent);              // Push to this.state.proposer_address_list
    this.setState({ proposal_content_list: this.state.proposal_content_list }); // Save this.state.proposer_address_list which is pushed
    this.state.proposal_voting_count_list.push(valueOfProposalVotingCount);
    this.setState({ proposal_voting_count_list: this.state.proposal_voting_count_list });
    this.state.adopt_status_list.push(this.state.adopt_status);
    this.setState({ adopt_status_list: this.state.adopt_status_list });
    this.state.budget_list.push(quantityOfProvidedToken);
    this.setState({ budget_list: this.state.budget_list });
    this.state.asking_price_of_budget_list.push(response_3.events.CreateAskingPriceOfBudget.returnValues.askingPriceOfBudget);
    this.setState({ asking_price_of_budget_list: this.state.asking_price_of_budget_list });
  }


  handleInputProposalIdOfUsingBudget({ target: { value } }) {
    this.setState({ valueOfProposalIdOfUsingBudget: Number(value) });
  }

  handleInputTokenOfUsingBudget({ target: { value } }) {
    this.setState({ valueOfTokenOfUsingBudget: Number(value) });
  }

  sendUsingBudget = async (_proposalId, _budgetNeeded) => {
    const { project, accounts, proposal_id_of_using_budget, token_of_using_budget, valueOfProposalIdOfUsingBudget, valueOfTokenOfUsingBudget } = this.state;
    
    const response = await project.methods.usingBudget(valueOfProposalIdOfUsingBudget, valueOfTokenOfUsingBudget).send({ from: accounts[0] });
    console.log('=== response of usingBudget function ===', response);  // Debug

    this.setState({
      proposal_id_of_using_budget: Number(valueOfProposalIdOfUsingBudget),
      token_of_using_budget: Number(valueOfTokenOfUsingBudget),
      valueOfProposalIdOfUsingBudget: 0,
      valueOfTokenOfUsingBudget: 0,
    });


    const event = response.events.UsingBudget.returnValues.remainingBudget
    console.log('=== remainingBudget ===', event);  // Debug

    this.setState({
      remaining_budget: event
    });

  }


  handleInputNewVoting({ target: { value } }) {
    this.setState({ valueOfNewVotingProposerId: Number(value) });
  }

  sendNewVoting = async (_proposalId) => {
    const { project, accounts, new_voting_proposal_id, valueOfNewVotingProposerId } = this.state;
    
    const response = await project.methods.newVoting(valueOfNewVotingProposerId).send({ from: accounts[0] });
    console.log('=== response of newVoting function ===', response);  // Debug

    this.setState({
      new_voting_proposal_id: Number(valueOfNewVotingProposerId),
      valueOfNewVotingProposerId: 0,
    });
  }


  handleInputVotingStatus({ target: { value } }) {
    this.setState({ valueOfVotingStatusProposerId: Number(value) });
  }

  sendVotingStatus = async (_proposalId) => {
    const { project, accounts, voting_status_proposal_id, valueOfVotingStatusProposerId } = this.state;
    
    const response = await project.methods.votingStatus(valueOfVotingStatusProposerId).call();
    console.log('=== response of votingStatus function ===', response);  // Debug

    this.setState({
      voting_status_proposal_id: Number(valueOfVotingStatusProposerId),
      valueOfVotingStatusProposerId: 0,
      voting_status: response
    });
  }


  getTotalSupply = async () => {
    const { organization_token } = this.state;
    const response = await organization_token.methods.totalSupply().call();
    console.log('=== response of totalSupply function ===', response);

    this.setState({ total_supply: response });
  };

  getBalanceOf = async () => {
    const { organization_token } = this.state;

    ///// Import Web3 from /utils/getWeb3.js
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const _ownerAddress = accounts[0]

    const response = await organization_token.methods.balanceOf(_ownerAddress).call();

    // Update state with the result.
    this.setState({ balance_of: response });
  };

  ////// Send MintToken function
  handleInputMintBy({ target: { value } }) {
    this.setState({ valueOfMintBy: value });
  }

  handleInputMintToken({ target: { value } }) {
    this.setState({ valueOfMintToken: value });
  }

  sendMintToken = async (to, value) => {
    const { organization_token, accounts, valueOfMintBy, valueOfMintToken } = this.state;

    const response = await organization_token.methods.mintToken(valueOfMintBy, valueOfMintToken).send({ from: accounts[0] })
    console.log('=== response of mintToken function ===', response);

    this.setState({
      valueOfMintBy: '',
      valueOfMintToken: '',
      value_of_mint_by: valueOfMintBy,
      value_of_mint_token: valueOfMintToken
    });
  }


  // send() {
  //   const { value } = this.state;
  //   this.setState({
  //     value: '',
  //     proposer_name: value,
  //     proposer_address: ''
  //   });
  //   console.log("send called!");
  // }  






  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
    let Counter = {};
    let Wallet = {};
    let Project = {};
    let OrganizationToken = {};
    try {
      // Counter = require("../../contracts/Counter.sol");
      // Wallet = require("../../contracts/Wallet.sol");
      // Project = require("../../contracts/Propose.sol");
      Counter = require("./contracts/Counter.json");
      Wallet = require("./contracts/Wallet.json");
      Project = require("./contracts/Propose.json");  // Load ABI of contract of Propose
      OrganizationToken = require("./contracts/OrganizationToken.json");  // Load ABI of contract of OrganizationToken
    } catch (e) {
      console.log(e);
    }
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];
        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        let instance = null;
        let instanceWallet = null;
        let instanceProject = null;
        let instanceOrganizationToken = null;  // Define variable of instanceOrganizationToken
        let deployedNetwork = null;
        if (Counter.networks) {
          deployedNetwork = Counter.networks[networkId.toString()];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              Counter.abi,
              deployedNetwork && deployedNetwork.address,
            );
            //console.log('=== instance ===', instance);
          }
        }
        if (Wallet.networks) {
          deployedNetwork = Wallet.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceWallet = new web3.eth.Contract(
              Wallet.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Project.networks) {
          deployedNetwork = Project.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceProject = new web3.eth.Contract(
              Project.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceProject ===', instanceProject);
          }
        }
        if (OrganizationToken.networks) {
          deployedNetwork = OrganizationToken.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceOrganizationToken = new web3.eth.Contract(
              OrganizationToken.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceOrganizationToken ===', instanceOrganizationToken);
          }
        }
        if (instance || instanceWallet || instanceProject || instanceOrganizationToken) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, contract: instance, wallet: instanceWallet, project: instanceProject, organization_token: instanceOrganizationToken }, () => {
              this.refreshValues(instance, instanceWallet, instanceProject, instanceOrganizationToken);
              setInterval(() => {
                this.refreshValues(instance, instanceWallet, instanceProject, instanceOrganizationToken);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instance, instanceWallet, instanceProject, instanceOrganizationToken) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
    if (instanceProject) {
      console.log('Title');
    }
    if (instanceOrganizationToken) {
      console.log('refreshValues of instanceOrganizationToken');
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  createProposer = async (_proposerName, _proposerAddress) => {
    const { project, accounts } = this.state;
    const response = await project.methods.createProposer(_proposerName, _proposerAddress).send({ from: accounts[0] })
    console.log('=== response of createProposer function ===', response);

    // Update state with the result.
    this.setState({ proposer_name: _proposerName });
    this.setState({ proposer_address: _proposerAddress });
  }

  /**************** Original send finction *****************/
  // send = async (_proposerName, _proposerAddress) => {
  //   const { project, accounts, value, valueOfProposerAddress } = this.state;
  //   //const address = "0x51a3f1892fd8666bba10a610b6b1ed6397f0d313"   // Replace constant with variable of valueOfProposerAddress
  //   this.setState({
  //     value: '',
  //     valueOfProposerAddress: '',
  //     proposer_name: value,
  //     proposer_address: valueOfProposerAddress
  //     //proposer_address: address
  //   });
  //   console.log("send called!");
  //   console.log("=== valueOfProposerAddress ===", valueOfProposerAddress)   // Result: undefined

  //   const response = await project.methods.createProposer(this.state.proposer_name, this.state.proposer_address).send({ from: accounts[0] })
  //   //const response = await project.methods.createProposer(this.state.proposer_name, address).send({ from: accounts[0] })
  //   console.log('=== response of createProposer function ===', response);

  //   // Update state with the result.
  //   this.setState({ proposer_name: value });
  //   this.setState({ proposer_address: valueOfProposerAddress });
  //   //this.setState({ proposer_address: address });
  // }  

  createProposal = async (_proposalBy, _proposalTitle, _proposalContent) => {
    const { project, accounts } = this.state;
    const response = await project.methods.createProposal(_proposalBy, _proposalTitle, _proposalContent).send({ from: accounts[0] })
    console.log('=== response of createProposal function ===', response);

    // Update state with the result.
    this.setState({ proposal_by: _proposalBy });
    this.setState({ proposal_title: _proposalTitle });
    this.setState({ proposal_content: _proposalContent });
  }

  getNumberOfTotalProposer = async () => {
    const { project } = this.state;
    //const response = 0;
    
    // try {
    //     const response = await project.methods.getNumberOfTotalProposer().call();
    // } catch {
    //     console.log('null');
    // }
    const response = await project.methods.getNumberOfTotalProposer().call();
    console.log('=== response of getNumberOfTotalProposer function ===', response);

    // Update state with the result.
    this.setState({ number_of_total_proposer: response });
  };  

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name={instructionsKey} accounts={this.state.accounts} />
      </div>
    );
  }

  renderBody() {
    const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state;
    const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled) ? "upgrade-auto" : "upgrade";
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {this.state.web3 && !this.state.contract && (
          this.renderDeployCheck('counter')
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>Counter Contract is good to Go!</h1>
            <p>Interact with your contract on the right.</p>
            <p> You can see your account onfo on the left </p>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <CounterUI
                decrease={this.decreaseCount}
                increase={this.increaseCount}
                {...this.state} />
            </div>
            {this.state.balance < 0.1 && (
              <Instructions
                ganacheAccounts={ganacheAccounts}
                name="metamask"
                accounts={accounts} />
            )}
            {this.state.balance >= 0.1 && (
              <Instructions
                ganacheAccounts={this.state.ganacheAccounts}
                name={updgradeCommand}
                accounts={accounts} />
            )}
          </div>
        )}
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="setup" accounts={this.state.accounts} />
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.wrapper}>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="faq" accounts={this.state.accounts} />
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.wallet && (
        this.renderDeployCheck('evm')
      )}
      {this.state.web3 && this.state.wallet && (
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account onfo on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <Wallet
              renounce={this.renounceOwnership}
              {...this.state} />
          </div>
          <Instructions
            ganacheAccounts={this.state.ganacheAccounts}
            name="evm" accounts={this.state.accounts} />
        </div>
      )}
      </div>
    );
  }

  renderProject() {
    const { project, organization_token, number_of_total_proposer, proposer_name, proposer_address, proposal_by, proposal_title, proposal_content, proposal_voting_count, adopt_status, budget, asking_price_of_budget, remaining_budget, proposer_name_list, proposer_address_list, proposer_id, proposer_name_call, proposer_address_call, proposal_by_list, proposal_title_list, proposal_content_list, proposal_voting_count_list, voting_status, adopt_status_list, budget_list, asking_price_of_budget_list, total_supply, balance_of } = this.state;

    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.project && (
        this.renderDeployCheck('project')
      )}
      {this.state.web3 && this.state.project && (
        <div className={styles.contracts}>
          <h1>Project Contract is good to Go!</h1>
          <div className={styles.widgets}>
            <Project
              getNumberOfTotalProposer={this.getNumberOfTotalProposer}
              createProposer={this.createProposer}
              createProposal={this.createProposal}
              {...this.state} />
          </div>

          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <p>Proposer name</p>
              <input type="text" value={this.state.value} onChange={this.handleInput} />

              <p>Proposer address</p>
              <input type="text" value={this.state.valueOfProposerAddress} onChange={this.handleInputProposerAddress} />

              <Button onClick={this.send}>SEND（createProposer）</Button>
            </Card>
          </div>

          <div className={styles.widgets}>
            {this.state.proposer_name_list.map( (proposer_name_list, i) => {
              return (
                <Card width={'420px'} bg="primary">
                  <ul>
                    <li key={i}>{proposer_name_list}</li>
                    <li key={i}>{proposer_address_list}</li>
                  </ul>
                </Card>
              )
            })}
          </div>


          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <p>Proposer id</p>
              <input type="text" value={this.state.valueOfProposerId} onChange={this.handleInputGetProposer} />

              <Button onClick={this.sendGetProposer}>SEND（getProposer）</Button>
            </Card>
          </div>

          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              {proposer_name_call}
              {proposer_address_call}
            </Card>
          </div>


          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <p>Proposer's address of proposal</p>
              <input type="text" value={this.state.valueOfProposalBy} onChange={this.handleInputProposalBy} />

              <p>Proposal Title</p>
              <input type="text" value={this.state.valueOfProposalTitle} onChange={this.handleInputProposalTitle} />

              <p>Proposal Content</p>
              <input type="text" value={this.state.valueOfProposalContent} onChange={this.handleInputProposalContent} />

              <p>Proposal Voting Count</p>
              <input type="text" value={this.state.valueOfProposalVotingCount} onChange={this.handleInputProposalVotingCount} />

              <p>Asking Price of Budget of this Proposal</p>
              <input type="text" value={this.state.valueOfAskingPriceOfBudget} onChange={this.handleInputAskingPriceOfBudget} />

              <Button onClick={this.sendCreateProposal}>SEND（createProposal）</Button>
            </Card>
          </div>

          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <h3>Recent Proposal</h3>
              <ul>
                <li>{ proposal_by }</li>
                <li>{ proposal_title }</li>
                <li>{ proposal_content }</li>
                <li>{ proposal_voting_count }</li>
                <li>{ adopt_status }</li>
                <li>{ budget }</li>
                <li>Asking Price of Budget：{ asking_price_of_budget }</li>
              </ul>
            </Card>
          </div>

          <div className={styles.widgets}>
            {this.state.proposal_by_list.map( (proposal_by_list, i) => {
              return (
                <Card width={'420px'} bg="primary">
                  <h3>Proposal Index (Include past proposal)</h3>
                  <ul>
                    <li key={i}>{proposal_by_list}</li>
                    <li key={i}>{proposal_title_list}</li>
                    <li key={i}>{proposal_content_list}</li>
                    <li key={i}>{proposal_voting_count_list}</li>
                    <li key={i}>{ adopt_status_list }</li>
                    <li key={i}>{ budget_list }</li>
                    <li key={i}>{ asking_price_of_budget_list }</li>
                  </ul>
                </Card>
              )
            })}
          </div>


          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <h3>New Voting</h3>

              <p>Proposal Id which you want voting</p>
              <input type="text" value={this.state.valueOfNewVotingProposerId} onChange={this.handleInputNewVoting} />

              <Button onClick={this.sendNewVoting}>SEND（newVoting function）</Button>
            </Card>
          </div>

          <div className={styles.widgets}>
            <Card width={'420px'} bg="primary">
              <h3>Voting Status of Proposal Id which you want to know</h3>
              <input type="text" value={this.state.valueOfVotingStatusProposerId} onChange={this.handleInputVotingStatus} />

              <Button onClick={this.sendVotingStatus}>SEND（votingStatus function）</Button>

              <hr />

              <h3>Voting Status of Proposal which you want to know</h3>
              {voting_status}
            </Card>
          </div>



          <h1>OrganaizationToken Contract is good to Go!</h1>

          <Card width={'420px'} bg="primary">
            <div className={styles.widgets}>
              <p>Total Supply</p>

              <Button onClick={this.getTotalSupply}>Get Total Supply</Button>

              <br />

              {total_supply}
            </div>
          </Card>

          <Card width={'420px'} bg="primary">
            <div className={styles.widgets}>
              <p>Balance</p>

              <Button onClick={this.getBalanceOf}>Get Balance</Button>

              {balance_of}
            </div>
          </Card>

          <Card width={'420px'} bg="primary">
            <div className={styles.widgets}>
              <p>Mint Token</p> 

              <p>To</p>
              <Input type="text" value={this.state.valueOfMintBy} onChange={this.handleInputMintBy} />

              <p>Value of minting token</p>
              <Input type="text" value={this.state.valueOfMintToken} onChange={this.handleInputMintToken} />

              <Button onClick={this.sendMintToken}>Mint Token</Button>
            </div>
          </Card>

          <Card width={'420px'} bg="primary">
            <div className={styles.widgets}>
              <p>Burn Token</p>

              <Button onClick={this.sendBurnToken}>Burn Token</Button>
            </div>
          </Card>

          <Card width={'420px'} bg="primary">
            <div className={styles.widgets}>
              <h3>Proposer of Proposal</h3><br />
              <p>{ proposal_by }</p>

              <h3>Asking Price of Token</h3><br />
              <p>{ asking_price_of_budget }</p>

              <h3>Provided Token</h3><br />
              <p>{ budget }</p>
            </div>
            <div>
              <hr />
              <p>Budget Status</p>
              <Input type="text" value={this.state.valueOfBudgetStatus} onChange={this.handleInputBudgetStatus} />

              <Button onClick={this.callBudgetStatus}>Get Budget Status</Button>              
            </div>
          </Card>

          <Card width={'420px'} bg="primary">
            <Heading.h2>Using budget</Heading.h2>

            <div className={styles.widgets}>
              <h3>Who does it execute? (executer's address)</h3><br />
              <Input type="text" value={this.state.valueOfBudgetStatus} onChange={this.handleInputBudgetStatus} />
            </div>

            <hr />

            <div className={styles.widgets}>
              <h3>What is purpose?</h3><br />
              <Input type="text" value={this.state.valueOfBudgetStatus} onChange={this.handleInputBudgetStatus} />
            </div>

            <hr / >

            <div className={styles.widgets}>
              <h3>Which Proposal? (Proposal Id)</h3><br />
              <Input type="text" value={this.state.valueOfProposalIdOfUsingBudget} onChange={this.handleInputProposalIdOfUsingBudget} />
            </div>

            <hr />

            <div className={styles.widgets}>
              <h3>How much do you need Token（OZT）of budget?</h3><br />
              <Input type="text" value={this.state.valueOfTokenOfUsingBudget} onChange={this.handleInputTokenOfUsingBudget} />
            </div>

            <Button onClick={this.sendUsingBudget}>Send Using Budget</Button>              

            <hr />

            <div className={styles.widgets}>
              <h3>Remaining budget of this proposal</h3>
              <p>{ remaining_budget }</p>
            </div>

          </Card>
        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'counter' && this.renderBody()}
          {this.state.route === 'evm' && this.renderEVM()}
          {/* {this.state.route === 'faq' && this.renderFAQ()} */}
          {this.state.route === 'project' && this.renderProject()}
        <Footer />
      </div>
    );
  }
}

export default App;
