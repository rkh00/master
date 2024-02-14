import csv
import json

# Open the CSV file for reading
with open('kommunenummer.csv', 'r', encoding='utf-8') as csvfile:
    # Create a CSV reader object
    csvreader = csv.reader(csvfile)
    
    # Skip the header row
    next(csvreader)
    
    # Initialize an empty list to store JavaScript objects
    js_list = []
    
    # Iterate through each row in the CSV file
    for row in csvreader:
        # Create a JavaScript object for each row
        js_object = {
            'nummer': row[0],
            'navn': row[1]
        }
        
        # Add the JavaScript object to the list
        js_list.append(js_object)

# Save the JavaScript list as a JSON file
with open('kommunenummer.json', 'w', encoding='utf-8') as jsonfile:
    json.dump(js_list, jsonfile, ensure_ascii=False)
