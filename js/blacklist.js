var productName = document.getElementById("productName")
var originalProductName = document.getElementById("originalProductName")
var selectedWords = document.getElementById("selectedWords")
var saveChangesButton = document.getElementById("saveChangesButton")

// words that are selected by the cursor
var nameToBeBlocked
var blacklistDB = []

function resetBlacklist() {
    localStorage.setItem('blacklist', JSON.stringify(blacklistDB))
}
function reloadBlacklist() {
    blacklistDB = JSON.parse(localStorage.getItem('blacklist'))
}

function displayBlacklist() {
    for (const item of blacklistDB) {
        blacklistGroup.innerHTML += `
        <ul class="list-group">
            <li class="listGroupItem"><button type="button" class="btn btn-default btn-sm deletebutton" onclick="deleteFromBlacklist('` + item + `')">
            <img src="img/delete.svg"></button>` + item + `</li></ul>`
    }
}

// onclik of trash icon
function showInModal(name) {
    selectedWords.innerHTML = ""
    name = name.toLowerCase()
    originalProductName.value = name
}

// check if nameToBeBlocked (the selected phrase) is able to be added into blacklist
function isBlockable() {
    window.mySelection = this.value.substring(this.selectionStart, this.selectionEnd)
    nameToBeBlocked = window.mySelection.replace(',', '').trim()
    if (nameToBeBlocked) {
        if (blacklistDB.includes(nameToBeBlocked)) {
            saveChangesButton.disabled = true
            selectedWords.innerHTML = `<strong>"` + nameToBeBlocked + `"</strong> is already in the blacklist!`
        } else {
            selectedWords.innerHTML = `<strong>"` + nameToBeBlocked + `"</strong> is going to be blocked!`
            saveChangesButton.disabled = false
        }
    } else {
        saveChangesButton.disabled = true
    }
}

// compare the store product with the products in the blacklist
function inBlacklist(productName) {
    if (localStorage.getItem('blacklist') === null) {
        blacklistDB = []
    } else {
        for (const word of blacklistDB) {
            if (productName.toLowerCase().includes(word)) {
                return true
            }
        }
    }
    return false
}

// add new phrase to blacklist after click button
function addToDB() {
    if (localStorage.getItem('blacklist') === null) {
        blacklistDB = []
    } else {
        reloadBlacklist()
    }
    blacklistDB.push(nameToBeBlocked)
    resetBlacklist()
    reloadBlacklist()
    blacklistGroup.innerHTML = ''
    displayBlacklist()
    saveChangesButton.disabled = true
    selectedWords.innerHTML = `Done!`
}
function clearSelection() {
    selectedWords.innerHTML = ""
}

function deleteFromBlacklist(deleteItem) {
    for (const item of blacklistDB) {
        if (item.includes(deleteItem)) {
            const index = blacklistDB.findIndex(item => item == deleteItem)
            blacklistDB.splice(index, 1)
            resetBlacklist()
            reloadBlacklist()
            blacklistGroup.innerHTML = ''
            displayBlacklist()
        }
    }
}

reloadBlacklist()
checkURL()
displayBlacklist()

originalProductName.addEventListener('mouseup', isBlockable)
originalProductName.addEventListener('mousedown', clearSelection)
saveChangesButton.addEventListener("click", addToDB)


