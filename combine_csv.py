import os
import pandas as pd

def combine_csv_files(folder_path, output_file):
    # List all CSV files in the folder
    csv_files = [file for file in os.listdir(folder_path) if file.endswith('.csv')]
    
    # Check if there are CSV files in the folder
    if len(csv_files) == 0:
        print("No CSV files found in the folder.")
        return
    
    # Initialize an empty DataFrame to store combined data
    combined_data = pd.DataFrame()
    
    # Iterate over each CSV file and append its data to combined_data
    for file in csv_files:
        file_path = os.path.join(folder_path, file)
        data = pd.read_csv(file_path)
        combined_data = combined_data.append(data, ignore_index=True)
    
    # Write combined data to a new CSV file
    combined_data.to_csv(output_file, index=False)
    print(f"Combined CSV file saved as {output_file}")

# Example usage
folder_path = 'test_data'
output_file = 'test_data/all_test_data.csv'
combine_csv_files(folder_path, output_file)
