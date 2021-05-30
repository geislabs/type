import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies)

export default [
    {
        input: 'lib/index.ts',
        output: {
            dir: 'dist',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [
            typescript(),
            nodeResolve({ preferBuiltins: false }), // or `true`
            commonjs(),
        ],
        external,
    },
    {
        input: './dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [
            dts({
                respectExternal: true,
            }),
        ],
        external,
    },
]
