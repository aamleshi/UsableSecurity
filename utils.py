# -*- coding: utf-8 -*-

import os
import googleapiclient.discovery


def keyword_to_videos(query, maxResults=1):
    """Lists YouTube videos and metadata for given search keyword.

    Keyword args: 
    query (str) -- term to search
    maxResults (int) -- max number of videos returned (default is 1)
    """


    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"

    #open api-key.txt for project developer key
    f = open('api-key.txt')
    DEVELOPER_KEY = f.readline()

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)

    request = youtube.search().list(
        part="snippet",
        maxResults=maxResults,
        q=query,
        safeSearch="strict",
        type="video"
    )
    response = request.execute()
    return response

# keyword_to_videos('cats')
if __name__ == '__main__':
    print(keyword_to_videos("cat"))

    ##get thumbnail url, get video id.
