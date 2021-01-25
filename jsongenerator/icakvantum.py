import requests
import re
from decimal import Decimal
from shared import replaceLetters

def getIcaKvantumProductList():
    r = requests.get('https://www.ica.se/butiker/kvantum/molndal/ica-kvantum-molndal-16245/erbjudanden/')
    productList = []

    specialProducts = r.text.split('<div class="hit-item focus-item clearfix">')
    for product in specialProducts[1:]:
        tmpProduct = {
            'name' : replaceLetters(product.split('<div class="item-name-product">')[1].split('</div>')[0].strip()),
            'brand': replaceLetters(product.split('<div class="item-info">')[1].split('</div>')[0].strip())
        }
        if 'betala f&#246;r' or '%' in product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip():
            tmpProduct['price'] = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ ' kr'
        if 'decimal' in product:
            productPriceIntegral = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')
            productPriceDecimal = product.split('<div class="product-price__decimal">')[1].split('</div>')[0].strip().strip('\:-')
            price = int(productPriceIntegral) + 0.01 * int(productPriceDecimal)
            tmpProduct['price'] =  str(Decimal(price).quantize(Decimal("0.00"))).replace('.',',') + ' kr'
        else: tmpProduct['price'] = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ 'kr'
        if 'product-price__amount' in product:
            tmpProduct['price'] = product.split('<div class="product-price__amount">')[1].split(' f&#246;r</div>')[0].strip() + ' for ' + product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ ' kr'
        if 'Jfr pris' in product:
            description = product.split('Jfr pris ')[1].split('.</p>')[0].strip()
            tmpJfrPris = re.findall(r'\d+', description)
            jfrPris = int(tmpJfrPris[-2]) + int(tmpJfrPris[-1]) * 0.01
            tmpProduct['jfr Pris'] = jfrPris
        else: tmpProduct['jfr Pris']= None
        tmpProduct['img'] = product.split('<img class="item-image " src="')[1].split('"')[0]
        if 'Vikt/Volym' in product:
            tmpProduct['displayVolume'] = product.split('<h4>Vikt/Volym:</h4>')[1].split('<p>')[1].split('</p>')[0]
        productList.append(tmpProduct)

    products = r.text.split('offer-type js-open-product-info offer-type--regular-hit')
    for product in products[1:]:
        tmpProduct = {
            'name' :  replaceLetters(product.split('<h2 class="offer-type__product-name splash-bg icon-store-pseudo ')[1].split('>')[1].split('</h2')[0].strip()),
            'img' : product.split('<img class="lazy" data-original="')[1].split('"')[0]
        }
        if 'Leverantör/Land' in product:
            tmpProduct['brand'] = replaceLetters(product.split('<h4>Leverantör/Land:</h4>')[1].split('<div class="col-8 col-sm-7 col-md-8">')[1].split('<p>')[1].split('</p>')[0].strip())
        else: tmpProduct['brand'] = None
        if 'betala f&#246;r' or '%' in product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip():
            tmpProduct['price'] = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ ' kr'
        if 'decimal' in product:
            productPriceIntegral = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip(':-')
            productPriceDecimal = product.split('<div class="product-price__decimal">')[1].split('</div>')[0].strip().strip(':-')
            if '%' in productPriceIntegral:
                tmpProduct['price'] = productPriceIntegral + 'off'
            else:
                price = int(productPriceIntegral) + 0.01 * int(productPriceDecimal)
                tmpProduct['price'] =  str(Decimal(price).quantize(Decimal("0.00"))).replace('.',',') + ' kr'
        else: tmpProduct['price'] = product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ ' kr'
        if 'product-price__amount' in product:
            tmpProduct['price'] = product.split('<div class="product-price__amount">')[1].split(' f&#246;r</div>')[0].strip() + ' for ' + product.split('<div class="product-price__price-value">')[1].split('</div>')[0].strip().strip('\:-')+ ' kr'
        if 'Jfr pris' in product:
            description = product.split('Jfr pris ')[1].split('.</p>')[0].strip()
            tmpJfrPris = re.findall(r'\d+', description)
            jfrPris = int(tmpJfrPris[-2]) + int(tmpJfrPris[-1]) * 0.01
            tmpProduct['jfr Pris'] = jfrPris
        else: tmpProduct['jfr Pris']= None
        productList.append(tmpProduct)
    return productList