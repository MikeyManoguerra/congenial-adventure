import json
import uuid
import re

input('this will duplicate exiting murals! with new ids! be careful! "enter" to continue')

with open("./content/north_philly.json", "r") as f:
    murals = json.load(f)


def artists(a):
    if not len(a):
        return "Unknown"

    names = a[0]
    for idx, artist in enumerate(a):
        if idx == 0:
            continue
        names = names + (", " + artist)

    return names


def related(r):
    if not len(r):
        return

    links = ""
    for link in r:
        links = links + (link + "\n")

    return links


def location(loc):
    if not len(loc):
        return

    for osm in loc:

        return {
            "address": osm["display_name"],
            "zip": osm["address"].get("postcode", None),
            "geojson": {"type": "Point", "coordinates": [osm["lon"], osm["lat"]]},
            "place_id": osm["place_id"],
        }


for mural in murals:
    try:
        loc = location(mural["location"]["osm"])

        mural['slug']= mural['slug'] if loc and len(loc) else '_'+mural['slug']

        print('not making file to preserve id of existing content')
        print('be intentional about what files you are creating')
        continue
        with open(f"./content/murals/{mural['slug']}.md", "w") as f:
            f.write("---\n")
            f.write(f"title: {mural['title']}\n")
            f.write(f"id: {uuid.uuid4()}\n")
            f.write(f"neighborhood: {mural['neighborhood']}\n")
            f.write(f"attribution: {artists(mural['artists'])}\n")
            f.write(f"publish: true\n")
            if loc:
                f.write(f"location: {json.JSONEncoder().encode(loc['geojson'])}\n")
            f.write("---\n")
            f.write(
                f"""
location: {mural['location']['original']}
\n\n            
related: {related(mural['related'])}
\n\n
            """
            )
            if loc:
                f.write(
                    f"""
address: {loc['address']}
\n\n
zip: {loc['zip']}
\n\n
                """
                )

    except KeyError:
        raise BaseException
