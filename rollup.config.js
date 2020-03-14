import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import cleanup from 'rollup-plugin-cleanup';

import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        }
    ],
    plugins: [
        external(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        terser(),
        commonjs(),
        cleanup({
            comments: 'none',
        }),
    ]
}