/* Pente Fino, protótipo. Todos os dados abaixo são inventados, só para demonstração. */
(function(){
  const HOJE = new Date(); HOJE.setHours(0,0,0,0);

  const SERVICOS = {
    corte:  {nome:'Corte de cabelo', dur:45, preco:50, cor:'var(--s-corte)'},
    barba:  {nome:'Barba', dur:30, preco:35, cor:'var(--s-barba)'},
    combo:  {nome:'Corte + barba', dur:60, preco:80, cor:'var(--s-combo)'},
    pezinho:{nome:'Pezinho', dur:15, preco:15, cor:'var(--s-outro)'},
    sobr:   {nome:'Sobrancelha na navalha', dur:15, preco:15, cor:'var(--s-outro)'},
    hidra:  {nome:'Hidratação de barba', dur:30, preco:30, cor:'var(--s-barba)'},
    realin: {nome:'Realinhamento capilar', dur:90, preco:120, cor:'var(--s-outro)'}
  };

  // freq = de quantos em quantos dias costuma cortar; ult = dias desde o último corte
  // aniv: número = daqui a quantos dias (relativo a hoje); texto = data fixa
  const CLIENTES = [
    {nome:'Rafael Souza',     freq:14, ult:6,  aniv:'22/08', visitas:41, gasto:2140, mes:310, prod:'Pomada matte', tel:'4821'},
    {nome:'Diego Lima',       freq:21, ult:20, aniv:'03/02', visitas:18, gasto:960,  mes:130, prod:'Balm de barba', tel:'1907'},
    {nome:'Thiago Alves',     freq:15, ult:15, aniv:2,       visitas:22, gasto:1180, mes:170, prod:'Pomada matte', tel:'6634'},
    {nome:'Bruno Costa',      freq:7,  ult:7,  aniv:'17/05', visitas:63, gasto:3150, mes:400, prod:'', tel:'2290'},
    {nome:'Gustavo Rocha',    freq:14, ult:13, aniv:'29/11', visitas:27, gasto:1620, mes:240, prod:'Óleo de barba', tel:'7713'},
    {nome:'Felipe Martins',   freq:21, ult:24, aniv:'11/07', visitas:12, gasto:600,  mes:50,  prod:'', tel:'3058'},
    {nome:'Leonardo Dias',    freq:30, ult:29, aniv:'08/01', visitas:9,  gasto:890,  mes:120, prod:'Balm de barba', tel:'5547'},
    {nome:'Matheus Ribeiro',  freq:14, ult:12, aniv:'25/12', visitas:30, gasto:1500, mes:150, prod:'Pomada matte', tel:'8102'},
    {nome:'Vinícius Araújo',  freq:15, ult:3,  aniv:'22/08', visitas:5,  gasto:250,  mes:100, prod:'', tel:'9935'},
    {nome:'André Gomes',      freq:15, ult:16, aniv:'14/03', visitas:19, gasto:1010, mes:0,   prod:'Pomada em pó', tel:'4410'},
    {nome:'Caio Fernandes',   freq:21, ult:27, aniv:'30/09', visitas:8,  gasto:420,  mes:0,   prod:'', tel:'6271'},
    {nome:'Henrique Barbosa', freq:30, ult:19, aniv:5,       visitas:6,  gasto:540,  mes:0,   prod:'', tel:'3386'},
    {nome:'João Pedro Nunes', freq:14, ult:41, aniv:'06/06', visitas:11, gasto:560,  mes:0,   prod:'', tel:'1174'},
    {nome:'Eduardo Pires',    freq:21, ult:58, aniv:'19/04', visitas:7,  gasto:385,  mes:0,   prod:'', tel:'7029'},
    {nome:'Marcelo Teixeira', freq:30, ult:11, aniv:'02/10', visitas:14, gasto:1260, mes:120, prod:'Balm de barba', tel:'5863'},
    {nome:'Renan Castro',     freq:14, ult:33, aniv:'12/12', visitas:9,  gasto:470,  mes:0,   prod:'Pomada matte', tel:'2948'},
    {nome:'Igor Mendes',      freq:21, ult:9,  aniv:'27/07', visitas:16, gasto:820,  mes:80,  prod:'', tel:'8457'},
    {nome:'Samuel Freitas',   freq:15, ult:10, aniv:0,       visitas:20, gasto:1090, mes:85,  prod:'Óleo de barba', tel:'6612'},
    {nome:'Otávio Ramos',     freq:30, ult:45, aniv:'15/01', visitas:4,  gasto:260,  mes:0,   prod:'', tel:'3790'},
    {nome:'Murilo Batista',   freq:14, ult:5,  aniv:'09/09', visitas:24, gasto:1340, mes:210, prod:'Pomada matte', tel:'5021'},
    {nome:'Paulo Henrique Sá',freq:21, ult:18, aniv:'21/02', visitas:10, gasto:690,  mes:80,  prod:'', tel:'4436'},
    {nome:'Ricardo Moura',    freq:30, ult:26, aniv:'04/05', visitas:13, gasto:1170, mes:120, prod:'Balm de barba', tel:'9180'}
  ];
  CLIENTES.forEach((c,i)=>{
    c.id=i;
    c.ini=c.nome.split(' ').filter(p=>p.length>2||p==='Sá').slice(0,2).map(p=>p[0]).join('').toUpperCase();
    c.primeiro=c.nome.split(' ')[0];
    if(typeof c.aniv==='number'){const d=new Date(HOJE);d.setDate(d.getDate()+c.aniv);c.anivRel=c.aniv;c.aniv=String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0');}
    else{
      const [dd,mm]=c.aniv.split('/').map(Number);let d=new Date(HOJE.getFullYear(),mm-1,dd);
      if(d<HOJE)d=new Date(HOJE.getFullYear()+1,mm-1,dd);c.anivRel=Math.round((d-HOJE)/864e5);
    }
    c.status = c.ult>=c.freq*1.8 ? 'sumido' : (c.ult>=c.freq ? 'tempo' : 'emdia');
  });

  // Padrões de agenda: [início em minutos, serviço, cliente, origem, situação]
  // origem: ia = marcado pela IA no WhatsApp, pag = página de agendamento, man = você marcou, rec = recorrente
  const h=(x)=>{const [a,b]=x.split(':').map(Number);return a*60+b;};
  const PADROES = [
    [['09:00','combo',0,'ia','conf'],['10:00','corte',1,'pag','conf'],['10:45','barba',2,'ia','conf'],['11:30','corte',3,'rec','conf'],['13:30','combo',4,'ia','conf'],['15:00','corte',5,'pag','aguarda'],['16:00','corte',8,'ia','conf'],['17:00','realin',6,'ia','conf']],
    [['09:00','corte',19,'rec','conf'],['09:45','barba',14,'ia','conf'],['10:30','combo',16,'pag','conf'],['11:30','corte',20,'ia','aguarda'],['13:30','corte',8,'ia','conf'],['14:15','hidra',21,'man','conf'],['16:00','combo',17,'ia','conf'],['17:00','corte',15,'pag','conf'],['18:00','corte',9,'ia','aguarda']],
    [['09:30','corte',12,'ia','conf'],['10:15','combo',0,'rec','conf'],['11:15','barba',13,'pag','conf'],['14:00','corte',10,'ia','conf'],['14:45','corte',11,'ia','aguarda'],['16:30','combo',18,'man','conf'],['17:30','corte',3,'pag','conf']],
    [['09:00','combo',4,'ia','conf'],['10:00','corte',7,'pag','conf'],['10:45','corte',2,'ia','conf'],['11:30','barba',1,'man','conf'],['13:30','corte',16,'ia','conf'],['14:15','combo',20,'rec','conf'],['15:15','corte',5,'pag','aguarda'],['16:00','realin',14,'ia','conf'],['17:30','corte',19,'ia','conf'],['18:15','barba',21,'pag','conf']]
  ];

  function dataDe(off){const d=new Date(HOJE);d.setDate(d.getDate()+off);return d;}
  function baseDoDia(off){
    const d=dataDe(off);
    if(d.getDay()===0 && off!==0) return null; // domingo é folga (se hoje for domingo, mostra mesmo assim)
    const p=PADROES[((off%4)+4)%4];
    return p.map(([ini,sv,cl,orig,sit])=>({id:off+'-'+h(ini),off,ini:h(ini),sv,cli:cl,orig,sit}));
  }

  const CONVERSAS = [
    {cli:8, quando:'agora', tag:'ia', resumo:'Fechado, 16h hoje. Te mando lembrete 2h antes.', msgs:[
      {sep:'Hoje'},
      {de:'cli',t:'Fala Lucas, tem horário hoje às 15h?',h:'10:12'},
      {de:'ia',t:'Fala, Vini! Tudo certo? Às 15h já tá ocupado, meu querido. Tenho às 16h hoje ou amanhã às 15h. Qual fica melhor pra você?',h:'10:12'},
      {de:'cli',t:'16h fechou',h:'10:14'},
      {de:'ia',t:'Fechado então: hoje às 16h, corte. Te mando um lembrete 2h antes 👊',h:'10:14'},
      {nota:'A IA olhou a agenda real, viu que 15h estava ocupado e ofereceu o horário livre mais perto. Marcou e já mandou para a agenda.'},
      {de:'ia',t:'Ah, e me conta uma coisa: qual o dia do seu aniversário? Quero te mandar um presente no dia.',h:'10:15'},
      {de:'cli',t:'22/08 kkk',h:'10:16'},
      {de:'ia',t:'Anotado! Tamo junto, até mais tarde.',h:'10:16'},
      {nota:'Aniversário salvo na ficha do Vinícius. No dia, a mensagem sai sozinha.'}
    ]},
    {cli:10, quando:'10:00', tag:'ia', resumo:'Bora, terça 10h fechou.', msgs:[
      {sep:'Ontem'},
      {de:'cli',t:'Lucas, sábado 10h tem?',h:'19:40'},
      {de:'ia',t:'Fala, Caio! Sábado 10h já foi, mas tenho sábado 11h30 ou sexta 18h. Algum desses dá?',h:'19:41'},
      {de:'cli',t:'Esse fim de semana não dá não',h:'19:52'},
      {de:'ia',t:'Tranquilo! Então semana que vem, terça às 10h? Tá livre ainda.',h:'19:52'},
      {nota:'Sem resposta. A IA espera até o dia seguinte e manda uma mensagem só, às 10h, sem insistir mais que isso.'},
      {sep:'Hoje'},
      {de:'ia',t:'E aí, Caio, viu minha mensagem? Bora deixar a terça 10h reservada pra você?',h:'10:00'},
      {de:'cli',t:'Bora, terça 10h fechou',h:'10:21'},
      {de:'ia',t:'Show! Terça às 10h, corte. Até lá 🤝',h:'10:21'}
    ]},
    {cli:11, quando:'09:47', tag:'voce', resumo:'Quanto fica pra fazer platinado?', msgs:[
      {sep:'Hoje'},
      {de:'cli',t:'Bom dia! Quanto fica pra fazer platinado? E demora quanto tempo?',h:'09:45'},
      {de:'ia',t:'Bom dia, Henrique! Platinado o Lucas avalia pessoalmente, porque depende do seu cabelo. Já passei pra ele e ele te responde ainda hoje, beleza?',h:'09:47'},
      {nota:'A IA não inventa preço do que você não ensinou. Passou para você e marcou como "Precisa de você".'}
    ]},
    {cli:9, quando:'ontem', tag:'ia', resumo:'Quinta 18h tá ótimo', msgs:[
      {sep:'Ontem'},
      {de:'ia',t:'Fala, André! Já faz 16 dias do último corte, tá chegando a hora 💈 Tenho quinta 18h ou sexta 10h. Quer que eu reserve um pra você?',h:'11:00',auto:'Mensagem automática: tá no tempo do corte'},
      {de:'cli',t:'Quinta 18h tá ótimo',h:'11:32'},
      {de:'ia',t:'Reservado! Quinta às 18h, corte. Te lembro no dia.',h:'11:32'}
    ]},
    {cli:17, quando:'09:00', tag:'ia', resumo:'Valeu demais, Lucas!', msgs:[
      {sep:'Hoje'},
      {de:'ia',t:'Feliz aniversário, Samuel! Muita saúde e sucesso, meu querido. Quando quiser dar aquele tapa no visual pro rolê, tenho horário essa semana.',h:'09:00',auto:'Mensagem automática: aniversário'},
      {de:'cli',t:'Valeu demais, Lucas! Sexta de manhã tem?',h:'09:18'},
      {de:'ia',t:'Tem sim! Sexta às 9h30 ou 11h. Qual prefere?',h:'09:18'},
      {de:'cli',t:'9h30',h:'09:20'},
      {de:'ia',t:'Fechado: sexta às 9h30. Bom aniversário de novo! 🎉',h:'09:20'}
    ]},
    {cli:1, quando:'seg', tag:'luc', resumo:'Você: Pode deixar, separo pra você', msgs:[
      {sep:'Segunda'},
      {de:'cli',t:'Lucas, ainda tem aquele balm de barba?',h:'14:02'},
      {de:'ia',t:'Fala, Diego! Deixa eu confirmar com o Lucas e já te falo.',h:'14:02'},
      {de:'luc',t:'Tenho sim, Diego. Pode deixar, separo pra você na sexta.',h:'14:30'},
      {nota:'Você assumiu essa conversa. A IA fica quieta até você devolver.'}
    ]}
  ];

  window.PF = {HOJE, SERVICOS, CLIENTES, dataDe, baseDoDia, CONVERSAS, h};
})();
