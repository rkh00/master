import folium

mapboxAccessToken = 'pk.eyJ1Ijoicm9iZXJ0LWhhdWciLCJhIjoiY2x2bTY4cW9mMDdsNDJrbXRpcXBxYmxpZCJ9.6mLY56hfwR3TVb0IGVJi_Q'

mapboxTilesetId = 'mapbox.satellite'


m = folium.Map(
    location=[51.4826486,12.7034238],
    zoom_start=16,
    tiles='https://api.tiles.mapbox.com/v4/' + mapboxTilesetId + '/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
    attr='mapbox.com'
)

tooltip = 'Click me!'

folium.Marker([51.482696, 12.703918], popup='<i>Marker 1</i>', tooltip=tooltip).add_to(m)
folium.Marker([51.481696, 12.703818], popup='<b>Marker 2</b>', tooltip=tooltip).add_to(m)

m