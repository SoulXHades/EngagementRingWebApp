from bs4 import BeautifulSoup
import urllib.request
import re
import ssl

from shops.goldHeart import parse_data_goldheart

# scrap webpages
def get_pages(urlDict):
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


def parse_data(pageDict):
    ringsList = dict()

    # parse the html
    soup = BeautifulSoup(pageDict["goldHeart"], "html.parser")
    parse_data_goldheart(soup, ringsList)


def main():
    # URLs to scrap data from
    urlDict = {"goldHeart" : "https://shop.goldheart.com/bridal/engagement-rings.html"}

    # get scrapped pages
    pageDict = get_pages(urlDict)

    # parse the html
    parse_data(pageDict)


if __name__ == "__main__":
    main()