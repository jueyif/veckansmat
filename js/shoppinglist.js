function resetShoppinglist() {
    localStorage.setItem('shoplist', JSON.stringify(shoplistDB))
}
function reloadShoppinglist() {
    shoplistDB = JSON.parse(localStorage.getItem('shoplist'))
}

function addToShoppingListDB(name, img, price, store) {
    if (localStorage.getItem('shoplist') === null) {
        shoplistDB = []
    } else {
        reloadShoppinglist()
    }
    var newShoppingItem = {
        name: name,
        img: img,
        price: price,
        store: store
    }
    shoplistDB.push(newShoppingItem)
    finalShoppinglistTab()
    reloadAllStoreSublist()
}

function deleteFromShopplinglist(deleteItem) {
    for (const item of shoplistDB) {
        if (item.img.includes(deleteItem)) {
            const index = shoplistDB.findIndex(item => item.img == deleteItem)
            shoplistDB.splice(index, 1)
        }
    }
    reloadShoppinglist()
    reloadAllStoreSublist()
}
