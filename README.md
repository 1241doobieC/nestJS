# nestjs 專案題

## 說明

本考題為 NestJS 和 TypeScript 基本考題
允許使用以下資源來完成考題：

- 上網查資料
- https://nestjs.com/
- 使用 AI 工具

請確保在使用外部資源時，理解並能夠解釋每個解決方案的原理。
基本題2小時到一天內可完成,加分題可選。

## 開啟專案說明

1. vscode 開啟專案後執行 `pnpm i`
2. 安裝完成後`pnpm start:dev`
3. 開啟瀏覽器進入以下網址 `http://127.0.0.1:3000/api-docs` <!-- Lack of port number -->

## 題目

### 基本題

#### 1. 觀察`src/user` 資料夾內的檔案,依照此格式完成post module.

post的entity在`src/post/entities/post.entity.ts`裡,使用`src/post/post.repository.service.ts`模擬資料庫.(hint: [module generate](https://docs.nestjs.com/cli/overview))

#### 2. 使用dto驗證create post 的 body.

#### 3. 在`post.service.ts`改寫findOne調用`post.repository.service.ts`裡的realFindOne,模擬真實資料庫連線問題.(不要改變`post.repository.service.ts`內程式碼)

error在`src/error.ts`

1. 當 NetworkError or TimeoutError 實現retry.
2. 當 InternalError response BadRequestException([hint](https://docs.nestjs.com/exception-filters))
3. return = null 時 NotFoundException

#### 4. 建立endpoint `GET /users/:id/posts` 查詢該user 有哪些posts.(hint: import userRepositoryService and postRepositoryService )

## 檢驗

執行`test:q1` ~ `test:q4`
