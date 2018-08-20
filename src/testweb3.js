const Web3 = require('web3')
//const web3 = new Web3('') // url to remote ethereum node. go to inurara.io and get an rpc node on main network
//const web3 = new Web3.providers.HttpProvider("http://localhost:8545") // url to remote ethereum node. go to inurara.io and get an rpc node on main network
//const provider = new Web3.providers.HttpProvider("http://localhost:8545");



var url = 'https://mainnet.infura.io/v3/9b914ee94b5049d2826fd7ce95c13879'


var provider = new Web3.providers.HttpProvider("http://localhost:8545")
web3 = new Web3(provider)

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "submissionId",
				"type": "uint256"
			}
		],
		"name": "FetchSubmission",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_bountyId",
				"type": "uint256"
			},
			{
				"name": "_submissionId",
				"type": "uint256"
			}
		],
		"name": "acceptSubmission",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_bountyAmount",
				"type": "uint256"
			}
		],
		"name": "createBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_bountyId",
				"type": "uint256"
			},
			{
				"name": "_body",
				"type": "string"
			}
		],
		"name": "createSubmission",
		"outputs": [
			{
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"name": "submissionId",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_bountyId",
				"type": "uint256"
			},
			{
				"name": "_submissionId",
				"type": "uint256"
			}
		],
		"name": "rejectSubmission",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "submissionId",
				"type": "uint256"
			}
		],
		"name": "AcceptSubmission",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "bountyCount",
				"type": "uint256"
			}
		],
		"name": "FetchAllBounty",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "submissionId",
				"type": "uint256"
			}
		],
		"name": "RejectSubmission",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "submissionId",
				"type": "uint256"
			}
		],
		"name": "CreateSubmission",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bountyId",
				"type": "uint256"
			}
		],
		"name": "CreateBounty",
		"type": "event"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bountyCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "BountyList",
		"outputs": [
			{
				"name": "bountyPoster",
				"type": "address"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "uint8"
			},
			{
				"name": "submissionCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_bountyId",
				"type": "uint256"
			}
		],
		"name": "fetchBounty",
		"outputs": [
			{
				"name": "bountyPoster",
				"type": "address"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "uint8"
			},
			{
				"name": "submissionCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_bountyId",
				"type": "uint256"
			},
			{
				"name": "_submissionId",
				"type": "uint256"
			}
		],
		"name": "fetchSubmission",
		"outputs": [
			{
				"name": "bountyId",
				"type": "uint256"
			},
			{
				"name": "submissionId",
				"type": "uint256"
			},
			{
				"name": "hunter",
				"type": "address"
			},
			{
				"name": "body",
				"type": "string"
			},
			{
				"name": "status",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const address = '0x9a9bc2289ef4e4df5970e87c012b3b64637169af' //contract address

const contract =  web3.eth.Contract(abi, address)

console.log(contracts)

// contract.getPasteEvents(
// 	'AllEvents', 
// 	{ 
// 		fromBlock: , 
// 		toBlock: 
// 	} , 
// 	(err, events) => { console.log(events.count) }
// )