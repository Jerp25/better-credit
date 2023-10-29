function getProportions(){
    var req = $.ajax({
        type: "GET",
        url: "getTransactions.php",
        async: false
    });
    var response = JSON.parse(req.responseText);
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
    for(let i = 0; i < response["Transactions"].length; i++){
        if(response["Transactions"][i]["creditDebitIndicator"]=="Debit"){
            debDict[response["Transactions"][i]["merchant"]["category"]] += response["Transactions"][i]["amount"];
        }
        else{
            credDict[response["Transactions"][i]["merchant"]["category"]] += response["Transactions"][i]["amount"];
        }
    }

    return [debDict, credDict];
}
var transactions, dateOrder, amountOrder;
var listDiv;
var ordering = "3";
var success = true, declined = true;

$(document).ready( function() {
    var req = $.ajax({
        type: "GET",
        url: "/getTransactions.php",
        async: false,
    });

    var responce = JSON.parse(req.responseText);

    listDiv = document.getElementById("transactions-list");
    transactions = responce.Transactions;
    dateOrder = bubbleSort(transactions, true);
    amountOrder = bubbleSort(transactions, false);

    for (var i in dateOrder) {
        listDiv.appendChild(createTransaction(transactions[dateOrder[dateOrder.length-i-1]]));
    }
});

function order(value){
    console.log("ordering", value, success, declined);
    ordering = value
    switch(value) {
        case "1":
            listDiv.innerHTML = "";
            for (var i in amountOrder) {
                var transaction = transactions[amountOrder[i]];
                if (success && transaction.status == "Successful" || declined && transaction.status == "Declined") {
                    listDiv.appendChild(createTransaction(transaction));
                }
            }
            break;
        case "0":
            listDiv.innerHTML = "";
            for (var i in amountOrder) {
                var transaction = transactions[amountOrder[amountOrder.length-i-1]];
                if (success && transaction.status == "Successful" || declined && transaction.status == "Declined") {
                    listDiv.appendChild(createTransaction(transaction));
                }
            }
            break;
        case "3":
            listDiv.innerHTML = "";
            for (var i in dateOrder) {
                var transaction = transactions[dateOrder[i]];
                if (success && transaction.status == "Successful" || declined && transaction.status == "Declined") {
                    listDiv.appendChild(createTransaction(transaction));
                }
            }
            break;
        case "2":
            listDiv.innerHTML = "";
            for (var i in dateOrder) {
                var transaction=  transactions[dateOrder[dateOrder.length-i-1]];
                if (success && transaction.status == "Successful" || declined && transaction.status == "Declined") {
                    listDiv.appendChild(createTransaction(transaction));
                }
            }
            break;
    }
}

function toggleSuccess() {
    success = !success;
    order(ordering);
}

function toggleDeclined() {
    declined = !declined;
    order(ordering);
}


function bubbleSort(arr, date) { 
    var indexes = Array(arr.length).fill().map((x,i)=>i)
    for (var i = 0; i < arr.length; i++) { 
          for (var j = 0; j < (arr.length - i - 1); j++) { 
            val1 = (date) ? Date.parse(arr[indexes[j]].timestamp) : arr[indexes[j]].amount;
            val2 = (date) ? Date.parse(arr[indexes[j+1]].timestamp) : arr[indexes[j+1]].amount;
            if (val1 > val2) { 
                var temp = indexes[j];
                indexes[j] = indexes[j + 1]; 
                indexes[j + 1] = temp; 
            } 
        } 
    } 
    return indexes; 
} 

function createTransaction(transaction) {
    var success = (transaction.status == "Successful") ? "" : '<p style="color:red"> Declined ❌</p>'
    var div = document.createElement('div');
    div.innerHTML = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"> \
                    <div class="d-flex w-100 justify-content-between"> \
                        <h5 class="mb-1">'+transaction.merchant.category+' | '+transaction.merchant.name+' '+transaction.emoji+'</h5> \
                        <small class="text-muted mr-auto">'+transaction.timestamp+'</small> \
                    </div> \
                    <p class="mb-1">£'+transaction.amount+ ' (' + transaction.creditDebitIndicator + ')' +
                    success+'</p> \
                    <small class="text-muted">'+transaction.message+'</small> \
                    </a>';
    return div.firstChild;
}
