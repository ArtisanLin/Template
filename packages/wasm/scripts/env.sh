# 注意：确保脚本中不会出现危险命令，比如 rm -rf

echo "cargo fetch"
cargo fetch

echo "cargo install wasm-pack"
cargo install wasm-pack \
  --config 'source.crates-io.replace-with = "aliyun"' \
  --config 'source.aliyun.registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"'