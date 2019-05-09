# -*- coding: utf-8 -*-

import os
import googleapiclient.discovery
def keyword_to_videos(query, maxResults=1):
    return {"videoLink": 1}

def keyword_to_videos2(query, maxResults=1):
    """Lists YouTube videos and metadata for given search keyword.

    Keyword args: 
    query (str) -- term to search
    maxResults (int) -- max number of videos returned (default is 1)
    """

    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
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
        q=query
    )
    print('hi')
    response = request.execute()

    print(response)
    return response

# keyword_to_videos('cats')


    ##get thumbnail url, get video id.
