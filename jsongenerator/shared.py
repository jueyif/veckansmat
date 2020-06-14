def replaceLetters(aString):
    newString = aString.replace('&#229;', 'å').replace('&#228;','ä').replace('&#246;', 'ö').replace('&#39;','\'').replace('&#196;','Ä').replace('&#233;','é')
    return newString