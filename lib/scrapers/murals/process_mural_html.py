import bs4
import re


def title_and_slug(title):
    """duped"""
    slug = re.sub(r"[^a-zA-Z0-9]{1,}", "-", title.lower())
    slug = re.sub(r"(-$|^-)", "", slug)
    return (title, slug)


def _log(err):
    with open("./content/errors.txt", "a") as f:
        f.write(str(err) + "\n")
        f.close()


def _log_404(data):
    with open("./content/404.txt", "a") as f:
        f.write(str(data) + "\n")
        f.close()


def mural_info(li):
    res = []
    for c in li.contents:
        if type(c) != bs4.element.Tag:
            continue
        res.append(c.get_text())
    if len(res) < 2:
        return (None, None)
    return (res[0], res[1])


def is_404(sp):
    try:
        possibly_404 = sp.find("title").get_text().split("-")[0]
        return possibly_404.strip().lower() == "page not found"
    except BaseException:
        return True


def search_html(h, data):

    soup = bs4.BeautifulSoup(h, "html.parser")
    (title, slug) = data
    the_mural = {
        "artists": [],
        "title": title,
        "slug": slug,
    }

    if is_404(soup):
        _log_404(data)
        return
    try:

        the_mural["artists"].extend(
            [artist.get_text() for artist in soup.find_all("a", "border btn artist")]
        )

        info = soup.find("ul", "artwork-info")

        for li in info.find_all("li"):
            (info_name, info_info) = mural_info(li)
            # always there at this point
            if info_name:
                the_mural.update({info_name: info_info})

        related = soup.find("div", "related")
        related_links = []

        if related:
            for r in related.find_all("a"):
                related_links.extend(r.get_attribute_list("href"))

        # print(the_mural, related_links)

    except AttributeError as e:
        _log({"error": e, "data": data, "info": info})


with open("./content/raw-titles.txt", "r") as f:
    titles = f.read()


l = list(set(titles.split("\n")))
t_and_s = [title_and_slug(t) for t in l]

for mural in t_and_s:
    try:
        with open("./content/.html/" + mural[1] + ".html", "r") as f:
            html = f.read()
            search_html(html, mural)
    except FileNotFoundError as e:
        _log({"error": e, "data": mural})

_log("\n\nPROCESS COMPLETE\n\n")
