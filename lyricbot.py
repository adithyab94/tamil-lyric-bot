import pandas as pd
import tweepy
import random
import os
from os import environ

CONSUMER_KEY = environ['CONSUMER_KEY']
CONSUMER_SECRET = environ['CONSUMER_SECRET']
ACCESS_KEY = environ['ACCESS_KEY']
ACCESS_SECRET = environ['ACCESS_SECRET']

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

df = pd.read_csv('.//lyricsOnly.csv')
song = df.sample()
song = str(song.values)
songlist = song.split("  ")
lyric = str(random.choice(songlist))
deletelist = ["'","[","]","\\xa0"]
for x in deletelist:
    lyric = lyric.replace(x,"")

if len(lyric)>240:
    x= len(lyric)-240
    tweetstring = str(lyric[:-x])
else:
    tweetstring = str(lyric)

api.update_status(tweetstring)