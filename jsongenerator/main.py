import json
from willys import getWillysProductList
from hemkop import getHemkopProductList
from icamaxi import getIcaMaxiProductList
from icakvantum import getIcaKvantumProductList
from storacoop import getStoraCoopProductList
from lidl import getLidlProductList

print('Getting products from Willys now.....')
willysProducts = getWillysProductList("2288")  # Willys Göteborg Elisedal storeID = 2288
print('Got ', len(willysProducts),' products from Willys!')

print('Getting products from Hemkop now.....')
hemkopProducts = getHemkopProductList()
print('Got ', len(hemkopProducts),' products from Hemkop!')

print('Getting products from Ica Maxi now.....')
icamaxiProducts = getIcaMaxiProductList()
print('Got ', len(icamaxiProducts),' products from Ica Maxi!')

print('Getting products from Ica Kvantum now.....')
icakvantumProducts = getIcaKvantumProductList()
print('Got ', len(icakvantumProducts),' products from Ica Kvantum!')

print('Getting products from Stora Coop now.....')
storaCoopProducts = getStoraCoopProductList()
print('Got ', len(storaCoopProducts),' products from Stora Coop!')

print('Getting products from Lidl now.....')
lidlProducts = getLidlProductList()
print('Got ', len(lidlProducts),' products from Lidl!')


with open("./json/willys.json", 'w') as outfile:
    json.dump(willysProducts, outfile)
print("willys done!")

with open("./json/hemkop.json", 'w') as outfile:
    json.dump(hemkopProducts, outfile)
print("hemkop done!")

with open("./json/icamaxi.json", 'w') as outfile:
    json.dump(icamaxiProducts, outfile)
print("icamaxi done!")

with open("./json/icakvantum.json", 'w') as outfile:
    json.dump(icakvantumProducts, outfile)
print("icakvantum done!")

with open("./json/lidl.json", 'w') as outfile:
    json.dump(lidlProducts, outfile)
print("lidl done!")

with open("./json/storacoop.json", 'w') as outfile:
    json.dump(storaCoopProducts, outfile)
print("storacoop done!")
