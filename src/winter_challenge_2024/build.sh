#!/bin/bash

OUTPUT_FILE="./dist/main.ts"

# The files should be in the order you want them to be concatenated to have the right order for imports
FILES=(
#global uses
  "./interfaces.ts"
  "./domain/Position.ts"

#  grid and turn
  "./domain/grid/Organ.ts"
  "./domain/grid/Protein.ts"
  "./domain/grid/Cell.ts"
  "./domain/grid/Grid.ts"
  "./domain/TurnInfo.ts"

#  actions
  "./domain/PathNode.ts"
  "./application/a-star.service.ts"
  "./domain/Action.ts"
  "./domain/ActionWait.ts"
  "./domain/ActionGrow.ts"
  "./application/get-nearest-element.service.ts"
  "./application/get-actions.service.ts"

#  game run
  "./infra/production-game.gateway.ts"
  "./production-feature-flipping.ts"
  "./launch.ts"
  "./main.ts"
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