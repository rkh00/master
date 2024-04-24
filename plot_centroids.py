import matplotlib.pyplot as plt
from pyproj import Geod

# Coordinates of points A, B, and C (latitude, longitude)
coordinates = {
    'kv': (63.9905722, 12.3077975),
    'munic': (63.9881312, 12.3227037),
    'count': (63.9882084, 12.3227561)
}

# Initialize the Geod object for distance calculations
geod = Geod(ellps='GRS80')

# Calculate distances from point A to points B and C
_, _, dist_AB = geod.inv(coordinates['kv'][1], coordinates['kv'][0], coordinates['munic'][1], coordinates['munic'][0])
_, _, dist_AC = geod.inv(coordinates['kv'][1], coordinates['kv'][0], coordinates['count'][1], coordinates['count'][0])

# Plotting
plt.figure(figsize=(8, 6))

# Plotting points A, B, and C
plt.plot(coordinates['kv'][1], coordinates['kv'][0], 'ro', label='Kartverket')
plt.plot(coordinates['munic'][1], coordinates['munic'][0], 'bo', label='Municipalities')
plt.plot(coordinates['count'][1], coordinates['count'][0], 'go', label='Counties')

# Connecting A to B and A to C with lines
plt.plot([coordinates['kv'][1], coordinates['munic'][1]], [coordinates['kv'][0], coordinates['munic'][0]], 'b--')
plt.plot([coordinates['kv'][1], coordinates['count'][1]], [coordinates['kv'][0], coordinates['count'][0]], 'g--')

# # Adding labels
# plt.text(coordinates['kv'][1], coordinates['kv'][0], ' Kartverket', fontsize=12, verticalalignment='bottom')
# plt.text(coordinates['munic'][1], coordinates['munic'][0], ' Municipalities', fontsize=12, verticalalignment='bottom', horizontalalignment='left')
# plt.text(coordinates['count'][1], coordinates['count'][0], ' Counties', fontsize=12, verticalalignment='top', horizontalalignment='left')

# Adding distance labels
plt.text((coordinates['kv'][1] + coordinates['munic'][1]) / 2, (coordinates['kv'][0] + coordinates['munic'][0]) / 2,
         '{:.1f} m'.format(dist_AB), fontsize=10, verticalalignment='top', color='b', horizontalalignment='right')
plt.text((coordinates['kv'][1] + coordinates['count'][1]) / 2, (coordinates['kv'][0] + coordinates['count'][0]) / 2,
         '{:.1f} m'.format(dist_AC), fontsize=10, verticalalignment='bottom', color='g', horizontalalignment='left')

# Setting labels and title
plt.xlabel('Longitude (°)', fontweight ='bold', fontsize = 15)
plt.ylabel('Latitude (°)', fontweight ='bold', fontsize = 15)
plt.title('Centroid errors visualized', fontweight='bold', fontsize = 20)

# Adding legend
plt.legend()

# Displaying plot
plt.grid(True)
plt.show()
