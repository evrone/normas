import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import colors from 'colors'; // dependency from 'rollup-plugin-filesize'

const bundles = [
  {
    name: 'normas',
    input: 'index.js',
  },
  {
    name: 'integrations/turbolinks',
    input: 'mixins/turbolinks.js',
  },
  {
    name: 'integrations/react',
    input: 'extensions/react.js',
  },
  {
    name: 'extensions/views',
    input: 'mixins/views.js',
  },
];

bundles.forEach(b => b.debug = true);

bundles.push(...bundles.map(({ name, input }) => ({
  name: `${name}.production`,
  input,
  debug: false,
})));

export default bundles.map(({ name, input, debug }) => ({
  input: `src/js/${input}`,
  output: {
    strict: true,
    file: `dist/js/${name}.js`,
    name,
    format: 'cjs',
    sourcemap: true,
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
    uglify({
      toplevel: true,
      compress: {
        global_defs: {
          NORMAS_DEBUG: debug,
        },
      },
    //   output: {
    //     // comments: 'all',
    //     comments: function(node, comment) {
    //       // multiline comment
    //       // if (comment.type === 'comment2') {
    //         return /@preserve|@license|@cc_on/i.test(comment.value);
    //       // }
    //     },
    //   },
    }),
    progress(),
    filesize({
      render: function(opt, size, gzip, _bundle) {
        const primaryColor = opt.theme === 'dark' ? 'green' : 'black';
        const secondaryColor = opt.theme === 'dark' ? 'blue' : 'blue';
        return (
          (colors[primaryColor].bold('Bundle size: ') + colors[secondaryColor](size)) +
          (opt.showGzippedSize ? ', ' + colors[primaryColor].bold('Gzipped size: ') + colors[secondaryColor](gzip) : "")
        );
      },
    }),
  ],
}));
