import requests
import re

def getLidlProductList():
    r = requests.get('https://www.lidl.se/sv/veckans-erbjudanden')
    labels = r.text.split(' data-controller="navigation/link/burgernavigation" class="navigation__link" href="')
    linkList = []
    productList = []
    for label in labels[1:]:
        link = label.split('" data-active="false" data-depth="3"')[0]
        if 'w2' not in link:
            linkList.append(link)
    for link in linkList:
        rEachTab = requests.get('https://www.lidl.se/' + link)
        products = rEachTab.text.split('<article class="product product--tile" data-controller="product">')
        for product in products[1:]:
            tmpProduct = {
                'name': product.split('<h3 class="product__title" data-clamp="data-clamp">')[1].split('<sup')[0].strip(),
                'price' : product.split('<span class="pricebox__price">')[1].split('</span>')[0].strip().strip('.').replace('.',',') + ' kr',
                'id' : product.split('<a data-ref-id="')[1].split('"')[0],
                'validDate' : product.split('<div class="ribbon__text">')[1].split('</div>')[0].strip()
            }
            if 'pricebox__basic-quantity' in product:
                getQuantity = product.split('<div class="pricebox__basic-quantity">')[1].split('</div>')[0].strip()
                tmpProduct['displayVolume'] = getQuantity
                if 'kg' in getQuantity:
                    tmpProduct['jfr Pris'] = tmpProduct['price']
                else:
                    detailPage = 'https://www.lidl.se' + product.split(' class="product__body" data-controller="product/body" href="')[1].split('">')[0].strip()
                    rJfr = requests.get(detailPage)
                    if '<meta name="description" property="og:description" content="' in rJfr.text:
                        description = rJfr.text.split('<meta name="description" property="og:description" content="')[1].split('">')[0]
                        if 'kr/kg' in description or 'kr/l' in description or 'kr/st' in description:
                            if '-' in description:
                                tmpJfrPris = re.findall(r'\d+', description)
                                jfrPris = int(tmpJfrPris[0])
                            else:
                                tmpJfrPris = re.findall(r'\d+', description)
                                jfrPris = int(tmpJfrPris[-2]) + int(tmpJfrPris[-1]) * 0.01
                            tmpProduct['jfr Pris'] = jfrPris
                        else:
                            tmpProduct['jfr pris'] = None
            else:
                tmpProduct['jfr pris'] = None
            tmpProduct['img'] = 'https://se.cat-ret.assets.lidl/catalog4media/se/article/'+tmpProduct['id']+'/third/sm/'+tmpProduct['id']+'.jpg'
            tmpProduct['link'] = 'https://www.lidl.se' + product.split(' class="product__body" data-controller="product/body" href="')[1].split('">')[0].strip()
            if 'SPARA' in product:
                tmpProduct['savePrice'] = 'Spara ' + product.split('SPARA')[1].split('</div>')[0].strip().strip(':-') + ' kr !' 
            productList.append(tmpProduct)
    return productList