import gspread
from oauth2client.service_account import ServiceAccountCredentials
from utils import keyword_to_videos
import time
from tqdm import tqdm

"""
# TODO:
Mark visited endpoint rows as visited
Add rate-limiting failsafes?
"""


def updateTime(client):
    yotubeTimeEndpoint = client.open('YoutubeTimeForm (Responses)').get_worksheet(0)
    RIDdict = {}
    values = youtubeTimeEndpoint.get_all_values()
    for row in tqdm(values):
        if row[2] == '':
            timestamp = row[0]
            data = row[1]
            RID = data[:20]
            payload = data[20:]
            print(list(RIDdict.keys()))
            if RID not in list(RIDdict.keys()):
                RIDdict[RID] = []
            RIDdict[RID].append([payload, timestamp])
    UIDdict = processRIDdictYT(RIDdict)
    print(UIDdict)
    for UID in UIDdict.keys():
        writeToAmzSheet(UIDdict[UID], UID, client)

def processRIDdictAMZ(RIDdict):
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
            RID = data[:20]
            payload = data[20:]
            print(list(RIDdict.keys()))
            if RID not in list(RIDdict.keys()):
                RIDdict[RID] = []
            RIDdict[RID].append([payload, timestamp])
    UIDdict = processRIDdictAMZ(RIDdict)
    print(UIDdict)
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
    amazonHistorySheet = client.open(UID).get_worksheet(0)
    for row in rowList:
        amazonHistorySheet.append_row(row)

def updateUserRecs(UID, client):
    amazonHistorySheet = client.open(UID).get_worksheet(0)
    youtubeRecSheet = client.open(UID).get_worksheet(1)
    for rowNum in tqdm(range(2,amazonHistorySheet.row_count)):
        row = amazonHistorySheet.row_values(rowNum)
        if row == []:
            break
        #print(len(row))
        if len(row) == 4:
            continue
        amazonHistorySheet.update_cell(rowNum, 4, str(time.time()))
        #print(row[2])for UID in tqdm(UIDs):
        #can multithread this if need be
        updateUserRecs(UID, client)
        videoRecs = keyword_to_videos(row[2])
        #print(videoRecs)
        for item in videoRecs["items"]:
            newRec = [str(time.time()), "https://www.youtube.com/watch?v="+item['id']['videoId'], rowNum]
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
    updateAmzHistory(client)
    for UID in tqdm(UIDs):
        #can multithread this if need be
        updateUserRecs(UID, client)


if __name__ == '__main__':
    main()
