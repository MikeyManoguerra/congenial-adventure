"""
format text file into a list of python objects
"""

import re
from typing import Dict, List, Tuple

input('to run scraper hit "enter" to continue')

class WikiError(Exception):
    pass


class RedirectError(Exception):
    pass


with open("./content/trees.txt", mode="r") as f:
    _trees: str = f.read()

trees: List[str] = re.split(r"\n", _trees)

dil: List[Dict[str, str]] = []
known_sp = set()


for tree in trees:
    try:
        t: List[str] = re.split(r"-{1,2}", tree, maxsplit=1)
        latin = t[0].strip()
        if latin in known_sp:
            continue

        v = re.split(r"\s(?='|\(|var\.)", latin.strip(), maxsplit=1)
        dil.append(
            {
                "common": t[1].strip(),
                "latin": v[0].strip(),
                "variety": v[1].strip() if 1 < len(v) else None,
            }
        )
        known_sp.add(latin)

    except IndexError:
        # several lines of exposition make it through substitution filter, can safely ignore
        # print(tree)
        pass


"""
https://www.mediawiki.org/wiki/API:Parsing_wikitext#Example_1:_Parse_content_of_a_page
"""
import requests
from bs4 import BeautifulSoup
import uuid


API_URL = "http://en.wikipedia.org/w/api.php"
headers = {"User-Agent": "wikipedia"}


def taxonomic_units(soup: BeautifulSoup):
    """get taxonomic terms we care about"""
    taxonomy_terms = ["Family", "Genus", "Species"]
    taxonomy = {}
    try:
        for term in taxonomy_terms:
            taxonomy_unit = soup.find(
                "td", string=re.compile(r"{}:\n*".format(term))
            ).next_sibling.next_sibling.text
            taxonomy.update({term: re.sub(r"\W", r"", taxonomy_unit)})

            return taxonomy

    except (KeyError) as e:
        raise WikiError(e)

    except (AttributeError) as e:
        if term == "Species":  # we hit a page related to at least genus, ok for now
            return taxonomy

        raise RedirectError(e)


def species_uses(soup: BeautifulSoup):
    """collect 'Uses' section if present"""
    uses_heading = soup.find("span", id="Uses")
    uses = []

    try:
        for node in uses_heading.parent.next_siblings:  # parent is h2
            if node.name == "h2":
                break  # the header of the next section
            if node.name != "p":
                continue  # ignore none elements and other elements like img. assumes text we want is always in p (?)
            uses.append(node.get_text())

        return uses

    except AttributeError:
        return None


def species_summary(page_id: int):
    """makes second request with page id to get extract from article"""
    query_params = {
        "format": "json",
        "prop": "extracts",
        "action": "query",
        "pageids": [page_id],
    }

    try:
        r = requests.get(API_URL, params=query_params, headers=headers)
        res = r.json()
        extract = res["query"]["pages"][str(page_id)]["extract"]

        return BeautifulSoup(extract, "html.parser").get_text()

    except KeyError as e:
        raise WikiError(f"summary failed. error: {e}")


def species_information(page):
    """Top level parse, compiles different sub categories"""
    (soup, page_id) = init_soup(page)

    return {
        "taxonomy": taxonomic_units(soup),
        "summary": species_summary(page_id),
        "uses": species_uses(soup),
        # TODO link from title
    }


def init_soup(page: Tuple[BeautifulSoup, int]):
    """soup and pageid"""
    # TODO check for errors here V
    page_id: int = page["parse"]["pageid"]
    soup = BeautifulSoup(page["parse"]["text"]["*"], "html.parser")

    return (soup, page_id)


def wiki_page(latin_name: str) -> Dict:
    """returns parsed json of request using latin name as 'title of page'"""
    page_params = {"format": "json", "action": "parse", "page": latin_name}
    r = requests.get(API_URL, params=page_params, headers=headers)

    return r.json()


def redirect(page):
    """
    finds page to be redirected to and goes there instead
    """
    try:
        (old_soup, _) = init_soup(page)
        latin = old_soup.find(class_="redirectText").string
        return (wiki_page(latin), latin)

    except BaseException as e:
        raise WikiError(e)


tree_data = []
failures = []


def parsed_response(page, species):
    """find parts of response we care about, add to list"""
    try:
        return {**species, **species_information(page)}

    except RedirectError:
        (updated_page, latin) = redirect(page)
        updated_species = {**species}
        updated_species.update({"latin": latin})

        # re fetch the data with the correct species name spelling
        return parsed_response(updated_page, updated_species)


def content_file(tree):
    try:
        file_name = re.sub(r"[^a-zA-Z0-9]{1,}", "-", tree["latin"])

        with open(f"./content/species/{file_name.lower()}.md", "w") as f:
            latin = re.split(r" {1,}", tree["latin"], maxsplit=1)
            f.write("---\n")
            f.write(f"name: {tree['common']}\n")
            f.write(f"id: {uuid.uuid4()}\n")
            f.write(f"species: { latin[1] if len(latin) > 1 else ''}\n")
            f.write(f"genus: {latin[0]}\n")
            try:
                f.write(f"family: {tree['taxonomy']['Family']}\n")
            except:
                f.write(f"family: 'TBD'\n")
            f.write("---\n")
            f.write(f"Summary\n\n{tree['summary'] or 'TBD'}\n")
            f.write(f"Uses\n\n{tree['uses'] or 'TBD'}\n")
            if tree['variety']: f.write('variety:  '+tree['variety'])  
    except KeyError:
        raise BaseException

from os import path

from time import sleep
for idx, species in enumerate(dil):
    if idx % 10 == 0:
        sleep(25)


    try:
        # # if you have some of them
        # file_name =re.sub(r"[^a-zA-Z0-9]{1,}", "-", species["latin"]).lower()
        # if path.exists(f"./content/species/{file_name}.md"):
        #     continue
        page = wiki_page(species["latin"])
        content_file(parsed_response(page, species))



    except (WikiError, KeyError) as e:
        failures.append({**species, "error": e})

with open('./content/errors.txt', 'w')as f:
    f.write(str(failures))
# move above parsed response errorhere??
