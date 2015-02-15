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
     *
     * Enter key submits url.
     */
    function submitURL(e)
    {
        if (e.keyCode === 13) {
            document.getElementById("btn").click();
        }
    }

    function validateUrl(url)
    {
        if (url === "") return false;

        var re = /[a-zA-Z]+\.[a-zA-Z0-9]+/;
        
        if (re.exec(url)) {
            return true;
        }
        return false;

    }

    /**
     * [checkURL description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    function checkURL(e)
    {

        
        var urlValue = document.getElementById("url").value;

        if (!validateUrl(urlValue)) {
            document.getElementsByClassName("results")[0].textContent = "Invalid Url";
            
            return;
        }


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
                    var result = JSON.parse(httpRequest.responseText);
                    console.log(result);
                    
                    var resultElement = document.getElementsByClassName("results")[0];
                    if (result["error"]) {

                        resultElement.textContent = result["error"];
                    } else if (result["works"]) {
                        resultElement.textContent = "Url Works!";
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