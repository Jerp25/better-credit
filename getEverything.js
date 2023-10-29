function getAccounts() {
    var req = $.ajax({
        type: "GET",
        url: "/getAccounts.php",
        async: false,
    });
    
    var response = JSON.parse(req.responseText);

    return response['Accounts']
}

function getTransactions() {

    var req = $.ajax({
        type: "GET",
        url: "/getTransactions.php",
        async: false,
    });
    
    var response = JSON.parse(req.responseText);
    
    return response['Transactions']
}

function getAverageCreditScore(accounts) {
    cumulativeTotal = 0
    for (var i = 0; i < accounts.length; i++) {
        cumulativeTotal += Number(accounts[i]['creditScore'])
    }
    return (Math.round(cumulativeTotal/accounts.length * 100) / 100).toString()
}

function getAverageRiskFactor(accounts) {
    cumulativeTotal = 0
    for (var i = 0; i < accounts.length; i++) {
        cumulativeTotal += Number(accounts[i]['riskScore'])
    }
    return (Math.round(cumulativeTotal/accounts.length * 100) / 100).toString()
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) 
    {
        return parts.pop().split(';').shift();
    }
  }

function getUserCreditScore(accounts) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i]['accountId'] == getCookie('userid')) {
            return accounts[i]['creditScore']
        }
    }
    return 0
}

function getUserBalance(){
    let accounts = getAccounts()
    console.log(accounts)
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i]['accountId'] == getCookie('userid')) {
            return [accounts[i]['balance'],accounts[i]['creditLimit']]
        }
    }
}
function getUserRiskScore(accounts) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i]['accountId'] == getCookie('userid')) {
            
            return accounts[i]['riskScore']
        }
    }
    return 0
}

function getDebitCreditPie(transactions) {
    debitCredit = [0, 0]
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i]['creditDebitIndicator'] == "Debit") {
            debitCredit[0] += Number(transactions[i]["amount"])
        } else {
            debitCredit[1] += Number(transactions[i]["amount"])
        }
    }
    return [Math.abs(debitCredit[0]), Math.abs(debitCredit[1])]
}

function getProportions(transactions){

    var response = transactions
    var credDict = {"Shopping": 0,
    "Auto & Transport": 0,
    "Entertainment": 0,
    "Food & Dining": 0,
    "Education": 0

    };
    var debDict = {"Shopping": 0,
    "Auto & Transport": 0,
    "Entertainment": 0,
    "Food & Dining": 0,
    "Education": 0};
    for(let i = 0; i < response.length; i++){
        if(response[i]["creditDebitIndicator"]=="Debit"){
          
            debDict[response[i]["merchant"]["category"]] += response[i]["amount"];

        }
        else{
           
            credDict[response[i]["merchant"]["category"]] += response[i]["amount"];
            console.log(credDict)
        }
    }

    return [debDict, credDict];
}





function getEverything() {
    let accounts = getAccounts()
    let transactions = getTransactions()
    
    let averageCreditScore = getAverageCreditScore(accounts)
    let averageRiskFactor = getAverageRiskFactor(accounts)
    let userCreditScore = getUserCreditScore(accounts)
    let userRiskScore = getUserRiskScore(accounts)
    let debitCredit = getDebitCreditPie(transactions)
    let debitCreditProportions = getProportions(transactions)
    


    return [averageCreditScore, averageRiskFactor, userCreditScore, userRiskScore, debitCredit, debitCreditProportions]
}



