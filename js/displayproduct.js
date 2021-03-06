var willyslogo = document.getElementById("willyslogo")
var willyslogoSmall = document.getElementById("willyslogoSmall")
var hemkoplogo = document.getElementById("hemkoplogo")
var hemkoplogoSmall = document.getElementById("hemkoplogoSmall")
var lidllogo = document.getElementById("lidllogo")
var lidllogoSmall = document.getElementById("lidllogoSmall")
var icalogo = document.getElementById("icalogo")
var icamaxilogo = document.getElementById("icamaxi")
var icakvantumlogo = document.getElementById("icakvantum")
var cooplogo = document.getElementById("cooplogo")
var storacooplogo = document.getElementById("storacoop")

var spinner = document.getElementById("spinner")
var showAllProducts = document.getElementById("showAllProducts")
var arrowTop = document.getElementById("arrowTop")

var currentStore = window.location.hash.replace('#', '')

// spinner 
function displaySpinner() {
    showAllProducts.innerHTML = ""
    spinner.classList.remove("d-none")
}
function hideSpinner() {
    spinner.classList.add("d-none")
}

// show the current store 
function hideActiveSign(logoname) {
    logoname.classList.remove("storeSelected")
}
function addActiveSign(logoname) {
    hideActiveSign(willyslogo)
    hideActiveSign(lidllogo)
    hideActiveSign(cooplogo)
    hideActiveSign(icalogo)
    hideActiveSign(hemkoplogo)
    hideActiveSign(hemkoplogoSmall)
    hideActiveSign(willyslogoSmall)
    hideActiveSign(lidllogoSmall)
    logoname.classList.add("storeSelected");
}

// hide the undefined items
function isUndefined(toBeChecked) {
    if (toBeChecked == undefined || toBeChecked == "No brand" || toBeChecked == "No Brand") {
        return ``
    } else {
        return toBeChecked
    }
}

// show each product
function displayAProduct(jsonFile) {
    displaySpinner()
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            showAllProducts.innerHTML = ""
            hideSpinner()
            for (const product of myObj) {
                if (!inBlacklist(product.name)) {
                    showAllProducts.innerHTML += `
     <div >
        <div style="width:180px;">
            <div>
                <a href="`+ product.link + `"><img style="max-width:150px;" src="` + product.img + `" loading="lazy"  /></a> 
            </div>
            <div style="max-width:150px;">
                <span class="text-left"><h4>`+ product.name + `</h4></span>
                <p><strong>`+ isUndefined(product.brand) + `</strong> ` + isUndefined(product.displayVolume) + `</p> 
                <p>`+ product.price + `</p> 
                <p class="savePrice">`+ isUndefined(product.savePrice) + `</p>  

                <button type="button" class="btn btn-default btn-sm" onclick="addToShoppingListDB('`+ product.name + `','` + product.img + `','` + product.price + `','` + currentStore + `')" >
                <img src="img/cart.svg">
                </button>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal" onclick="showInModal('`+ product.name + `')" title="">
                <img src="img/trash.svg">
                </button>
                <p></p>
            </div>
         </div>
    </div>
`
                }
            }
        }
    }
    xmlhttp.open("GET", jsonFile, true);
    xmlhttp.send()
}

// show products from a specific store
function hemkop() {
    icalogo.src = "img/ica_logo.png"
    cooplogo.src = "img/coop_logo.png"
    addActiveSign(hemkoplogo)
    addActiveSign(hemkoplogoSmall)
    displayAProduct("json/hemkop.json")
    currentStore = "hemkop"
}
function willys() {
    icalogo.src = "img/ica_logo.png"
    cooplogo.src = "img/coop_logo.png"
    addActiveSign(willyslogo)
    addActiveSign(willyslogoSmall)
    displayAProduct("json/willys.json")
    currentStore = "willys"
}
function icamaxi() {
    icalogo.src = "img/icamaxi_logo.png"
    cooplogo.src = "img/coop_logo.png"
    addActiveSign(icalogo)
    displayAProduct("json/icamaxi.json")
    currentStore = "icamaxi"
}
function icakvantum() {
    icalogo.src = "img/icakvantum_logo.webp"
    cooplogo.src = "img/coop_logo.png"
    addActiveSign(icalogo)
    displayAProduct("json/icakvantum.json")
    currentStore = "icakvantum"
}
function lidl() {
    icalogo.src = "img/ica_logo.png"
    cooplogo.src = "img/coop_logo.png"
    addActiveSign(lidllogo)
    addActiveSign(lidllogoSmall)
    displayAProduct("json/lidl.json")
    currentStore = "lidl"
}
function storacoop() {
    cooplogo.src = "img/storacoop_logo.png"
    icalogo.src = "img/ica_logo.png"
    addActiveSign(cooplogo)
    displayAProduct("json/storacoop.json")
    currentStore = "storacoop"
}

// add store name to URL
function checkURL() {
    var URL = window.location.hash
    if (URL == "#hemkop") {
        return hemkop()
    } else if (URL == "#icamaxi") {
        return icamaxi()
    } else if (URL == "#icakvantum") {
        return icakvantum()
    } else if (URL == "#storacoop") {
        return storacoop()
    } else if (URL == "#lidl") {
        return lidl()
    } else {
        return willys()
    }
}


// arrow to the top 
arrowTop.onclick = function() {
    window.scrollTo(pageXOffset, 0)
  }
window.addEventListener('scroll', function() {
    arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight)
  })


checkURL()
document.getElementById("hemkop").addEventListener("click", hemkop)
document.getElementById("willys").addEventListener("click", willys)
document.getElementById("icamaxi").addEventListener("click", icamaxi)
document.getElementById("icakvantum").addEventListener("click", icakvantum)
document.getElementById("lidl").addEventListener("click", lidl)
document.getElementById("storacoop").addEventListener("click", storacoop)