from bs4 import BeautifulSoup
import re

def parse_data_lovenco(url, page, pageNum, ringsData, get_pages):
    soup = BeautifulSoup(page, "html.parser")
    
    return get_data(url, pageNum, soup, ringsData, get_pages)


def get_data(url, pageNum, soup, ringsData, get_pages):
    # check if already have "goldHeart" key in ringsData
    try:
        ringsData['love_N_Co']
    except:
        # append a new dictionary to goldHeart key till like JSON format since don't have "goldHeart" key
        ringsData['love_N_Co'] = list()

    # get the sections that has info of the rings
    ringsSection = soup.find("ul", attrs={"class": "products columns-4"})

    # get a list of rings from that page
    listOfRings = ringsSection.find_all("li")

    # traverse the list obtained to extract each ring's info
    for ring in listOfRings:
        # to create a temp dictionary so later can append to the list in ringsData
        tempDict = dict()

        # get url to the specific ring's page
        tempDict['ringSiteURL'] = ring.a['href']

        # get ring image's URL
        tempDict['ringImage'] = ring.a.img['src']

        tempDict['ringName'] = ring.a.h2.text

        # get the specific ring's page for more infor
        page = get_pages(tempDict['ringSiteURL'])
        ringPageSoup = BeautifulSoup(page, "html.parser")

        # get the property section of the ring
        ringPropertiesSection = ringPageSoup.find("div", attrs={"class": "product-attributes"})
        ringProperties = ringPropertiesSection.find_all("div")    

        # extract the properties of the ring
        for ringProperty in ringProperties:
            if "Clarity" in ringProperty.label.text:
                # get the diamond's clarity
                tempDict['ringDiaClarity'] = ringProperty.span.text
            elif "Colour" in ringProperty.label.text:
                # get the diamond's color
                tempDict['ringDiaColor'] = ringProperty.span.text
            elif "Carat" in ringProperty.label.text:
                # get the diamond's carat
                tempDict['ringCarat'] = ringProperty.span.text
        
        ringPriceSection = ringPageSoup.find("p", attrs={"class": "price variable-no-range"})
        # check if have price. Don't have means out of stock
        if ringPriceSection:
            # get the data in integer by removing "."
            tempDict['ringPrice'] = format_price(ringPriceSection.span.text)
        else:
            tempDict['ringPrice'] = 0

        # append to the list in our main storage ringsData
        ringsData['love_N_Co'].append(tempDict)
        tempDict = None

    # go to the page navigation section
    pageNavigateSection = soup.find("ul", attrs={"class": "page-numbers"})
    pageNavigations = pageNavigateSection.find_all("li")

    # check if list is empty
    # if list is empty, continue to go to the next page
    if 'class="page-numbers current"' not in str(pageNavigations[-1]):
        pageNum += 1
        newUrl = url + "page/" + str(pageNum) + "/"

        # get next page
        page = get_pages(newUrl)
        # recursion since different page but same HTML elements structures
        ringsData = parse_data_lovenco(url, page, pageNum, ringsData, get_pages)

    return ringsData


# to format price by extracting them and form then into integer
def format_price(tempStr):
    # extraction from e.g. $4,0310.00
    numList = re.findall("\d+", tempStr)

    return int("".join(numList))