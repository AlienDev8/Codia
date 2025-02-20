// import terser from '@rollup/plugin-terser';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import replace from 'rollup-plugin-replace';
// import uglify from '@rollup/rollup-plugin-uglify';
import postcssImport from 'postcss-import';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ devMode ? 'development' : 'production' } mode bundle`);

export default [{
    input:"main.js",
    output:{
        file:"dist/Codicis.js",
        name:"Codicis",
        format:"umd", // para uso como <script>        
        sourcemap:"inline", //"inline", 
        // sourcemap: devMode ? 'inline' : false
    },    
    plugins:[       
        postcss({
            extensions:[".css"],
            plugins:[postcssImport()]
        }),
        babel({
            babelHelpers: 'bundled', 
            exclude: 'node_modules/**',
            presets: ['@babel/env'],
        }),
        nodeResolve({browser:true, extensions:['.cjs','.js','.jsx', '.json']}),
        commonjs(),
        // image(),
        // globals(),
        json(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),               
        // terser()
    ],
}]