import requests
import re
from decimal import Decimal

def getHemkopProductList():
    offlineSize = 0
    storeId = 4513  # Bifrost Hemkop 
    moreProducts = True
    productList = []
    while moreProducts:
        r = requests.get('https://www.hemkop.se/search/campaigns/mix?offlineSize='+ str(offlineSize) +'&q='+ str(storeId))
        if not r.json()["results"]:
            moreProducts = False
        else:
            for product in r.json()["results"]:
                tmpProduct = {
                    'name' : product['name'],
                    'price' : product["potentialPromotions"][0]['cartLabel'],
                    'img' : product['image']['url'],
                    'displayVolume' : product['displayVolume']
                }
                jfrPris = product["potentialPromotions"][0]['comparePrice']
                if jfrPris == None :
                    tmpProduct['jfr pris'] = None
                brand = product['manufacturer']
                if brand == None:
                    tmpProduct['brand'] = None
                else:
                    tmpProduct['brand'] =  brand
                if product["potentialPromotions"][0]['productCodes'] != None:
                    if product["potentialPromotions"][0]['productCodes'][0] != None:
                        tmpProduct['code'] = product["potentialPromotions"][0]['productCodes'][0]
                        tmpProduct['link'] = 'https://www.hemkop.se/produkt/'+ tmpProduct['name'].replace(' ', '-') + '-' + tmpProduct['code']
                        r1 = requests.get('https://www.hemkop.se/axfood/rest/p/'+ tmpProduct['code'])
                        tmpProduct['savePrice'] = 'Spara '+ str(Decimal(r1.json()["savingsAmount"]).quantize(Decimal("0.00"))).replace('.',',') +' kr!'
                productList.append(tmpProduct)
        offlineSize = offlineSize + 20
    return productList