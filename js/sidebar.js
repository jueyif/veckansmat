var blacklistGroup = document.getElementById("blacklistGroup")
var shoppinglistGroup = document.getElementById("shoppinglistGroup")

var shoppinglistTab = document.getElementById("shoppinglistTab")
var blacklistTab = document.getElementById("blacklistTab")

var willysShoppingList = document.getElementById("willysShoppingList")
var willysSublist = document.getElementById("willysSublist")
var hemkopShoppingList = document.getElementById("hemkopShoppingList")
var hemkopSublist = document.getElementById("hemkopSublist")
var lidlShoppingList = document.getElementById("lidlShoppingList")
var lidlSublist = document.getElementById("lidlSublist")
var icamaxiShoppingList = document.getElementById("icamaxiShoppingList")
var icamaxiSublist = document.getElementById("icamaxiSublist")
var storacoopShoppingList = document.getElementById("storacoopShoppingList")
var storacoopSublist = document.getElementById("storacoopSublist")

var willysTab = document.getElementById("willysTab")
var hemkopTab = document.getElementById("hemkopTab")
var lidlTab = document.getElementById("lidlTab")
var icamaxiTab = document.getElementById("icamaxiTab")
var storacoopTab = document.getElementById("storacoopTab")

var sidebar = document.getElementById("sidebar")

// only the store that has been added to the shopping list from will be shown 
function haveShoppingItem(store) {
    for (const item of shoplistDB) {
        if (item.store.includes(store)) { return true }
    }
}
function hideStoreWithNoShoppingItem(store, storeTab) {
    if (!(haveShoppingItem(store))) {
        storeTab.classList.add("d-none")
    }
}
function finalShoppinglistTab() {
    resetShoppinglist()
    hideStoreWithNoShoppingItem("willys", willysTab)
    hideStoreWithNoShoppingItem("hemkop", hemkopTab)
    hideStoreWithNoShoppingItem("lidl", lidlTab)
    hideStoreWithNoShoppingItem("icamaxi", icamaxiTab)
    hideStoreWithNoShoppingItem("storacoop", storacoopTab)
}

// display all items in the shopping list
function displayAnItem(storeSublist, thisimg, thisname, thisprice) {
    storeSublist.innerHTML += `
    <li class="listGroupItem">
        <button type="button" class="btn btn-default btn-sm deletebutton" onclick="deleteFromShopplinglist('` + thisimg + `')">
        <img src="img/delete.svg"></button>` + thisname + `: ` + thisprice + `</li>`
}
function displayAllItems(shoplistDB, storename, storeSublist) {
    for (const shopitem of shoplistDB) {
        if (shopitem.store === storename) {
            displayAnItem(storeSublist, shopitem.img, shopitem.name, shopitem.price)
        }
    }
}

function reloadAStoreSublist(storeSublist, storename) {
    storeSublist.innerHTML = ""
    displayAllItems(shoplistDB, storename, storeSublist)
}
function reloadAllStoreSublist() {
    resetShoppinglist()
    reloadAStoreSublist(willysSublist, "willys")
    reloadAStoreSublist(hemkopSublist, "hemkop")
    reloadAStoreSublist(icamaxiSublist, "icamaxi")
    reloadAStoreSublist(lidlSublist, "lidl")
    reloadAStoreSublist(storacoopSublist, "storacoop")
}

function closeSidebar() {
    sidebar.classList.remove("show")
    sidebar.classList.add("active")
}

// load shoppling list, all tabs and their content when open the page at the first time
if (localStorage.getItem('shoplist') === null) {
    var shoplistDB = []
} else {
    reloadShoppinglist()
}
finalShoppinglistTab()
reloadAllStoreSublist()

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
    })
})

blacklistTab.addEventListener("click", function(){
    if (blacklistTab.classList == "nav-link") {
        shoppinglistGroup.classList.add("d-none")
        blacklistGroup.classList.remove("d-none")
        blacklistTab.classList.add("active")
        shoppinglistTab.classList.remove("active")
    }
})
shoppinglistTab.addEventListener("click", function() {
    shoppinglistGroup.classList.remove("d-none")
    blacklistGroup.classList.add("d-none")
    blacklistTab.classList.remove("active")
    shoppinglistTab.classList.add("active")
    finalShoppinglistTab()
    reloadAllStoreSublist()
})


willysShoppingList.addEventListener("click",function(){
    if (willysSublist.classList.contains('d-none')) {
        willysSublist.classList.remove('d-none')
    } else {
        willysSublist.classList.add('d-none')
    }
})
hemkopShoppingList.addEventListener("click", function(){
    if (hemkopSublist.classList.contains('d-none')) {
        hemkopSublist.classList.remove('d-none')
    } else {
        hemkopSublist.classList.add('d-none')
    }
})
icamaxiShoppingList.addEventListener("click", function(){
    if (icamaxiSublist.classList.contains('d-none')) {
        icamaxiSublist.classList.remove('d-none')
    } else {
        icamaxiSublist.classList.add('d-none')
    }
})
lidlShoppingList.addEventListener("click", function(){
    if (lidlSublist.classList.contains('d-none')) {
        lidlSublist.classList.remove('d-none')
    } else {
        lidlSublist.classList.add('d-none')
    }
})
storacoopShoppingList.addEventListener("click", function(){
    if (storacoopSublist.classList.contains('d-none')) {
        storacoopSublist.classList.remove('d-none')
    } else {
        storacoopSublist.classList.add('d-none')
    }
})