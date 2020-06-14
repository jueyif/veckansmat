import requests
import re

def getWillysProductList(storeId):
    page = 0
    moreProducts = True
    productList = []
    while moreProducts:
        r = requests.get('https://www.willys.se/search/campaigns/offline?page='+str(page)+'&q='+str(storeId))
        if not r.json()["results"]:
            moreProducts = False
        else:
            for product in r.json()["results"]:
                tmpProduct = {
                    'name' : product['name'],
                    'brand' : product['manufacturer'],
                    'price' : product["potentialPromotions"][0]['cartLabel'].replace('/',' kr/'),
                    'img': product['image']['url'],
                    'code': product["potentialPromotions"][0]['code'],
                    'displayVolume' : product['displayVolume']
                }
                if 'blanda' in tmpProduct['price']:
                    tmpProduct['price'] + ' kr'
                jfrPris = product["potentialPromotions"][0]['comparePrice']
                if jfrPris == None :
                    tmpProduct['jfr pris'] = None
                else:
                    tmpJfrPris = re.findall(r'\d+', jfrPris)
                    jfrPrisFloat = int(tmpJfrPris[-2]) + int(tmpJfrPris[-1]) * 0.01
                    tmpProduct['jfr pris'] = jfrPrisFloat
                tmpProduct['link'] = 'https://www.willys.se/erbjudanden/offline-'+ tmpProduct['name'] + '-' + tmpProduct['code']
                if product["potentialPromotions"][0]['savePrice']:
                    tmpProduct['savePrice'] = product["potentialPromotions"][0]['savePrice'].replace(':',',')+'!'
                productList.append(tmpProduct)
        page = page + 1
    return productList