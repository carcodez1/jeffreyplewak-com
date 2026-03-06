Nodes:
- intake
- inspect_repo
- classify_task
- select_skills
- question_gate
- codex_patch
- verify
- review
- human_approval
- done

Interrupt when:
- route creation or rename
- metadata / JSON-LD / canonical changes
- analytics insertion
- dependency changes
- >10 files touched
- protected proof route touched
- verify fails
