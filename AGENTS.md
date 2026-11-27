# 《重組世界 Rebuild World》翻譯任務入口

翻譯任務以 [TRANSLATION_TASK.md](TRANSLATION_TASK.md) 為準。收到下方指令或要求繼續翻譯時，立即依進度執行。

> 依照 TRANSLATION_TASK.md 從進度紀錄接續，完成下一批三話，以本批交付與驗收結果判定 Goal 是否完成。

## Git Commit Guidelines

### Format

Follow Conventional Commits 1.0.0: `<type>(<scope>): <description>` (scope optional).

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.

### Message rules

- Write in English, imperative mood, lowercase type and scope.
- Subject ≤ 72 chars, no trailing period.
- Describe the actual change, not the task request. Avoid vague subjects like "update" or "fix bug".
- Add a body when the motivation or details are not obvious. Separate subject, body, and footer with blank lines.
- Mark breaking changes with `!` and a `BREAKING CHANGE:` footer.
- Never fabricate issue references or test results.

### Workflow

- Check `git status` and `git diff` before staging; review staged changes before committing.
- One logical change per commit; split unrelated changes.
- Never commit unrelated user modifications, secrets, credentials, or temp files.
- Run relevant tests before committing. Never bypass Git hooks.
- Never amend, rebase, or force-push without explicit permission.
- Normal pushes to `origin/work/reader-updates` are authorized. Translation batches that pass the checks in [TRANSLATION_TASK.md](TRANSLATION_TASK.md) may be fast-forwarded into `main` and pushed to `origin/main`. All other remote pushes require explicit permission.
