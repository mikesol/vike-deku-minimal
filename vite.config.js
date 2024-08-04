import vike from 'vike/plugin'
import deku from './rollup-plugin-vike-deku';

export default {
  plugins: [deku(), vike()]
}
