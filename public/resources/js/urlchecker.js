;(function() {

var sub = document.getElementById("btn");
var textbox = document.getElementById("url");
var clearText = document.getElementById("close");


sub.addEventListener('click', checkURL, false);
textbox.addEventListener('keyup', submitURL, false);
clearText.addEventListener('click', function() {
    document.getElementById("url").value = "";
    document.getElementById("url").focus();
}, false);


/**
 * [submitURL description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function submitURL(e) {
    if (e.keyCode === 13) {
        document.getElementById("btn").click();
    }
}


/**
 * [checkURL description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function checkURL(e) {

    var urlValue = document.getElementById("url").value;
    var postUrl = document.URL;
    var loading = document.getElementsByClassName("loading")[0];
    document.getElementsByClassName("results")[0].textContent = "";
    var param = "url=" + urlValue;
    //console.log(param);

    var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpRequest = new ActiveXObject("Microsoft.XMLTTP");
    }

    /**
     * [onreadystatechange description]
     * @return {[type]} [description]
     */
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            
            if(httpRequest.status === 200) {
                //console.log(httpRequest.responseText);
                var results = document.getElementsByClassName("results")[0];
                if (httpRequest.responseText == "true") {
                    results.textContent = "URL Works";
                } else {
                    results.textContent = "URL Does Not Works";
                }
            } else {
                console.log("error");
            }
            loading.className = "loading hide";
        } else {
            loading.className = "loading show";
        }

    };

    httpRequest.open('POST', postUrl);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(param);
}

})();