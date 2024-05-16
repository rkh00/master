import numpy as np
import matplotlib.pyplot as plt

# set width of bar 
barWidth = 0.25
fig = plt.subplots(figsize =(9, 6)) 

# # Municipality data, water
# UTM32 = [14454, 6593, 11154.7, 11.8]
# UTM33 = [14455.2, 6601.4, 11157.8, 10.4]
# UTM35 = [14458, 6616.2, 11162, 15.7]

# # County data, water
# UTM32 = [18722.3, 30528.1, 49893.9, 46.5]
# UTM33 = [18722.6, 30397.5, 49972, 140]
# UTM35 = [18729.4, 30080.6, 50114.1, 385.9]

# # Municipality data, no water
# UTM32 = [327.1, 14.6, 160.4, 5.7]
# UTM33 = [327.5, 17.5, 158.5, 4.9]
# UTM35 = [327.2, 30.8, 155.1, 10.9]

# County data, no water
UTM32 = [258.8, 750.2, 632.5, 45]
UTM33 = [260.1, 520.4, 585.3, 142.1]
UTM35 = [258.2, 57.5, 487.9, 386.4]

# Set position of bar on X axis 
br1 = np.arange(len(UTM32)) 
br2 = [x + barWidth for x in br1] 
br3 = [x + barWidth for x in br2] 
 
# Make the plot
plt.bar(br1, UTM32, color ='r', width = barWidth, 
        edgecolor ='grey', label ='UTM32') 
plt.bar(br2, UTM33, color ='b', width = barWidth, 
        edgecolor ='grey', label ='UTM33') 
plt.bar(br3, UTM35, color ='g', width = barWidth, 
        edgecolor ='grey', label ='UTM35') 
 
# Adding Xticks 
plt.title("Deviations in county test data (w/o water)", fontweight ='bold', fontsize = 20)
plt.xlabel('Dataset', fontweight ='bold', fontsize = 15) 
plt.ylabel('Error (m)', fontweight ='bold', fontsize = 15) 
plt.xticks([r + barWidth for r in range(len(UTM32))], 
        ['Small', 'Large', 'Coastal', 'Inland'])
 
plt.legend()
plt.show() 