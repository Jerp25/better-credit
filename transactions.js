document.cookie = "userid=70560991";
$(document).ready( function() {

    var req = $.ajax({
        type: "GET",
        url: "/getTransactions.php",
        async: false,
    });

    var responce = JSON.parse(req.responseText);

    var list = document.getElementById("transactions-list");
    var transactions = responce.Transactions;

    for (var i in transactions) {
        var transaction = transactions[i]
        console.log(transaction)
        var div = document.createElement('div');
        div.innerHTML = '<a href="#" class="list-group-item list-group-item-action" aria-current="true"> \
                        <div class="d-flex w-100 justify-content-between"> \
                        <h5 class="mb-1">'+transaction.merchant.name+'</h5> \
                        <small>£'+transaction.amount+'</small> \
                        </div> \
                        <p class="mb-1">'+transaction.timestamp+'</p> \
                        <small>'+transaction.message+'</small> \
                        </a>';
    
        list.appendChild(div);
    }
});