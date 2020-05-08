from bs4 import BeautifulSoup
import urllib.request
import re
import ssl

# scrap webpages
def getPages(urlDict):
    pageDict = {}   # to store pages scrapped from

    context = ssl._create_unverified_context()  # to remove unable to verify SSL cert

    try:
        # start scrapping based on the list of URLs
        for key, url in urlDict.items():
            pageDict[key] = urllib.request.urlopen(url, context=context)
    # incase have error scrapping
    except Exception as e:
        print(e)
    
    return pageDict


def parseData(pageDict):
    # parse the html
    soup = BeautifulSoup(pageDict["goldHeart"], "html.parser")
    ringsHTML = soup.find_all("li", attrs={"class": "item last"})
    print(ringsHTML)
        

def main():
    # URLs to scrap data from
    urlDict = {"goldHeart" : "https://shop.goldheart.com/bridal/engagement-rings.html"}

    # get scrapped pages
    pageDict = getPages(urlDict)

    # parse the html
    parseData(pageDict)


if __name__ == "__main__":
    main()