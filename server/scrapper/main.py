from firebase_admin import db
import urllib.request
import re
import ssl

from shops.goldHeart import parse_data_goldheart
from shops.loveNco import parse_data_lovenco

def db_storage(ringsData):
    pass


# scrap webpages
def get_pages(urlArg):
    # to remove unable to verify SSL cert
    context = ssl._create_unverified_context()

    # check if urlArg is a string or a dictionary
    if isinstance(urlArg, str):
        try:
            return urllib.request.urlopen(urlArg, context=context)
        # incase have error scrapping
        except Exception as e:
            print(e)
    else:
        # to store pages scrapped from
        pageDict = {}

        try:
            # start scrapping based on the list of URLs
            for key, url in urlArg.items():
                pageDict[key] = urllib.request.urlopen(url, context=context)
        # incase have error scrapping
        except Exception as e:
            print(e)
        
        return pageDict


def parse_data(urlDict, pageDict):
    ringsData = dict()

    # parse the html
    ringsData = parse_data_goldheart(urlDict["goldHeart"], pageDict["goldHeart"], 1, ringsData, get_pages)
    ringsData = parse_data_lovenco(urlDict["love_N_Co"], pageDict["love_N_Co"], 1, ringsData, get_pages)
    print(ringsData)

    return ringsData


def main():
    # URLs to scrap data from
    urlDict = {"goldHeart" : "https://shop.goldheart.com/bridal/engagement-rings.html",
        "love_N_Co": "https://shop.love-and-co.com/category/diamond-rings/"}

    # get scrapped pages
    pageDict = get_pages(urlDict)

    # parse the html
    ringsData = parse_data(urlDict, pageDict)

    db_storage(ringsData)


if __name__ == "__main__":
    main()