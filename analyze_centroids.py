import pandas as pd

df_centroids = pd.read_csv("subdiv_centroids_processed.csv")
df_centroids_munic = df_centroids.iloc[15:]
df_centroids_count = df_centroids.iloc[:15]

munic_errors = df_centroids_munic["error"]
count_errors = df_centroids_count["error"]

print("Municipality averages:", munic_errors.mean())
print("Municipality median:", munic_errors.median())
print("Municipality standard deviation:", munic_errors.std())
print("County averages:", count_errors.mean())
print("County median:", count_errors.median())
print("County standard deviation:", count_errors.std())