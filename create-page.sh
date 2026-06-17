#!/bin/bash
if [ -z "$1" ]; then
   echo "usage: ./create-page.sh nomPage"
   exit 1
fi

PAGE_NAME=$1
PAGE_DIR="src/pages/$PAGE_NAME"
JS_FILE="$PAGE_DIR/$PAGE_NAME.js"
ROUTE_FILE="src/router/router.js"

mkdir -p "$PAGE_DIR"

cat > "$JS_FILE" << EOF
export function ${PAGE_NAME}(){
    return \`
       <h2>BIENVENUE SUR LA PAGE TEST ${PAGE_NAME}</h2>
\`;

}
EOF
echo "page crée :$JS_FILE"

NOUVEAU_ROUTE=" '/$PAGE_NAME': '../pages/$PAGE_NAME/$PAGE_NAME.js',"

if [ -f "$ROUTE_FILE" ]; then
    sed -i "/const routes = {/,/^};/ { /^};/i $NOUVEAU_ROUTE
}" "$ROUTE_FILE"
    echo "Route ajoutée dans $ROUTE_FILE"
else
    echo "Erreur : Le fichier $ROUTE_FILE n'existe pas"
fi




 
