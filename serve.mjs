import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = new URL('./', import.meta.url);
const allowed = new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.mjs','app.mjs'],['/model.mjs','model.mjs'],['/mark.svg','mark.svg']]);
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',mjs:'text/javascript; charset=utf-8',svg:'image/svg+xml'};
export function createDemoServer(){return http.createServer(async(req,res)=>{
  const file=allowed.get(new URL(req.url,'http://localhost').pathname);
  res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cache-Control','no-store');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end('Read-only static server');}
  if(!file){res.writeHead(404);return res.end('Not found');}
  try{const body=await readFile(new URL(file,root));res.setHeader('Content-Type',types[file.split('.').pop()]);res.writeHead(200);res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(500);res.end('Demo file unavailable');}
});}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){createDemoServer().listen(4318,'127.0.0.1',()=>console.log('Troopstead fictional showcase: http://127.0.0.1:4318/'));}
