# Scheduling posts with cron-job.org

GitHub Actions `schedule` triggers are best-effort: during high load they can be delayed by many minutes or dropped entirely. This bot is timed by [cron-job.org](https://cron-job.org) instead, which calls GitHub's `workflow_dispatch` API every hour.

The workflow [`.github/workflows/post.yml`](../.github/workflows/post.yml) only listens for `workflow_dispatch` (manual or API) and runs on a **self-hosted runner**. Bluesky credentials stay in GitHub Actions secrets (`BSKY_HANDLE`, `BSKY_PASSWORD`).

## 0. Prerequisites

1. A healthy self-hosted runner is online for this repository.
2. The runner can execute the workflow steps in `post.yml` (`npm ci`, `npm run build`, `npm start`).
3. Required repository secrets exist: `BSKY_HANDLE`, `BSKY_PASSWORD`.

## 1. Create a fine-grained GitHub PAT

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
2. **Resource owner:** your account
3. **Repository access:** Only select repositories → `Mascott106/outerwilds-bskybot`
4. **Permissions** → Repository permissions → **Actions: Read and write**
5. Generate the token and copy it once

Store this token only in cron-job.org. Never commit it to the repo.

## 2. Create the cron-job.org job

1. Sign in at [cron-job.org](https://cron-job.org) and create a new cronjob
2. Configure:

| Field | Value |
| --- | --- |
| Title | e.g. `Outer Wilds Bluesky post` |
| URL | `https://api.github.com/repos/Mascott106/outerwilds-bskybot/actions/workflows/post.yml/dispatches` |
| Schedule | Every hour at minute **23** (UTC) |
| Request method | `POST` |

3. **Headers:**

```
Accept: application/vnd.github+json
Authorization: Bearer <YOUR_GITHUB_PAT>
X-GitHub-Api-Version: 2022-11-28
Content-Type: application/json
```

4. **Request body:**

```json
{"ref":"main"}
```

5. Enable the job and save

## 3. Verify

1. Merge/push the `workflow_dispatch`-only workflow to `main` first (dispatch uses the workflow on the default branch).
2. In cron-job.org, use **Execute now** (or in GitHub: Actions → **Post to Bluesky** → **Run workflow**).
3. Within about a minute, a new run should appear under Actions and complete successfully.

## Notes

- Minute **23** UTC is intentionally off peak; adjust if you prefer a different offset.
- If the PAT expires or is revoked, cron-job.org will get `401`/`403` and no posts will fire until you update the Authorization header.
- Do not re-add a GitHub Actions `schedule` while the external cron is active, or you may get double posts.
