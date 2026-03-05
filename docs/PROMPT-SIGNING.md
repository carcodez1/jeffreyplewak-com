# Prompt Signing

This repository stores prompts in `prompts/promptpack-v1/` and signs the generated prompt manifest as an integrity proof.

## Key ownership

- Signing keys must live outside this repository.
- Do not commit private keys, public keys, passphrases, or key material into git.
- Recommended location: user-managed secure path (for example, an external secrets store or local secure key directory).

## Generate/refresh manifest + optional signature

```bash
bash scripts/prompts/sign-prompts.sh
```

This script:
- regenerates `prompts/promptpack-v1/manifest.json`
- optionally signs the manifest with `cosign sign-blob` when `COSIGN_KEY` is provided

Optional signing environment variables:
- `COSIGN_KEY` (path or URI to private key)
- `COSIGN_PASSWORD` (if key is passphrase-protected)

Equivalent manual command:

```bash
cosign sign-blob \
  --key "$COSIGN_KEY" \
  --output-signature prompts/promptpack-v1/manifest.json.sig \
  prompts/promptpack-v1/manifest.json
```

## Verify prompt pack integrity

```bash
bash scripts/prompts/verify-prompts.sh
```

This script:
- checks required ownership headers (`Author`, `Created`, `License`) in prompt files
- verifies `manifest.json` hashes match prompt files
- optionally verifies signature via `cosign verify-blob` when both `COSIGN_PUBKEY` and `manifest.json.sig` exist

Equivalent manual signature verification:

```bash
cosign verify-blob \
  --key "$COSIGN_PUBKEY" \
  --signature prompts/promptpack-v1/manifest.json.sig \
  prompts/promptpack-v1/manifest.json
```

## Local gate

Run before merge:
`bash scripts/prompts/verify-prompts.sh && npm run -s check`
