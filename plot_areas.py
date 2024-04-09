import pandas as pd
import matplotlib.pyplot as plt

rows_to_skip = 3
number_of_rows = 17 # 938 for kommuner_areal.xlsx, 17 for fylker_areal.xlsx

df = pd.read_excel("fylker_areal.xlsx", skiprows=rows_to_skip, nrows=number_of_rows)

df = df[df.iloc[:, 1] != 0]

df_sorted = df.sort_values(by=df.columns[1])
df_sorted = df_sorted.reset_index(drop=True)
df_sorted.columns = ['Name', 'Area (sqkm)']

min_area = df.iloc[:, 1].min()
max_area = df.iloc[:, 1].max()
average_area = df.iloc[:, 1].mean()
median_area = df.iloc[:, 1].median()
std_dev_area = df.iloc[:, 1].std()
percentile_10 = df_sorted['Area (sqkm)'].quantile(0.10)
percentile_90 = df_sorted['Area (sqkm)'].quantile(0.90)

print("Minimum area:", min_area)
print("Maximum area:", max_area)
print("Average area:", average_area)
print("Median area:", median_area)
print("Standard deviation:", std_dev_area)
print("10th percentile:", percentile_10)
print("90th percentile:", percentile_90)

# plt.figure(figsize=(10, 6))
# plt.bar(df_sorted['Name'], df_sorted['Area (sqkm)'], color='b', label='Land Area')

# plt.axhline(y=percentile_10, color='r', linestyle='--', label='10th Percentile')
# plt.axhline(y=percentile_90, color='g', linestyle='--', label='90th Percentile')

# plt.xlabel('Municipality')
# plt.ylabel('Land Area (km^2)')
# plt.title('Land area of municipalities')
# plt.xlim(df_sorted['Name'].iloc[0], df_sorted['Name'].iloc[-1])
# plt.xticks([df_sorted['Name'][0], df_sorted['Name'].iloc[-1]], rotation=45, ha='right')
# plt.legend()

# plt.grid(True)
# plt.tight_layout()
# plt.show()

# print(df_sorted)

below_10th_percentile = df_sorted[df_sorted['Area (sqkm)'] < percentile_10]['Name'].tolist()
above_90th_percentile = df_sorted[df_sorted['Area (sqkm)'] > percentile_90]['Name'].tolist()

everything = df_sorted['Name'].tolist()

# print("\nBelow 10th percentile:")
# for small_subdiv in below_10th_percentile:
#     print(small_subdiv)

# print("\nAbove 90th percentile:")
# for large_subdiv in above_90th_percentile:
#     print(large_subdiv)

# for subdiv in everything:
#     print(subdiv)