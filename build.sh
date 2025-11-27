#!/bin/bash

JS_SRC="javascript"
JS_DEST="public/assets/js"

SCSS_SRC="scss"
CSS_DEST="public/assets/css"

echo "🧹 Iniciando limpeza..."


if [ -d "$JS_DEST" ]; then
    find "$JS_DEST" -mindepth 1 -maxdepth 1 ! -name "libs" -exec rm -rf {} +
else
    mkdir -p "$JS_DEST"
fi

if [ -d "$CSS_DEST" ]; then
    find "$CSS_DEST" -mindepth 1 -maxdepth 1 ! -name "libs" -exec rm -rf {} +
else
    mkdir -p "$CSS_DEST"
fi

echo "🔨 Compilando Javascript..."

esbuild $(find "$JS_SRC" -type f -name "*.js" ! -name "_*") \
    --bundle \
    --minify \
    --outdir="$JS_DEST" \
    --outbase="$JS_SRC"

echo "🎨 Compilando SCSS..."

sass "$SCSS_SRC":"$CSS_DEST" \
    --style=compressed \
    --no-source-map

echo "✅ Build de Produção concluído com sucesso!"
echo "📂 JS em: $JS_DEST"
echo "📂 CSS em: $CSS_DEST"