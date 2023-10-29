
function getAccounts() {
    var req = $.ajax({
        type: "GET",
        url: "/getAccounts.php",
        async: false,
    });
    
    var response = JSON.parse(req.responseText);

    return response
}

function getAverageCreditScore() {
    accounts = getAccounts()['Accounts']
    cumulativeTotal = 0
    for (var i = 0; i < accounts.length; i++) {
        cumulativeTotal += Number(accounts[i]['creditScore'])
    }
    return (Math.round(cumulativeTotal/accounts.length * 100) / 100).toString()
}

function getAverageRiskFactor() {
    accounts = getAccounts()['Accounts']
    cumulativeTotal = 0
    for (var i = 0; i < accounts.length; i++) {
        cumulativeTotal += Number(accounts[i]['riskScore'])
    }
    return (Math.round(cumulativeTotal/accounts.length * 100) / 100).toString()
}