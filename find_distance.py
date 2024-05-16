import numpy as np
from pyproj import Geod

geod = Geod(ellps='WGS84')

A = (63.988127, 12.3226955)
B = (63.9882087, 12.322749)

_, _, dist_AB = geod.inv(A[1], A[0], B[1], B[0])

print(np.round(dist_AB,1))