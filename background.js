chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'Haste it!',
        id: 'hastemenu',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "hastemenu") {
        chrome.tabs.executeScript({code: "window.getSelection().toString();"}, function(selection) {
            var selectedText = selection[0];
            $.post('http://hastebin.com/documents', selectedText, function(response) {
                var link = "http://hastebin.com/" + response['key'];
                chrome.tabs.create({'url': link});
            });
        });
    }
});
