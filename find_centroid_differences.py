import pandas as pd
import pyproj
import numpy as np

# Initialize the Geod object for distance calculations
geod = pyproj.Geod(ellps='GRS80')
transformer = pyproj.Transformer.from_crs("epsg:25833","epsg:4258")

df_centroids = pd.read_csv("subdiv_centroids.csv")
df_control_kommuner = pd.read_csv("../midtpunkt_kommuner.csv")
df_control_fylker = pd.read_csv("../midtpunkt_fylker.csv")

control_dict = {}

for index, row in df_control_kommuner.iterrows():
    key = row.iloc[0]
    value = (row.iloc[1], row.iloc[2])
    control_dict[key] = value

for index, row in df_control_fylker.iterrows():
    key = row.iloc[0]
    value = (row.iloc[1], row.iloc[2])
    control_dict[key] = value

df_centroids["error"] = 0

for index, row in df_centroids.iterrows():
    control = control_dict[int(row.iloc[0])]
    controlX, controlY = transformer.transform(control[0],control[1])
    compareX, compareY = transformer.transform(row.iloc[3],row.iloc[4])
    _, _, diff = geod.inv(controlX,controlY,compareX,compareY)
    df_centroids.at[index, "error"] = diff
    df_centroids.at[index, "area"] = np.abs(row["area"])

df_centroids = df_centroids.sort_values(by="number")

df_centroids.to_csv("subdiv_centroids_processed.csv", index=False)