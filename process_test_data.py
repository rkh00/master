import numpy as np
import pandas as pd
import pyproj

source_epsg = "epsg:32632"
target_epsg = "epsg:4258"

transformer = pyproj.Transformer.from_crs(source_epsg,target_epsg)
geod = pyproj.Geod(ellps="WGS84")

water = {"True": "water", "False": "no water"}
coordinate_systems = {"4258": "etrs89", "25832": "utm32", "25833": "utm33", "25835": "utm35", "32632": "utm32", "32633": "utm33", "32635": "utm35"}
centroids = ["moment", "arith", "rms", "harmonic", "geomean", "median", "minbound"]

small_municipalities = [
  "Aukra",
  "Færder",
  "Hvaler",
  "Lørenskog",
  "Rælingen",
  "Sande",
  "Sola",
  "Træna",
  "Utsira",
  "Ås",
]

large_municipalities = [
  "Hammerfest",
  "Kárásjohka - Karasjok",
  "Lebesby",
  "Lesja",
  "Nordreisa",
  "Nore og Uvdal",
  "Stor-Elvdal",
  "Trysil",
  "Vinje",
  "Hattfjelldal",
]

coastal_municipalities = [
  "Asker",
  "Askøy",
  "Balsfjord",
  "Bjørnafjorden",
  "Flakstad",
  "Gamvik",
  "Hamarøy",
  "Hemnes",
  "Kristiansand",
  "Skjervøy",
]

inland_municipalities = [
  "Bardu",
  "Bygland",
  "Enebakk",
  "Evje og Hornnes",
  "Melhus",
  "Nordre Land",
  "Snåase - Snåsa",
  "Skiptvet",
  "Øystre Slidre",
  "Ål",
]

small_county = ["Vestfold"]
large_county = ["Finnmark – Finnmárku – Finmarkku"]
coastal_county = ["Vestland"]
inland_county = ["Innlandet"]

# azimuth1, azimuth2, distance = geod.inv(lon0, lat0, lon1, lat1)

# lon, lat = transformer.transform(x,y)

df_testdata = pd.read_csv("test_data/all_test_data.csv")

df_kommunenr = pd.read_csv("kommunenummer.csv")
df_fylkesnr = pd.read_csv("fylkesnummer.csv")

df_control_kommuner = pd.read_csv("../midtpunkt_kommuner.csv")
df_control_fylker = pd.read_csv("../midtpunkt_fylker.csv")

kommuner_control_data = {}
fylker_control_data = {}

from_25833_to_4258 = pyproj.Transformer.from_crs("epsg:25833","epsg:4258")

for index, row in df_control_kommuner.iterrows():
    nr = row['K-nr.']
    x = row['Øst UTM33']
    y = row['Nord UTM33']
    lon, lat = from_25833_to_4258.transform(x,y)
    kommuner_control_data[nr] = (lon, lat)

for index, row in df_control_fylker.iterrows():
    nr = row['F-nr.']
    x = row['Øst UTM33']
    y = row['Nord UTM33']
    lon, lat = from_25833_to_4258.transform(x,y)
    fylker_control_data[nr] = (lon, lat)

columns = ["small_munic_avg_diff","small_munic_median_diff","small_munic_std_diff","large_munic_avg_diff","large_munic_median_diff","large_munic_std_diff","coastal_munic_avg_diff","coastal_munic_median_diff","coastal_munic_std_diff","inland_munic_avg_diff","inland_munic_median_diff","inland_munic_std_diff","small_county_diff","large_county_diff","coastal_county_diff","inland_county_diff"]

df_final = pd.DataFrame(columns=columns)



print(df_final)