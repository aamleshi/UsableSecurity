var search = "";
var product = "";
var last_key = "";


function do_query(variable) {
    //chrome.runtime.sendMessage({greeting: variable});
    chrome.runtime.sendMessage(
    "foo",
    function (response) {
        console.log(response);
    }
    );
    console.log("fuck");
    //sending.then();
}


// GetQueryVariable and getSearch get the search variable

function getProduct() {
    if (document.getElementById("dp") == null) {
        return null;
    }
    var temp = document.getElementsByTagName('meta')[4].getAttribute('content');
    product = temp;
    return product
}


function addItem(value) {
    last_key = window.localStorage.getItem("last_key");
    if (last_key == null) {
        window.localStorage.setItem("last_key", "1");
        last_key = "1";
    }
    else {
        var temp = parseInt(last_key, 10) + 1;
        last_key = temp.toString(10);
        window.localStorage.setItem("last_key", last_key);
    }
    window.localStorage.setItem(last_key, value);
}

// addItem adds the query ([key: "number_of_search", value: "query"]) to the local history for amazon


var ret = getProduct();
if (ret != null) {
    addItem(ret);
    console.log(ret);
    do_query(ret);
}
if (last_key == 10) {
    window.localStorage.clear();
}



