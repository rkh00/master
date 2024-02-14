import pandas as pd

df = pd.DataFrame(pd.read_excel("../oversikt-over-alle-landets-kommunenummer-og-kommunenavn-per-01.01.2024-excel.xlsx"))

df.to_csv("kommunenummer.csv",
          index=None,
          header=True)