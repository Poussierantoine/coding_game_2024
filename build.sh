#!/bin/bash

OUTPUT_FILE="./dist/main.ts"

# The files should be in the order you want them to be concatenated to have the right order for imports
FILES=(
  "./src/interfaces.ts"
  "./src/Game.ts"
  "./src/production-game-reader.ts"
  "./src/production-feature-flipping.ts"
  "./src/main.ts"
)


> "$OUTPUT_FILE"


for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "Ajout de $FILE dans $OUTPUT_FILE..."
    cat "$FILE" | sed '/^import/d' >> "$OUTPUT_FILE"
    echo -e "\n" >> "$OUTPUT_FILE"
  else
    echo "⚠️  Le fichier $FILE n'existe pas, il est ignoré."
  fi
done

echo "Concaténation terminée. Résultat écrit dans $OUTPUT_FILE."