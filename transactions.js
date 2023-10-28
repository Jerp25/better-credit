document.cookie = "userid=70560991";

var req = $.ajax({
    type: "GET",
    url: "/getTransactions.php",
    async: false,
});

var responce = JSON.parse(req.responseText);

var list = document.getElementById("transactions-list");
var transactions = responce.transactions

var div = document.createElement('div');
div.innerHTML = '<a href="#" class="list-group-item list-group-item-action" aria-current="true"> \
                <div class="d-flex w-100 justify-content-between"> \
                <h5 class="mb-1">Transaction</h5> \
                <small>£100</small> \
                </div> \
                <p class="mb-1">lorum ipsum</p> \
                <small>its all fake</small> \
                </a>';

list.appendChild(div)