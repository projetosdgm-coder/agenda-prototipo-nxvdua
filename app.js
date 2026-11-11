/* Pente Fino, protótipo navegável. Nada aqui se conecta de verdade: tudo é simulado no navegador. */
(function(){
'use strict';
const P = window.PF, SV = P.SERVICOS, CL = P.CLIENTES;
const $ = (s,el=document)=>el.querySelector(s);
const DS = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
const DSC = ['dom','seg','ter','qua','qui','sex','sáb'];
const mqDesk = window.matchMedia('(min-width:980px)');

/* ---------- Ícones (traço fino) ---------- */
const IC = {
  bot:'M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  cal:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  msg:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  link:'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  chart:'M3 3v18h18M8 17v-4M13 17V8M18 17v-7',
  cog:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  send:'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  mic:'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
  check:'M20 6L9 17l-5-5',
  copy:'M9 9h11v11H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  plus:'M12 5v14M5 12h14',
  gift:'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  tes:'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  alert:'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
  voltar:'M19 12H5M12 19l-7-7 7-7',
  dir:'M9 18l6-6-6-6',
  esq:'M15 18l-6-6 6-6',
  cel:'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
  pc:'M4 5h16v11H4zM2 20h20',
  qr:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14v2',
  dinheiro:'M2 6h20v12H2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12h.01M18 12h.01',
  raio:'M13 2L3 14h9l-1 8 10-12h-9z',
  busca:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35',
  share:'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
  x:'M18 6L6 18M6 6l12 12',
  sobe:'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  caixa:'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
  ban:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM4.93 4.93l14.14 14.14',
  pessoa:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  repete:'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-3-4 3-4M21 13v2a4 4 0 0 1-4 4H3',
  sol:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  lista:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  star:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z'
};
const ic = (n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]}"/></svg>`;
const ZAP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2zm5.3 13.7c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>`;
const GOO = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853"/><path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.6z" fill="#FBBC05"/><path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z" fill="#EA4335"/></svg>`;

/* ---------- Utilidades ---------- */
const pad = n=>String(n).padStart(2,'0');
const hm = m=>pad(Math.floor(m/60))+':'+pad(m%60);
const hh = m=>Math.floor(m/60)+'h'+(m%60?pad(m%60):'');
const brl = n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0});
const ddmm = d=>pad(d.getDate())+'/'+pad(d.getMonth()+1);
const norm = s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const cap = s=>s.charAt(0).toUpperCase()+s.slice(1);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function nomeOff(off){
  if(off===0) return 'hoje'; if(off===1) return 'amanhã'; if(off===-1) return 'ontem';
  const d=P.dataDe(off); return DS[d.getDay()]+', '+ddmm(d);
}
function nomeOffLongo(off){const d=P.dataDe(off);const base=DS[d.getDay()]+', '+ddmm(d);return off===0?'hoje, '+base:off===1?'amanhã, '+base:base;}
const agoraMin = ()=>{const n=new Date();return n.getHours()*60+n.getMinutes();};

/* ---------- Estado (fica salvo só neste navegador) ---------- */
const CHAVE='pf-proto-v1';
const PADRAO={wa:'off',waNum:'',codigo:'',codigoAte:0,modoIA:'sozinha',google:false,fechados:{},cancelados:{},bloqueios:[],extras:[],atraso:{},autos:{aniv:true,tempo:true,vazio:true,lembrete:true,follow:true,pos:true,vip:false},brindes:{}};
let S;
try{S=Object.assign({},PADRAO,JSON.parse(localStorage.getItem(CHAVE)||'{}'));}catch(e){S=Object.assign({},PADRAO);}
if(S.wa==='codigo'&&Date.now()>S.codigoAte) S.wa='off';
if(S.wa==='conectando') S.wa='on';
const T={rota:'assistente',diaSel:0,visao:'dia',filtro:'todos',busca:'',conv:null,convFiltro:'todas',chat:[],pub:{sv:'corte',off:null,hora:null,ok:false,nome:''},bloq:{tipo:'dia'},pag:{forma:'pix'}};
function salvar(){try{const o={};Object.keys(PADRAO).forEach(k=>o[k]=S[k]);localStorage.setItem(CHAVE,JSON.stringify(o));}catch(e){}}

/* ---------- Agenda (calculada) ---------- */
const INI=540, FIM=1140; // 9h às 19h
function cliNome(e){return e.nome||CL[e.cli].nome;}
function cliPrim(e){return (e.nome||CL[e.cli].nome).split(' ')[0];}
function agendaDo(off){
  const base=P.baseDoDia(off)||[];
  const ex=S.extras.filter(e=>e.off===off);
  const atr=S.atraso[off]||0;
  const ag=agoraMin();
  return base.concat(ex).map(e=>{
    const ini=e.ini+atr, fim=ini+SV[e.sv].dur;
    return Object.assign({},e,{ini,fim,cancel:!!S.cancelados[e.id],feito:off<0||(off===0&&fim<=ag)});
  }).sort((a,b)=>a.ini-b.ini);
}
const ativos = off=>agendaDo(off).filter(e=>!e.cancel);
function folgaBase(off){return P.baseDoDia(off)===null;}
function fechado(off){return !!S.fechados[off]||folgaBase(off);}
function bloqueiosDo(off){
  const b=[{ini:750,fim:810,motivo:'Almoço',fixo:true}];
  S.bloqueios.filter(x=>x.off===off).forEach(x=>b.push(x));
  if(S.google&&off===2) b.push({ini:900,fim:960,motivo:'Compromisso pessoal (Google Agenda)',g:true});
  return b.sort((a,b)=>a.ini-b.ini);
}
function livresDo(off){
  if(fechado(off)) return [];
  const oc=ativos(off).map(e=>[e.ini,e.fim]).concat(bloqueiosDo(off).map(b=>[b.ini,b.fim])).sort((a,b)=>a[0]-b[0]);
  let cur=INI; const out=[];
  if(off===0){const ag=agoraMin(); if(ag>cur) cur=Math.min(FIM,Math.ceil(ag/15)*15);}
  for(const [a,b] of oc){ if(a-cur>=30) out.push({ini:cur,fim:a}); cur=Math.max(cur,b); }
  if(FIM-cur>=30) out.push({ini:cur,fim:FIM});
  return out;
}
const previsto = off=>ativos(off).reduce((s,e)=>s+SV[e.sv].preco,0);
function proximasVagas(off,n){
  const out=[];
  for(let d=off+1; d<off+10 && out.length<n; d++){
    const l=livresDo(d); if(l.length) out.push(nomeOff(d).split(',')[0]+' '+hh(l[0].ini));
    if(l.length>1 && out.length<n) out.push(nomeOff(d).split(',')[0]+' '+hh(l[1].ini));
  }
  return out;
}

/* ---------- Toast e folha ---------- */
let toastT;
function toast(t){const el=$('#toast');el.innerHTML=ic('check')+'<span>'+t+'</span>';el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('on'),2600);}
function abrirFolha(html){const f=$('#folha');f.innerHTML=html;f.hidden=false;$('#fundo-folha').hidden=false;document.body.style.overflow='hidden';}
function fecharFolha(){$('#folha').hidden=true;$('#fundo-folha').hidden=true;document.body.style.overflow='';}

/* ---------- Navegação ---------- */
const ROTAS=[
  {id:'assistente',nome:'Assistente',ic:'bot',grupo:'Dia a dia'},
  {id:'agenda',nome:'Agenda',ic:'cal'},
  {id:'conversas',nome:'Conversas',ic:'msg'},
  {id:'clientes',nome:'Clientes',ic:'users',grupo:'Clientes'},
  {id:'automaticas',nome:'Mensagens automáticas',ic:'bell'},
  {id:'pagina',nome:'Minha página',ic:'link',grupo:'Seu trabalho'},
  {id:'financeiro',nome:'Financeiro',ic:'chart'},
  {id:'ajustes',nome:'Ajustes',ic:'cog'}
];
function navLateral(){
  return ROTAS.map(r=>(r.grupo?`<div class="grupo">${r.grupo}</div>`:'')+
    `<button data-ir="${r.id}" class="${T.rota===r.id?'ativo':''}">${ic(r.ic)}<span>${r.nome}</span>${r.id==='assistente'&&S.wa==='on'?'<i class="ok" title="WhatsApp conectado"></i>':''}${r.id==='conversas'?'<span class="pt">1</span>':''}</button>`).join('');
}
function navBarra(){
  const it=[['assistente','Assistente','bot'],['agenda','Agenda','cal'],['clientes','Clientes','users'],['conversas','Conversas','msg'],['mais','Mais','grid']];
  const grupoMais=['pagina','financeiro','ajustes'];
  return it.map(([id,n,i])=>{
    const at = T.rota===id || (id==='clientes'&&T.rota==='automaticas') || (id==='mais'&&grupoMais.includes(T.rota));
    return `<button ${id==='mais'?'data-a="mais"':`data-ir="${id}"`} class="${at?'ativo':''}">${ic(i)}<span>${n}</span>${id==='conversas'?'<span class="pt">1</span>':''}</button>`;
  }).join('');
}
function ir(r){ if(location.hash!=='#/'+r) location.hash='#/'+r; else render(true); }

/* ============================================================
   1. ASSISTENTE: WhatsApp + chat com a IA
   ============================================================ */
function numMascara(){
  const d=(S.waNum||'').replace(/\D/g,'');
  if(d.length<8) return '(11) 9 ••••-4321';
  return '('+d.slice(0,2)+') 9 ••••-'+d.slice(-4);
}
function gerarCodigo(){
  const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c='';
  for(let i=0;i<8;i++) c+=A[Math.floor(Math.random()*A.length)];
  return c;
}
function qrSvg(semente){
  let s=semente||7; const r=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const N=25, q=[]; let p='';
  for(let y=0;y<N;y++) for(let x=0;x<N;x++){
    const f=(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);
    if(f) continue; if(r()>.52) p+=`M${x} ${y}h1v1h-1z`;
  }
  const fin=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="#1B1916" stroke-width="1" transform="translate(.5 .5)"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#1B1916"/>`;
  return `<svg viewBox="-1 -1 27 27" aria-label="QR Code de exemplo">${fin(0,0)}${fin(N-7,0)}${fin(0,N-7)}<path d="${p}" fill="#1B1916"/></svg>`;
}
function minis(){
  const cel=(miolo)=>`<div class="cel"><div class="tl"><div class="ilha"></div><div class="stt"></div>${miolo}</div></div>`;
  const itens=(lista,hl)=>lista.map((t,i)=>`<div class="it ${i===hl?'hl':''}"><span class="q"></span>${t}</div>`).join('');
  return `<div class="trilho" aria-label="Passo a passo ilustrado">
    <div class="mini">${cel(`<div class="tt">Configurações</div>${itens(['Avatar','Mensagens favoritas','Dispositivos conectados','Conta','Privacidade','Conversas'],2)}`)}
      <p><b>1.</b> No WhatsApp, vá em <b>Configurações</b> (iPhone) ou nos <b>3 pontinhos</b> (Android) e toque em <b>Dispositivos conectados</b>.</p></div>
    <div class="mini">${cel(`<div class="tt">Dispositivos conectados</div><div style="display:flex;justify-content:center;padding:14px 0 4px"><svg class="i" viewBox="0 0 24 24" style="width:48px;height:48px;color:#999"><path d="${IC.pc}"/></svg></div><div style="text-align:center;padding:0 10px;color:#666">Use o WhatsApp no computador e em outros aparelhos</div><div class="bt hl">Conectar dispositivo</div>`)}
      <p><b>2.</b> Toque em <b>Conectar dispositivo</b>. Se pedir, confirme com Face ID ou a senha do celular.</p></div>
    <div class="mini">${cel(`<div class="cam"><div class="mira"></div><div style="font-size:8px;opacity:.7">Aponte para o QR code</div><div class="lk">Conectar com número de telefone</div></div>`)}
      <p><b>3.</b> A câmera abre. <b>Não precisa ler nada</b>: toque em <b>Conectar com número de telefone</b>, embaixo.</p></div>
    <div class="mini">${cel(`<div class="tt" style="text-align:center">Insira o código</div><div style="text-align:center;color:#666;padding:0 8px">Digite o código que aparece no outro aparelho</div><div class="cx">${'ABCD'.split('').map(()=>'<span></span>').join('')}<i></i>${'EFGH'.split('').map(()=>'<span></span>').join('')}</div><div class="kb">${'<b></b>'.repeat(18)}</div>`)}
      <p><b>4.</b> Digite (ou cole) o <b>código de 8 letras e números</b> daqui. Pronto, conectou.</p></div>
  </div>`;
}
function cartaoZap(){
  const altQR = `<details class="alt"><summary>${ic('pc')} Está no computador? Conectar por QR Code</summary>
      <div class="qr">${qrSvg(31)}</div>
      <ol class="passos" style="margin-top:4px"><li>No celular, abra o WhatsApp e vá em <b>Dispositivos conectados</b>.</li><li>Toque em <b>Conectar dispositivo</b> e aponte a câmera para o QR Code acima.</li></ol>
      <p class="mudo" style="font-size:12.5px;margin-top:8px">O QR Code só funciona se este painel estiver aberto em <b>outra tela</b> (computador ou tablet). No próprio celular, use o código.</p></details>`;
  if(S.wa==='on'){
    const modos=[['aprender','Só aprender','1ª semana: a IA lê suas conversas e aprende seu jeito. Não responde ninguém.'],['sugerir','Sugerir e eu aprovo','A IA escreve a resposta e você toca em "enviar".'],['sozinha','Responder sozinha','Responde e marca o simples (horário, preço, endereço). O resto passa para você.']];
    return `<div class="cartao">
      <div class="zap-cab"><div class="zap-logo">${ZAP}</div><div style="flex:1"><h2>WhatsApp conectado</h2><p class="ds">A IA atende no seu número, no seu jeito.</p></div><span class="pill ok"><span class="bol"></span>ativo</span></div>
      <div class="conectado"><span class="pulso"></span><div style="flex:1;font-size:14px"><b>${numMascara()}</b><br><span class="mudo" style="font-size:12.5px">Seu WhatsApp continua no seu celular, igual antes.</span></div></div>
      <div class="numeros"><div><b>14</b><small>conversas hoje</small></div><div><b>5</b><small>horários marcados pela IA</small></div><div><b>1</b><small>passou para você</small></div></div>
      <h3 style="margin-top:16px">Como a IA atende</h3>
      <div class="modos">${modos.map(([k,n,d])=>`<button class="modo ${S.modoIA===k?'ativo':''}" data-a="modo" data-k="${k}"><span class="r"></span><span><b>${n}</b><small>${d}</small></span></button>`).join('')}</div>
      ${S.modoIA==='aprender'?`<div class="progresso"><i style="width:62%"></i></div><p class="mudo" style="font-size:12.5px;margin-top:6px">Aprendendo: 312 conversas lidas. Já pegou seus jeitos: "fala, meu querido", "tamo junto", "fechou".</p>`:''}
      <div class="dica">${ic('info')}<span>Abra o WhatsApp no celular pelo menos <b>uma vez a cada 14 dias</b>, senão o WhatsApp desconecta os aparelhos sozinho.</span></div>
      <div style="margin-top:12px;text-align:right"><button class="btn fantasma peq" data-a="wa-sair">Desconectar</button></div>
    </div>`;
  }
  if(S.wa==='conectando'){
    return `<div class="cartao"><div class="zap-cab"><div class="zap-logo">${ZAP}</div><div><h2>Conectando...</h2><p class="ds">Esperando você digitar o código no WhatsApp.</p></div></div>
      <div class="progresso"><i style="width:70%;animation:pulso 1s infinite"></i></div></div>`;
  }
  if(S.wa==='codigo'){
    const c=S.codigo;
    return `<div class="cartao">
      <div class="zap-cab"><div class="zap-logo">${ZAP}</div><div><h2>Seu código de conexão</h2><p class="ds">Para o WhatsApp do número ${numMascara()}</p></div></div>
      <div class="codigo" aria-label="Código ${c}">${c.slice(0,4).split('').map(x=>`<span>${x}</span>`).join('')}<i>-</i>${c.slice(4).split('').map(x=>`<span>${x}</span>`).join('')}</div>
      <p class="relogio" id="relogio">vale por 3:00</p>
      <button class="btn ouro cheio" style="margin-top:12px" data-a="copiar-codigo">${ic('copy')} Copiar código</button>
      <h3 style="margin-top:18px">Agora, no WhatsApp deste celular:</h3>
      ${minis()}
      <div class="dica">${ic('bell')}<span>Se aparecer uma notificação do WhatsApp dizendo <b>"Insira o código"</b>, pode tocar nela: é o mesmo caminho.</span></div>
      <div class="aviso">${ic('lock')}<span>Esse código é só seu. <b>Nunca passe para ninguém.</b> Se alguém pedir, é golpe.</span></div>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><button class="btn zap" style="flex:1" data-a="wa-ok">${ic('check')} Já digitei o código</button><button class="btn claro" data-a="wa-codigo">Gerar outro</button></div>
      ${altQR}
    </div>`;
  }
  return `<div class="cartao">
    <div class="zap-cab"><div class="zap-logo">${ZAP}</div><div><h2>Conectar meu WhatsApp</h2><p class="ds">Use o WhatsApp (ou o WhatsApp Business) que já está no seu celular.</p></div></div>
    <label class="campo"><span>Seu número de WhatsApp</span><input id="wa-num" type="tel" inputmode="tel" autocomplete="off" placeholder="(11) 9 0000-0000" value="${esc(S.waNum)}"></label>
    <button class="btn cheio" style="margin-top:12px" data-a="wa-codigo">${ic('raio')} Gerar código de conexão</button>
    <div class="dica">${ic('cel')}<span>Como você abre este painel <b>no próprio celular</b>, não dá para ler QR Code com a câmera. Por isso usamos a opção oficial do WhatsApp <b>"Conectar com número de telefone"</b>: você recebe um código de 8 letras e números e digita no WhatsApp.</span></div>
    <ol class="passos"><li>Coloque seu número e toque em <b>Gerar código</b>.</li><li>No WhatsApp: <b>Dispositivos conectados</b> → <b>Conectar dispositivo</b> → <b>Conectar com número de telefone</b>.</li><li>Digite o código. Seu WhatsApp continua funcionando normal no celular.</li></ol>
    ${altQR}
  </div>`;
}

/* ---------- Motor do chat (respostas prontas) ---------- */
const PEND={}; let pendN=0;
function guarda(fn){const k='p'+(++pendN);PEND[k]=fn;return k;}
const feito = arr=>arr&&arr.length?`<div class="feito">${arr.map(t=>`<span>${ic('check')}${t}</span>`).join('')}</div>`:'';
const zapPrev=(quem,t)=>`<div class="bolha-zap"><small>Mensagem enviada para ${quem}</small>${t}</div>`;
const listaAg = evs=>`<ul>${evs.map(e=>`<li><span class="mono">${hm(e.ini)}</span><span>${cliNome(e)} · ${SV[e.sv].nome}</span></li>`).join('')}</ul>`;
function acoesHtml(ac){
  if(!ac||!ac.length) return '';
  return `<div class="acoes">${ac.map((a,i)=>{
    const k=a.fn?guarda(a.fn):'';
    return `<button class="${i>0?'sec':''}" data-a="chat-acao" data-k="${k}" ${a.ir?`data-irpara="${a.ir}" data-off="${a.off??''}"`:''} ${a.texto?`data-texto="${esc(a.texto)}"`:''}>${a.rot}</button>`;
  }).join('')}</div>`;
}
function montaIA(r){return `${r.html}${feito(r.feito)}${acoesHtml(r.acoes)}`;}

function detectaDia(t){
  if(/depois de amanha/.test(t)) return 2;
  if(/amanha/.test(t)) return 1;
  if(/hoje/.test(t)) return 0;
  let m=t.match(/daqui a (\d+) dias?/); if(m) return +m[1];
  if(/daqui a (uma|1) semana/.test(t)) return 7;
  if(/daqui a (duas|2) semanas/.test(t)) return 14;
  const nomes={domingo:0,segunda:1,terca:2,quarta:3,quinta:4,sexta:5,sabado:6};
  for(const [n,wd] of Object.entries(nomes)){
    if(new RegExp('\\b'+n).test(t)){ const hoje=P.HOJE.getDay(); let o=(wd-hoje+7)%7; if(o===0) o=7; if(/semana que vem|proxima semana/.test(t)&&o<7) o+=7; return o; }
  }
  m=t.match(/\bdia (\d{1,2})\b/);
  if(m){const d=+m[1]; for(let o=0;o<45;o++){if(P.dataDe(o).getDate()===d) return o;}}
  if(/semana que vem|proxima semana/.test(t)) return 7;
  return null;
}
const ehManha = t=>/(^|[^a])manha/.test(t);
const ehTarde = t=>/\btarde\b/.test(t)&&!/boa tarde/.test(t);

function rCancelar(t){
  const off=detectaDia(t)??0;
  const per=ehManha(t)?'manha':ehTarde(t)?'tarde':'dia';
  let evs=ativos(off);
  if(per==='manha') evs=evs.filter(e=>e.ini<720);
  if(per==='tarde') evs=evs.filter(e=>e.ini>=720);
  const perTxt=per==='manha'?'da manhã':per==='tarde'?'da tarde':'';
  if(!evs.length) return {html:`Não achei nada marcado ${perTxt} de <b>${nomeOff(off)}</b>. Sua agenda já está livre aí.`};
  evs.forEach(e=>S.cancelados[e.id]=true); salvar();
  const alt=proximasVagas(off,2), e0=evs[0];
  return {
    html:`Feito. Cancelei <b>${evs.length} ${evs.length>1?'horários':'horário'}</b> ${perTxt} de <b>${nomeOff(off)}</b> e avisei cada cliente:${listaAg(evs)}`+
      zapPrev(cliPrim(e0)+(evs.length>1?` (e mais ${evs.length-1})`:''),`Fala, ${cliPrim(e0)}! Aqui é o Lucas. Vou precisar desmarcar seu horário de ${nomeOff(off).split(',')[0]} às ${hh(e0.ini)}, foi mal pelo imprevisto! Consigo te encaixar ${alt[0]||'amanhã'} ou ${alt[1]||'depois'}. Qual prefere?`)+
      `<br>Quem responder, eu já remarco sozinho e te conto aqui.`,
    feito:[`${evs.length} cancelados`,`${evs.length} clientes avisados`].concat(S.google?['Google Agenda atualizada']:[]),
    acoes:[{rot:'Ver na agenda',ir:'agenda',off},{rot:'Desfazer',fn:()=>{evs.forEach(e=>delete S.cancelados[e.id]);salvar();return{html:`Desfeito. Os ${evs.length} horários voltaram para a agenda e mandei um "pode vir normal, foi engano" para cada um.`,feito:['Horários restaurados']};}}]
  };
}
function rFechar(t){
  let off=detectaDia(t); if(off===null) off=/nao vou/.test(t)?1:1;
  if(folgaBase(off)) return {html:`<b>${cap(nomeOff(off))}</b> é domingo, você já não atende. Tá fechado.`};
  const per=ehManha(t)?'manha':ehTarde(t)?'tarde':'dia';
  if(per==='dia'&&S.fechados[off]) return {html:`<b>${cap(nomeOff(off))}</b> já está fechado.`};
  let evs=ativos(off);
  if(per==='dia'){S.fechados[off]=true;}
  else{
    const b=per==='manha'?{off,ini:INI,fim:750,motivo:'Fechado pelo assistente'}:{off,ini:810,fim:FIM,motivo:'Fechado pelo assistente'};
    S.bloqueios.push(b); evs=evs.filter(e=>e.ini<b.fim&&e.fim>b.ini);
  }
  salvar();
  const qual=per==='dia'?'a agenda de':per==='manha'?'a manhã de':'a tarde de';
  let html=`Pronto. Fechei ${qual} <b>${nomeOff(off)}</b>. Ninguém mais consegue marcar nesse período, nem pelo WhatsApp nem pela sua página.`;
  const fe=[`Agenda de ${nomeOff(off).split(',')[0]} fechada`].concat(S.google?['Google Agenda atualizada']:[]);
  if(!evs.length){
    html+=`<br><br>Não tinha ninguém marcado.`;
    if(off>=5) html+=` Se algum cliente pedir esse dia, eu explico que você está de folga e ofereço o dia antes ou o dia depois.`;
    return {html,feito:fe,acoes:[{rot:'Ver na agenda',ir:'agenda',off}]};
  }
  html+=`<br><br>Tinha <b>${evs.length} ${evs.length>1?'clientes marcados':'cliente marcado'}</b>:${listaAg(evs)}Quer que eu avise e ofereça outro horário?`;
  return {html,feito:fe,acoes:[
    {rot:'Avisar e remarcar',fn:()=>{
      evs.forEach(e=>S.cancelados[e.id]=true); salvar();
      const alt=proximasVagas(off,2);
      return {html:`Mandei para ${evs.length>1?'os '+evs.length:'ele'}. Quando responderem, eu remarco sozinho e te aviso aqui.`+zapPrev(cliPrim(evs[0])+(evs.length>1?` (e mais ${evs.length-1})`:''),`Fala, ${cliPrim(evs[0])}! Aqui é o Lucas. Tive um imprevisto e não vou atender ${nomeOff(off).split(',')[0]}. Consigo te encaixar ${alt[0]||'amanhã'} ou ${alt[1]||'depois'}. Qual fica melhor pra você?`),feito:[`${evs.length} mensagens enviadas`,`${evs.length} horários liberados`]};
    }},
    {rot:'Eu mesmo aviso',fn:()=>{evs.forEach(e=>S.cancelados[e.id]=true);salvar();return{html:'Beleza, não mandei nada. Deixei os horários como cancelados na agenda para você ver quem avisar.'};}}
  ]};
}
function rAtraso(t){
  let min=30; const m=t.match(/(\d+)\s*(min|minuto)/); if(m) min=+m[1]; else if(/uma hora|1 hora|1h\b/.test(t)) min=60; else if(/meia hora/.test(t)) min=30; else if(/(\d+)\s*h/.test(t)) min=+t.match(/(\d+)\s*h/)[1]*60;
  const off=detectaDia(t)??0;
  let evs=ativos(off); if(off===0) evs=evs.filter(e=>!e.feito);
  if(!evs.length) return {html:`Não tem ninguém marcado ${nomeOff(off)} para avisar.`};
  const e0=evs[0];
  return {
    html:`Avisei ${evs.length>1?'os <b>'+evs.length+' clientes</b>':'o cliente'} de <b>${nomeOff(off)}</b> que você vai atrasar <b>${min} min</b>:<ul>${evs.map(e=>`<li><span class="mono">${hm(e.ini)} → ${hm(e.ini+min)}</span><span>${cliNome(e)}</span></li>`).join('')}</ul>`+
      zapPrev(cliPrim(e0)+(evs.length>1?` (e mais ${evs.length-1})`:''),`Fala, ${cliPrim(e0)}! Aqui é o Lucas. ${cap(nomeOff(off).split(',')[0])} vou atrasar uns ${min} minutinhos. Seu horário das ${hh(e0.ini)} fica para as ${hh(e0.ini+min)}, beleza? Se não der pra você, me avisa que eu remarco.`)+
      `<br>Quer que eu empurre os horários na agenda também?`,
    feito:[`${evs.length} mensagens enviadas`],
    acoes:[{rot:`Empurrar ${min} min na agenda`,fn:()=>{S.atraso[off]=(S.atraso[off]||0)+min;salvar();const u=ativos(off).slice(-1)[0];return{html:`Pronto, empurrei os horários de ${nomeOff(off)} em ${min} min. O último agora termina às <b>${hm(u.fim)}</b>.`,feito:['Agenda atualizada']};}},{rot:'Deixar como está',fn:()=>({html:'Ok, só avisei. A agenda ficou igual.'})}]
  };
}
function rLivres(t){
  const off=detectaDia(t)??(agoraMin()>1080?1:0);
  if(fechado(off)) return {html:`<b>${cap(nomeOff(off))}</b> está fechado, não tem horário.`};
  const l=livresDo(off);
  if(!l.length) return {html:`<b>${cap(nomeOff(off))}</b> tá lotado, nenhum horário livre. 💈`};
  const tempo=CL.filter(c=>c.status!=='emdia').sort((a,b)=>(b.ult-b.freq)-(a.ult-a.freq)).slice(0,5);
  return {
    html:`Livre ${nomeOff(off)}:<ul>${l.map(x=>`<li><span class="mono">${hm(x.ini)} às ${hm(x.fim)}</span><span>${Math.round((x.fim-x.ini))} min</span></li>`).join('')}</ul>Quer que eu chame quem já está no tempo de cortar? Tenho <b>${tempo.length} clientes</b> nessa lista.`,
    acoes:[{rot:`Chamar ${tempo.length} clientes`,fn:()=>({html:`Mandei para ${tempo.map(c=>c.primeiro).join(', ')}. O primeiro que responder fica com o horário; para os outros eu ofereço outro dia.`+zapPrev(tempo[0].primeiro,`Fala, ${tempo[0].primeiro}! Abriu um horário ${nomeOff(off).split(',')[0]} às ${hh(l[0].ini)}. Bora aproveitar e dar aquele tapa no visual?`),feito:[`${tempo.length} convites enviados`]})},{rot:'Deixa livre',fn:()=>({html:'Beleza, deixei livre. Se alguém pedir, eu encaixo.'})}]
  };
}
function rSumidos(){
  const l=CL.filter(c=>c.status!=='emdia').sort((a,b)=>(b.ult/b.freq)-(a.ult/a.freq)).slice(0,7);
  return {
    html:`Quem já passou do próprio tempo de corte:<ul>${l.map(c=>`<li><span class="mono">${c.ult}d</span><span>${c.nome}, costuma voltar a cada ${c.freq} dias${c.status==='sumido'?' (sumido)':''}</span></li>`).join('')}</ul>Quer que eu mande um convite no seu jeito para eles?`,
    acoes:[{rot:'Mandar convite',fn:()=>({html:`Mandei para os ${l.length}. Uma mensagem só para cada um, nada de ficar insistindo.`+zapPrev(l[0].primeiro,`Fala, ${l[0].primeiro}! Sumiu, hein? Já faz ${l[0].ult} dias do último corte. Tenho ${proximasVagas(0,2).join(' ou ')}. Bora?`),feito:[`${l.length} convites enviados`]})},{rot:'Ver lista completa',ir:'clientes'}]
  };
}
function rRanking(){
  const l=CL.slice().sort((a,b)=>b.mes-a.mes).slice(0,5);
  const vip=CL.filter(c=>c.gasto>=1000).sort((a,b)=>b.gasto-a.gasto);
  return {
    html:`Quem mais gastou com você este mês:<ul>${l.map((c,i)=>`<li><span class="mono">${i+1}º</span><span>${c.nome}: <b>${brl(c.mes)}</b></span></li>`).join('')}</ul><b>${vip.length} clientes</b> já passaram de R$ 1.000 no total. O primeiro é o ${vip[0].primeiro}, com ${brl(vip[0].gasto)}. Quer separar uma pomada de brinde para a próxima visita dele?`,
    acoes:[{rot:'Separar brinde',fn:()=>{S.brindes[vip[0].id]=true;salvar();return{html:`Anotado. Quando o ${vip[0].primeiro} chegar, aparece um aviso na agenda: <b>entregar pomada de brinde</b>.`,feito:['Brinde anotado']};}},{rot:'Agora não',fn:()=>({html:'Beleza.'})}]
  };
}
function rProdutos(t){
  const qual=/balm/.test(t)?'Balm':/oleo/.test(t)?'Óleo':/po\b|em po/.test(t)?'Pomada em pó':'Pomada';
  const l=CL.filter(c=>c.prod&&norm(c.prod).includes(norm(qual).split(' ')[0])).sort((a,b)=>b.visitas-a.visitas).slice(0,5);
  if(!l.length) return {html:`Ninguém comprou ${qual.toLowerCase()} nos últimos 3 meses.`};
  return {html:`Quem mais comprou <b>${qual.toLowerCase()}</b> nos últimos 3 meses:<ul>${l.map(c=>`<li><span class="mono">${(c.visitas%4)+1}x</span><span>${c.nome} (${c.prod})</span></li>`).join('')}</ul>Dica: quando chegar estoque novo, posso avisar só esse pessoal.`,acoes:[{rot:'Avisar quando chegar',fn:()=>({html:'Combinado. Quando você me disser "chegou pomada", eu aviso esses clientes.',feito:['Lembrete criado']})}]};
}
function rFatur(){
  const n=ativos(0).length;
  return {html:`Este mês até agora <span class="mudo">(números de exemplo)</span>:<ul><li><span class="mono">118</span><span>cortes e serviços</span></li><li><span class="mono">R$ 7.445</span><span>faturamento estimado</span></li><li><span class="mono">R$ 63</span><span>ticket médio</span></li><li><span class="mono">R$ 640</span><span>em produtos (18 itens)</span></li></ul>Hoje: ${n} clientes, ${brl(previsto(0))} previstos.`,acoes:[{rot:'Abrir financeiro',ir:'financeiro'}]};
}
function rAniv(){
  const l=CL.filter(c=>c.anivRel<=10).sort((a,b)=>a.anivRel-b.anivRel);
  return {html:`Aniversários dos próximos dias:<ul>${l.map(c=>`<li><span class="mono">${c.aniv}</span><span>${c.nome}${c.anivRel===0?' (<b>hoje!</b>)':c.anivRel===1?' (amanhã)':` (em ${c.anivRel} dias)`}</span></li>`).join('')}</ul>A mensagem de parabéns sai sozinha às 9h do dia, no seu jeito.`,acoes:[{rot:'Ver a mensagem',ir:'automaticas'}]};
}
function rMarcar(t,orig){
  const c=CL.find(c=>new RegExp('\\b'+norm(c.primeiro)+'\\b').test(t));
  const m=t.match(/(\d{1,2})\s*(?:h|:|horas?)\s*(\d{2})?/)||t.match(/\bas (\d{1,2})\b/);
  if(!c) return {html:'Para quem é o horário? Me fala o nome do cliente, tipo "marca o Bruno amanhã às 14h".'};
  if(!m) return {html:`Que horas para o ${c.primeiro}? Ex.: "marca o ${c.primeiro} amanhã às 14h".`};
  let ini=(+m[1])*60+(+(m[2]||0)); if(ini<480) ini+=720;
  let off=detectaDia(t); if(off===null) off=ini>agoraMin()?0:1;
  const sv=/barba/.test(t)&&/corte|cabelo/.test(t)?'combo':/barba/.test(t)?'barba':'corte';
  if(fechado(off)) return {html:`${cap(nomeOff(off))} está fechado. Quer que eu abra só para ele?`};
  const fim=ini+SV[sv].dur;
  const choque=ativos(off).find(e=>e.ini<fim&&e.fim>ini)||bloqueiosDo(off).find(b=>b.ini<fim&&b.fim>ini);
  const marca=(i)=>{const id='x'+Date.now();S.extras.push({id,off,ini:i,sv,cli:c.id,orig:'man',sit:'conf'});salvar();return{html:`Marquei <b>${c.nome}</b> ${nomeOff(off)} às <b>${hh(i)}</b> (${SV[sv].nome.toLowerCase()}). Mandei a confirmação no WhatsApp dele.`+zapPrev(c.primeiro,`Fala, ${c.primeiro}! Ficou marcado ${nomeOff(off).split(',')[0]} às ${hh(i)}, ${SV[sv].nome.toLowerCase()}. Te mando lembrete 2h antes 👊`),feito:['Agendado','Confirmação enviada'],acoes:[{rot:'Ver na agenda',ir:'agenda',off}]};};
  if(choque){
    const l=livresDo(off).find(x=>x.fim-x.ini>=SV[sv].dur&&x.ini>=ini-120);
    if(!l) return {html:`Às ${hh(ini)} já tem ${choque.motivo||cliNome(choque)} e ${nomeOff(off)} não tem outro horário que caiba. Quer que eu ponha ele na lista de espera?`,acoes:[{rot:'Pôr na lista de espera',fn:()=>({html:`Pronto, ${c.primeiro} está na lista de espera de ${nomeOff(off)}. Se alguém desmarcar, ofereço para ele na hora.`,feito:['Lista de espera']})}]};
    return {html:`Às ${hh(ini)} já tem <b>${choque.motivo||cliNome(choque)}</b>. Tenho livre às <b>${hh(l.ini)}</b>. Marco nesse?`,acoes:[{rot:`Marcar ${hh(l.ini)}`,fn:()=>marca(l.ini)},{rot:'Deixa',fn:()=>({html:'Ok, não marquei.'})}]};
  }
  return marca(ini);
}
function resumoDia(off){
  const a=ativos(off), l=livresDo(off), n=new Date().getHours();
  const saud=off!==0?'':n<12?'Bom dia':n<18?'Boa tarde':'Boa noite';
  if(fechado(off)) return {html:`${saud?saud+', Lucas! ':''}${cap(nomeOff(off))} está fechado. Pode descansar.`};
  const prox=off===0?a.filter(e=>!e.feito):a;
  let html=`${saud?saud+', Lucas! ':''}${cap(nomeOff(off))} você tem <b>${a.length} clientes</b>`+(prox.length?`, ${off===0&&prox.length<a.length?'o próximo':'o primeiro'} às <b>${hh(prox[0].ini)}</b> com ${cliPrim(prox[0])}`:'')+`. Previsto: <b>${brl(previsto(off))}</b>.`;
  const ac=[];
  if(l.length){html+=` Sobrou ${l.map(x=>hh(x.ini)).join(' e ')} livre.`; ac.push({rot:'Encher horário vago',fn:()=>rLivres(off===0?'hoje':'amanha')});}
  const ani=CL.filter(c=>c.anivRel===0); if(ani.length&&off===0) html+=` E hoje é aniversário do ${ani[0].primeiro}: a mensagem de parabéns já saiu às 9h.`;
  if(off===0) html+=`<br><br>Me pede o que precisar, do jeito que você falaria. Ex.: <i>"fecha a agenda sexta"</i>.`;
  return {html,acoes:ac};
}
function responder(txt){
  const t=norm(txt);
  if(/(atrasar|atraso|vou chegar atrasado|chegar mais tarde|vou demorar)/.test(t)) return rAtraso(t);
  if(/(cancel|desmarc)/.test(t)) return rCancelar(t);
  if(/(fech|bloque|trav|folga|nao vou (trabalhar|atender|abrir|cortar|estar)|nao vou na|nao vou ir)/.test(t)) return rFechar(t);
  if(/(\bmarca|encaix|agenda (o|a|pro|pra)\b|agendar|coloca (o|a)\b)/.test(t)) return rMarcar(t,txt);
  if(/(livre|vago|vaga|vazio|buraco|encher|sobrando|sobrou)/.test(t)) return rLivres(t);
  if(/(sumi|nao volt|tempo d|atrasad|passou d|faz tempo|no tempo)/.test(t)) return rSumidos();
  if(/(pomada|balm|oleo|produto)/.test(t)) return rProdutos(t);
  if(/(gast|mais cort|mais vei|mais volt|ranking|melhor(es)? client|\btop\b|vip)/.test(t)) return rRanking();
  if(/(fatur|ganhei|quanto (eu )?(fiz|ganh|entrou|fatur)|caixa|financeiro|dinheiro|quantos cortes)/.test(t)) return rFatur();
  if(/aniver/.test(t)) return rAniv();
  if(/(como (ta|esta)|agenda de|quem (vem|tenho)|resumo|tenho quantos|quantos clientes)/.test(t)) return resumoDia(detectaDia(t)??0);
  if(/^(oi|ola|bom dia|boa tarde|boa noite|e ai|fala|opa|salve)/.test(t)) return resumoDia(0);
  if(/(obrigad|valeu|show|top|beleza|blz|tmj|tamo junto)/.test(t)) return {html:'Tamo junto! Qualquer coisa é só chamar.'};
  return {html:'Esse pedido eu ainda não aprendi (no protótipo eu entendo alguns exemplos). Tenta um destes:',acoes:[
    {rot:'Fecha a agenda sexta',texto:'Fecha a agenda sexta'},{rot:'Quem tá sumido?',texto:'Quem tá sumido?'},{rot:'Tenho horário livre amanhã?',texto:'Tenho horário livre amanhã?'}]};
}
const SUGS=['Fecha a agenda sexta','Cancela meus compromissos da manhã','Avisa os clientes de amanhã que vou atrasar 30 min','Marca o Bruno amanhã às 15h','Quem mais gastou este mês?','Quem tá sumido?','Tenho horário livre amanhã?','Daqui a 15 dias vou tirar folga','Quem mais comprou pomada?','Aniversários da semana'];
function iniciaChat(){ if(!T.chat.length){ const r=resumoDia(0); T.chat.push({de:'ia',html:montaIA(r)}); } }
function htmlMsg(m){return `<div class="m ${m.de}">${m.html}</div>`;}
function paginaAssistente(){
  iniciaChat();
  return `<div class="cab"><div><span class="kick">Assistente</span><h1>Fala que eu faço.</h1><p>Conecte seu WhatsApp e dê ordens para a IA, por texto ou áudio. Ela mexe na agenda e avisa os clientes por você.</p></div></div>
  <div class="ass">
    <div class="col-zap">${cartaoZap()}</div>
    <section class="chat" aria-label="Chat com a IA">
      <div class="chat-cab"><div class="ia-av">${ic('bot')}</div><div style="flex:1"><b>Seu assistente</b><small>${S.wa==='on'?'WhatsApp conectado · faz na hora':'Conecte o WhatsApp para avisar os clientes'}</small></div><span class="pill escura">IA</span></div>
      <div class="msgs" id="msgs">${T.chat.map(htmlMsg).join('')}</div>
      <div class="sugs">${SUGS.map(s=>`<button data-a="sug" data-texto="${esc(s)}">${s}</button>`).join('')}</div>
      <form class="entrada" id="form-chat" autocomplete="off"><button type="button" class="mic" data-a="mic" aria-label="Mandar áudio">${ic('mic')}</button><input id="chat-in" placeholder='Ex.: "fecha a agenda sexta"' enterkeyhint="send"><button type="submit" class="env" aria-label="Enviar">${ic('send')}</button></form>
    </section>
  </div>`;
}
function rolaChat(){const m=$('#msgs'); if(m) m.scrollTop=m.scrollHeight;}
function enviar(txt){
  txt=(txt||'').trim(); if(!txt) return;
  T.chat.push({de:'eu',html:esc(txt)});
  const box=$('#msgs'); if(!box) return;
  box.insertAdjacentHTML('beforeend',htmlMsg({de:'eu',html:esc(txt)}));
  box.insertAdjacentHTML('beforeend',`<div class="m ia digitando" id="dig"><i></i><i></i><i></i></div>`); rolaChat();
  setTimeout(()=>{
    const r=responder(txt); const h=montaIA(r); T.chat.push({de:'ia',html:h});
    const d=$('#dig'); if(d) d.remove();
    box.insertAdjacentHTML('beforeend',htmlMsg({de:'ia',html:h})); rolaChat(); atualizaNav();
  },650+Math.random()*500);
}
function acaoChat(btn){
  const k=btn.dataset.k, fn=PEND[k], cont=btn.closest('.acoes');
  if(btn.dataset.irpara){ if(btn.dataset.off!=='') T.diaSel=+btn.dataset.off; T.visao='dia'; ir(btn.dataset.irpara); return; }
  if(btn.dataset.texto){ enviar(btn.dataset.texto); return; }
  if(!fn) return;
  cont.querySelectorAll('button').forEach(b=>{if(!b.dataset.irpara) b.disabled=true;});
  T.chat.forEach(m=>{ if(m.html.includes(`data-k="${k}"`)) m.html=m.html.replace(/data-a="chat-acao" data-k="(p\d+)"(?![^>]*data-irpara)/g,'disabled data-a="chat-acao" data-k="$1"'); });
  const rot=btn.textContent; T.chat.push({de:'eu',html:esc(rot)});
  const box=$('#msgs'); box.insertAdjacentHTML('beforeend',htmlMsg({de:'eu',html:esc(rot)}));
  box.insertAdjacentHTML('beforeend',`<div class="m ia digitando" id="dig"><i></i><i></i><i></i></div>`); rolaChat();
  setTimeout(()=>{const r=fn();const h=montaIA(r);T.chat.push({de:'ia',html:h});const d=$('#dig');if(d)d.remove();box.insertAdjacentHTML('beforeend',htmlMsg({de:'ia',html:h}));rolaChat();},550);
}

/* ============================================================
   2. AGENDA
   ============================================================ */
const ORIG={ia:['IA','ia'],pag:['Página','ia'],rec:['Fixo',''],man:['',''],g:['','']};
function cartaoGoogle(compacto){
  if(S.google) return `<div class="cartao"><div class="google"><div class="g-logo">${GOO}</div><div style="flex:1"><div class="entre"><h3>Google Agenda</h3><span class="pill ok"><span class="bol"></span>sincronizado</span></div>
    <p class="ds">Tudo que é marcado aqui aparece no Google Agenda e no <b>Calendário do iPhone</b>. E compromisso pessoal que você põe lá (dentista, folga) bloqueia o horário aqui sozinho.</p></div></div>
    <details class="alt"><summary>${ic('cel')} Como ver no Calendário do iPhone</summary><ol class="passos"><li>Abra <b>Ajustes</b> no iPhone.</li><li>Vá em <b>Apps → Calendário → Contas de Calendário</b> (em iOS mais antigo: <b>Calendário → Contas</b>).</li><li>Toque em <b>Adicionar Conta → Google</b> e entre com a mesma conta.</li><li>Ligue a chave <b>Calendários</b>. Pronto: os horários aparecem no app Calendário.</li></ol></details>
    ${compacto?'':`<div style="text-align:right;margin-top:10px"><button class="btn fantasma peq" data-a="google-sair">Desconectar</button></div>`}</div>`;
  return `<div class="cartao"><div class="google"><div class="g-logo">${GOO}</div><div style="flex:1"><h3>Google Agenda</h3><p class="ds">Conecte para ver seus horários no <b>Calendário do iPhone</b> e para que compromissos pessoais bloqueiem a agenda sozinhos.</p></div></div>
    <button class="btn claro cheio" style="margin-top:12px" data-a="google">${GOO} Conectar Google Agenda</button></div>`;
}
function stripDias(){
  let h='';
  for(let o=-1;o<=13;o++){
    const d=P.dataDe(o), f=fechado(o), n=f?0:ativos(o).length;
    h+=`<button class="dia-b ${o===T.diaSel?'ativo':''} ${f?'fechado':''}" data-a="dia" data-off="${o}"><small>${o===0?'hoje':DSC[d.getDay()]}</small><b>${d.getDate()}</b><i>${f?(folgaBase(o)?'folga':'fechado'):n+' cli'}</i></button>`;
  }
  return `<div class="dias" id="dias">${h}</div>`;
}
function linhaTempo(off){
  const PX=1.25, top=m=>(m-INI)*PX+8, H=(1170-INI)*PX+16;
  let h='';
  for(let m=INI;m<=1170;m+=30){h+=`<div class="lt-linha ${m%60===0?'cheia':''}" style="top:${top(m)}px"></div>`; if(m%60===0) h+=`<div class="lt-hora" style="top:${top(m)}px">${hm(m)}</div>`;}
  bloqueiosDo(off).forEach(b=>{h+=`<div class="bloq" style="top:${top(b.ini)+2}px;height:${(b.fim-b.ini)*PX-4}px">${ic(b.g?'cal':'lock')}${b.motivo}${b.g?'':` · ${hh(b.ini)} às ${hh(b.fim)}`}</div>`;});
  livresDo(off).forEach(l=>{h+=`<div class="livre" style="top:${top(l.ini)+2}px;height:${Math.max((l.fim-l.ini)*PX-4,30)}px"><span>Livre · ${hh(l.ini)} às ${hh(l.fim)}</span><button data-a="convidar" data-off="${off}" data-ini="${l.ini}">Encher horário</button></div>`;});
  agendaDo(off).forEach(e=>{
    const s=SV[e.sv], alt=Math.max(s.dur*PX-4,30), o=ORIG[e.orig]||['',''];
    const tags=[];
    if(e.cancel) tags.push('<span class="pill ruim">cancelado</span>');
    else if(e.feito) tags.push('<span class="pill ok">atendido</span>');
    else if(e.sit==='aguarda') tags.push('<span class="pill alerta">a confirmar</span>');
    if(o[0]&&!e.cancel) tags.push(`<span class="pill ${o[1]}">${o[0]}</span>`);
    if(S.brindes[e.cli]&&!e.cancel) tags.push(`<span class="pill escura">${ic('gift')}</span>`);
    h+=`<button class="ev ${e.cancel?'cancelado':''} ${e.feito&&!e.cancel?'atendido':''} ${s.dur<=30?'curto':''}" style="--s:${s.cor};top:${top(e.ini)+2}px;height:${alt}px" data-a="ev" data-id="${e.id}" data-off="${off}"><span class="tx"><span class="n">${esc(cliNome(e))}</span><span class="d">${hm(e.ini)} às ${hm(e.fim)} · ${s.nome}</span></span><span class="tag">${tags.join('')}</span></button>`;
  });
  if(off===0){const a=agoraMin(); if(a>INI&&a<1170) h+=`<div class="agora" style="top:${top(a)}px"></div>`;}
  return `<div class="linha-tempo" style="height:${H}px">${h}</div>`;
}
function semana(){
  let h='';
  for(let o=0;o<7;o++){
    const d=P.dataDe(o), f=fechado(o), a=f?[]:ativos(o), l=livresDo(o), bl=bloqueiosDo(o);
    let sl='';
    for(let m=INI;m<FIM;m+=30){
      const oc=a.some(e=>e.ini<m+30&&e.fim>m), b=f||bl.some(x=>x.ini<m+30&&x.fim>m);
      sl+=`<i class="${oc?'o':b?'b':''}"></i>`;
    }
    h+=`<div class="sem-dia ${o===0?'hoje':''}" data-a="dia" data-off="${o}" data-visao="dia" role="button" tabindex="0">
      <div class="entre"><b>${cap(o===0?'hoje':o===1?'amanhã':DS[d.getDay()])}, ${ddmm(d)}</b>${f?`<span class="pill">${folgaBase(o)?'folga':'fechado'}</span>`:`<span class="mono" style="font-size:13px;font-weight:600">${brl(previsto(o))}</span>`}</div>
      <div class="slots">${sl}</div><div class="slots-leg"><span>9h</span><span>12h</span><span>15h</span><span>19h</span></div>
      <div class="mudo" style="font-size:12.5px">${f?'Sem atendimento':`${a.length} clientes · ${l.length?l.length+' livre'+(l.length>1?'s':'')+': '+l.map(x=>hh(x.ini)).join(', '):'lotado'}`}</div></div>`;
  }
  return `<div class="semana">${h}</div><div class="leg"><span><i style="background:var(--cobre)"></i>ocupado</span><span><i style="background:var(--bloco)"></i>livre</span><span><i style="background:repeating-linear-gradient(135deg,#E9DFD1 0 3px,#D8CCBC 3px 6px)"></i>bloqueado</span></div>`;
}
function paginaAgenda(){
  const off=T.diaSel, f=fechado(off), a=f?[]:ativos(off), l=livresDo(off);
  let corpo;
  if(T.visao==='semana') corpo=semana();
  else if(f){
    const canc=agendaDo(off).filter(e=>e.cancel);
    corpo=`<div class="dia-fechado">${ic(folgaBase(off)?'sol':'lock')}<b>${folgaBase(off)?'Folga':'Dia fechado'}</b>${folgaBase(off)?'Domingo você não atende.':'Ninguém consegue marcar nesse dia.'}${canc.length?`<p style="margin-top:10px">${canc.length} clientes avisados: ${canc.map(cliPrim).join(', ')}.</p>`:''}${S.fechados[off]?`<div style="margin-top:14px"><button class="btn claro peq" data-a="abrir-dia" data-off="${off}">Abrir o dia de novo</button></div>`:''}</div>`;
  } else corpo=`<div class="resumo"><div><b>${a.length}</b><small>clientes</small></div><div><b>${l.length}</b><small>horários livres</small></div><div><b>${brl(previsto(off))}</b><small>previsto</small></div></div>${linhaTempo(off)}
    <div class="leg"><span><i style="background:var(--s-corte)"></i>corte</span><span><i style="background:var(--s-barba)"></i>barba</span><span><i style="background:var(--s-combo)"></i>corte + barba</span><span><i style="background:var(--s-outro)"></i>outros</span><span><span class="pill ia">IA</span> marcado pela IA</span><span><span class="pill ia">Página</span> cliente marcou no link</span></div>`;
  return `<div class="cab"><div><span class="kick">Agenda</span><h1>${cap(T.visao==='semana'?'próximos 7 dias':nomeOffLongo(off))}</h1><p>${T.visao==='semana'?'Toque num dia para abrir.':'Toque num horário para ver, remarcar ou cancelar.'}</p></div>
    <div class="linha-flex"><button class="btn claro peq" data-a="bloquear">${ic('lock')} Bloquear horário</button><button class="btn peq" data-a="agendar">${ic('plus')} Agendar</button></div></div>
    ${stripDias()}
    <div class="ag-barra"><div class="seg"><button class="${T.visao==='dia'?'ativo':''}" data-a="visao" data-v="dia">Dia</button><button class="${T.visao==='semana'?'ativo':''}" data-a="visao" data-v="semana">Semana</button></div>
    ${T.visao==='dia'?`<button class="btn fantasma peq" data-a="dia" data-off="${off-1}" aria-label="Dia anterior">${ic('esq')}</button><button class="btn fantasma peq" data-a="dia" data-off="${off+1}" aria-label="Próximo dia">${ic('dir')}</button>`:''}</div>
    <div class="ag-layout"><div>${corpo}</div>
      <div class="lado">${cartaoGoogle(true)}
        <div class="cartao"><h3 class="linha-flex">${ic('lista')} Lista de espera</h3><p class="ds">3 clientes querem um horário amanhã se alguém desmarcar: Paulo, Igor e Renan. Se abrir vaga, a IA oferece na hora, por ordem.</p></div>
        <div class="cartao"><h3 class="linha-flex">${ic('repete')} Horários fixos</h3><p class="ds">Bruno toda quarta 11h30 e Murilo toda quinta 9h já entram sozinhos na agenda.</p></div>
      </div></div>`;
}
function folhaEvento(id,off){
  const e=agendaDo(off).find(x=>x.id===id); if(!e) return;
  const s=SV[e.sv], c=e.nome?null:CL[e.cli], o={ia:'Marcado pela IA no WhatsApp',pag:'O cliente marcou pela sua página',rec:'Horário fixo (toda semana)',man:'Você marcou'}[e.orig];
  abrirFolha(`<span class="kick">${nomeOffLongo(off)}</span><h2>${esc(cliNome(e))}</h2><p class="ds">${hm(e.ini)} às ${hm(e.fim)} · ${s.nome} · ${brl(s.preco)}</p>
    <div class="opcoes"><div class="opc">${ic('info')}<span>${o}${c?`<small>Vem a cada ${c.freq} dias · ${c.visitas} visitas · gastou ${brl(c.gasto)} no total</small>`:''}</span></div>
    ${S.brindes[e.cli]?`<div class="opc">${ic('gift')}<span>Entregar pomada de brinde<small>Passou de R$ 1.000 com você</small></span></div>`:''}
    ${e.sit==='aguarda'&&!e.cancel?`<div class="opc">${ic('clock')}<span>Esperando confirmação<small>A IA mandou o lembrete. Se não confirmar até 2h antes, ela pergunta de novo uma vez.</small></span></div>`:''}</div>
    <div class="acoes-f">${e.cancel?`<button class="btn" data-a="ev-volta" data-id="${e.id}">Desfazer cancelamento</button>`:`<button class="btn claro" data-a="ev-cancela" data-id="${e.id}">Cancelar e avisar</button><button class="btn zap" data-a="zap-cli">${ic('msg')} WhatsApp</button>`}</div>`);
}
function folhaBloquear(){
  const off=T.diaSel, b=T.bloq;
  const ops=[['dia','Dia inteiro','Ninguém marca nesse dia'],['manha','Só a manhã','9h às 12h30'],['tarde','Só a tarde','13h30 às 19h'],['hora','Um horário','Escolha de que horas até que horas']];
  let horas=''; for(let m=INI;m<=FIM;m+=30) horas+=`<option value="${m}">${hm(m)}</option>`;
  abrirFolha(`<h2>Bloquear horário</h2><p class="ds">${cap(nomeOffLongo(off))}. Escolha outro dia na agenda antes, se precisar.</p>
    <div class="opcoes">${ops.map(([k,n,d])=>`<button class="opc ${b.tipo===k?'ativo':''}" data-a="bloq-tipo" data-k="${k}">${ic(k==='dia'?'ban':k==='hora'?'clock':'lock')}<span>${n}<small>${d}</small></span></button>`).join('')}</div>
    ${b.tipo==='hora'?`<div class="grade g2m" style="margin-top:4px"><label class="campo"><span>De</span><select id="bl-de">${horas.replace('value="900"','value="900" selected')}</select></label><label class="campo"><span>Até</span><select id="bl-ate">${horas.replace('value="1020"','value="1020" selected')}</select></label></div>`:''}
    <label class="campo"><span>Motivo (só você vê)</span><input id="bl-mot" placeholder="Ex.: médico, curso, folga"></label>
    <div class="entre" style="margin-top:14px"><span style="font-size:14px">Avisar os clientes que estavam marcados</span><button class="chave on" data-a="chave-local" aria-label="Avisar clientes"></button></div>
    <div class="acoes-f"><button class="btn claro" data-a="fechar-folha">Voltar</button><button class="btn" data-a="bloq-ok">Bloquear</button></div>`);
}
function folhaAgendar(){
  const off=T.diaSel; const l=livresDo(off);
  let horas=''; l.forEach(x=>{for(let m=x.ini;m+30<=x.fim;m+=15) horas+=`<option value="${m}">${hm(m)}</option>`;});
  abrirFolha(`<h2>Novo agendamento</h2><p class="ds">${cap(nomeOffLongo(off))}</p>
    <label class="campo"><span>Cliente</span><select id="ag-cli">${CL.map(c=>`<option value="${c.id}">${c.nome}</option>`).join('')}</select></label>
    <label class="campo"><span>Serviço</span><select id="ag-sv">${Object.entries(SV).map(([k,s])=>`<option value="${k}">${s.nome} · ${s.dur} min · ${brl(s.preco)}</option>`).join('')}</select></label>
    <label class="campo"><span>Horário livre</span><select id="ag-h">${horas||'<option value="">Sem horário livre nesse dia</option>'}</select></label>
    <div class="dica">${ic('msg')}<span>A confirmação vai sozinha no WhatsApp do cliente, com lembrete 2h antes.</span></div>
    <div class="acoes-f"><button class="btn claro" data-a="fechar-folha">Voltar</button><button class="btn" data-a="agendar-ok" ${horas?'':'disabled'}>Agendar</button></div>`);
}

/* ============================================================
   3. CLIENTES e MENSAGENS AUTOMÁTICAS
   ============================================================ */
const STATUS={emdia:['em dia','ok'],tempo:['no tempo de cortar','alerta'],sumido:['sumido','ruim']};
function filtraCli(){
  let l=CL.slice();
  const f=T.filtro;
  if(f==='tempo') l=l.filter(c=>c.status==='tempo');
  if(f==='sumido') l=l.filter(c=>c.status==='sumido');
  if(f==='aniv') l=l.filter(c=>c.anivRel<=30).sort((a,b)=>a.anivRel-b.anivRel);
  if(f==='vip') l=l.filter(c=>c.gasto>=1000).sort((a,b)=>b.gasto-a.gasto);
  if(f==='todos') l.sort((a,b)=>({sumido:0,tempo:1,emdia:2}[a.status]-{sumido:0,tempo:1,emdia:2}[b.status])||b.ult/b.freq-a.ult/a.freq);
  if(T.busca) l=l.filter(c=>norm(c.nome).includes(norm(T.busca)));
  return l;
}
function linhasCli(){
  const l=filtraCli();
  if(!l.length) return `<div style="padding:24px;text-align:center" class="mudo">Ninguém encontrado.</div>`;
  return l.map(c=>{const st=STATUS[c.status];const an=c.anivRel===0?' <span class="pill escura">hoje</span>':c.anivRel<=7?` <span class="pill">em ${c.anivRel}d</span>`:'';
    return `<button class="cli" data-a="cli" data-id="${c.id}"><span class="av">${c.ini}</span>
      <span style="min-width:0"><b>${c.nome}</b><small class="so-mob">a cada ${c.freq} dias · último há ${c.ult} dias</small><small class="oculto-mob">(11) 9 ••••-${c.tel}</small></span>
      <span class="col">a cada ${c.freq} dias</span><span class="col">há ${c.ult} dias</span><span class="col">${c.aniv}${an}</span><span class="col mono">${brl(c.gasto)}${c.gasto>=1000?' '+ic('gift'):''}</span>
      <span class="dir"><span class="pill ${st[1]}">${st[0]}</span><small class="so-mob">aniv. ${c.aniv}${c.anivRel===0?' (hoje)':''}</small></span></button>`;}).join('');
}
function abasCli(){return `<div class="seg"><button class="${T.rota==='clientes'?'ativo':''}" data-ir="clientes">Clientes</button><button class="${T.rota==='automaticas'?'ativo':''}" data-ir="automaticas">Mensagens automáticas</button></div>`;}
function paginaClientes(){
  const n=k=>CL.filter(c=>k==='todos'||(k==='aniv'?c.anivRel<=30:k==='vip'?c.gasto>=1000:c.status===k)).length;
  const fs=[['todos','Todos'],['tempo','No tempo de cortar'],['sumido','Sumidos'],['aniv','Aniversário em 30 dias'],['vip','Mais de R$ 1.000']];
  return `<div class="cab"><div><span class="kick">Clientes</span><h1>Quem volta, quem sumiu</h1><p>A frequência de cada cliente é calculada sozinha pelo histórico. Quem passa do próprio tempo recebe um convite no seu jeito.</p></div>${abasCli()}</div>
  <div class="kpis" style="margin-bottom:14px"><div class="kpi"><small>Clientes</small><b>${CL.length}</b></div><div class="kpi"><small>No tempo de cortar</small><b>${n('tempo')}</b></div><div class="kpi"><small>Sumidos</small><b>${n('sumido')}</b></div><div class="kpi esc"><small>Passaram de R$ 1.000</small><b>${n('vip')}</b></div></div>
  <div class="busca">${ic('busca')}<input id="busca-cli" placeholder="Buscar cliente" value="${esc(T.busca)}"></div>
  <div class="filtros">${fs.map(([k,t])=>`<button class="${T.filtro===k?'ativo':''}" data-a="filtro" data-k="${k}">${t} <b>${n(k)}</b></button>`).join('')}</div>
  <div class="lista"><div class="cli-tab"><span></span><span>Cliente</span><span>Frequência</span><span>Último corte</span><span>Aniversário</span><span>Gasto total</span><span>Situação</span></div><div id="linhas-cli">${linhasCli()}</div></div>`;
}
function folhaCliente(id){
  const c=CL[id], st=STATUS[c.status];
  const hist=[0,1,2,3].map(i=>{const d=P.dataDe(-(c.ult+i*c.freq+(i%2)));const sv=i%3===1?'combo':'corte';return `<li><span>${ddmm(d)} · ${SV[sv].nome}</span><b class="mono">${brl(SV[sv].preco)}</b></li>`;}).join('');
  abrirFolha(`<div class="ficha-top"><span class="av">${c.ini}</span><div><h2>${c.nome}</h2><p class="ds">(11) 9 ••••-${c.tel} · <span class="pill ${st[1]}">${st[0]}</span></p></div></div>
    <div class="numeros"><div><b>${c.visitas}</b><small>visitas</small></div><div><b>${brl(c.gasto)}</b><small>gasto total</small></div><div><b>${c.freq}d</b><small>vem a cada</small></div></div>
    <div class="opcoes"><div class="opc">${ic('gift')}<span>Aniversário: ${c.aniv}<small>${c.anivRel===0?'É hoje! A mensagem já saiu às 9h.':`Faltam ${c.anivRel} dias. A mensagem sai sozinha às 9h.`}</small></span></div>
    <div class="opc">${ic('clock')}<span>Último corte há ${c.ult} dias<small>${c.status==='emdia'?`Próximo convite em ${c.freq-c.ult} dias, se ele não marcar antes.`:'Já passou do tempo dele. A IA manda um convite só.'}</small></span></div>
    ${c.prod?`<div class="opc">${ic('caixa')}<span>Costuma comprar: ${c.prod}</span></div>`:''}
    ${c.gasto>=1000?`<div class="opc">${ic('star')}<span>Cliente VIP<small>Passou de R$ 1.000. Que tal um brinde na próxima?</small></span></div>`:''}</div>
    <h3 style="margin-top:16px;font-size:15px">Últimas visitas</h3><ul class="hist">${hist}</ul>
    <div class="entre" style="margin-top:14px"><span style="font-size:14px">Mensagens automáticas para ele</span><button class="chave on" data-a="chave-local" aria-label="Mensagens automáticas"></button></div>
    <div class="acoes-f"><button class="btn claro" data-a="fechar-folha">Fechar</button><button class="btn zap" data-a="zap-cli">${ic('msg')} WhatsApp</button></div>`);
}
const AUTOS=[
  {k:'aniv',ic:'gift',t:'Aniversário',r:'No dia, às 9h',m:'Feliz aniversário, Samuel! Muita saúde e sucesso, meu querido. Quando quiser dar aquele tapa no visual pro rolê, tenho horário essa semana. 🎉',met:['3 este mês','2 marcaram']},
  {k:'tempo',ic:'tes',t:'Tá no tempo do corte',r:'Quando passa a frequência do cliente (ex.: a cada 15 dias)',m:'Fala, André! Já faz 16 dias do último corte, tá chegando a hora 💈 Tenho quinta 18h ou sexta 10h. Quer que eu reserve um pra você?',met:['21 este mês','13 marcaram']},
  {k:'vazio',ic:'cal',t:'Encher dia vazio',r:'Às 18h, se sobrar horário no dia seguinte, chama quem está no tempo',m:'Fala, Caio! Abriu um horário amanhã às 14h30. Bora aproveitar?',met:['9 este mês','5 marcaram']},
  {k:'lembrete',ic:'bell',t:'Lembrete do horário',r:'2 horas antes',m:'Passando para lembrar: hoje às 15h tem corte com o Lucas. Se precisar remarcar, é só responder aqui. 👊',met:['104 este mês','3 remarcaram']},
  {k:'follow',ic:'msg',t:'Cliente não respondeu',r:'Uma vez só, no dia seguinte, por volta das 10h',m:'E aí, viu minha mensagem? Bora cortar essa semana?',met:['7 este mês','4 responderam']},
  {k:'pos',ic:'star',t:'Depois do primeiro corte',r:'No dia seguinte à primeira visita',m:'Valeu pela visita, Igor! Curtiu o corte? Me conta o dia do seu aniversário que eu quero te mandar um presente.',met:['6 este mês','5 responderam']},
  {k:'vip',ic:'caixa',t:'Mimo para quem passou de R$ 1.000',r:'Quando o cliente passa de R$ 1.000 no total',m:'Rafael, você já é de casa! Na próxima visita tem uma pomada de presente te esperando. Valeu pela parceria!',met:['Desligada']}
];
function paginaAuto(){
  return `<div class="cab"><div><span class="kick">Clientes</span><h1>Mensagens automáticas</h1><p>Saem sozinhas, no seu jeito de falar, uma por cliente e no horário certo. Nada de disparo em massa. Quem não quiser receber, é só pedir.</p></div>${abasCli()}</div>
  <div class="auto">${AUTOS.map(a=>`<div class="cartao"><div class="auto-cab"><div class="auto-ic">${ic(a.ic)}</div><div><h3>${a.t}</h3><p class="ds">${a.r}</p></div><button class="chave ${S.autos[a.k]?'on':''}" data-a="auto" data-k="${a.k}" aria-label="Ligar ou desligar ${a.t}"></button></div>
    <div class="balao-zap"><div>${a.m}<small>${a.k==='lembrete'?'13:00':a.k==='aniv'?'09:00':a.k==='follow'?'10:00':'11:00'} ✓✓</small></div></div>
    <div class="met">${S.autos[a.k]?a.met.map((x,i)=>i===0?`<span><b>${x.split(' ')[0]}</b> ${x.split(' ').slice(1).join(' ')}</span>`:`<span>${x}</span>`).join(''):'<span>Desligada</span>'}<span style="margin-left:auto"><button class="btn fantasma peq" data-a="editar-msg">Editar texto</button></span></div></div>`).join('')}</div>
  <div class="dica">${ic('info')}<span>Os números são de exemplo. No sistema de verdade, cada mensagem mostra quantas saíram e quantos clientes marcaram horário por causa dela.</span></div>`;
}

/* ============================================================
   4. CONVERSAS (WhatsApp atendido pela IA)
   ============================================================ */
function conversasFiltradas(){return P.CONVERSAS.map((c,i)=>Object.assign({i},c)).filter(c=>T.convFiltro==='todas'||(T.convFiltro==='ia'&&c.tag==='ia')||(T.convFiltro==='voce'&&c.tag==='voce'));}
function thread(i){
  const c=P.CONVERSAS[i], cl=CL[c.cli];
  const corpo=c.msgs.map(m=>{
    if(m.sep) return `<div class="dia-sep">${m.sep}</div>`;
    if(m.nota) return `<div class="nota-ia">${ic('bot')}<span>${m.nota}</span></div>`;
    const quem=m.de==='ia'?`<span class="quem">IA no seu jeito${m.auto?' · '+m.auto.replace('Mensagem automática: ','automática: '):''}</span>`:m.de==='luc'?'<span class="quem">Você</span>':'';
    return `<div class="wb ${m.de}">${quem}${esc(m.t)}<small>${m.h}${m.de!=='cli'?' ✓✓':''}</small></div>`;
  }).join('');
  return `<div class="wa"><div class="wa-cab"><span class="av">${cl.ini}</span><div style="flex:1"><b>${cl.nome}</b><small>${c.tag==='luc'?'Você assumiu esta conversa':c.tag==='voce'?'Esperando você responder':'A IA está atendendo'}</small></div>${c.tag==='voce'?'<span class="pill ruim">precisa de você</span>':c.tag==='luc'?'<span class="pill">você</span>':'<span class="pill ok">IA</span>'}</div>
    <div class="wa-corpo" id="wa-corpo">${corpo}</div>
    <form class="wa-pe" data-conv="${i}" id="form-wa"><input id="wa-in" placeholder="Responder como Lucas..." style="flex:1;min-width:0;padding:11px 14px;border-radius:999px;border:1px solid var(--linha);font-size:16px"><button class="btn peq zap" type="submit">${ic('send')}</button>
    <button type="button" class="btn claro peq" data-a="assumir" data-i="${i}" style="width:100%">${c.tag==='luc'?'Devolver para a IA':'Assumir esta conversa'}</button></form></div>`;
}
function paginaConversas(){
  const desk=mqDesk.matches; if(desk&&T.conv===null) T.conv=0;
  const l=conversasFiltradas();
  const lista=`<div class="conv-lista">${l.map(c=>{const cl=CL[c.cli];return `<button class="ci ${desk&&T.conv===c.i?'ativo':''}" data-a="conv" data-i="${c.i}"><span class="av">${cl.ini}</span><span style="min-width:0"><b>${cl.nome}</b><small>${esc(c.resumo)}</small></span><span class="h">${c.quando}${c.tag==='voce'?'<span class="pill ruim">você</span>':c.tag==='luc'?'<span class="pill">você</span>':'<span class="pill ok">IA</span>'}</span></button>`;}).join('')}</div>`;
  const fs=[['todas','Todas'],['ia','Marcadas pela IA'],['voce','Precisa de você']];
  const cab=`<div class="cab"><div><span class="kick">Conversas</span><h1>WhatsApp no automático</h1><p>A IA responde no seu jeito, olha a agenda real antes de oferecer horário e passa para você o que não sabe.</p></div></div>
    <div class="filtros">${fs.map(([k,t])=>`<button class="${T.convFiltro===k?'ativo':''}" data-a="conv-filtro" data-k="${k}">${t}${k==='voce'?' <b>1</b>':''}</button>`).join('')}</div>`;
  if(!desk) return T.conv===null?cab+lista:`<button class="voltar" data-a="conv-voltar">${ic('voltar')} Conversas</button>${thread(T.conv)}`;
  return cab+`<div class="conv">${lista}${thread(T.conv)}</div>`;
}

/* ============================================================
   5. MINHA PÁGINA (link público) e FINANCEIRO
   ============================================================ */
function pubHTML(){
  const p=T.pub;
  if(p.off===null){for(let o=0;o<10;o++){if(!fechado(o)&&livresDo(o).length){p.off=o;break;}}}
  if(p.ok){
    return `<div class="pub"><div class="pub-hero"><div class="pub-foto">L</div><h2>Lucas</h2><p>Barbeiro</p></div><div class="pub-ok"><div class="ok-ic">${ic('check')}</div><h2 style="font-size:22px">Horário marcado!</h2><p class="mudo" style="margin-top:6px">${SV[p.sv].nome}, ${nomeOffLongo(p.off)} às ${hh(p.hora)}.</p><p style="margin-top:14px;font-size:14px">Você vai receber a confirmação no WhatsApp. Para remarcar, é só responder a mensagem.</p><button class="btn claro" style="margin-top:18px" data-a="pub-novo">Marcar outro horário</button></div></div>`;
  }
  let dias=''; for(let o=0;o<8;o++){const d=P.dataDe(o),f=fechado(o);dias+=`<button class="dia-b ${o===p.off?'ativo':''} ${f?'fechado':''}" ${f?'disabled':''} data-a="pub-dia" data-off="${o}"><small>${o===0?'hoje':DSC[d.getDay()]}</small><b>${d.getDate()}</b><i>${f?'fechado':''}</i></button>`;}
  const dur=SV[p.sv].dur, l=livresDo(p.off); let hs='';
  for(let m=INI;m+dur<=FIM;m+=30){const ok=l.some(x=>m>=x.ini&&m+dur<=x.fim);hs+=`<button class="${p.hora===m?'ativo':''}" ${ok?'':'disabled'} data-a="pub-hora" data-m="${m}">${hm(m)}</button>`;}
  return `<div class="pub"><div class="pub-hero"><div class="pub-foto">L</div><h2>Lucas</h2><p>Barbeiro · atendo na cadeira 3</p><div class="tags"><span>Degradê</span><span>Barba</span><span>Navalhado</span><span>Realinhamento</span></div></div>
    <div class="pub-sec"><h3>1. Serviço</h3>${Object.entries(SV).slice(0,6).map(([k,s])=>`<button class="serv ${p.sv===k?'ativo':''}" data-a="pub-sv" data-k="${k}"><span class="bol" style="background:${s.cor}"></span><span><b>${s.nome}</b><small>${s.dur} min</small></span><span class="pr">${brl(s.preco)}</span></button>`).join('')}</div>
    <div class="pub-sec"><h3>2. Dia</h3><div class="dias">${dias}</div></div>
    <div class="pub-sec"><h3>3. Horário</h3><div class="horarios">${hs}</div><p class="mudo" style="font-size:12px;margin-top:8px">Só aparecem os horários livres de verdade.</p></div>
    <div class="pub-sec"><h3>4. Seus dados</h3><label class="campo" style="margin-top:0"><span>Nome</span><input id="pub-nome" placeholder="Seu nome" value="${esc(p.nome)}"></label><label class="campo"><span>WhatsApp</span><input type="tel" inputmode="tel" placeholder="(11) 9 0000-0000"></label></div>
    <div class="pub-sec" style="padding-bottom:20px"><button class="btn ouro cheio" data-a="pub-ok" ${p.hora===null?'disabled style="opacity:.5"':''}>${p.hora===null?'Escolha um horário':`Confirmar ${nomeOff(p.off).split(',')[0]} às ${hh(p.hora)}`}</button>
    <p class="mudo" style="font-size:11.5px;text-align:center;margin-top:12px">Dica: salve esta página na tela de início para marcar mais rápido.</p></div></div>`;
}
function paginaPagina(){
  return `<div class="cab"><div><span class="kick">Minha página</span><h1>Seu link de agendamento</h1><p>Manda esse link para o cliente ou põe na bio do Instagram. Ele marca sozinho, sem precisar te chamar.</p></div></div>
  <div class="pub-layout"><div class="moldura">${pubHTML()}</div>
    <div>
      <div class="cartao escuro"><h2>${ic('link')} Seu link</h2><div class="link-box" style="background:var(--cafe3)"><span style="color:#fff">agendar.exemplo/lucas</span><button class="btn ouro peq" data-a="copiar-link">${ic('copy')} Copiar</button></div>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><a class="btn claro peq" href="#/agendar">${ic('cel')} Abrir como cliente</a><button class="btn claro peq" data-a="qr-link">${ic('qr')} QR Code para a bancada</button><button class="btn claro peq" data-a="insta">${ic('share')} Pôr na bio</button></div>
        <p class="ds" style="margin-top:12px">Link de exemplo. No sistema de verdade, você escolhe o endereço.</p></div>
      <div class="cartao"><h2>O que o cliente vê</h2><ol class="passos"><li>Escolhe o serviço, com preço e tempo.</li><li>Escolhe o dia e um <b>horário livre de verdade</b> (a mesma agenda da IA e do Google).</li><li>Coloca nome e WhatsApp e confirma.</li><li>Recebe a confirmação e o lembrete 2h antes <b>no WhatsApp</b>.</li><li>Pode salvar a página na tela de início, como um app.</li></ol></div>
      <div class="cartao"><h2>Esta semana</h2><div class="numeros"><div><b>46</b><small>visitas na página</small></div><div><b>9</b><small>marcaram sozinhos</small></div><div><b>0</b><small>mensagens suas</small></div></div><p class="ds" style="margin-top:10px">Números de exemplo.</p></div>
    </div></div>`;
}
function paginaFinanceiro(){
  const sem=[['S1',1890],['S2',2140],['S3',2010],['Atual',1405]], mx=2200;
  const serv=[['Corte de cabelo',64,3200],['Corte + barba',31,2480],['Barba',18,630],['Realinhamento',4,480],['Pezinho',1,15]];
  const top=CL.slice().sort((a,b)=>b.mes-a.mes).slice(0,5);
  return `<div class="cab"><div><span class="kick">Financeiro</span><h1>Resumo do mês</h1><p><span class="pill alerta">números fictícios</span> só para mostrar como fica. Os de verdade saem dos pagamentos que você registra.</p></div><button class="btn" data-a="pagamento">${ic('dinheiro')} Registrar pagamento</button></div>
  <div class="kpis"><div class="kpi esc"><small>Faturamento estimado</small><b>R$ 7.445</b><span class="var" style="color:#B9D7BC">+9% que o mês passado</span></div><div class="kpi"><small>Cortes e serviços</small><b>118</b><span class="var">+12 que o mês passado</span></div><div class="kpi"><small>Ticket médio</small><b>R$ 63</b></div><div class="kpi"><small>Produtos</small><b>R$ 640</b><span class="mudo" style="font-size:12px">18 itens</span></div></div>
  <div class="grade g2" style="margin-top:14px">
    <div class="cartao" style="margin:0"><h2>Por semana</h2><div class="barras">${sem.map(([n,v],i)=>`<div><i class="${i===3?'at':''}" style="height:${v/mx*100}%"><em>${brl(v)}</em></i><small>${n}</small></div>`).join('')}</div></div>
    <div class="cartao" style="margin:0"><h2>Por serviço</h2><ul class="rank">${serv.map(([n,q,v],i)=>`<li><span class="p">${q}x</span><span>${n}<div class="tr"><i style="width:${v/3200*100}%"></i></div></span><b class="mono" style="font-size:13px">${brl(v)}</b></li>`).join('')}</ul></div>
    <div class="cartao" style="margin:0"><h2>Quem mais gastou no mês</h2><ul class="rank">${top.map((c,i)=>`<li><span class="p">${i+1}º</span><span>${c.nome}<div class="tr"><i style="width:${c.mes/top[0].mes*100}%"></i></div></span><b class="mono" style="font-size:13px">${brl(c.mes)}</b></li>`).join('')}</ul></div>
    <div class="cartao" style="margin:0"><h2>Como pagaram</h2><ul class="rank">${[['Pix',64],['Dinheiro',21],['Cartão',15]].map(([n,p])=>`<li><span class="p">${p}%</span><span>${n}<div class="tr"><i style="width:${p}%"></i></div></span><span></span></li>`).join('')}</ul>
      <h3 style="margin-top:16px">Produtos vendidos</h3><ul class="rank">${[['Pomada matte',8,320],['Balm de barba',5,175],['Óleo de barba',3,90],['Pomada em pó',2,55]].map(([n,q,v])=>`<li><span class="p">${q}x</span><span>${n}</span><b class="mono" style="font-size:13px">${brl(v)}</b></li>`).join('')}</ul></div>
  </div>`;
}
function folhaPagamento(){
  const f=T.pag.forma;
  abrirFolha(`<h2>Registrar pagamento</h2><p class="ds">Leva 5 segundos. É isso que alimenta o financeiro e o ranking de clientes.</p>
    <label class="campo"><span>Cliente</span><select>${CL.map(c=>`<option>${c.nome}</option>`).join('')}</select></label>
    <label class="campo"><span>Serviço</span><select>${Object.values(SV).map(s=>`<option>${s.nome} · ${brl(s.preco)}</option>`).join('')}</select></label>
    <div class="grade g2m" style="gap:8px;margin-top:12px">${[['pix','Pix'],['dinheiro','Dinheiro'],['cartao','Cartão'],['depois','Paga depois']].map(([k,n])=>`<button class="opc ${f===k?'ativo':''}" data-a="forma" data-k="${k}" style="justify-content:center">${n}</button>`).join('')}</div>
    <label class="campo"><span>Produto vendido (opcional)</span><select><option>Nenhum</option><option>Pomada matte · R$ 40</option><option>Balm de barba · R$ 35</option><option>Óleo de barba · R$ 30</option></select></label>
    <div class="acoes-f"><button class="btn claro" data-a="fechar-folha">Voltar</button><button class="btn" data-a="pag-ok">Registrar</button></div>`);
}

/* ============================================================
   6. AJUSTES
   ============================================================ */
function paginaAjustes(){
  return `<div class="cab"><div><span class="kick">Ajustes</span><h1>Seu jeito de trabalhar</h1><p>Horários, serviços e conexões.</p></div></div>
  <div class="grade g2">
    <div>${cartaoGoogle(false)}
      <div class="cartao"><h2>${ic('clock')} Horário de trabalho</h2><ul class="hist"><li><span>Segunda a sábado</span><b>9h às 19h</b></li><li><span>Almoço</span><b>12h30 às 13h30</b></li><li><span>Domingo</span><b>folga</b></li><li><span>Intervalo entre clientes</span><b>nenhum</b></li></ul><div style="text-align:right;margin-top:10px"><button class="btn fantasma peq" data-a="editar-msg">Editar</button></div></div>
      <div class="cartao"><h2>${ic('cel')} Usar como app no iPhone</h2><ol class="passos"><li>Abra este painel no <b>Safari</b>.</li><li>Toque no botão <b>Compartilhar</b> (quadrado com seta para cima).</li><li>Toque em <b>Adicionar à Tela de Início</b>. Pronto: abre como um app, igual ao que você usa hoje.</li></ol></div>
    </div>
    <div>
      <div class="cartao"><h2>${ic('tes')} Serviços e preços</h2><p class="ds">A IA usa essa tabela para responder preço e tempo. Preços de exemplo.</p><ul class="hist">${Object.values(SV).map(s=>`<li><span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${s.cor};margin-right:8px"></span>${s.nome} · ${s.dur} min</span><b class="mono">${brl(s.preco)}</b></li>`).join('')}</ul></div>
      <div class="cartao"><h2>${ic('bot')} Regras da IA</h2><ul class="hist"><li><span>Pediu horário ocupado</span><b>oferece 2 opções</b></li><li><span>Não deu nenhuma</span><b>tenta a semana que vem</b></li><li><span>Sem resposta</span><b>1 mensagem às 10h</b></li><li><span>Pergunta que não sabe</span><b>passa para você</b></li></ul></div>
      <div class="cartao"><h2>${ic('repete')} Demonstração</h2><p class="ds">Volta tudo ao começo: WhatsApp desconectado, agenda original e chat limpo.</p><button class="btn claro" style="margin-top:12px" data-a="reset">Reiniciar demonstração</button></div>
    </div></div>`;
}

/* ============================================================
   Renderização e eventos
   ============================================================ */
const PAGINAS={assistente:paginaAssistente,agenda:paginaAgenda,clientes:paginaClientes,automaticas:paginaAuto,conversas:paginaConversas,pagina:paginaPagina,financeiro:paginaFinanceiro,ajustes:paginaAjustes};
const TITULOS={assistente:'Assistente',agenda:'Agenda',clientes:'Clientes',automaticas:'Mensagens',conversas:'Conversas',pagina:'Minha página',financeiro:'Financeiro',ajustes:'Ajustes'};
function atualizaNav(){ $('#menu-lateral').innerHTML=navLateral(); $('#barra-mob').innerHTML=navBarra(); $('#titulo-mob').textContent=TITULOS[T.rota]||'Pente Fino'; }
let relogioT;
function render(trocouRota){
  const y=window.scrollY;
  document.body.classList.toggle('so-cliente',T.rota==='agendar');
  if(T.rota==='agendar'){ $('#tela').innerHTML=`<div class="cliente-wrap">${pubHTML()}<p class="mudo" style="text-align:center;font-size:12px;margin:14px 0 28px"><a href="#/pagina">← voltar ao painel do Lucas</a></p></div>`; window.scrollTo(0,0); return; }
  atualizaNav();
  $('#tela').innerHTML=(PAGINAS[T.rota]||paginaAssistente)();
  if(trocouRota) window.scrollTo(0,0); else window.scrollTo(0,y);
  if(T.rota==='assistente') rolaChat();
  if(T.rota==='agenda'){ const a=$('.dia-b.ativo'); if(a) a.scrollIntoView({inline:'center',block:'nearest'}); if(trocouRota&&T.visao==='dia'&&T.diaSel===0){ /* mantém topo */ } }
  if(T.rota==='conversas'){ const w=$('#wa-corpo'); if(w&&!mqDesk.matches) {} }
  clearInterval(relogioT);
  if(S.wa==='codigo'&&T.rota==='assistente'){
    const tick=()=>{const r=$('#relogio'); if(!r) return; const s=Math.max(0,Math.round((S.codigoAte-Date.now())/1000)); r.textContent=s?`vale por ${Math.floor(s/60)}:${pad(s%60)}`:'o código expirou, gere outro'; if(!s) clearInterval(relogioT);};
    tick(); relogioT=setInterval(tick,1000);
  }
}
function rotaDoHash(){ const r=(location.hash||'').replace('#/',''); T.rota=(PAGINAS[r]||r==='agendar')?r:'assistente'; render(true); }
window.addEventListener('hashchange',rotaDoHash);
mqDesk.addEventListener('change',()=>render(false));

function copiar(txt,msg){ try{navigator.clipboard.writeText(txt).then(()=>toast(msg),()=>toast(msg));}catch(e){toast(msg);} }

document.addEventListener('click',ev=>{
  const irB=ev.target.closest('[data-ir]');
  if(irB){ ir(irB.dataset.ir); return; }
  if(ev.target.id==='fundo-folha'){ fecharFolha(); return; }
  const b=ev.target.closest('[data-a]'); if(!b) return;
  const a=b.dataset.a, d=b.dataset;
  switch(a){
    case 'mais':
      abrirFolha(`<h2>Mais</h2><div class="mais-lista" style="margin-top:12px">${[['automaticas','bell','Mensagens automáticas','Aniversário, tá no tempo, dia vazio'],['pagina','link','Minha página','Seu link de agendamento'],['financeiro','chart','Financeiro','Resumo do mês'],['ajustes','cog','Ajustes','Google Agenda, serviços, horários']].map(([r,i,n,s])=>`<button data-a="ir-folha" data-r="${r}"><span class="ico">${ic(i)}</span><span>${n}<small>${s}</small></span></button>`).join('')}</div>`); break;
    case 'ir-folha': fecharFolha(); ir(d.r); break;
    case 'fechar-folha': fecharFolha(); break;
    /* WhatsApp */
    case 'wa-codigo': { const inp=$('#wa-num'); if(inp) S.waNum=inp.value; S.codigo=gerarCodigo(); S.codigoAte=Date.now()+180000; S.wa='codigo'; salvar(); render(false); const c=$('.codigo'); if(c) c.scrollIntoView({behavior:'smooth',block:'center'}); break; }
    case 'copiar-codigo': copiar(S.codigo,'Código copiado. Agora abra o WhatsApp.'); break;
    case 'wa-ok': S.wa='conectando'; render(false); setTimeout(()=>{S.wa='on';salvar();render(false);toast('WhatsApp conectado!');},1600); break;
    case 'wa-sair': S.wa='off'; salvar(); render(false); toast('WhatsApp desconectado'); break;
    case 'modo': S.modoIA=d.k; salvar(); render(false); break;
    case 'sug': enviar(d.texto); break;
    case 'mic': toast('No app de verdade você manda um áudio e a IA entende.'); break;
    case 'chat-acao': acaoChat(b); break;
    /* Agenda */
    case 'dia': T.diaSel=+d.off; if(d.visao) T.visao='dia'; render(false); if(d.visao) window.scrollTo(0,0); break;
    case 'visao': T.visao=d.v; render(false); break;
    case 'ev': folhaEvento(d.id,+d.off); break;
    case 'ev-cancela': S.cancelados[d.id]=true; salvar(); fecharFolha(); render(false); toast('Cancelado. A IA avisou o cliente e ofereceu outro horário.'); break;
    case 'ev-volta': delete S.cancelados[d.id]; salvar(); fecharFolha(); render(false); toast('Horário de volta na agenda'); break;
    case 'zap-cli': toast('Abriria a conversa no WhatsApp'); break;
    case 'convidar': toast(`Convite enviado para 5 clientes no tempo de cortar (${hh(+d.ini)}).`); break;
    case 'abrir-dia': delete S.fechados[+d.off]; salvar(); render(false); toast('Dia aberto de novo'); break;
    case 'bloquear': T.bloq={tipo:'dia'}; folhaBloquear(); break;
    case 'bloq-tipo': T.bloq.tipo=d.k; folhaBloquear(); break;
    case 'chave-local': b.classList.toggle('on'); break;
    case 'bloq-ok': {
      const off=T.diaSel, t=T.bloq.tipo, mot=($('#bl-mot')||{}).value||'Bloqueado';
      let ini=INI,fim=FIM;
      if(t==='manha'){fim=750;} if(t==='tarde'){ini=810;}
      if(t==='hora'){ini=+$('#bl-de').value;fim=+$('#bl-ate').value; if(fim<=ini) fim=ini+30;}
      let afet=ativos(off);
      if(t==='dia') S.fechados[off]=true; else { S.bloqueios.push({off,ini,fim,motivo:mot}); afet=afet.filter(e=>e.ini<fim&&e.fim>ini); }
      afet.forEach(e=>S.cancelados[e.id]=true); salvar(); fecharFolha(); render(false);
      toast(afet.length?`Bloqueado. ${afet.length} ${afet.length>1?'clientes avisados':'cliente avisado'} com opção de outro horário.`:'Horário bloqueado.'); break; }
    case 'agendar': folhaAgendar(); break;
    case 'agendar-ok': { const ini=+$('#ag-h').value; if(!ini) break; S.extras.push({id:'x'+Date.now(),off:T.diaSel,ini,sv:$('#ag-sv').value,cli:+$('#ag-cli').value,orig:'man',sit:'conf'}); salvar(); fecharFolha(); T.visao='dia'; render(false); toast('Agendado. Confirmação enviada no WhatsApp do cliente.'); break; }
    case 'google': abrirFolha(`<div style="text-align:center">${GOO.replace('width="22" height="22"','width="40" height="40"')}<h2 style="margin-top:10px">Conectar Google Agenda</h2><p class="ds">Simulação: no sistema de verdade abre a tela do Google para você escolher a conta e permitir.</p></div>
        <div class="opcoes"><div class="opc">${ic('check')}<span>Ver e editar os eventos da sua agenda<small>Para os horários aparecerem no Calendário do iPhone</small></span></div><div class="opc">${ic('lock')}<span>Nada de e-mail, contatos ou fotos<small>Só a agenda</small></span></div></div>
        <div class="acoes-f"><button class="btn claro" data-a="fechar-folha">Cancelar</button><button class="btn" data-a="google-ok">Continuar com Google</button></div>`); break;
    case 'google-ok': S.google=true; salvar(); fecharFolha(); render(false); toast('Google Agenda conectado'); break;
    case 'google-sair': S.google=false; salvar(); render(false); break;
    /* Clientes */
    case 'filtro': T.filtro=d.k; render(false); break;
    case 'cli': folhaCliente(+d.id); break;
    case 'auto': S.autos[d.k]=!S.autos[d.k]; salvar(); render(false); toast(S.autos[d.k]?'Mensagem ligada':'Mensagem desligada'); break;
    case 'editar-msg': toast('No sistema de verdade dá para editar aqui.'); break;
    /* Conversas */
    case 'conv': T.conv=+d.i; render(false); if(!mqDesk.matches) window.scrollTo(0,0); break;
    case 'conv-voltar': T.conv=null; render(false); break;
    case 'conv-filtro': T.convFiltro=d.k; render(false); break;
    case 'assumir': { const c=P.CONVERSAS[+d.i]; c.tag=c.tag==='luc'?'ia':'luc'; render(false); toast(c.tag==='luc'?'Você assumiu. A IA fica quieta nessa conversa.':'Devolvida para a IA'); break; }
    /* Página */
    case 'copiar-link': copiar('agendar.exemplo/lucas','Link copiado (é um link de exemplo)'); break;
    case 'qr-link': abrirFolha(`<h2>QR Code da sua página</h2><p class="ds">Imprime e deixa na bancada: o cliente aponta a câmera e marca o próximo corte.</p><div class="qr" style="width:220px;height:220px">${qrSvg(77)}</div><p class="mudo" style="text-align:center;font-size:12px">QR de exemplo, não abre nada.</p><div class="acoes-f"><button class="btn" data-a="fechar-folha">Fechar</button></div>`); break;
    case 'insta': abrirFolha(`<h2>Pôr na bio do Instagram</h2><ol class="passos"><li>No Instagram, toque em <b>Editar perfil</b>.</li><li>Toque em <b>Links</b> → <b>Adicionar link externo</b>.</li><li>Cole o link e, no título, escreva <b>"Agende seu horário"</b>.</li></ol><div class="acoes-f"><button class="btn" data-a="fechar-folha">Entendi</button></div>`); break;
    case 'pub-sv': T.pub.sv=d.k; T.pub.hora=null; render(false); break;
    case 'pub-dia': T.pub.off=+d.off; T.pub.hora=null; render(false); break;
    case 'pub-hora': T.pub.hora=+d.m; render(false); break;
    case 'pub-ok': { if(T.pub.hora===null) break; const n=($('#pub-nome')||{}).value||'Cliente novo'; S.extras.push({id:'x'+Date.now(),off:T.pub.off,ini:T.pub.hora,sv:T.pub.sv,cli:-1,nome:n,orig:'pag',sit:'conf'}); salvar(); T.pub.ok=true; render(false); break; }
    case 'pub-novo': T.pub={sv:'corte',off:null,hora:null,ok:false,nome:''}; render(false); break;
    /* Financeiro */
    case 'pagamento': folhaPagamento(); break;
    case 'forma': T.pag.forma=d.k; folhaPagamento(); break;
    case 'pag-ok': fecharFolha(); toast('Pagamento registrado'); break;
    case 'reset': try{localStorage.removeItem(CHAVE);}catch(e){} location.hash='#/assistente'; location.reload(); break;
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') fecharFolha();
  if((e.key==='Enter'||e.key===' ')&&e.target.matches('.sem-dia')){e.preventDefault();e.target.click();}
});
document.addEventListener('submit',e=>{
  e.preventDefault();
  if(e.target.id==='form-chat'){const i=$('#chat-in'); const v=i.value; i.value=''; enviar(v);}
  if(e.target.id==='form-wa'){const i=$('#wa-in'); const v=i.value.trim(); if(!v) return; const c=P.CONVERSAS[+e.target.dataset.conv]; const n=new Date(); c.msgs.push({de:'luc',t:v,h:pad(n.getHours())+':'+pad(n.getMinutes())}); c.tag='luc'; c.resumo='Você: '+v; render(false); const w=$('#wa-corpo'); if(w) w.lastElementChild.scrollIntoView({block:'nearest'});}
});
document.addEventListener('input',e=>{
  if(e.target.id==='busca-cli'){T.busca=e.target.value; const l=$('#linhas-cli'); if(l) l.innerHTML=linhasCli();}
  if(e.target.id==='pub-nome'){T.pub.nome=e.target.value;}
  if(e.target.id==='wa-num'){S.waNum=e.target.value;}
});

rotaDoHash();
})();
