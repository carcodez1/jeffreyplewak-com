#!/usr/bin/env zsh
set -euo pipefail

out="${1:-/tmp/codex-context.txt}"

have() { command -v "$1" >/dev/null 2>&1; }

print_file() {
  local f="$1"
  if [[ -f "$f" ]]; then
    printf '\n===== FILE: %s =====\n' "$f" >> "$out"
    sed -n '1,260p' "$f" >> "$out"
  fi
}

print_cmd() {
  local title="$1"
  shift
  printf '\n===== %s =====\n' "$title" >> "$out"
  {
    "$@"
  } >> "$out" 2>&1 || true
}

: > "$out"

printf '===== REPO ROOT =====\n' >> "$out"
pwd >> "$out"

print_cmd "DATE" date
print_cmd "NODE VERSION" node -v
print_cmd "NPM VERSION" npm -v

if have npx; then
  print_cmd "NEXT VERSION" npx next --version
fi

print_file "package.json"
print_file "tsconfig.json"
print_file "eslint.config.js"
print_file "eslint.config.mjs"
print_file "next.config.js"
print_file "next.config.mjs"
print_file "next.config.ts"

print_cmd "ROOT TREE (depth 4)" sh -c 'tree -L 4 . 2>/dev/null || find . -maxdepth 4 -print | sort'

print_cmd "APP ROUTES" sh -c 'find src/app -maxdepth 4 \( -name "page.tsx" -o -name "layout.tsx" -o -name "loading.tsx" -o -name "error.tsx" -o -name "not-found.tsx" \) | sort'
print_cmd "PROJECT ROUTES" sh -c 'find src/app/projects -maxdepth 4 -type f | sort 2>/dev/null || true'

print_file "AGENTS.md"
print_file ".codex/config.toml"
print_file "$HOME/.codex/config.toml"

print_cmd "CODEX DIR TREE" sh -c 'find .codex -maxdepth 4 -print 2>/dev/null | sort || true'
print_cmd "SKILLS TREE" sh -c 'find .agents/skills "$HOME/.codex/skills" -maxdepth 4 -print 2>/dev/null | sort || true'
print_cmd "MCP FILE CANDIDATES" sh -c 'find . -maxdepth 4 \( -iname "*mcp*" -o -iname "*codex*" -o -iname "*agents*" \) -type f | sort'

print_cmd "ALL SKILL MANIFESTS" sh -c 'find . -path "*/SKILL.md" -type f | sort'
while IFS= read -r f; do
  [[ -n "$f" ]] && print_file "$f"
done < <(find . -path "*/SKILL.md" -type f | sort)

print_cmd "ALL AGENTS FILES" sh -c 'find . -iname "AGENTS.md" -type f | sort'
while IFS= read -r f; do
  [[ -n "$f" ]] && print_file "$f"
done < <(find . -iname "AGENTS.md" -type f | sort)

if have codex; then
  print_cmd "CODEX VERSION" codex --version
  print_cmd "CODEX HELP (first 220 lines)" sh -c 'codex --help | sed -n "1,220p"'
fi

print_cmd "NPM SCRIPTS" node -e '
const fs=require("fs");
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
console.log(JSON.stringify(p.scripts ?? {}, null, 2));
' 

print_cmd "DEPENDENCIES" node -e '
const fs=require("fs");
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
console.log("dependencies:");
console.log(JSON.stringify(p.dependencies ?? {}, null, 2));
console.log("\ndevDependencies:");
console.log(JSON.stringify(p.devDependencies ?? {}, null, 2));
'

print_cmd "PROJECT CSS FILES" sh -c 'find src -maxdepth 5 \( -name "*.css" -o -name "*.module.css" \) | sort'
while IFS= read -r f; do
  [[ -n "$f" ]] && print_file "$f"
done < <(find src/app/projects -maxdepth 3 \( -name "*.css" -o -name "*.tsx" \) -type f | sort 2>/dev/null || true)

print_cmd "JSON-LD / METADATA FILES" sh -c 'find src -maxdepth 5 \( -iname "*jsonld*" -o -iname "*metadata*" \) -type f | sort'
while IFS= read -r f; do
  [[ -n "$f" ]] && print_file "$f"
done < <(find src -maxdepth 5 \( -iname "*jsonld*" -o -iname "*metadata*" \) -type f | sort)

if [[ -t 1 ]]; then
  :
fi

if command -v pbcopy >/dev/null 2>&1; then
  pbcopy < "$out"
  printf 'Copied Codex context to clipboard and wrote: %s\n' "$out"
else
  printf 'Wrote Codex context to: %s\n' "$out"
fi
