var contractAddress
var tronWeb
var pay
var addresact


try {
  contractAddress = metacoinConfig.contractAddress
  tronWeb = new TronWeb(
      metacoinConfig.fullHost,
      metacoinConfig.fullHost,
      metacoinConfig.fullHost,
      metacoinConfig.privateKey
  )
} catch (err) {
  alert('The app looks not configured. Please run `npm run migrate`')
}

/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$("#Referral").val(window.location.hostname+'?ref=');

async function gettronweb(){ 
  if(await window.tronWeb && await window.tronWeb.defaultAddress.base58){
    localStorage.address = await window.tronWeb.defaultAddress.base58;
    if(localStorage.address != addresact) {
      // Store
      addresact = localStorage.address;
      // Retrieve
      console.log('actualizada '+addresact);
    } 
      // else {
      //   console.log(addresact);
      // }
  }
}

App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey: "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0",
  feeLimit: 100000000,
  callValue: 0,

  abi: [
	{
		"constant": true,
		"inputs": [],
		"name": "totalinvested",
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
		"inputs": [],
		"name": "totalInvestors",
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
		"inputs": [],
		"name": "totalwithdrawn",
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
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalInvested",
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
		"inputs": [],
		"name": "getTime",
		"outputs": [
			{
				"name": "",
				"type": "uint40"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "subtracttime",
		"outputs": [
			{
				"name": "",
				"type": "uint40"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalref",
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
				"type": "address"
			}
		],
		"name": "investors",
		"outputs": [
			{
				"name": "registered",
				"type": "bool"
			},
			{
				"name": "invested",
				"type": "uint256"
			},
			{
				"name": "withdrawn",
				"type": "uint256"
			},
			{
				"name": "totalRef",
				"type": "uint256"
			},
			{
				"name": "totalWithdrawable",
				"type": "uint256"
			},
			{
				"name": "initTime",
				"type": "uint40"
			},
			{
				"name": "ref",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balance2owner",
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
		"inputs": [],
		"name": "withdrawn",
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
		"inputs": [],
		"name": "currentuser",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "timepay",
		"outputs": [
			{
				"name": "",
				"type": "uint40"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_levelUp",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposits",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "profitowner",
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
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_invest",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	}
],


  init: async function () {

    this.accounts = [
      tronWeb.address.fromPrivateKey(metacoinConfig.privateKey)
    ]
    

    //if(window.tronWeb && window.tronWeb.ready && tronWeb.ready) {
    	let myContract = await tronWeb.contract().at(this.contractAddress);
	    let totalref = await myContract.totalref().call();

	    let conected = await tronWeb.isConnected();
	    console.log({conected});

	    var referido = getParameterByName('ref');

	    await gettronweb();
        var address = addresact;
        console.log({address});
	    let balance = await tronWeb.trx.getBalance(address);
	    $("#balance").text(balance/1000000);

	    let withdrawn = await myContract.withdrawn().call();
	    withdrawn = parseInt(withdrawn);
	    $("#withdwn").text(withdrawn/1000000);

	    let totalinvestedUser = await myContract.totalinvested().call();
	    totalinvestedUser = parseInt(totalinvestedUser);
	    $("#totalinvest").text(totalinvestedUser/1000000);

	    let timepay = await myContract.subtracttime().call();
	    
	    var payuser = (totalinvestedUser * 20 / 1000);
	    payuser = payuser / 86400;
	    payuser = (payuser * timepay) - withdrawn;
	    payuser = payuser + totalref;
	    payuser = payuser / 1000000;
	    payuser = payuser.toFixed(6);

	    $("#profit").text(payuser);

	    if(address == '') {
		  var locat = window.location+'?ref=';
		  $("#Referral").val(locat);
		}
	    else{
	      var locat = window.location.hostname+'?ref='+address;
	      $("#Referral").val(locat);
	    }
    //}
    
    this.accounts
    this.initData();
    this.bindEvents();
    //this.bindEventstwo();
  },

  
  initData: function () {
    var c = 0
    
    function reset() {
      c++;
      if (c == 2) {
        $("#loading").css({display: 'none'});
        $("#commit").attr('disabled', null);
      }
    }

    async function refrescar() {
      let myContract = await tronWeb.contract().at(this.contractAddress);
      // let withdrawn = await myContract.withdrawn().call();
      // withdrawn = parseInt(withdrawn);

      let totalref = await myContract.totalref().call();
      totalref = parseInt(totalref);

      let timepay = await myContract.subtracttime().call();

      // let totalinvestedUser = await myContract.totalinvested().call();
      // totalinvestedUser = parseInt(totalinvestedUser);

      await gettronweb();
	  var address = addresact;
	  console.log({address});
      let balance = await tronWeb.trx.getBalance(address);
      $("#balance").text(balance/1000000);

      let withdrawn = await myContract.withdrawn().call();
      withdrawn = parseInt(withdrawn);
      $("#withdwn").text(withdrawn/1000000);

      let totalinvestedUser = await myContract.totalinvested().call();
      totalinvestedUser = parseInt(totalinvestedUser);
      $("#totalinvest").text(totalinvestedUser/1000000);

      var payuser = (totalinvestedUser * 20 / 1000);
      payuser = payuser / 86400;
      payuser = (payuser * timepay);
      payuser = payuser + totalref;
      payuser = payuser / 1000000;
      pay = payuser;
      payuser = payuser.toFixed(6);

      $("#profit").text(payuser);

	    var referido = getParameterByName('ref');
		if(address == '') {
		  var locat = window.location+'?ref=';
		  $("#Referral").val(locat);
		}
	    else{
	      var locat = window.location.hostname+'?ref='+address;
	      $("#Referral").val(locat);
	    }
    }
    
    setInterval(refrescar, 5000);
    
  },

  deposit: async function() {
  	var that = this;
  	var referido = getParameterByName('ref');
    if(referido === ''){
       referido = this.contractAddress;
    };
 
  	const monto = parseInt($("#monto").val() || 0);
  	const montototal = monto * 1000000;
  	
  	$("#commit").attr('disabled', 'disabled')
  	
  	let myContract = await tronWeb.contract().at(this.contractAddress)
  	let getData = await myContract.deposits(referido, montototal).send({
	    feeLimit:100_000_000,
	    callValue:montototal,
  		tokenId:0,
  		tokenValue:0,
  		shouldPollResponse:true
  	});
    //console.log({getData});
    that.initData();
  },

  withdraw: async function () {
    var that = this;
    var profit = pay;
    
    if(profit > 0) {
    	let myContract = await tronWeb.contract().at(this.contractAddress);
	    let Data = await myContract.withdraw().send();
	    //console.log({Data});
	    that.initData();
	    // this.triggerContract('withdraw', [], function () {
	    //   that.initData();
	    // });
    }
    else {
	    alert('Your balance is insufficient to withdraw!');
		// alertify
		//   .alert("Your balance is insufficient to withdraw!", function(){
		//     alertify.message('OK');
		//   });
    }
  },

  transfer: function () {
    var that = this;
    var count = $("#dev_count").val() || 0;
    const to = this.accounts[1];
    const amount = parseInt(count);
    $("#loading").css({display: 'block'});
    $("#dev_count").val('')
    $("#commit").attr('disabled', 'disabled')
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();
    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: async function (methodName, args, callback) {
    let myContract = await tronWeb.contract().at(this.contractAddress)
    var callSend = 'send'
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
      }
    })
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.deposit();
    });
    $(document).on('click', '#withdraw', function () {
      that.withdraw();
    });
  },

  // bindEventstwo: function () {
  //   var that = this;
  //   $(document).on('click', '#withdraw', function () {
  //     that.withdraw();
  //   });
  // },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});