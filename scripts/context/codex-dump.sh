#!/usr/bin/env zsh
set +e
set -u
OUT="${1:-/tmp/codex-context.txt}"
have() { command -v "$1" >/dev/null 2>&1; }
section() { printf '\n===== %s =====\n' "$1" >> "$OUT"; }
safe_cmd() { local title="$1"; shift; section "$title"; "$@" >> "$OUT" 2>&1 || true; }
safe_file() { local f="$1"; section "FILE: $f"; [[ -f "$f" ]] && sed -n '1,260p' "$f" >> "$OUT" 2>&1 || echo "MISSING" >> "$OUT"; }
: > "$OUT"
section "PWD"; pwd >> "$OUT" 2>&1 || true
safe_cmd "NODE VERSION" node -v
safe_cmd "NPM VERSION" npm -v
safe_cmd "NEXT VERSION" sh -c 'npx next --version 2>/dev/null || true'
safe_cmd "CODEX VERSION" sh -c 'codex --version 2>/dev/null || true'
safe_cmd "CODEX HELP" sh -c 'codex --help 2>/dev/null | sed -n "1,260p" || true'
safe_file "package.json"
safe_file "AGENTS.md"
safe_file ".codex/config.toml"
safe_file "$HOME/.codex/config.toml"
section "ROOT TREE"; tree -L 4 . >> "$OUT" 2>&1 || find . -maxdepth 4 -print | sort >> "$OUT" 2>&1 || true
section "APP ROUTES"; find src/app -maxdepth 5 \( -name "page.tsx" -o -name "layout.tsx" -o -name "loading.tsx" -o -name "error.tsx" -o -name "not-found.tsx" \) -print | sort >> "$OUT" 2>&1 || true
section "PROJECT ROUTES"; find src/app/projects -maxdepth 5 -type f -print | sort >> "$OUT" 2>&1 || true
section "SKILLS TREE"; find .agents/skills "$HOME/.codex/skills" -maxdepth 6 -print 2>/dev/null | sort >> "$OUT" 2>&1 || true
section "SKILL FILES"; find . "$HOME/.codex" -type f -name "SKILL.md" 2>/dev/null | sort >> "$OUT" 2>&1 || true
while IFS= read -r f; do [[ -n "$f" ]] && safe_file "$f"; done < <(find . "$HOME/.codex" -type f -name "SKILL.md" 2>/dev/null | sort)
section "AGENTS FILES"; find . "$HOME/.codex" -type f -name "AGENTS.md" 2>/dev/null | sort >> "$OUT" 2>&1 || true
while IFS= read -r f; do [[ -n "$f" ]] && safe_file "$f"; done < <(find . "$HOME/.codex" -type f -name "AGENTS.md" 2>/dev/null | sort)
section "MCP FILES"; find . "$HOME/.codex" -maxdepth 6 -type f \( -iname "*mcp*" -o -iname "*codex*" \) 2>/dev/null | sort >> "$OUT" 2>&1 || true
section "PACKAGE SCRIPTS"; node -e 'const fs=require("fs");try{const p=JSON.parse(fs.readFileSync("package.json","utf8"));console.log(JSON.stringify(p.scripts||{},null,2));}catch(e){console.log("FAILED:",e.message)}' >> "$OUT" 2>&1 || true
section "DEPENDENCIES"; node -e 'const fs=require("fs");try{const p=JSON.parse(fs.readFileSync("package.json","utf8"));console.log("dependencies:");console.log(JSON.stringify(p.dependencies||{},null,2));console.log("\\ndevDependencies:");console.log(JSON.stringify(p.devDependencies||{},null,2));}catch(e){console.log("FAILED:",e.message)}' >> "$OUT" 2>&1 || true
if have pbcopy; then pbcopy < "$OUT"; echo "Copied Codex context to clipboard."; fi
echo "Wrote: $OUT"
