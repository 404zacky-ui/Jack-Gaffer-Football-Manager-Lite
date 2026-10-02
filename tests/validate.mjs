import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
for(const file of ['index.html','style.css','manifest.webmanifest','sw.js','js/app.js','js/data.js','js/matchEngine.js','js/matchRenderer.js','js/matchAnalysis.js','js/playerDevelopment.js','js/recruitment.js','js/clubOffice.js','js/saveSystem.js']){
  assert.ok(fs.existsSync(path.join(root,file)),`release asset exists: ${file}`);
}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(index,/manifest\.webmanifest/,'index links the PWA manifest');
assert.match(index,/serviceWorker\.register/,'index registers the service worker');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
assert.equal(manifest.display,'standalone');
console.log('Jack Gaffer release smoke passed: core assets, PWA manifest, and service worker registration are present.');
