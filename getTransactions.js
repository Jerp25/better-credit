function getTransactions() {

    var req = $.ajax({
        type: "GET",
        url: "/getTransactions.php",
        async: false,
    });
    
    var response = JSON.parse(req.responseText);
    
    return response['Transactions']
}


function getDebitCreditPie() {
    transactions = getTransactions()
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