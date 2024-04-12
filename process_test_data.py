import numpy as np
import pandas as pd
import pyproj

# source_epsg = "epsg:32632"
# target_epsg = "epsg:4258"

# transformer = pyproj.Transformer.from_crs(source_epsg,target_epsg)
geod = pyproj.Geod(ellps="WGS84")

water = {True: "water", False: "no water"}
coordinate_systems = {"etrs89": [4258], "utm32": [25832, 32632], "utm33": [25833, 32633], "utm35": [25835, 32625]}
centroids = ["moment", "arith", "rms", "harmonic", "geomean", "median", "minbound"]

# small_municipalities = [
#   "Aukra",
#   "Færder",
#   "Hvaler",
#   "Lørenskog",
#   "Rælingen",
#   "Sande",
#   "Sola",
#   "Træna",
#   "Utsira",
#   "Ås",
# ]

# large_municipalities = [
#   "Hammerfest",
#   "Kárásjohka - Karasjok",
#   "Lebesby",
#   "Lesja",
#   "Nordreisa",
#   "Nore og Uvdal",
#   "Stor-Elvdal",
#   "Trysil",
#   "Vinje",
#   "Hattfjelldal",
# ]

# coastal_municipalities = [
#   "Asker",
#   "Askøy",
#   "Balsfjord",
#   "Bjørnafjorden",
#   "Flakstad",
#   "Gamvik",
#   "Hamarøy",
#   "Hemnes",
#   "Kristiansand",
#   "Skjervøy",
# ]

# inland_municipalities = [
#   "Bardu",
#   "Bygland",
#   "Enebakk",
#   "Evje og Hornnes",
#   "Melhus",
#   "Nordre Land",
#   "Snåase - Snåsa",
#   "Skiptvet",
#   "Øystre Slidre",
#   "Ål",
# ]

small_municipalities = np.array([1547, 3911, 3110, 3222, 3224, 3226, 1124, 1835, 1151, 3218])
large_municipalities = np.array([5603, 5610, 5624, 3432, 5544, 3338, 3423, 3421, 4036, 1826])
coastal_municipalities = np.array([3203, 4627, 5532, 4624, 1859, 5626, 1875, 1832, 4204, 5542])
inland_municipalities = np.array([5520, 4220, 3220, 4219, 5028, 3448, 5041, 3116, 3453, 3328])

small_county = np.array([39])
large_county = np.array([56])
coastal_county = np.array([46])
inland_county = np.array([34])

# azimuth1, azimuth2, distance = geod.inv(lon0, lat0, lon1, lat1)

# lon, lat = transformer.transform(x,y)

df_testdata = pd.read_csv("test_data/all_test_data.csv")

df_kommunenr = pd.read_csv("kommunenummer.csv")
df_fylkesnr = pd.read_csv("fylkesnummer.csv")

df_control_kommuner = pd.read_csv("../midtpunkt_kommuner.csv")
df_control_fylker = pd.read_csv("../midtpunkt_fylker.csv")

kommuner_control_data = {}
fylker_control_data = {}

from_25832_to_4258 = pyproj.Transformer.from_crs("epsg:25832","epsg:4258")
from_25833_to_4258 = pyproj.Transformer.from_crs("epsg:25833","epsg:4258")
from_25835_to_4258 = pyproj.Transformer.from_crs("epsg:25835","epsg:4258")
from_32632_to_4258 = pyproj.Transformer.from_crs("epsg:32632","epsg:4258")
from_32633_to_4258 = pyproj.Transformer.from_crs("epsg:32633","epsg:4258")
from_32635_to_4258 = pyproj.Transformer.from_crs("epsg:32635","epsg:4258")

for munic_index, munic_row in df_control_kommuner.iterrows():
    nr = munic_row['K-nr.']
    x = munic_row['Øst UTM33']
    y = munic_row['Nord UTM33']
    lon, lat = from_25833_to_4258.transform(x,y)
    kommuner_control_data[nr] = (lon, lat)

for county_index, county_row in df_control_fylker.iterrows():
    nr = county_row['F-nr.']
    x = county_row['Øst UTM33']
    y = county_row['Nord UTM33']
    lon, lat = from_25833_to_4258.transform(x,y)
    fylker_control_data[nr] = (lon, lat)

columns = ["centroid","water","coordsys","small_munic_avg_diff","small_munic_median_diff","small_munic_std_diff","large_munic_avg_diff","large_munic_median_diff","large_munic_std_diff","coastal_munic_avg_diff","coastal_munic_median_diff","coastal_munic_std_diff","inland_munic_avg_diff","inland_munic_median_diff","inland_munic_std_diff","small_county_diff","large_county_diff","coastal_county_diff","inland_county_diff"]

df_final = pd.DataFrame(columns=columns)

def convert_to_4258(epsg, x, y):
    if epsg == 4258:
        return x, y
    elif epsg == 25832:
        return from_25832_to_4258.transform(x,y)
    elif epsg == 25833:
        return from_25833_to_4258.transform(x,y)
    elif epsg == 25835:
        return from_25835_to_4258.transform(x,y)
    elif epsg == 32632:
        return from_32632_to_4258.transform(x,y)
    elif epsg == 32633:
        return from_32633_to_4258.transform(x,y)
    elif epsg == 32635:
        return from_32635_to_4258.transform(x,y)

for water_key, water_value in water.items():
    for coordsys_key, coordsys_value in coordinate_systems.items():
        # print("number:", df_testdata["number"])
        # print("water:", df_testdata["water"])
        # print("coordsys:", df_testdata["coordsys"])
        # print(small_municipalities)
        # print(df_testdata[df_testdata["number"].isin(small_municipalities)])
        # print(df_testdata[df_testdata["water"] == water_key])
        # print(type(df_testdata["water"][0]))
        # print(df_testdata[df_testdata["coordsys"].isin(coordsys_value)])
        small_munics = df_testdata[df_testdata["number"].isin(small_municipalities) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        large_munics = df_testdata[df_testdata["number"].isin(large_municipalities) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        coastal_munics = df_testdata[df_testdata["number"].isin(coastal_municipalities) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        inland_munics = df_testdata[df_testdata["number"].isin(inland_municipalities) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        small_county = df_testdata[df_testdata["number"].isin(small_county) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        large_county = df_testdata[df_testdata["number"].isin(large_county) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        coastal_county = df_testdata[df_testdata["number"].isin(coastal_county) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        inland_county = df_testdata[df_testdata["number"].isin(inland_county) & (df_testdata["water"] == water_key) & df_testdata["coordsys"].isin(coordsys_value)]
        # print(small_munics)
        for centroid in centroids:
            small_munic_xs, small_munic_ys, small_munic_nums = [], [], []
            large_munic_xs, large_munic_ys, large_munic_nums = [], [], []
            coastal_munic_xs, coastal_munic_ys, coastal_munic_nums = [], [], []
            inland_munic_xs, inland_munic_ys, inland_munic_nums = [], [], []
            small_county_xs, small_county_ys, small_county_nums = [], [], []
            large_county_xs, large_county_ys, large_county_nums = [], [], []
            coastal_county_xs, coastal_county_ys, coastal_county_nums = [], [], []
            inland_county_xs, inland_county_ys, inland_county_nums = [], [], []
            for index, row in small_munics.iterrows():
                small_munic_x = small_munics.loc[index, centroid + "X"]
                small_munic_y = small_munics.loc[index, centroid + "Y"]
                small_munic_num = small_munics.loc[index, "number"]
                # print(small_munic_x)
                # print(small_munic_y)
                # print(type(row["coordsys"]))
                # print(convert_to_4258(row["coordsys"],small_munic_x,small_munic_y))
                small_munic_x_converted, small_munic_y_converted = convert_to_4258(row["coordsys"],small_munic_x,small_munic_y)
                small_munic_xs.append(small_munic_x_converted)
                small_munic_ys.append(small_munic_y_converted)
                small_munic_nums.append(small_munic_num)
            for index, row in large_munics.iterrows():
                large_munic_x = large_munics.loc[index, centroid + "X"]
                large_munic_y = large_munics.loc[index, centroid + "Y"]
                large_munic_num = large_munics.loc[index, "number"]
                large_munic_x_converted, large_munic_y_converted = convert_to_4258(row["coordsys"],large_munic_x,large_munic_y)
                large_munic_xs.append(large_munic_x_converted)
                large_munic_ys.append(large_munic_y_converted)
                large_munic_nums.append(large_munic_num)
            for index, row in coastal_munics.iterrows():
                coastal_munic_x = coastal_munics.loc[index, centroid + "X"]
                coastal_munic_y = coastal_munics.loc[index, centroid + "Y"]
                coastal_munic_num = coastal_munics.loc[index, "number"]
                coastal_munic_x_converted, coastal_munic_y_converted = convert_to_4258(row["coordsys"],coastal_munic_x,coastal_munic_y)
                coastal_munic_xs.append(coastal_munic_x_converted)
                coastal_munic_ys.append(coastal_munic_y_converted)
                coastal_munic_nums.append(coastal_munic_num)
            for index, row in inland_munics.iterrows():
                inland_munic_x = inland_munics.loc[index, centroid + "X"]
                inland_munic_y = inland_munics.loc[index, centroid + "Y"]
                inland_munic_num = inland_munics.loc[index, "number"]
                inland_munic_x_converted, inland_munic_y_converted = convert_to_4258(row["coordsys"],inland_munic_x,inland_munic_y)
                inland_munic_xs.append(inland_munic_x_converted)
                inland_munic_ys.append(inland_munic_y_converted)
                inland_munic_nums.append(inland_munic_num)
            for index, row in small_county.iterrows():
                small_county_x = small_county.loc[index, centroid + "X"]
                small_county_y = small_county.loc[index, centroid + "Y"]
                small_county_num = small_county.loc[index, "number"]
                small_county_x_converted, small_county_y_converted = convert_to_4258(row["coordsys"],small_county_x,small_county_y)
                small_county_xs.append(small_county_x_converted)
                small_county_ys.append(small_county_y_converted)
                small_county_nums.append(small_county_num)
            for index, row in large_county.iterrows():
                large_county_x = large_county.loc[index, centroid + "X"]
                large_county_y = large_county.loc[index, centroid + "Y"]
                large_county_num = large_county.loc[index, "number"]
                large_county_x_converted, large_county_y_converted = convert_to_4258(row["coordsys"],large_county_x,large_county_y)
                large_county_xs.append(large_county_x_converted)
                large_county_ys.append(large_county_y_converted)
                large_county_nums.append(large_county_num)
            for index, row in coastal_county.iterrows():
                coastal_county_x = coastal_county.loc[index, centroid + "X"]
                coastal_county_y = coastal_county.loc[index, centroid + "Y"]
                coastal_county_num = coastal_county.loc[index, "number"]
                coastal_county_x_converted, coastal_county_y_converted = convert_to_4258(row["coordsys"],coastal_county_x,coastal_county_y)
                coastal_county_xs.append(coastal_county_x_converted)
                coastal_county_ys.append(coastal_county_y_converted)
                coastal_county_nums.append(coastal_county_num)
            for index, row in inland_county.iterrows():
                inland_county_x = inland_county.loc[index, centroid + "X"]
                inland_county_y = inland_county.loc[index, centroid + "Y"]
                inland_county_num = inland_county.loc[index, "number"]
                inland_county_x_converted, inland_county_y_converted = convert_to_4258(row["coordsys"],inland_county_x,inland_county_y)
                inland_county_xs.append(inland_county_x_converted)
                inland_county_ys.append(inland_county_y_converted)
                inland_county_nums.append(inland_county_num)
            small_munic_xs, small_munic_ys = np.array(small_munic_xs), np.array(small_munic_ys)
            large_munic_xs, large_munic_ys = np.array(large_munic_xs), np.array(large_munic_ys)
            coastal_munic_xs, coastal_munic_ys = np.array(coastal_munic_xs), np.array(coastal_munic_ys)
            inland_munic_xs, inland_munic_ys = np.array(inland_munic_xs), np.array(inland_munic_ys)
            small_county_xs, small_county_ys = np.array(small_county_xs), np.array(small_county_ys)
            large_county_xs, large_county_ys = np.array(large_county_xs), np.array(large_county_ys)
            coastal_county_xs, coastal_county_ys = np.array(coastal_county_xs), np.array(coastal_county_ys)
            inland_county_xs, inland_county_ys = np.array(inland_county_xs), np.array(inland_county_ys)
            small_munic_diffs = np.zeros(len(small_munic_xs))
            large_munic_diffs = np.zeros(len(large_munic_xs))
            coastal_munic_diffs = np.zeros(len(coastal_munic_xs))
            inland_munic_diffs = np.zeros(len(inland_munic_xs))
            small_county_diffs = np.zeros(len(small_county_xs))
            large_county_diffs = np.zeros(len(large_county_xs))
            coastal_county_diffs = np.zeros(len(coastal_county_xs))
            inland_county_diffs = np.zeros(len(inland_county_xs))
            for i in range(len(small_munic_diffs)):
                _, _, small_munic_diffs[i] = geod.inv(small_munic_xs[i], small_munic_ys[i], kommuner_control_data[small_munic_nums[i]][0], kommuner_control_data[small_munic_nums[i]][1])
            for j in range(len(large_munic_diffs)):
                _, _, large_munic_diffs[j] = geod.inv(large_munic_xs[j], large_munic_ys[j], kommuner_control_data[large_munic_nums[j]][0], kommuner_control_data[large_munic_nums[j]][1])
            for k in range(len(coastal_munic_diffs)):
                _, _, coastal_munic_diffs[k] = geod.inv(coastal_munic_xs[k], coastal_munic_ys[k], kommuner_control_data[coastal_munic_nums[k]][0], kommuner_control_data[coastal_munic_nums[k]][1])
            for l in range(len(inland_munic_diffs)):
                _, _, inland_munic_diffs[l] = geod.inv(inland_munic_xs[l], inland_munic_ys[l], kommuner_control_data[inland_munic_nums[l]][0], kommuner_control_data[inland_munic_nums[l]][1])
            for m in range(len(small_county_diffs)):
                _, _, small_county_diffs[m] = geod.inv(small_county_xs[m], small_county_ys[m], fylker_control_data[small_county_nums[m]][0], fylker_control_data[small_county_nums[m]][1])
            for n in range(len(large_county_diffs)):
                _, _, large_county_diffs[n] = geod.inv(large_county_xs[n], large_county_ys[n], fylker_control_data[large_county_nums[n]][0], fylker_control_data[large_county_nums[n]][1])
            for o in range(len(coastal_county_diffs)):
                _, _, coastal_county_diffs[o] = geod.inv(coastal_county_xs[o], coastal_county_ys[o], fylker_control_data[coastal_county_nums[o]][0], fylker_control_data[coastal_county_nums[o]][1])
            for p in range(len(inland_county_diffs)):
                _, _, inland_county_diffs[p] = geod.inv(inland_county_xs[p], inland_county_ys[p], fylker_control_data[inland_county_nums[p]][0], fylker_control_data[inland_county_nums[p]][1])
            small_munic_avg_diff = np.average(small_munic_diffs)
            small_munic_median_diff = np.median(small_munic_diffs)
            small_munic_std_diff = np.std(small_munic_diffs)
            large_munic_avg_diff = np.average(large_munic_diffs)
            large_munic_median_diff = np.median(large_munic_diffs)
            large_munic_std_diff = np.std(large_munic_diffs)
            coastal_munic_avg_diff = np.average(coastal_munic_diffs)
            coastal_munic_median_diff = np.median(coastal_munic_diffs)
            coastal_munic_std_diff = np.std(coastal_munic_diffs)
            inland_munic_avg_diff = np.average(inland_munic_diffs)
            inland_munic_median_diff = np.median(inland_munic_diffs)
            inland_munic_std_diff = np.std(inland_munic_diffs)
            if(small_county_diffs.size > 0):
                small_county_diff = small_county_diffs[0]
            if(large_county_diffs.size > 0):
                large_county_diff = large_county_diffs[0]
            if(coastal_county_diffs.size > 0):
                coastal_county_diff = coastal_county_diffs[0]
            if(inland_county_diffs.size > 0):
                inland_county_diff = inland_county_diffs[0]
            row_to_add = {"centroid": centroid, "water": water_value, "coordsys": coordsys_key, "small_munic_avg_diff": small_munic_avg_diff, "small_munic_median_diff": small_munic_median_diff, "small_munic_std_diff": small_munic_std_diff, "large_munic_avg_diff": large_munic_avg_diff, "large_munic_median_diff": large_munic_median_diff, "large_munic_std_diff": large_munic_std_diff, "coastal_munic_avg_diff": coastal_munic_avg_diff, "coastal_munic_median_diff": coastal_munic_median_diff, "coastal_munic_std_diff": coastal_munic_std_diff, "inland_munic_avg_diff": inland_munic_avg_diff, "inland_munic_median_diff": inland_munic_median_diff, "inland_munic_std_diff": inland_munic_std_diff, "small_county_diff": small_county_diff, "large_county_diff": large_county_diff, "coastal_county_diff": coastal_county_diff, "inland_county_diff": inland_county_diff}
            df_final = pd.concat([df_final, pd.DataFrame([row_to_add])], ignore_index=True)

print(df_final)

df_final.to_csv("test_data_processed.csv")