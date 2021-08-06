import { instantiateStreaming } from "assemblyscript/lib/loader";

export default async function loadWasm(url) {
  const result = await WebAssembly.instantiateStreaming(fetch(url), {
    module: {},
    env: {
      seed() {
        return Math.random() * Number.MAX_SAFE_INTEGER;
      },
      abort() {},
    },
  });

  return result.instance;
}

export async function optimized() {
  return await loadWasm("/wasm/optimized.wasm");
}

export async function exported() {
  const o = await optimized();
  return o.exports;
}

export async function getStuff() {
  let wasm = await instantiateStreaming(fetch("/wasm/optimized.wasm"), {
    env: {
      seed() {
        return Math.random() * Number.MAX_SAFE_INTEGER;
      },
      abort() {},
    },
  });

  return wasm.exports;
}
