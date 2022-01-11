import json
import uuid
import requests
import re


input('to run osm hit "enter" to continue')

with open("./content/murals.json", "r") as f:
    murals = json.load(f)

# x = list(set([m['Neighborhood'] for m in murals]))


nhs = ["North Philadelphia", "Fishtown / Kensington", "Near Northeast Philadelphia"]
murals = list(filter(lambda m: m["neighborhood"] in nhs, murals))

class NoMatchException(BaseException):
    pass

BASE_URL = "https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q="

for mural in murals:
    mural["location"] = mural["location"].strip().lower()

    try:
        #attempt to turn pattern "28th and broad" into "2801 broad". some successes 
        no_and = re.split(r"and|between|&", mural["location"])
        if not len(no_and) > 1:
            raise NoMatchException
        num = re.search(r"^\d{1,}", mural["location"])
        if not num:
            raise NoMatchException
        to_paramatize = (
            num.group() + "01" + " " + (no_and[1][0:-1] if no_and[-1] == "s" else no_and[1])
        )

    except NoMatchException:
        to_paramatize = mural["location"]

    query = re.sub(r" ", "+", to_paramatize)
    rs = requests.get(BASE_URL + query + "+Philadelphia+PA+USA")
    mural["location"] = {
        "address": to_paramatize if to_paramatize != mural["location"] else None,
        "original": mural["location"],
        "osm": rs.json(),
    }


with open("./content/north_philly.json", "w") as f:
    json.dump(murals, f)
