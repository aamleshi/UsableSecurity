import gspread
from oauth2client.service_account import ServiceAccountCredentials
from utils import keyword_to_videos
import time
from tqdm import tqdm


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
        #print(row[2])
        videoRecs = keyword_to_videos(row[2])
        #print(videoRecs)
        for item in videoRecs["items"]:
            newRec = [str(time.time()), "https://www.youtube.com/watch?v="+item['id']['videoId'], rowNum]
        youtubeRecSheet.append_row(newRec)

def main():
    UIDs = ['0001', '0001']
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('owner_creds.json', scope)
    client = gspread.authorize(creds)
    for UID in tqdm(UIDs):
        #can multithread this if need be
        updateUserRecs(UID, client)

if __name__ == '__main__':
    main()