pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-solidity-2.1.1/contracts/math/SafeMath.sol";


contract Propose is Initializable {

    using SafeMath for uint256;

    //uint256 public proposerId;
    //uint256 public proposalId;

    struct Proposer {
        string proposerName;      // name of person who propose
        address proposerAddress;  // address of person who propose
        //mapping (uint256 => Proposal) proposals;  // proposals[index].proposals[uint256]
    }
    Proposer[] public proposers;  // e.g) proposers[index].proposerName


    struct Proposal {
        address proposalBy;
        string proposalTitle;
        string proposalContent;
        uint256 votingCountOfProposal;             // Count voting status of proposal
        //mapping (address => adoptState) adopts;  // After voting, whether proposal is adopted or not
        bool adoptStatus;                          // After voting, whether proposal is adopted or not
        mapping (uint => Budget) budgets;
        //uint256 budget;
        //uint256 askingPriceOfbudget;
    }
    Proposal[] public proposals;  // e.g) proposal[index].name

    //enum adoptState { Adopted, NowOnVotingTime, NotAdopted }  // Status of whether proposal is adopted or not

    struct Budget {
        uint256 budget;
        uint256 askingPriceOfBudget;
    }
    

    event SaveProposal(
        address indexed proposalBy, 
        string indexed proposalTitle, 
        string indexed proposalContent, 
        uint256 votingCountOfProposal,
        bool adoptStatus
        //uint256 budget,
        //uint256 askingPriceOfbudget
    );
    
    event CreateAskingPriceOfBudget (uint256 indexed askingPriceOfBudget);
    event DepositToBudget (uint256 indexed tokenFromAskingPrice);
    event UsingBudget (uint256 indexed remainingBudget);
    //event UsingBudget (uint256 currentBudget, uint256 budgetNeeded, uint256 indexed remainingBudget);


    //it keeps a count to demonstrate stage changes
    uint private countPropose;
    address private _owner;

    // function initialize(uint num) public initializer {
    //     _owner = msg.sender;
    //    countPropose = num;
    // }

    constructor () public {
        _owner = msg.sender;
    }

    /* @notice Check owner address */ 
    function owner() public view returns (address) {
        return _owner;
    }

    /* @notice Create new proposer */ 
    function createProposer(
        //uint256 _proposerId,
        string memory _proposerName,
        address _proposerAddress
        //string memory _proposalTitle,
        //string memory _proposalContent
    ) public returns (string memory, address) 
    {
        Proposer memory proposer = Proposer({
            //proposerId: _proposerId,
            proposerName: _proposerName,
            proposerAddress: _proposerAddress
            //proposalTitle: _proposalTitle,
            //proposalContent: _proposalContent
        });
        proposers.push(proposer);

        //emit CreateProposer(_proposerId, _proposerAddress, _name, _content);

        //return (_proposerName, _proposerAddress, _proposalTitle, _proposalContent);
        return (_proposerName, _proposerAddress);
    }



    /* @notice Save new proposer */
    function saveProposer(uint256 _proposerId) public returns (bool success) {
        Proposer storage proposer = proposers[_proposerId];
        //proposer.proposerId = _proposerId;
        proposer.proposerName = proposers[_proposerId].proposerName;
        proposer.proposerAddress = proposers[_proposerId].proposerAddress;
        //proposer.proposalTitle = proposers[_proposerId].proposalTitle;
        //proposer.proposalContent = proposers[_proposerId].proposalContent;

        return true;
    }


    /* @notice Call proposer */ 
    function getProposer(uint256 _proposerId) public view returns (string memory _proposerName, address _proposerAddress) {
        //Proposer storage proposer = proposers[_proposerId];
        Proposer memory proposer = proposers[_proposerId];

        _proposerName = proposers[_proposerId].proposerName;
        _proposerAddress = proposers[_proposerId].proposerAddress;

        return (_proposerName, _proposerAddress);
    }
    

    /* @notice Create new proposal */ 
    function createProposal(
        address _proposalBy,
        string memory _proposalTitle,
        string memory _proposalContent,
        uint256 _votingCountOfProposal
        //uint256 _askingPriceOfbudget
    ) public returns (address, string memory, string memory, uint256, bool) 
    {
        bool _adoptStatus = false; // Default value is NotAdopt 

        Proposal memory proposal = Proposal({
            proposalBy: _proposalBy,
            proposalTitle: _proposalTitle,
            proposalContent: _proposalContent,
            votingCountOfProposal: _votingCountOfProposal,
            adoptStatus: _adoptStatus                      // Default value is NotAdopt
            //adoptState: adopts[_proposalBy].NotAdopted   // Default value is NotAdopt
            //budget: _budget,                             // Default value is 0
            //askingPriceOfbudget: _askingPriceOfbudget
        });
        proposals.push(proposal);

        return (_proposalBy, _proposalTitle, _proposalContent, _votingCountOfProposal, _adoptStatus);
        //return (_proposalBy, _proposalTitle, _proposalContent, _votingCountOfProposal, _adoptStatus, _budget, _askingPriceOfbudget);
    }

    /* @notice Save new proposal */
    function saveProposal(uint256 _proposalId) public returns (bool success) {
        Proposal storage proposal = proposals[_proposalId];
        proposal.proposalBy = proposals[_proposalId].proposalBy;
        proposal.proposalTitle = proposals[_proposalId].proposalTitle;
        proposal.proposalContent = proposals[_proposalId].proposalContent;
        proposal.votingCountOfProposal = proposals[_proposalId].votingCountOfProposal;
        proposal.adoptStatus = proposals[_proposalId].adoptStatus;  // Default value is NotAdopt
        //proposal.budget = proposals[_proposalId].budget;
        //proposal.askingPriceOfbudget = proposals[_proposalId].askingPriceOfbudget;

        emit SaveProposal(
            proposals[_proposalId].proposalBy, 
            proposals[_proposalId].proposalTitle,
            proposals[_proposalId].proposalContent,
            proposals[_proposalId].votingCountOfProposal,
            proposals[_proposalId].adoptStatus
            //proposals[_proposalId].budget,
            //proposals[_proposalId].askingPriceOfbudget
        );

        return true;
    }


    /* @notice Index of all of proposals */
    function indexProposals() public view returns(uint[] memory) {
        uint[] memory result = new uint[](proposals.length);
        uint counter = 0;

        address a;

        for (uint i = 0; i < proposals.length; i++) {
            Proposal memory proposal = proposals[i];
            a = proposals[i].proposalBy;

            result[counter] = i;
            counter++;

            //result.push(a);  // In case it define variable by memory, we can't push
        }

        return result;
    }
    



    /* @notice Create new asking price of budget */ 
    function createAskingPriceOfBudget(
        uint256 _proposalId,
        uint256 _askingPriceOfBudget
    ) public returns (uint256) 
    {
        Budget storage budget = proposals[_proposalId].budgets[_proposalId];
        budget.askingPriceOfBudget = _askingPriceOfBudget;

        // Budget storage budget = Budget({
        //     askingPriceOfBudget: _askingPriceOfBudget
        // });

        emit CreateAskingPriceOfBudget(_askingPriceOfBudget);

        return (_askingPriceOfBudget);
    }


    function depositToBudget(uint256 _proposalId, uint256 _tokenFromAskingPrice) public returns (uint) {
        Budget storage budget = proposals[_proposalId].budgets[_proposalId];
        budget.budget = _tokenFromAskingPrice;

        emit DepositToBudget(_tokenFromAskingPrice);

        return _tokenFromAskingPrice;
    }
    

    function budgetStatus(uint256 _proposalId) view public returns(uint256 budget_status) {
        Budget storage budget = proposals[_proposalId].budgets[_proposalId];
        budget_status = budget.budget;
        
        return budget_status;
    }
    

    function usingBudget(
        //address _executer, 
        uint256 _proposalId, 
        //string _purpose,
        uint256 _budgetNeeded
    ) public returns(uint256) 
    {
        uint256 currentBudget;
        uint256 remainingBudget;

        Budget storage budget = proposals[_proposalId].budgets[_proposalId];
        currentBudget = budget.budget;
        remainingBudget = currentBudget.sub(_budgetNeeded);
        //remainingBudget = currentBudget - _budgetNeeded;

        // Save value of remaining buget
        budget.budget = remainingBudget;

        emit UsingBudget (remainingBudget);
        //emit UsingBudget (currentBudget, _budgetNeeded, remainingBudget);

        return remainingBudget;
        //return (currentBudget, _budgetNeeded, remainingBudget);
    }


    /* @notice Get proposerId */
    function getProposerId() public view returns (uint256 _proposerId) {
        return proposers.length - 1;
    }

    /* @notice Get number of total proposer */
    function getNumberOfTotalProposer() public view returns (uint) {
        return proposers.length;
    }


    /* @notice Get proposalId */
    function getProposalId() public view returns (uint256 _proposalId) {
        return proposals.length - 1;
    }

    /* @notice Get number of total proposal */
    function getNumberOfTotalProposal() public view returns (uint) {
        return proposals.length;
    }



    /* @notice Voting status of proposal (count of voting per proposal) */
    function votingStatus(uint256 _proposalId) public view returns (uint256) {
        Proposal memory proposal = proposals[_proposalId];
        //proposal.proposalBy = proposals[_proposalId].proposalBy;
        //proposal.proposalTitle = proposals[_proposalId].proposalTitle;
        //proposal.proposalContent = proposals[_proposalId].proposalContent;
        proposal.votingCountOfProposal = proposals[_proposalId].votingCountOfProposal;

        return proposal.votingCountOfProposal;
    }

    /* @notice New Voting (Who is voting) */
    function newVoting(uint256 _proposalId) public returns (bool) {
    
        uint currentVotingCount;

        currentVotingCount = votingStatus(_proposalId);

        // number of votes increase 1 depend on executing newVoting 
        currentVotingCount++;

        Proposal storage proposal = proposals[_proposalId];
        proposal.votingCountOfProposal = currentVotingCount;

        return true;
    }

}
