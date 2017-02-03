chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.formParam.func === 'save') {
            saveForm(request.formParam);
        }
        let theUrl = sender.tab.url.split('?')[0];
        theUrl = theUrl.split('#')[0];
        localStorage.setItem(theUrl, JSON.stringify(request.formParam));
    });
var inject = document.getElementById('inject');
inject.addEventListener('click', sendForm);
var save = document.getElementById('save');
save.addEventListener('click', bringForm);
var del = document.getElementById('delete');
del.addEventListener('click', deleteStorage);
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