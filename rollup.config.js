import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import url from 'rollup-plugin-url';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js', // Asegúrate de que esta entrada exista y sea correcta
      format: 'esm',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
     {
      file: 'dist/index.js', // módulo ES
      format: 'cjs',
      sourcemap: true
    }    
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ 
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['module', 'browser', 'main'],
      browser: true
     }),
    commonjs({ 
      include: /node_modules/,
      requireReturnsDefault: 'auto',
      exclude: ['node_modules/react/jsx-runtime.js'],
      ignore: ['react/jsx-runtime', 
        'react',
        'react-dom',
        'framer-motion']}),
     babel({
      babelHelpers: 'bundled', // Or 'runtime' if you prefer @babel/runtime
      exclude: 'node_modules/**', // Don't transpile node_modules
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // Ensure Babel processes these
    }),  
    typescript({
      tsconfig: './tsconfig.json',
      emitDeclarationOnly: true,
      declaration: true,
      declarationDir: 'dist/types' ,
      jsx: 'react'}),
   
    postcss({
      extract: false, // <== genera un .css separado
      minimize: true,
      sourceMap: true,
      plugins: [],
      extensions: ['.css'],
      include: ['**/*.css', 'node_modules/**/*.css'],
    }),
    json(),   
    copy({
      targets: [
        {
          src: 'src/assets', // Ajusta si es diferente
          dest: 'dist',
          publicPath: '/assets/',
          destDir: 'dist/assets'
        },
      ],
    }),    
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      limit: 10 * 1024,
    }),
  ],
  external: ['react', 'react-dom', 'framer-motion'],
  onwarn: function (warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      if (warning.loc && warning.loc.file && warning.loc.file.includes('node_modules/@patternfly/chatbot') ||
          warning.loc.file.includes('node_modules/@segment/analytics-next')) {
        return;
      }
    }   
    warn(warning);
  }
};