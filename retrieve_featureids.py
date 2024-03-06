import re
import csv

# Define regex patterns
href_pattern = re.compile(r'title=\"(.*?)\"')
kommunenummer_pattern = re.compile(r'fylkesnummer\">(.*?)</td>')

with open("fylker_uvann.txt") as f:
    input_text = f.read()

# Find all matches
matches = re.findall(href_pattern, input_text)
kommunenumbers = re.findall(kommunenummer_pattern, input_text)

# Create a list of tuples containing (title, kommunenummer)
data = list(zip(kommunenumbers, matches))

# Write data to CSV
with open('fylke_featureids.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Fylkesnummer', 'FeatureID'])  # Write header
    for row in data:
        writer.writerow(row)