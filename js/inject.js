function injectForm(obj) {
    let changeEvent = new Event('change');
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
        } catch (e) {
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
    let selectObj = [];
    let inputs = document.querySelectorAll('input');
    let selections = document.querySelectorAll('select');

    for (let i = 0; i < inputs.length; i++) {
        inputObj[i] = {};
        inputObj[i].attr = getAttr(inputs[i].attributes);
        inputObj[i].value = inputs[i].value;
    }
    for (let i = 0; i < selections.length; i++) {
        selectObj[i] = {};
        selectObj[i].attr = getAttr(selections[i].attributes);
        selectObj[i].selectIndex = selections[i].selectedIndex;
    }
    let autoFormObj = {};
    autoFormObj.inputs = inputObj;
    autoFormObj.selections = selectObj;
    autoFormObj.func = 'save';
    autoFormObj.url = document.URL;
    chrome.runtime.sendMessage({formParam: autoFormObj}, function (response) {
    });
}