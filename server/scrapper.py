import firebase_admin
from firebase_admin import db, storage
import os
import urllib.request
import re
import shutil
import ssl

from shops.goldHeart import parse_data_goldheart
from shops.loveNco import parse_data_lovenco

# to clear all the images downloaded from previous web scrapping
def clear_images(imgDirPath):
    try:
        # check in case folder doesn't exist
        if os.path.isdir(imgDirPath):
            # shutil can delete folder despite there are files in it
            shutil.rmtree(imgDirPath)
        # create "shops/images" folder
        os.mkdir(imgDirPath)
    except OSError as e:
        print(e)

# to store data into firebase
# ref: https://firebase.googleblog.com/2017/07/accessing-database-from-python-admin-sdk.html
# ref: https://code.luasoftware.com/tutorials/firebase/upload-file-to-firebase-storage-python/
# ref: https://cloud.google.com/storage/docs/uploading-objects
# ref: https://googleapis.dev/python/storage/latest/buckets.html
def db_storage(ringsData, imgDirPath):
    cred = firebase_admin.credentials.Certificate("./firebase_key.json")
    firebase_admin.initialize_app(cred, {"databaseURL": "https://engagementringwebapp.firebaseio.com/",
        "storageBucket": "engagementringwebapp.appspot.com"})

    # to access the root level of the collection node
    root = db.reference()
    # delete "shops" node to wipe all previous data
    # shops might sell different rings already so better to wipe all old data
    root.child("shops").delete()
    # push new data obtained after recently web scrapping
    root.child("shops").push(ringsData)

    # upload all images to firebase storage
    bucket = storage.bucket()
    # delete all images in the firebase storage
    # shops might sell different rings already so better to wipe all old data
    bucket.delete_blobs(bucket.list_blobs())
    # get each image and upload it
    for file in os.listdir(imgDirPath):
        # set the destination name
        blob = bucket.blob(file)
        # set the source path
        blob.upload_from_filename(imgDirPath + "/" + file)

    print("Finished uploadeding to database...")


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

# parse page that is scrapped from the website
def parse_data(urlDict, pageDict):
    ringsData = dict()
    ringCounter = 0

    # parse the html
    ringsData, ringCounter = parse_data_goldheart(urlDict["goldHeart"], 
        pageDict["goldHeart"], 1, ringsData, ringCounter, get_pages)
    ringsData, ringCounter = parse_data_lovenco(urlDict["love_N_Co"], 
        pageDict["love_N_Co"], 1, ringsData, ringCounter, get_pages)

    return ringsData


def main():
    # URLs to scrap data from
    urlDict = {"goldHeart" : "https://shop.goldheart.com/bridal/engagement-rings.html",
        "love_N_Co": "https://shop.love-and-co.com/category/diamond-rings/"}
    # path to folder that stores image of rings from web scrapping
    imgDirPath = str(os.getcwd()) + "/shops/images"

    # to clear all the images downloaded from previous web scrapping
    clear_images(imgDirPath)

    # get scrapped pages
    pageDict = get_pages(urlDict)

    # parse the html
    ringsData = parse_data(urlDict, pageDict)

    db_storage(ringsData, imgDirPath)


if __name__ == "__main__":
    main()