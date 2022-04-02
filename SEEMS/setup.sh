#!/bin/bash
RED='\033[0;31m'
YLW='\033[1;33m'
GRN='\033[0;32m'
NOC='\033[0m'

function init_migration() {
  echo "Migration Name(default: 'Initial'):"
  read migration_name
  
  if [ -z "$migration_name" ]; then
    migration_name="Initial"
  fi
  
  echo "Where to put migration folder:"
  read -r migration_path
  
  dotnet ef migrations add "$migration_name" -o "$migration_path" 
  
}

function setup_ef() {
  
  echo "===== SETUP EF TOOL ====="
  dotnet tool install --global dotnet-ef

  echo "Do you want to first init migration [y/n]"

  read choice
  if [ "$choice" == "y" ]|| [ "$choice" == "Y" ]; then
    init_migration
  fi
  dotnet ef database update
}

function add_connection_string() {
  
  echo -e "${YLW}===== ADD CONNECTION STRING =====${NOC}"
  echo "Your DB instance name(default: 'localhost'):"
  read db_instance

  if [ -z "$db_instance" ]; then
    db_instance="localhost"
  fi 
  
  echo "Your DB name:"
  read db_name
  echo "Your SQL login user(default: 'sa'):"
  read usr

  if [ -z "$usr" ]; then
    usr="sa"
  fi
  
  echo "Your SQL password:"
  read pwd
  
  echo -n > appsettings.json 
  cat appsettings.Example.json >> appsettings.json 
  # shellcheck disable=SC2140
  connection_strings="Data Source=$db_instance;Initial Catalog=$db_name;user id=$usr;Password=$pwd"\
  
  sed -i "s/_Your connection_/$connection_strings/g" appsettings.json
  
  echo -e "${GRN}Add ConnectionStrings into appsettings successfully${NOC}"
}

function setup_secret_keys() {
  echo -e "${YLW}===== SETUP SECRET KEY =====${NOC}"
  echo "Your Google ClientId:"
  read google_client_id

  echo "Your Google Secret Key:"
  read google_secret_key

  echo "Your Secret Key for JWT Token:"
  read jwt_secret_key

  echo "Your Mailjet ApiKey:"
  read mailjet_api_key
  
  echo "Your Mailjet SecretKey:"
  read mailjet_secret_key

  dotnet user-secrets set "Authentication:Google:ClientId" "$google_client_id" 
  dotnet user-secrets set "Authentication:Google:ClientSecret" "${google_secret_key}"
  dotnet user-secrets set "SecretKey" "${jwt_secret_key}"
  dotnet user-secrets set "Mailjet:ApiKey" "${mailjet_api_key}"
  dotnet user-secrets set "Mailjet:SecretKey" "${mailjet_secret_key}"
}

title="SETUP PROJECT SEEM"
prompt="Pick an option:"
options=("Add ConnectionStrings" "Init migration" "Setup secret key")

echo "$title"
PS3="$prompt "
select opt in "${options[@]}" "Quit"; do 
    case "$REPLY" in
    1) add_connection_string;;
    2) setup_ef;;
    3) setup_secret_keys;;
    $((${#options[@]}+1))) echo -e "${GRN}Goodbye!${NOC}"; break;;
    *) echo -e "${RED}Invalid option. Try another one.${NOC}";continue;;
    esac
done
