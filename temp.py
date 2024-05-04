from pyproj import Geod

# Coordinates of points A, B, and C (latitude, longitude)
coordinates = {
    'munic': (63.9881312, 12.3227037),
    'count': (63.9882084, 12.3227561)
}

# Initialize the Geod object for distance calculations
geod = Geod(ellps='GRS80')

# Calculate distances from point A to points B and C
_, _, dist_AB = geod.inv(coordinates['count'][1], coordinates['count'][0], coordinates['munic'][1], coordinates['munic'][0])

print(dist_AB)