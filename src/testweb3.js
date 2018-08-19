const Web3 = require('web3')
const web3 = new Web3('') // url to remote ethereum node. go to inurara.io and get an rpc node on main network

    //const provider = new Web3.providers.HttpProvider("http://localhost:8545");


const abi = []

const address = '' //contract address

const contract = new web3.eth.Contract(abi, address)

console.log(contracts)

contract.getPasteEvents(
	'AllEvents', 
	{ 
		fromBlock: , 
		toBlock: 
	} , 
	(err, events) => { console.log(events.count) }
)