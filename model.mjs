export const VERSION='0.1.2';
export const STORAGE_KEY='troopstead-fictional-showcase-v1';
export const MEMBERS=['Demo Scout A','Demo Scout B','Demo Scout C','Demo Scout D'];
export const ACTIVITIES=[
 {id:'signals',title:'Silent signal relay',minutes:10,equipment:'Four paper signal cards',skills:'Observation · communication',steps:'Agree on four simple hand signals. In pairs, send a short sequence silently and compare what was received. Switch roles and discuss which signals were easiest to understand.',safety:'Use an open, level space. Walk rather than run; offer a seated version.'},
 {id:'tower',title:'Paper bridge lab',minutes:15,equipment:'Scrap paper, tape and two books',skills:'Planning · teamwork',steps:'Build a paper bridge between two books. Test it with light paper tokens, redesign once, and explain what changed. Compare designs rather than choosing a fastest builder.',safety:'Keep the supports on a low table. Use only light test loads.'},
 {id:'memory',title:'Trail kit recall',minutes:10,equipment:'Six ordinary, safe kit items and a cloth',skills:'Memory · preparation',steps:'Look at six safe kit items for one minute. Cover them. Each person lists what they remember and gives a practical use for one item. Discuss what a leader would add for an outing.',safety:'Use clean, blunt objects. No medicines, tools, flames or food tasting.'}
];
export function seed(){return {schema:1,fictional:true,programme:{title:'Teamwork at the hall',date:'2026-11-04',blocks:[{title:'Welcome & inspection',minutes:10},{title:'Silent signal relay',minutes:10},{title:'Team skill practice',minutes:25},{title:'Paper bridge challenge',minutes:20},{title:'Individual review slot',minutes:35},{title:'Announcements & close',minutes:20}]},position:0,meetingNotes:'',attendance:['','','',''],reviews:[],equipment:[{id:'paper',title:'Paper & tape kit',quantity:12,notes:'Fictional opening count'},{id:'rope',title:'Practice rope',quantity:null,notes:'Demo stock awaiting a count'}],events:[],funding:{costs:'',price:'',units:'',income:'',actualCosts:''},audit:[]};}
export function cleanText(value,max=180){return String(value??'').trim().slice(0,max);}
export function validateProgramme(p){
 if(!p||cleanText(p.title).length<2||!/^\d{4}-\d{2}-\d{2}$/.test(p.date))return 'Enter a title and valid meeting date.';
 const date=new Date(p.date+'T12:00:00Z');if(Number.isNaN(+date)||date.toISOString().slice(0,10)!==p.date)return 'Choose a valid calendar date.';
 if(!Array.isArray(p.blocks)||p.blocks.length!==6||p.blocks.some(b=>cleanText(b.title).length<2||!Number.isInteger(b.minutes)||b.minutes<1||b.minutes>120))return 'Give each block a title and 1–120 whole minutes.';
 if(p.blocks.reduce((n,b)=>n+b.minutes,0)!==120)return 'This sample programme must total 120 minutes.';
 return '';
}
export function attendanceSummary(s){return {recorded:s.attendance.filter(Boolean).length,present:s.attendance.filter(v=>['P','L'].includes(v)).length};}
export function canReview(s,index){return ['P','L'].includes(s.attendance[index]);}
export function reviewIndividual(s,index,evidence){
 if(!canReview(s,index))throw Error('Record this fictional Scout as present or late before an individual review.');
 const note=cleanText(evidence,600);if(note.length<8)throw Error('Add an individual observation of at least eight characters.');
 s.reviews=s.reviews.filter(r=>r.member!==index);s.reviews.push({member:index,note,state:'Leader review recorded — no official award'});
 return s;
}
export function prepDate(value){const d=new Date(value+'T12:00:00Z');const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()-2);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return d.toISOString().slice(0,10);}
export function validateStock(q,notes){return (q!==null&&(!Number.isInteger(q)||q<0||q>10000))?'Count must be a whole number from 0 to 10,000.':cleanText(notes,400).length<3?'Add a count or movement note.':'';}
export function parseMoney(value){if(value==='')return null;const n=Number(value);if(!Number.isFinite(n)||n<0||n>100000)throw Error('Enter an amount between R0 and R100,000.');return Math.round(n*100);}
export function fundingTotals(f){const cost=parseMoney(f.costs),price=parseMoney(f.price),income=parseMoney(f.income),actual=parseMoney(f.actualCosts);const units=f.units===''?null:Number(f.units);if(units!==null&&(!Number.isInteger(units)||units<0||units>10000))throw Error('Expected sales must be a whole number from 0 to 10,000.');return {estimate:cost===null||price===null||units===null?null:price*units-cost,actual:income===null||actual===null?null:income-actual};}
export function recordAction(s,action){s.audit.unshift({at:new Date().toISOString(),action:cleanText(action)});s.audit=s.audit.slice(0,100);}
export function exportDemo(s){return {demoVersion:VERSION,fictional:true,exportedAt:new Date().toISOString(),members:MEMBERS,...structuredClone(s)};}
export function restore(value){
 try{const s=JSON.parse(value);if(s.schema!==1||s.fictional!==true||validateProgramme(s.programme)||!Array.isArray(s.attendance)||s.attendance.length!==4||s.attendance.some(a=>!['','P','L','A','E'].includes(a))||!Array.isArray(s.equipment)||s.equipment.length!==2||s.equipment.some((e,i)=>e.id!==seed().equipment[i].id||validateStock(e.quantity,e.notes))||!Array.isArray(s.events)||s.events.length>20||s.events.some(e=>validateProgramme({...seed().programme,title:e.title,date:e.date})||!Array.isArray(e.tasks)||e.tasks.length>12||e.tasks.some(t=>typeof t.label!=='string'||typeof t.done!=='boolean'))||!Array.isArray(s.reviews)||s.reviews.some(r=>!Number.isInteger(r.member)||r.member<0||r.member>3||!canReview(s,r.member)||typeof r.note!=='string')||new Set(s.reviews.map(r=>r.member)).size!==s.reviews.length||!Array.isArray(s.audit)||s.audit.length>100||s.audit.some(a=>typeof a.at!=='string'||Number.isNaN(Date.parse(a.at))||typeof a.action!=='string'))return null;fundingTotals(s.funding);if(!Number.isInteger(s.position)||s.position<0||s.position>5)return null;
 const fresh=seed();return {...fresh,programme:{title:cleanText(s.programme.title),date:s.programme.date,blocks:s.programme.blocks.map(b=>({title:cleanText(b.title),minutes:b.minutes}))},position:s.position,meetingNotes:cleanText(s.meetingNotes,600),attendance:s.attendance,equipment:s.equipment.map((e,i)=>({...fresh.equipment[i],quantity:e.quantity,notes:cleanText(e.notes,400)})),events:s.events.map(e=>({title:cleanText(e.title),date:e.date,tasks:e.tasks.map(t=>({label:cleanText(t.label),done:t.done}))})),reviews:s.reviews.map(r=>({member:r.member,note:cleanText(r.note,600),state:'Leader review recorded — no official award'})),audit:s.audit.map(a=>({at:a.at,action:cleanText(a.action)})),funding:Object.fromEntries(['costs','price','units','income','actualCosts'].map(k=>[k,String(s.funding[k]??'')]))};}catch{return null;}
}
