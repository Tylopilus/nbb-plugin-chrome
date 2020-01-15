const onCreated = () => {
    if (chrome.runtime.lastError) {
	    console.log(`Error: ${chrome.runtime.lastError}`);
	  } else {
	    console.log("Item created successfully");
	  }
  }
  
  /*
  Create MenuItems
  */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "updateContextMenu" ){
        chrome.contextMenus.removeAll()
        let title = ""
        title = "Preise && Verfügbarkeit"
        chrome.contextMenus.create({
          id: "price",
          title: title,
          contexts: ["all"],
          documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
        },onCreated)
        
        title = "Stamm"
        chrome.contextMenus.create({
          id: "section_main_data",
          title: title,
          contexts: ["all"],
          documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
        },onCreated)
      
        title = "Artikelbeschreibung"
        chrome.contextMenus.create({
          id: "section_article_description",
          title: title,
          contexts: ["all"],
          documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
        },onCreated)
      
        title = "Dateien"
        chrome.contextMenus.create({
          id: "section_files",
          title: title,
          contexts: ["all"],
          documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
        },onCreated)
      
        title = "Eigenschaften"
        chrome.contextMenus.create({
          id: "section_properties",
          title: title,
          contexts: ["all"],
          documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
        },onCreated)
      }
    else if(request.message === "removeContextMenu")
      chrome.contextMenus.removeAll()
  })
  
  /*
  On MenuItem selection communicate with content_script
  */
  chrome.contextMenus.onClicked.addListener((info, tab) => {
      chrome.tabs.sendMessage(tab.id, {
          operation: 'getproductid'
      }, response => {
        let URL
        if(info.menuItemId === "price")
          URL = "https://backend.notebooksbilliger.de/admin/products.php?section=" + info.menuItemId + "&action=show&pID=" + response.productid; 		
        else
          URL = "https://backend.notebooksbilliger.de/admin/admin.php/product/physical/edit/"+ response.productid + "#" + info.menuItemId;
        chrome.tabs.create({url: URL});
      });
  })