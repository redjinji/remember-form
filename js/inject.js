console.log('inject');
function injectForm(obj) {
    console.log(obj);
    let changeEvent = new Event('change');
    for (let i = 0; i < obj.radios.length; i++) {
        try {
            let inputField = returnDomElement('input', obj.radios[i]);
            inputField.checked = obj.radios[i].checked;
            inputField.dispatchEvent(changeEvent);
        } catch (e) {
        }
    }
    for (let i = 0; i < obj.inputs.length; i++) {
        if (obj.inputs[i].value !== '') {
            try {
                let inputField = returnDomElement('input', obj.inputs[i]);
                inputField.value = obj.inputs[i].value;
                inputField.dispatchEvent(changeEvent);
            } catch (e) {
            }
        }
    }
    for (let i = 0; i < obj.selections.length; i++) {
        try {
            let selectField = returnDomElement('select', obj.selections[i]);
            selectField.selectedIndex = obj.selections[i].selectIndex;
            selectField.dispatchEvent(changeEvent);
        } catch (e)  {
        }
    }
}
function returnDomElement(type, selector) {
    let attrs = selector.attr;
    let querySrt = type;
    for (let attr in attrs) {
        if(attrs[attr] !== "") {
            querySrt += '[' + attr + '="' + attrs[attr] + '"]';
        }
    }
    return document.querySelector(querySrt);
}
function saveForm() {
    function getAttr(attrList) {
        let attrObj = {};
        for (let i = 0; i < attrList.length; i++) {
            attrObj[attrList[i].name] = attrList[i].nodeValue;
        }
        return attrObj;
     }

    let inputObj = [];
    let radioObj = [];
    let selectObj = [];
    let inputs = document.querySelectorAll('input');
    let selections = document.querySelectorAll('select');

    // r for counting radio input button
    // p for counting all kind of text inputs
    for (let i = 0, r=0,p=0; i < inputs.length; i++) {
        if (inputs[i].type === 'radio'){
            radioObj[r] = {};
            radioObj[r].attr = getAttr(inputs[i].attributes);
            radioObj[r].checked = inputs[i].checked;
            r++;
            continue;
        }
        inputObj[p] = {};
        inputObj[p].attr = getAttr(inputs[i].attributes);
        inputObj[p].value = inputs[i].value;
        p++;
    }
    for (let i = 0; i < selections.length; i++) {
        selectObj[i] = {};
        selectObj[i].attr = getAttr(selections[i].attributes);
        selectObj[i].selectIndex = selections[i].selectedIndex;
    }
    let rememberFormObj = {};
    rememberFormObj.inputs = inputObj;
    rememberFormObj.radios = radioObj;
    rememberFormObj.selections = selectObj;
    rememberFormObj.func = 'save';
    rememberFormObj.url = document.URL;
    chrome.runtime.sendMessage({formParam: rememberFormObj}, function (response) {
    });
}