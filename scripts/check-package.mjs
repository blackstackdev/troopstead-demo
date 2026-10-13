import {readdir,readFile} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const forbiddenFiles=/^(\.env.*|.*\.(sqlite|db|dpapi|xlsx|pem)|.*\.log)$/i;
const patterns=[/https?:\/\/[^\s"']*\.supabase\.co/i,/\b(?:sb_secret_|sk_live_|ghp_|github_pat_)[A-Za-z0-9_]+/,/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,/C:\\Users\\/i,new RegExp(['Private','Operational'].join('_'),'i')];
const failures=[];let count=0;
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.name==='.git'||entry.name==='node_modules')continue;const full=path.join(dir,entry.name),relative=path.relative(root,full);if(entry.isDirectory())await walk(full);else{count++;if(forbiddenFiles.test(entry.name))failures.push(relative+' (excluded file type)');const content=await readFile(full);for(const pattern of patterns)if(pattern.test(content.toString('utf8')))failures.push(relative+' (restricted content pattern)');}}}
await walk(root);if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Package boundary check passed for ${count} files. This is a limited automated check, not a comprehensive security audit.`);
