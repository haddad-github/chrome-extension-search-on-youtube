//Upon installation, create the context menu option and assign it an ID for re-use
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchYouTube",
    title: "Search on YouTube",
    contexts: ["selection"]
  });
});

//Upon clicking a context menu, catch the context menu info and tab info
chrome.contextMenus.onClicked.addListener((info, tab) => {
  //Only trigger when the "Search on Youtube" button is clicked and there's a text selected
  if (info.menuItemId === "searchYouTube" && info.selectionText) {

    //Encodes the highlighted text into a valid URI (ex: space is replaced by "%20", ex: "how to" = "how%20to")
    const query = encodeURIComponent(info.selectionText);

    //Create the full URL
    const url = `https://www.youtube.com/results?search_query=${query}`;

    //Open that URL in a new tab
    chrome.tabs.create({ url: url });
  }
});