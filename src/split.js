// usage: node split.js in.js out-core.js out-data.js
const fs=require('fs'); const acorn=require('/opt/npm-tools/node_modules/acorn'); const walk=require('/opt/npm-tools/node_modules/acorn-walk');
const [,,inp,outCore,outData]=process.argv; const src=fs.readFileSync(inp,'utf8');
const ast=acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',allowReturnOutsideFunction:true});
const MIN=+(process.env.MIN||300);
const pure=n=>{ if(!n) return true; switch(n.type){
  case 'Literal': return !n.regex;
  case 'TemplateLiteral': return n.expressions.length===0;
  case 'ArrayExpression': return n.elements.every(e=>e===null||(e.type!=='SpreadElement'&&pure(e)));
  case 'ObjectExpression': return n.properties.every(p=>p.type==='Property'&&!p.computed&&p.kind==='init'&&!p.method&&!p.shorthand&&(p.key.type==='Identifier'||p.key.type==='Literal')&&pure(p.value));
  case 'UnaryExpression': return (n.operator==='-'||n.operator==='+')&&n.argument.type==='Literal'&&typeof n.argument.value==='number';
  default: return false; } };
const picks=[];
// recursive walk tracking function depth; depth 2 = top level of the app IIFE
function visit(n,depth){ if(!n||typeof n.type!=='string') return;
  const isFn=/Function/.test(n.type); const d=isFn?depth+1:depth;
  if(d===2&&(n.type==='ArrayExpression'||n.type==='ObjectExpression'||n.type==='TemplateLiteral'||n.type==='Literal')&&(n.end-n.start)>=MIN&&pure(n)){ picks.push(n); return; }
  for(const k in n){ if(k==='type'||k==='start'||k==='end') continue; if(n.type==='TaggedTemplateExpression'&&k==='quasi') continue; const v=n[k];
    if(Array.isArray(v)) v.forEach(x=>x&&typeof x.type==='string'&&visit(x,d)); else if(v&&typeof v.type==='string') visit(v,d); } }
visit(ast,0);
picks.sort((a,b)=>a.start-b.start);
let out='', last=0; const data=[];
picks.forEach((n,i)=>{ out+=src.slice(last,n.start)+'__WD['+i+']'; data.push(src.slice(n.start,n.end)); last=n.end; });
out+=src.slice(last);
fs.writeFileSync(outCore,out); fs.writeFileSync(outData,'/* Wordy data: texts, grammar, dictionaries */\nvar __WD=[\n'+data.join(',\n')+'\n];\n');
const kb=x=>(Buffer.byteLength(x)/1024).toFixed(0)+'KB';
console.log('picked',picks.length,'data',kb(data.join('')),'core',kb(out));
