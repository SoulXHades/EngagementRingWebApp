def parse_data_goldheart(soup, ringsData):
    # get the sections that has info of the rings
    ringsSection = soup.find_all("li", attrs={"class": "item last"})
    
    for ringSection in ringsSection:
        # append a new dictionary to goldHeart key till like JSON format
        ringsData['goldHeart'] = dict()

        # get the URL to the ring's webpage
        ringSiteURL = ringSection.find_all("a", attrs={"class": "product-image"}, href=True)
        # get href from <a class="product-image" href="https://shop.goldheart.com/bridal...
        ringsData['goldHeart']['ringSiteURL'] = ringSiteURL[0]['href']
        
        # get ring image's URL
        ringImage = ringSection.find_all("img", src=True)
        ringsData['goldHeart']['ringImage'] = ringImage[0]['src']

        # get the brand of the ring
        ringBrand = ringSection.find_all("div", attrs={"class": "product-line"})
        ringsData['goldHeart']['ringBrand'] = ringBrand[0].text

        # get the name of the ring
        ringsData['goldHeart']['ringName'] = ringSection.h2.a.text

        # get the price of the ring
        ringBrand = ringSection.find_all("span", attrs={"class": "price"})
        ringsData['goldHeart']['ringBrand'] = ringBrand[0].text
        