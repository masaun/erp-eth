const OrganizationToken = artifacts.require("./OrganizationToken.sol");

module.exports = function(deployer, network, accounts) {
    const name = "OrganizationToken";
    const symbol = "OZT";
    const decimals = 18;
    //const initSupply = 10000e18;
    const initSupply = web3.utils.toBN(100*(10**decimals));  // 100 ether
    
    return deployer.then(()=>{
        return deployer.deploy(
            OrganizationToken,
            name,
            symbol,
            decimals,
            initSupply
        );
    });
}
