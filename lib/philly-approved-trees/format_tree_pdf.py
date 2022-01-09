"""
This turns philly tree pdf into list of trees
any discrepencies can be ignored/parsed out in next script
"""
import re
from io import StringIO

output_string = StringIO()
from pdfminer.high_level import extract_text_to_fp

with open("./content/philly-approved-trees.pdf", "rb") as fin:
    extract_text_to_fp(fin, output_string)

trees = re.sub(r"\s+", r" ", output_string.getvalue())
trees = re.sub(r"–", r"--", trees)  # Replace en dash with hyphens argggg!
trees = re.sub(r"\,\s|Spring|Fall|Sparingly|Moderately|Frequently|plant", r"\n", trees)
trees = re.sub(r"\s*\n+\s*", r"\n", trees)
trees = re.sub(r"'\n", r"'", trees)
trees = re.sub(r"”|“|’|\"|‘", r"'", trees) #weird quote marks
trees = re.sub(r"Gold'Malus", r"Gold'\nMalus", trees)
trees = re.sub(r"-inclusive|\d+.*(wide|\d+)", r"", trees)

with open("./content/trees.txt", mode="w") as f:
    f.write(trees)
