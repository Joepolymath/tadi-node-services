#!/bin/bash

# File to store the exported key-value pairs
env_file="envs.txt"

# Read the .env file line by line
while IFS= read -r line || [[ -n "$line" ]]; do
    # Remove any leading/trailing whitespace
    line=$(echo "$line" | xargs)
    
    # Check if the line is not empty and is not a comment
    if [[ ! -z "$line" && "$line" != \#* ]]; then
        # Extract variable name and value
        var_name=$(echo "$line" | cut -d '=' -f 1 | tr -d '[:space:]')
        var_value=$(echo "$line" | cut -d '=' -f 2- | tr -d '[:space:]')
        
        # Export the variable to the environment
        export "$var_name"="$var_value"
        
        # Write the exported key-value pair with export command to the file
        echo "export $var_name=$var_value" >> "$env_file"
    fi
    
done < os.env
