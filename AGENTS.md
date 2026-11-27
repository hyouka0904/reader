# 《重組世界 Rebuild World》翻譯任務入口

- 執行任何本專案的翻譯任務前，先讀取 [TRANSLATION_TASK.md](TRANSLATION_TASK.md) 及既有進度摘要，按本批範圍讀取索引、稿件及命中的譯名。
- 使用者送出下方固定指令（可帶 `/goal`），或要求「繼續翻譯」或「下一批」時，立即依規範執行。每次由使用者新送出固定指令，或新啟動同文的 Goal，都依最新進度執行，已結案時直接開始下一個里程碑。自動續跑依規範接續同一批。
- 每次重新讀取進度、工作稿與 Git 狀態。有未結案的里程碑就接續該項，否則按清單取第一個待辦 ID。上一批的 Completed 紀錄只用於定位。沿用已有的範圍、規則和來源資料。
- 只用本批實際交付結果判定完成。若依規範拆批，以本次子里程碑的交付判定。達成規範所列完成條件後標記本次 Goal 為 Completed 並停止，等使用者提出下一批。

> 依照 TRANSLATION_TASK.md 執行下一個里程碑。從進度紀錄接續，並以該里程碑的實際交付結果判定 Goal 是否完成。

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
