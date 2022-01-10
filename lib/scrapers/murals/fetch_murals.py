import requests
from bs4 import BeautifulSoup
from time import sleep
import re

BASE_URL = "https://www.muralarts.org/artworks/"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    # "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    # "Accept-Language": "en-US,en;q=0.5",
    # "Accept-Encoding": "gzip, deflate, br",
    # "Connection": "keep-alive",
    # "Cache-Control": "no-cache",
}

input('to run scraper hit "enter" to continue')


with open("./content/slugs.txt", "r") as f:
    titles = f.read()

l = titles.split("\n")

for idx, title in enumerate(l):
    if idx % 30 == 0 and idx != 0:
        sleep(60)
    sleep(4) if idx % 3 == 0 else sleep(7)
    # try:
    req = requests.get(BASE_URL + title + "/", headers=headers)

    with open(f"./content/{title}.html", "w") as f:
        f.write(req.text)
    print(idx, "complete")

    # except BaseException as e:
    #     import pdb

    #     pdb.set_trace()
