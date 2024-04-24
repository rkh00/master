import numpy as np
import matplotlib.pyplot as plt

# set width of bar 
barWidth = 0.25
fig = plt.subplots(figsize =(9, 6)) 

# # Municipality data, water
# UTM32 = [14453.77, 6593.01, 11154.63, 11.50]
# UTM33 = [14455.23, 6601.17, 11157.71, 10.81]
# UTM35 = [14458.17, 6616.26, 11162.07, 15.89]

# # County data, water
# UTM32 = [18722.76, 30528.06, 49894.85, 45.95]
# UTM33 = [18722.57, 30397.56, 49971.66, 140.65]
# UTM35 = [18729.12, 30080.75, 50113.84, 385.32]

# # Municipality data, no water
# UTM32 = [326.92, 14.49, 160.55, 5.80]
# UTM33 = [327.00, 17.12, 158.46, 5.07]
# UTM35 = [327.16, 31.15, 155.03, 10.83]

# County data, no water
UTM32 = [259.44, 751.03, 632.46, 44.97]
UTM33 = [259.64, 519.49, 585.92, 141.73]
UTM35 = [258.18, 58.94, 585.92, 141.73]

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
plt.title("Errors in county test data (w/o water)", fontweight ='bold', fontsize = 20)
plt.xlabel('Dataset', fontweight ='bold', fontsize = 15) 
plt.ylabel('Error (m)', fontweight ='bold', fontsize = 15) 
plt.xticks([r + barWidth for r in range(len(UTM32))], 
        ['Small', 'Large', 'Coastal', 'Inland'])
 
plt.legend()
plt.show() 