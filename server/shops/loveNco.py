from bs4 import BeautifulSoup
import re
import ssl
import urllib

def parse_data_lovenco(url, page, pageNum, ringsData, ringCounter, get_pages):
    soup = BeautifulSoup(page, "html.parser")
    
    return get_data(url, pageNum, soup, ringsData, ringCounter, get_pages)


def get_data(url, pageNum, soup, ringsData, ringCounter, get_pages):
    # check if already have "goldHeart" key in ringsData
    try:
        ringsData['Love & Co']
    except:
        # append a new dictionary to goldHeart key till like JSON format since don't have "goldHeart" key
        ringsData['Love & Co'] = list()

    # get the sections that has info of the rings
    ringsSection = soup.find("ul", attrs={"class": "products columns-4"})

    # get a list of rings from that page
    listOfRings = ringsSection.find_all("li")

    # traverse the list obtained to extract each ring's info
    for ring in listOfRings:
        # to create a temp dictionary so later can append to the list in ringsData
        tempDict = dict()

        # fill up everything variable/values with "N/A" incase website don't have
        tempDict['ringCarat'] = "N/A"
        tempDict['ringDiaClarity'] = "N/A"
        tempDict['ringDiaColor'] = "N/A"
        tempDict['ringImage'] = "N/A"
        tempDict['ringPrice'] = 0

        # get url to the specific ring's page
        tempDict['ringSiteURL'] = ring.a['href']

        # download image
        ringImageName, ringCounter = get_image(ring.a.img['src'], ringCounter)
        # get the ring image's name
        tempDict['ringImage'] = ringImageName

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

        # append to the list in our main storage ringsData
        ringsData['Love & Co'].append(tempDict)
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
        ringsData, ringCounter = parse_data_lovenco(url, page, pageNum, ringsData,  ringCounter, get_pages)

    return ringsData, ringCounter


# to format price by extracting them and form then into integer
def format_price(tempStr):
    # extraction from e.g. $4,0310.00
    numList = re.findall("\d+", tempStr)

    return int("".join(numList))

# download image and return image name and new ring counter
def get_image(imageURL, ringCounter):
    # create a unique name for the ring's image and also consider it might be .PNG, .jpeg, .jpg, etc
    ringImageName = str(ringCounter) + (imageURL[-4:] if "." == imageURL[-4]
        else imageURL[-5:])
    # increment ring counter
    ringCounter += 1
    # to remove unable to verify SSL cert
    ssl._create_default_https_context = ssl._create_unverified_context
    # download images and store them in the "shops/images" folder
    urllib.request.urlretrieve(imageURL, "shops/images/" + ringImageName)

    # change ring name to this URL to allow us to easily access the file on fire storage from our website
    ringImageName = "https://storage.googleapis.com/engagementringwebapp.appspot.com/" + ringImageName

    return ringImageName, ringCounter