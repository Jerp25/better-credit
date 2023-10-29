function getProportions(){
    document.cookie = "userid=70560991";

    var req = $.ajax({
        type: "GET",
        url: "getTransactions.php",
        async: false
    });
    //console.log(req.responseText)
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
            //console.log(typeof debDict[response["Transactions"][i]["category"]]);
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

$(document).ready( function() {

    document.cookie = "userid=70560991";

    var req = $.ajax({
        type: "GET",
        url: "/getTransactions.php",
        async: false,
    });

    var responce = JSON.parse(req.responseText);

    listDiv = document.getElementById("transactions-list");
    transactions = responce.Transactions;
    console.log(transactions);
    dateOrder = bubbleSort(transactions, true);
    console.log(transactions, dateOrder);
    amountOrder = bubbleSort(transactions, false);
    console.log(dateOrder, amountOrder);

    for (var i in dateOrder) {
        listDiv.appendChild(createTransaction(transactions[dateOrder[dateOrder.length-i-1]]));
    }
});

function order(value){
    console.log("order", value)
    switch(value) {
        case "1":
            console.log(listDiv)
            listDiv.innerHTML = "";
            for (var i in amountOrder) {
                listDiv.appendChild(createTransaction(transactions[amountOrder[i]]));
            }
            break;
        case "0":
            listDiv.innerHTML = "";
            for (var i in amountOrder) {
                listDiv.appendChild(createTransaction(transactions[amountOrder[amountOrder.length-i-1]]));
            }
            break;
        case "3":
            listDiv.innerHTML = "";
            for (var i in dateOrder) {
                listDiv.appendChild(createTransaction(transactions[dateOrder[i]]));
            }
            break;
        case "2":
            listDiv.innerHTML = "";
            for (var i in dateOrder) {
                listDiv.appendChild(createTransaction(transactions[dateOrder[dateOrder.length-i-1]]));
            }
            break;
    }
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
    var div = document.createElement('div');
    div.innerHTML = '<a href="#" class="list-group-item list-group-item-action" aria-current="true"> \
                    <div class="d-flex w-100 justify-content-between"> \
                    <h5 class="mb-1">'+transaction.merchant.name+' '+transaction.emoji+'</h5> \
                    <small>'+transaction.timestamp+'</small> \
                    </div> \
                    <p class="mb-1">£'+transaction.amount+'</p> \
                    <small>'+transaction.message+'</small> \
                    </a>';
    return div;
}
 
