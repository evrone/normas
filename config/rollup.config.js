import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';

const bundles = [{
  name: 'normas',
  input: 'src/js/index.js',
}, {
  name: 'integrations/turbolinks',
  input: 'src/js/mixins/turbolinks.js',
}, {
  name: 'integrations/react',
  input: 'src/js/extensions/react.js',
}];

export default bundles.map(({ name, input }) => ({
  input,
  output: {
    strict: true,
    file: `dist/js/${name}.js`,
    format: 'cjs',
    name,
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      // module: true,
      // jsnext: true,
      // browser: true,
      // main: true,
      // jail: '/src/js',
      // modulesOnly: true,
    }),
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    cleanup({
      maxEmptyLines: 1,
    }),
  ]
}));
