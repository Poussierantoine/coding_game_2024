#!/bin/bash

OUTPUT_FILE="./dist/main.ts"

# The files should be in the order you want them to be concatenated to have the right order for imports
FILES=(
#global uses
  "./src/interfaces.ts"
  "./src/domain/Position.ts"

#  grid and turn
  "./src/domain/grid/Organ.ts"
  "./src/domain/grid/Protein.ts"
  "./src/domain/grid/Cell.ts"
  "./src/domain/grid/Grid.ts"
  "./src/domain/TurnInfo.ts"

#  actions
  "./src/domain/PathNode.ts"
  "./src/application/a-star.service.ts"
  "./src/domain/Action.ts"
  "./src/domain/ActionWait.ts"
  "./src/domain/ActionGrow.ts"
  "./src/application/get-nearest-element.service.ts"
  "./src/application/get-actions.service.ts"

#  game run
  "./src/infra/production-game.gateway.ts"
  "./src/production-feature-flipping.ts"
  "./src/launch.ts"
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