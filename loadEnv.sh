#!/bin/bash

# Read the .env file line by line
while IFS= read -r line || [[ -n "$line" ]]; do
    # Remove any leading/trailing whitespace
    line=$(echo "$line" | xargs)
    
    # Check if the line is not empty and is not a comment
    if [[ ! -z "$line" && "$line" != \#* ]]; then
        # Extract variable name and value
        var_name=$(echo "$line" | cut -d '=' -f 1 | xargs)
        var_value=$(echo "$line" | cut -d '=' -f 2- | xargs)
        
        # Export the variable to the environment
        export "$var_name"="$var_value"
    fi
done < .env