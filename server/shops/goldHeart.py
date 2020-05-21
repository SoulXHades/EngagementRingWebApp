from bs4 import BeautifulSoup
import re
import ssl
import urllib

def parse_data_goldheart(url, page, pageNum, ringsData, ringCounter, get_pages):
    soup = BeautifulSoup(page, "html.parser")
    
    return get_data(url, pageNum, soup, ringsData, ringCounter, get_pages)


def get_data(url, pageNum, soup, ringsData, ringCounter, get_pages):
    # get the sections that has info of the rings
    ringsSection = soup.find_all("li", attrs={"class": "item last"})

    # check if already have "goldHeart" key in ringsData
    try:
        ringsData['Goldheart']
    except:
        # append a new dictionary to goldHeart key till like JSON format since don't have "goldHeart" key
        ringsData['Goldheart'] = list()
    
    for ringSection in ringsSection:
        tempDict = dict()

        # fill up everything variable/values with "N/A" incase website don't have
        tempDict['ringCarat'] = "N/A"
        tempDict['ringDiaClarity'] = "N/A"
        tempDict['ringDiaColor'] = "N/A"
        tempDict['ringImage'] = "N/A"
        tempDict['ringPrice'] = 0

        # get the URL to the ring's webpage
        ringSiteURL = ringSection.find_all("a", attrs={"class": "product-image"}, href=True)
        # get href from <a class="product-image" href="https://shop.goldheart.com/bridal...
        tempDict['ringSiteURL'] = ringSiteURL[0]['href']
        
        # get ring image's URL
        ringImage = ringSection.find("img", src=True)
        # download image
        ringImageName, ringCounter = get_image(ringImage['src'], ringCounter)
        # get the ring image's name
        tempDict['ringImage'] = ringImageName

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
        ringsData['Goldheart'].append(tempDict)
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
        ringsData, ringCounter = parse_data_goldheart(url, page, pageNum, ringsData, ringCounter, get_pages)
    
    return ringsData, ringCounter

# to format price by extracting them and form then into integer
def format_price(tempStr):
    # extraction from e.g. $4,0310.00
    numList = re.findall("\d+", tempStr)

    return int("".join(numList) + "00")

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