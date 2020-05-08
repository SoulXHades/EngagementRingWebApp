from bs4 import BeautifulSoup
import urllib.request
import re
import ssl

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
    # parse the html
    soup = BeautifulSoup(pageDict["goldHeart"], "html.parser")
    # get the sections that has info of the rings
    ringsSection = soup.find_all("li", attrs={"class": "item last"})
    
    for ringSection in ringsSection:
        ringUrl = ringSection.find_all("a", attrs={"class": "product-image"}, href=True)
        print(ringUrl['href'])  # BUG HERE


def main():
    # URLs to scrap data from
    urlDict = {"goldHeart" : "https://shop.goldheart.com/bridal/engagement-rings.html"}

    # get scrapped pages
    pageDict = get_pages(urlDict)

    # parse the html
    parse_data(pageDict)


if __name__ == "__main__":
    main()