import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import json from '@rollup/plugin-json';
const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);
export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: devMode ? "inline" : false,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: devMode ? "inline" : false,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
      }),
      json(),
      terser(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
    ],
  },
];
