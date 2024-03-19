#!/bin/bash


env_file="envs.txt"


while IFS= read -r line || [[ -n "$line" ]]; do

    line=$(echo "$line" | xargs)
    

    if [[ ! -z "$line" && "$line" != \#* ]]; then

        var_name=$(echo "$line" | cut -d '=' -f 1 | tr -d '[:space:]')
        var_value=$(echo "$line" | cut -d '=' -f 2- | tr -d '[:space:]')
        

        export "$var_name"="$var_value"
        

        echo "export $var_name=$var_value" >> "$env_file"
    fi
    
done < os.env
