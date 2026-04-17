---
title: "Claude Code：把 Opus 4.7 用得更順的 6 個實戰技巧"
description: "從 Auto mode、/focus、/effort 到驗證工作成果，整理成台灣繁體中文版。"
pubDate: 2026-04-17
tags: ["claude-code", "opus-4.7", "ai", "coding-agent", "workflow"]
---

最近幾週我一直在內部使用 Opus 4.7，整體感受是生產力真的高了不少。

這篇想分享幾個做法，幫你把 4.7 用得更順。

## 1. Auto mode，幾乎不用再一直處理 permission prompts

Opus 4.7 很適合做複雜、長時間執行的工作，像是：

- 深度研究
- 大型程式碼重構
- 開發較完整的新功能
- 一路迭代到達成某個效能 benchmark

以前做這種長任務時，通常只有兩種選擇：

- 一直守在旁邊，隨時處理 permission prompts
- 或直接使用 `--dangerously-skip-permissions`

我們最近推出了 **Auto mode**，作為一個更安全的替代方案。

在這個模式裡，permission prompts 會被送去一個 **model-based classifier**，由它判斷這個指令是否安全。如果判定安全，就會自動批准執行。

這代表你不用再一路盯著模型跑任務。更重要的是，你可以同時開更多個 Claude 並行工作。當其中一個 Claude 正在跑，你就可以把注意力切到下一個 Claude。

目前 **Auto mode** 已經開放給 **Max、Teams 與 Enterprise** 用戶，在 **Opus 4.7** 上使用。

- CLI：按 `Shift-Tab` 進入 auto mode
- Desktop / VSCode：可從下拉選單選擇

## 2. 新的 `/fewer-permission-prompts` skill

我們也推出了一個新的 **`/fewer-permission-prompts` skill**。

它會掃描你的 session history，找出那些：

- 常見
- 看起來安全
- 但卻反覆觸發 permission prompts

的 bash 或 MCP 指令。

接著它會建議你，把這些指令加入 permissions allowlist。

如果你沒有使用 auto mode，這個 skill 特別有用。它能幫你逐步調整權限設定，減少那些其實沒必要的重複確認。

## 3. Recaps

我們本週稍早推出了 **Recaps**，也是為了 Opus 4.7 做準備。

Recaps 是很短的摘要，內容包括：

- 這個 agent 剛剛做了什麼
- 下一步準備做什麼

當你離開一個長時間執行中的 session 幾分鐘，甚至幾小時後再回來，這個功能會非常實用。

## 4. `/focus`

我自己最近很喜歡 CLI 裡新的 **focus mode**。

它會把中間過程都隱藏起來，讓你只看最後結果。

模型現在已經進步到一個程度，多數時候我其實願意信任它會跑對指令、做對修改，我只需要在最後看結果就好。

- `/focus` 可切換開啟或關閉

## 5. 設定你的 effort level

Opus 4.7 現在使用的是 **adaptive thinking**，不再是以前那種 thinking budgets。

如果你想調整模型思考得更多或更少，我們建議直接調整 **effort**。

- 較低的 effort：回應更快、token 使用量更低
- 較高的 effort：智慧與能力更強

我自己大多數任務會用 **`xhigh`**，最困難的任務才會用 **`max`**。

補充一下：

- `max` 只會套用在你目前這個 session
- 其他 effort level 則會保留下來，影響你之後的新 session

- `/effort` 可用來設定 effort level

## 6. 給 Claude 一個能驗證自己成果的方法

最後一點，也是非常重要的一點：

**一定要讓 Claude 有方法驗證它自己的工作成果。**

這一直都是把 Claude 使用效果放大 2 到 3 倍的方法，而到了 4.7，這件事變得更重要。

驗證方式會依任務不同而不同：

- **Backend 工作**：讓 Claude 知道怎麼啟動你的 server / service，做端到端測試
- **Frontend 工作**：使用 Claude 的 Chromium extension，讓 Claude 可以操作瀏覽器
- **Desktop app**：使用 computer use

我現在很多 prompt 都長得像這樣：

> Claude do blah blah /go

而 **`/go`** 這個 skill 會讓 Claude：

1. 用 bash、browser 或 computer use 做端到端自我測試
2. 執行 `/simplify` skill
3. 開一個 PR

對長時間任務來說，驗證特別重要。因為當你回頭看這個任務時，你不只知道它「做完了」，還知道它「真的能運作」。

## 總結

Opus 4.7 是一次很明顯的升級。

如果你只是沿用舊 workflow，會覺得它有進步。
但如果你願意調整工作方式，讓 Claude 跑更久、做更多、也更像一個真正的 agent，那個提升就不只是小改進，而是很明顯的一大步。

Happy coding!

---

X 原文連結：<https://x.com/bcherny/status/2044847848035156457?s=46>
