import gspread
from oauth2client.service_account import ServiceAccountCredentials
from utils import keyword_to_videos
import time
from tqdm import tqdm
import dateparser
import datetime 

"""
# TODO:
Mark visited endpoint rows as visited
Add rate-limiting failsafes?
"""


def updateTime(client):
    youtubeTimeEndpoint = client.open('YoutubeTimeForm (Responses)').get_worksheet(0)
    RIDdict = {}
    values = youtubeTimeEndpoint.get_all_values()
    # print(values)
    for row in tqdm(values):
        if row[2] == '':
            timestamp = row[0]
            data = row[1]
            # print(data)
            RID = data[:5]
            payload = data[5:]
            # print(list(RIDdict.keys()))
            if RID not in list(RIDdict.keys()):
                RIDdict[RID] = []
            RIDdict[RID].append([payload, timestamp])
    UIDdict = processRIDdictYT(RIDdict)
    for UID in UIDdict.keys():
        if len(UID) == 4:
            writeToYtSheet(UIDdict[UID], UID, client)

def processRIDdictYT(RIDdict):
    RIDs = list(RIDdict.keys())
    UIDdict = {}
    for RID in RIDs:
        rawRow = RIDdict[RID]
        UID = ""
        Time = ""
        for element in rawRow:
            rawElement = element[0]
            if rawElement[:3] == "UID":
                UID = rawElement[3:]
            elif rawElement[:4] == "TIME":
                Time = rawElement[4:]
        if UID not in UIDdict:
            UIDdict[UID] = [[element[1],Time]]
        else:
            UIDdict[UID].append([element[1],Time])
    return UIDdict

def updateAmzHistory(client):
    amazonHistEndpoint = client.open("AmazonHistForm (Responses)").get_worksheet(0)
    RIDdict = {}
    values = amazonHistEndpoint.get_all_values()
    for row in tqdm(values):
        if row[2] == '':
            timestamp = row[0]
            data = row[1]
            RID = data[:5]
            payload = data[5:]
            if RID not in list(RIDdict.keys()):
                RIDdict[RID] = []
            RIDdict[RID].append([payload, timestamp])
    UIDdict = processRIDdictAMZ(RIDdict)
    for UID in UIDdict.keys():
        writeToAmzSheet(UIDdict[UID], UID, client)


def processRIDdictAMZ(RIDdict):
    RIDs = list(RIDdict.keys())
    UIDdict = {}
    for RID in RIDs:
        rawRow = RIDdict[RID]
        UID = ""
        URL = ""
        Name = ""
        for element in rawRow:
            rawElement = element[0]
            if rawElement[:3] == "UID":
                UID = rawElement[3:]
            elif rawElement[:3] == "URL":
                URL = rawElement[3:]
            elif rawElement[:4] == "NAME":
                Name = rawElement[4:]
        if UID not in UIDdict:
            UIDdict[UID] = [[element[1],URL, Name]]
        else:
            UIDdict[UID].append([element[1],URL,Name])
    return UIDdict

def writeToAmzSheet(rowList, UID, client):
    amazonHistorySheet = client.open("0000").get_worksheet(0)
    values = amazonHistorySheet.get_all_values()
    if len(values) > 1:
        maxTime = values[-1][0]
        oldDate = dateparser.parse(maxTime)
    else:
        oldDate = dateparser.parse("9/27/1997")
    # print(values)
    for row in rowList:
        if row[0] != "" and dateparser.parse(row[0]) > oldDate:
            amazonHistorySheet.append_row(row)

def writeToYtSheet(rowList, UID, client):
    ytTimeSheet = client.open(UID).get_worksheet(2)
    values = ytTimeSheet.get_all_values()
    if len(values) > 1:
        maxTime = values[-1][0]
        oldDate = dateparser.parse(maxTime)
    else:
        oldDate = dateparser.parse("9/27/1997")
    for row in rowList:
        if row[0] != "" and dateparser.parse(row[0]) > oldDate:
            ytTimeSheet.append_row(row)

def updateUserRecs(UID, client):
    amazonHistorySheet = client.open(UID).get_worksheet(0)
    youtubeRecSheet = client.open(UID).get_worksheet(1)
    amzRows = amazonHistorySheet.get_all_values()
    #print(amzRows)
    for rowNum in tqdm(range(1,len(amzRows))) :
        row = amzRows[rowNum]
        if row == []:
            continue
        #print(len(row))
        if row[3] != "":
            continue
        amazonHistorySheet.update_cell(rowNum+1, 4, str(time.time()))
        #print(row[2])for UID in tqdm(UIDs):
        videoRecs = keyword_to_videos(row[2][:40])
        for item in videoRecs["items"]:
            newRec = [str(time.time()), "https://www.youtube.com/watch?v="+item['id']['videoId'], rowNum]
            print(newRec)
            youtubeRecSheet.append_row(newRec)

def main2():
    UIDs = ['0001', '0001']
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('owner_creds.json', scope)
    client = gspread.authorize(creds)
    for UID in tqdm(UIDs):
        #can multithread this if need be
        updateUserRecs(UID, client)
def main():
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('owner_creds.json', scope)
    client = gspread.authorize(creds)
    print("Updating Amazon History")
    updateAmzHistory(client)
    print("Updating Youtube Viewtime")
    updateTime(client)

    UIDs = ['0000', '0000']

    for UID in tqdm(UIDs):
        #can multithread this if need be
        updateUserRecs(UID, client)


if __name__ == '__main__':
    main()
