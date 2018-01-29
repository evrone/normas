import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
// import memory from 'rollup-plugin-memory';

const bundles = [{
  name: 'normas',
  input: 'src/js/index.js',
}, {
  name: 'normasWithTurbolinks',
  input: 'src/js/normasWithTurbolinks.js',
}, {
  name: 'normasMutations',
  input: 'src/js/mixins/mutations.js',
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
    // memory({
    //   path: 'src/normas.js',
    //   contents: `
			// 	import normas from './normas';
			// 	if (typeof module!='undefined') module.exports = normas;
			// 	else self.normas = normas;
			// `
    // }),
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
  ]
}));
