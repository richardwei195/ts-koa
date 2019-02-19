# ts-koa

A typescript Node.JS web API lite framework based on Koa, and this framework is also be used in [Teambition](https://teambition.com)

## Intro

### 1.the structure

```bash
ts-koa
├── package.json
├── src
│   ├── controller
│   |   └── base.ts
│   ├── service
|   |   ├── ajv.ts
│   |   └── logger.ts
│   ├── blls
│   |   └── hello.ts
│   ├── public
│   ├── app.ts
│   ├── global.d.ts
│   ├── loader.ts
│   ├── router.ts
│   └── types.d.ts
├── config
|   └── default.yml
└── test
```

- `src/controller/**` API 路由
- `src/blls/**` 业务逻辑层
- `config/defuault.yml` 编写配置文件
- `test/**` 单元测试
- `app.ts` 应用初始化

## How to use

### 1.use git clone

```shell
~ cd <your namespace> && git clone git@github.com:richardwei195/ts-koa.git && cd ts-koa && npm i
```

### 2.rename you project name in project.json

### 3.custom your lint style in tslint.json

you can see [https://palantir.github.io/tslint](https://palantir.github.io/tslint) to find you want.

### 4.now you can run your application on your computer or any others

```shell
~ npm run dev

> nodemon --watch 'src/**/*.ts' --exec ts-node src/app.ts

[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: src/**/*.ts
[nodemon] starting `ts-node src/app.ts`
koa deprecated Support for generators will be removed in v3. See the documentation for examples of how to convert old middleware https://github.com/koajs/koa/blob/master/docs/migration.md src/app.ts:8:5
Server listen on 3000
```

Becarefully, this is a demo route in the path: `/src/controller/hello.ts`, so you can request this route: `localhost:3000/hello-world`

and it will return `hello World!`, yea!

## how to build
