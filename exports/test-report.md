# SynthLang Testing Report

Generated: 2025-10-04T18:35:47.742Z

## Overall Summary

- **Total Tests**: 23
- **Passed**: 3 ✅
- **Failed**: 20 ❌
- **Pass Rate**: 13.0%
- **Avg Compression**: 41.9%
- **Avg Semantic Score**: 60.6%
- **Avg Latency**: 0.06ms

## Results by Difficulty

### EASY
- Pass Rate: 20.0%
- Avg Compression: 36.6%
- Avg Semantic Score: 48.3%

### MEDIUM
- Pass Rate: 16.7%
- Avg Compression: 40.6%
- Avg Semantic Score: 67.1%

### HARD
- Pass Rate: 0.0%
- Avg Compression: 49.0%
- Avg Semantic Score: 57.7%

## Results by Category

### crud
- Pass Rate: 20.0%
- Avg Compression: 39.4%
- Avg Semantic Score: 56.0%

### api
- Pass Rate: 50.0%
- Avg Compression: 25.3%
- Avg Semantic Score: 66.7%

### data
- Pass Rate: 0.0%
- Avg Compression: 41.8%
- Avg Semantic Score: 63.9%

### logic
- Pass Rate: 0.0%
- Avg Compression: 41.6%
- Avg Semantic Score: 60.7%

### auth
- Pass Rate: 0.0%
- Avg Compression: 60.6%
- Avg Semantic Score: 50.6%

### ml
- Pass Rate: 33.3%
- Avg Compression: 39.5%
- Avg Semantic Score: 67.4%

### ui
- Pass Rate: 0.0%
- Avg Compression: 50.7%
- Avg Semantic Score: 43.8%

### web
- Pass Rate: 0.0%
- Avg Compression: 53.3%
- Avg Semantic Score: 66.7%

### database
- Pass Rate: 0.0%
- Avg Compression: 40.2%
- Avg Semantic Score: 64.3%

## Failed Tests

### easy_001: Simple CREATE operation
- **Input**: create new user
- **Expected**: 作 新 者
- **Got**: 作 新 user
- **Errors**: Output mismatch: got "作 新 user", expected "作 新 者"

### easy_002: Simple READ operation
- **Input**: read all data
- **Expected**: 読 全 値
- **Got**: 読 庫
- **Errors**: Output mismatch: got "読 庫", expected "読 全 値"

### easy_003: Simple UPDATE operation
- **Input**: update user
- **Expected**: 更 者
- **Got**: 更 user
- **Errors**: Output mismatch: got "更 user", expected "更 者"

### easy_005: Simple API call
- **Input**: send request
- **Expected**: 送 求
- **Got**: 送 要
- **Errors**: Output mismatch: got "送 要", expected "送 求"

### medium_001: CREATE with database save
- **Input**: create new user and save to database
- **Expected**: 作 新 者 且 書 庫
- **Got**: 作 新 user 且 書 庫
- **Errors**: Output mismatch: got "作 新 user 且 書 庫", expected "作 新 者 且 書 庫"

### medium_002: READ with filtering
- **Input**: fetch all records and filter by date
- **Expected**: 読 全 録 且 選 日
- **Got**: 読 records 且 選 by 日
- **Errors**: Output mismatch: got "読 records 且 選 by 日", expected "読 全 録 且 選 日"

### medium_003: Conditional UPDATE
- **Input**: validate input then update database
- **Expected**: 検 入 故 更 庫
- **Got**: 検 引 故 更 庫
- **Errors**: Output mismatch: got "検 引 故 更 庫", expected "検 入 故 更 庫"

### medium_005: Loop with calculation
- **Input**: loop through all items and calculate total
- **Expected**: 回 全 物 且 計 全
- **Got**: 回 through 全 items 且 計 計
- **Errors**: Output mismatch: got "回 through 全 items 且 計 計", expected "回 全 物 且 計 全"

### medium_006: Multiple transformations
- **Input**: compress file and encrypt data
- **Expected**: 圧 簿 且 暗 値
- **Got**: 圧 簿 且 暗 庫
- **Errors**: Output mismatch: got "圧 簿 且 暗 庫", expected "圧 簿 且 暗 値"

### medium_007: Authentication flow
- **Input**: authenticate user and create session
- **Expected**: 認 者 且 作 会
- **Got**: authenticate user 且 作 会
- **Errors**: Output mismatch: got "authenticate user 且 作 会", expected "認 者 且 作 会"

### hard_001: Complex error handling
- **Input**: if error occurs then retry the operation or cancel and rollback
- **Expected**: 条 誤 故 再 処 或 取 且 戻
- **Got**: 条 誤 occurs 故 再 the 交 或 取 且 取
- **Errors**: Output mismatch: got "条 誤 occurs 故 再 the 交 或 取 且 取", expected "条 誤 故 再 処 或 取 且 戻"

### hard_002: Cache-first strategy
- **Input**: fetch data from cache or load from database and update cache
- **Expected**: 読 蔵 或 読 庫 且 更 蔵
- **Got**: 読 庫 ← 蔵 或 読 ← 庫 且 更 蔵
- **Errors**: Output mismatch: got "読 庫 ← 蔵 或 読 ← 庫 且 更 蔵", expected "読 蔵 或 読 庫 且 更 蔵"

### hard_003: Full authentication flow
- **Input**: validate user credentials authenticate and create session then return token
- **Expected**: 検 者 認 且 作 会 故 戻 令
- **Got**: 検 user credentials authenticate 且 作 会 故 戻 令
- **Errors**: Output mismatch: got "検 user credentials authenticate 且 作 会 故 戻 令", expected "検 者 認 且 作 会 故 戻 令"

### hard_004: Complex database query
- **Input**: query database filter results sort by date and return first ten items
- **Expected**: 問 庫 選 成 順 日 且 戻 初 10 物
- **Got**: 問 庫 選 results 順 by 日 且 戻 初 ten items
- **Errors**: Output mismatch: got "問 庫 選 results 順 by 日 且 戻 初 ten items", expected "問 庫 選 成 順 日 且 戻 初 10 物"

### hard_005: ML training pipeline
- **Input**: train the model on dataset validate accuracy and save weights if performance improves
- **Expected**: 訓 模 値 検 精 且 書 重 条 最
- **Got**: 訓 模 可 表 検 精 且 書 weights 条 performance improves
- **Errors**: Output mismatch: got "訓 模 可 表 検 精 且 書 weights 条 performance improves", expected "訓 模 値 検 精 且 書 重 条 最"

### hard_006: UI interaction flow
- **Input**: render screen display button and wait for user click then process event
- **Expected**: 描 画 表 釦 且 待 者 押 故 処 件
- **Got**: 描 画 表 釦 且 待 for user click 故 算 event
- **Errors**: Output mismatch: got "描 画 表 釦 且 待 for user click 故 算 event", expected "描 画 表 釦 且 待 者 押 故 処 件"

### domain_ml_002: ML classification task
- **Input**: classify data cluster items and optimize accuracy
- **Expected**: 級 値 群 物 且 最 精
- **Got**: 級 庫 群 items 且 最 精
- **Errors**: Output mismatch: got "級 庫 群 items 且 最 精", expected "級 値 群 物 且 最 精"

### domain_web_001: Web API integration
- **Input**: fetch from API parse JSON and display results
- **Expected**: 読 接 解 JSON 且 表 成
- **Got**: 読 ← 接 解 JSON 且 表 results
- **Errors**: Output mismatch: got "読 ← 接 解 JSON 且 表 results", expected "読 接 解 JSON 且 表 成"

### domain_db_001: Database operations
- **Input**: insert record into table and create index
- **Expected**: 挿 録 表 且 作 索
- **Got**: 挿 録 into 表 且 作 索
- **Errors**: Output mismatch: got "挿 録 into 表 且 作 索", expected "挿 録 表 且 作 索"

### domain_db_002: Database backup/restore
- **Input**: backup database and restore from snapshot
- **Expected**: 備 庫 且 復 快
- **Got**: 備 庫 且 restore ← 備
- **Errors**: Output mismatch: got "備 庫 且 restore ← 備", expected "備 庫 且 復 快"

