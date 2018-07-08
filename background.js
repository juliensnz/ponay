browser.contextMenus.create({
    id: 'ponay',
    title: 'Ponay',
    contexts: ['selection']
});

const fetchThumbnail = async (tag) => {
    const response = await fetch(`${baseURL}${tag}`);
    const text = await response.text();
    const imagePosition = text.indexOf(imageStart);
    const startImagePosition = text.indexOf(imageEnd , imagePosition) + ('data-thumbnail="').length;
    const stopImagePosition = text.indexOf('"' , startImagePosition + 3);

    const titlePosition = text.indexOf(titleStart);
    const startTitlePosition = text.indexOf(titleEnd , titlePosition) + ('video-box-title"').length + 2;
    const stopTitlePosition = text.indexOf('\n' , startTitlePosition + 3) ;

    return {
        image: text.substr(startImagePosition, stopImagePosition - startImagePosition),
        title:text.substr(startTitlePosition, stopTitlePosition - startTitlePosition),
    };
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    switch (info.menuItemId) {
        case 'ponay':
            const thumbnailUrl = await fetchThumbnail(info.selectionText);
            browser.tabs.sendMessage(
                tab.id,
                {
                    data: thumbnailUrl
                }
            )
        break;
    }
});




















































































var baseURL = 'https://www.youporn.com/search/?query=';
var imageStart = 'js_lazy js-videoThumbFlip';
var imageEnd = 'data-thumbnail';
var titleStart = 'video-box-image js-pop';
var titleEnd = 'video-box-title';
