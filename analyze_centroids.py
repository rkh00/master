import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df_centroids = pd.read_csv("subdiv_centroids_processed_v2.csv")
df_centroids_munic = df_centroids.iloc[15:]
df_centroids_count = df_centroids.iloc[:15]

munic_errors = df_centroids_munic["error"]
count_errors = df_centroids_count["error"]

print("Municipality averages:", munic_errors.mean())
print("Municipality median:", munic_errors.median())
print("Municipality standard deviation:", munic_errors.std())
print("Municipality RMSE:", np.sqrt((munic_errors**2).mean()))
print("Municipality MAE:", munic_errors.abs().mean())
print("Smallest municipality error:", munic_errors.min())
print("Largest municipality error:", munic_errors.max())
print("County averages:", count_errors.mean())
print("County median:", count_errors.median())
print("County standard deviation:", count_errors.std())
print("County RMSE:", np.sqrt((count_errors**2).mean()))
print("County MAE:", count_errors.abs().mean())
print("Smallest county error:", count_errors.min())
print("Largest county error:", count_errors.max())

munic_errors_sorted = munic_errors.sort_values().reset_index(drop=True)
count_errors_sorted = count_errors.sort_values().reset_index(drop=True)

df_sorted = count_errors_sorted

plt.figure(figsize=(10, 6))
plt.bar(df_sorted.index, df_sorted.values, color='b', label='Deviation (m)')
plt.axhline(y=df_sorted.mean(), color='g', linestyle='--', label='Mean')
plt.axhline(y=df_sorted.median(), color='r', linestyle='--', label='Median')

plt.xlabel('County', fontweight ='bold', fontsize = 15)
plt.ylabel('Deviation (m)', fontweight ='bold', fontsize = 15)
plt.xticks([], [])
plt.title('Deviations in county centroid calculation', fontweight ='bold', fontsize = 20)
plt.legend()

plt.grid(True)
plt.tight_layout()
plt.show()

# print(df_sorted)

# plt.plot(munic_errors_sorted.index, munic_errors_sorted.values)
# plt.xlabel('Index')
# plt.ylabel('Values')
# plt.title('Sorted Pandas Series')
# plt.show()