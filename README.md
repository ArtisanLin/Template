# Monorepo Template

## package.json

### onlyBuiltDependencies

package.json 中的这段配置：

```json
"pnpm": {
  "onlyBuiltDependencies": [
    "@swc/core",
    "esbuild"
  ]
}
```

是 pnpm 的一个特有配置项，用于控制哪些依赖在 node_modules 中使用 realpath（真实路径）而非 symlink（符号链接），
主要是为了兼容某些依赖（比如需要编译的依赖）在 打包或运行时对路径有特殊要求。
在使用 pnpm 时，它会默认把依赖放在一个全局的 store 中，然后通过 符号链接（symlink） 的方式链接到项目的 node_modules。这非常节省磁盘空间和安装时间。

但有些包（尤其是那些用 Rust、Go、C 或使用 Node.js 原生模块的包，比如 @swc/core、esbuild）在运行时 依赖路径必须是“真实路径”，否则会报错或行为异常。

### resolutions

package.json 中的 "resolutions" 字段主要用于 强制锁定依赖树中某些依赖的版本，即使这些依赖并不是你直接安装的，而是你的依赖的依赖（transitive dependencies）。

这个字段最早由 Yarn 支持，现在 pnpm 也部分支持。

```json
"resolutions": {
  "lodash": "4.17.21",
  "react-dom/loose-envify": "1.4.0"
}

```

这个例子表示：

- 所有依赖中使用的 lodash，不管是哪个包引入的，统统使用 4.17.21。

- react-dom **内部依赖的** loose-envify 强制使用 1.4.0。

虽然 pnpm 也能解析 resolutions，但官方推荐你用 pnpm.overrides，效果一致：

```json
"pnpm": {
  "overrides": {
    "lodash": "4.17.21",
    "react-dom>loose-envify": "1.4.0"
  }
}
```

#### 使用场景

- 修复漏洞: 某个间接依赖存在安全漏洞，升级主依赖包不现实时，可以用 resolutions 强制指定安全版本。

- 解决冲突: 项目中多个依赖对某个包依赖不同版本，且版本之间不兼容时，通过 resolutions 统一版本。

- 打补丁: 临时解决某个库的问题（如某版本有 bug），强制使用你想要的版本。
