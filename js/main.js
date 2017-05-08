chrome.runtime.onMessage.addListener(//get the form and save it
    function (request, sender, sendResponse) {
        if (request.formParam.func === 'save') {
            saveForm(request.formParam);
        }
        let theUrl = sender.tab.url.split('?')[0];
        theUrl = theUrl.split('#')[0];
        localStorage.setItem(theUrl, JSON.stringify(request.formParam));
    });

function sendForm() {
    chrome.tabs.getSelected(null, function (tab) {
        let theUrl = tab.url.split('?')[0];
        theUrl = theUrl.split('#')[0];

        asynContinufunc(theUrl);
    });
    function asynContinufunc(responUrl) {
        var formObj = localStorage.getItem(responUrl);
        if (formObj === null) {
            chrome.tabs.executeScript(null, {code: "injectForm('empty');"});
        } else {
            chrome.tabs.executeScript(null, {code: "injectForm(" + formObj + ");"});
        }
    }
}
function bringForm() {
    chrome.tabs.executeScript(null, {code: "saveForm();"});
}
function saveForm(obj) {
    var tabUrl = obj.url;
    delete obj.func;
    delete obj.url;
    localStorage.setItem(tabUrl, JSON.stringify(obj));
}
function deleteStorage() {
    chrome.tabs.getSelected(null, function (tab) {
        let theUrl = tab.url.split('?')[0];
        theUrl = theUrl.split('#')[0];
        localStorage.removeItem(theUrl);
    });
}
document.querySelector('.fn-inject-form').addEventListener('click',sendForm);
document.querySelector('.fn-save-form').addEventListener('click',bringForm);
document.querySelector('.fn-delete-saved-form').addEventListener('click',deleteStorage);
