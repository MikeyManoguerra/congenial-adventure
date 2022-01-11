import requests
from bs4 import BeautifulSoup
from time import sleep

BASE_URL = "https://www.muralarts.org/artworks/"
MURAL_ARTS_URL = f"{BASE_URL}?sf_paged="
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    # "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    # "Accept-Language": "en-US,en;q=0.5",
    # "Accept-Encoding": "gzip, deflate, br",
    # "Connection": "keep-alive",
    # "Cache-Control": "no-cache",
}

input('to run scraper hit "enter" to continue')

def write_list_to_file(l):
    with open("./content/raw-titles.txt", "a") as f:
        for title in l:
            f.write(title.get_text() + "\n")


def find_titles_in_soup(s):
    lst = s.find_all("h1")
    lst.extend(s.find_all("a", "h1"))
    return lst

req = requests.get(BASE_URL, headers=headers)
soup = BeautifulSoup(req.text, "html.parser")
write_list_to_file(find_titles_in_soup(soup))



# This was silly in retrospect. instead of generating the slugs myself. i could have just pulled the href!
# can use the query results to search by titles, and then get the link for the 40 or so that 404
# https://www.muralarts.org/?s=american+tableau


for page in range(2, 23):
    sleep(4) if page % 3 == 0 else sleep(7)
    # try:
    req = requests.get(MURAL_ARTS_URL + str(page), headers=headers)
    soup = BeautifulSoup(req.text, "html.parser")
    titles = find_titles_in_soup(soup)
    write_list_to_file(titles)
    print(page , 'complete')
    # except BaseException as e:
    #     import pdb

    #     pdb.set_trace()
