import requests
import re
from decimal import Decimal
from shared import replaceLetters

def getStoraCoopProductList():
    r = requests.get('https://www.coop.se/butiker-erbjudanden/stora-coop/sisjon/')
    productList = []
    products = r.text.split('erbjudanden i butiken')[1].split('data-rows-on-desktop="0" data-rows-on-tablet="0" data-rows-on-phone="0">')[1].split('<article class="ItemTeaser" itemscope="" itemtype=')
    for product in products[1:]:
        tmpProduct = {
            'name' : replaceLetters(product.split('alt="')[1].split('"')[0]),
            'id' : product.split('data-id="')[1].split('"')[0]
        }
        tmpProduct['link'] = 'https://www.coop.se/handla/p/' + tmpProduct['id']
        if 'ItemTeaser-brand' in product:
            tmpProduct['brand'] = replaceLetters(product.split('<span class="ItemTeaser-brand">')[1].split('.')[0])
            if 'Jfr' in product.split('<span class="ItemTeaser-brand">')[1].split('</span>')[1].split('</p>')[0]:
                tmpProduct['displayVolume'] = product.split('<span class="ItemTeaser-brand">')[1].split('</span>')[1].split('Jfr')[0].strip()
            else:
                tmpProduct['displayVolume'] = product.split('<span class="ItemTeaser-brand">')[1].split('</span>')[1].split('</p>')[0].strip()
        else: 
            tmpProduct['brand'] = None
        if '<span class="Splash-priceLarge">' in product:
            price = product.split('<span class="Splash-priceLarge">')[1].split('</span>')[0]
            if ':-' in price:
                tmpProduct['price'] = price.strip(':-') + ' kr'
            else: 
                priceDecimal = product.split('<span class="Splash-priceSup">')[1].split('</span>')[0].strip()
                price = int(price) + int(priceDecimal) * 0.01
                tmpProduct['price'] = str(Decimal(price).quantize(Decimal("0.00"))).replace('.',',') + ' kr'
            if 'f&#246;r' in product.split('<span class="Splash-pricePre">')[1].split(' ')[0]:
                amount = product.split('<span class="Splash-pricePre">')[1].split(' ')[0].strip('</span>').strip()
                tmpProduct['price'] = amount + ' for ' + str(price)+ ' kr'
            tmpProduct['price'].replace('.',',')
        if 'Jfr-pris' in product:
            description = product.split('Jfr-pris')[1].split('<')[0].strip( )
            if '-' in description:
                tmpJfrPris = re.findall(r'\d+', description)
                jfrPris = int(tmpJfrPris[0])
            else:
                tmpJfrPris = re.findall(r'\d+', description)
                jfrPris = int(tmpJfrPris[-2]) + int(tmpJfrPris[-1]) * 0.01
            tmpProduct['jfr Pris'] = jfrPris
        else: 
            tmpProduct['jfrPris']  = None
        if 'img class' in product:
            tmpProduct['img']= product.split('<img class="u-posAbsoluteCenter" src="')[1].split('"')[0]
        productList.append(tmpProduct)
    return productList