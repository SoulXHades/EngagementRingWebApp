from bs4 import BeautifulSoup
import re

def parse_data_goldheart(url, page, pageNum, ringsData, get_pages):
    soup = BeautifulSoup(page, "html.parser")
    
    return get_data(url, pageNum, soup, ringsData, get_pages)


def get_data(url, pageNum, soup, ringsData, get_pages):
    # get the sections that has info of the rings
    ringsSection = soup.find_all("li", attrs={"class": "item last"})

    # check if already have "goldHeart" key in ringsData
    try:
        ringsData['goldHeart']
    except:
        # append a new dictionary to goldHeart key till like JSON format since don't have "goldHeart" key
        ringsData['goldHeart'] = list()
    
    for ringSection in ringsSection:
        tempDict = dict()

        # get the URL to the ring's webpage
        ringSiteURL = ringSection.find_all("a", attrs={"class": "product-image"}, href=True)
        # get href from <a class="product-image" href="https://shop.goldheart.com/bridal...
        tempDict['ringSiteURL'] = ringSiteURL[0]['href']
        
        # get ring image's URL
        ringImage = ringSection.find_all("img", src=True)
        tempDict['ringImage'] = ringImage[0]['src']

        # get the brand of the ring
        ringBrand = ringSection.find_all("div", attrs={"class": "product-line"})
        tempDict['ringBrand'] = ringBrand[0].text

        # get the name of the ring
        tempDict['ringName'] = ringSection.h2.a.text

        ringCaratTemp = ringSection.h2.a.text.upper().split()

        # search for the CARAT value in the ring name
        for ringCarat in ringCaratTemp:
            # since the carat value has decimal point and ends with CT, search based on them
            if '.' in ringCarat and "CT" in ringCarat[-2:]:
                # don't need CT, only need number
                tempDict['ringCarat'] = ringCarat[:-2]

                # no need to continue searching
                break

        # get the price of the ring
        ringPrice = ringSection.find("span", attrs={"class": "price"})
        # extract from e.g. $430 into 43000 as store price as integer including cents
        tempDict['ringPrice'] = format_price(ringPrice.text)

        # append to the list in our main storage ringsData
        ringsData['goldHeart'].append(tempDict)
        tempDict = None
    
    # go to the page navigation section
    pageNavigateSection = soup.find_all("div", attrs={"class": "pages"})
    pageNavigations = pageNavigateSection[0].find_all("li")

    # check if list is empty
    # if list is empty, continue to go to the next page
    if 'class="current"' not in str(pageNavigations[-1]):
        pageNum += 1
        newUrl = url + "?p=" + str(pageNum)

        # get next page
        page = get_pages(newUrl)
        # recursion since different page but same HTML elements structures
        ringsData = parse_data_goldheart(url, page, pageNum, ringsData, get_pages)
    
    return ringsData

# to format price by extracting them and form then into integer
def format_price(tempStr):
    # extraction from e.g. $4,0310.00
    numList = re.findall("\d+", tempStr)

    return int("".join(numList) + "00")