SHELL := /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c

NODE ?= node
NPM ?= npm

.PHONY: help install check build dev test lint typecheck diagrams diagrams-clean diagrams-check audit

help:
	@printf "%s\n" \
	"Targets:" \
	"  install         Install deps (npm ci)" \
	"  check           Lint + types + test + build" \
	"  build           Production build" \
	"  dev             Run dev server" \
	"  test            Run tests (CI mode)" \
	"  lint            ESLint" \
	"  typecheck       TypeScript typecheck" \
	"  diagrams        Render Mermaid diagrams" \
	"  diagrams-check  Ensure no diagram drift" \
	"  diagrams-clean  Remove generated diagrams" \
	"  audit           Show npm audit report"

install:
	$(NPM) ci

check:
	$(NPM) run check

build:
	$(NPM) run build

dev:
	$(NPM) run dev

test:
	$(NPM) run test:ci

lint:
	$(NPM) run lint

typecheck:
	$(NPM) run typecheck

diagrams:
	$(NPM) run diagrams:render

diagrams-check:
	$(NPM) run diagrams:check

diagrams-clean:
	$(NPM) run diagrams:clean

audit:
	$(NPM) run audit:report
