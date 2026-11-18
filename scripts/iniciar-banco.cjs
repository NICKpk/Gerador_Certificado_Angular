const { constants, copyFileSync } = require('node:fs');
const { join } = require('node:path');

const raiz = join(__dirname, '..');

try {
  copyFileSync(join(raiz, 'db.seed.json'), join(raiz, 'db.json'), constants.COPYFILE_EXCL);
} catch (erro) {
  if (erro.code !== 'EEXIST') throw erro;
}
