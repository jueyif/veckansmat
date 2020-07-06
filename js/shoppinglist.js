var notesTab = document.getElementById("notesTab")
var notesContent = document.getElementById("notesContent")
var notes = []

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
    resetShoppinglist()
    reloadAllStoreSublist()
}


// function displayNotes(){
//     notesContent.innerHTML += `
//     <li class="listGroupItem">
//         <button type="button" class="btn btn-default btn-sm deletebutton" onclick="deleteFromShopplinglist('` + thisimg + `')">
//         <img src="img/delete.svg"></button>` + thisname + `: ` + thisprice + `</li>`
// }


// notesTab.addEventListener("click", function(){
//     if ( .classList.contains('d-none')) {
//         .classList.remove('d-none')
//     } else {
//          .classList.add('d-none')
//     }
// })
