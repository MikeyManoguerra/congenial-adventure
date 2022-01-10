import re

with open("./content/raw-titles.txt", "r") as f:
    titles = f.read()

l = list(set(titles.split("\n")))

def title_and_slug(title):
    slug = re.sub(r"[^a-zA-Z0-9]{1,}", "-", title.lower())
    slug = re.sub(r"(-$|^-)", "", slug)
    return (title, slug)
    

with open("./content/slugs.txt", "a") as f:
    for t in l:
        (title, slug) = title_and_slug(t)
        f.write(slug + "\n")
