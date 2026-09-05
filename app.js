const matches=[
 {league:'LaLiga',time:'18:30',home:'Girona',away:'Betis',hs:'—',as:'—',live:false},
 {league:'LaLiga',time:'20:00',home:'Barça',away:'Real Madrid',hs:'2',as:'1',live:true},
 {league:'Champions',time:'21:00',home:'Man City',away:'Inter',hs:'—',as:'—',live:false},
 {league:'LaLiga',time:'22:00',home:'Atlético',away:'València',hs:'—',as:'—',live:false},
 {league:'Premier',time:'21:15',home:'Arsenal',away:'Chelsea',hs:'1',as:'0',live:true},
 {league:'Serie A',time:'20:45',home:'Milan',away:'Roma',hs:'—',as:'—',live:false}
];
const crest=t=>`<span class="mini-crest">${t[0]}</span>`;
function renderMatches(filter='Tots'){
 const data=filter==='Tots'?matches:matches.filter(m=>m.league===filter);
 document.querySelector('#matches').innerHTML=data.map(m=>`<article class="match"><div class="meta"><span>${m.league}</span><span>${m.live?'<span class="status">● EN DIRECTE</span>':m.time}</span></div><div class="teams"><div class="team"><span class="team-left">${crest(m.home)}${m.home}</span><span class="score">${m.hs}</span></div><div class="team"><span class="team-left">${crest(m.away)}${m.away}</span><span class="score">${m.as}</span></div></div></article>`).join('');
}
renderMatches();
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMatches(b.textContent)}));
const table=[['1','Barça','4','+8','12'],['2','Real Madrid','4','+6','10'],['3','Atlético','4','+4','9'],['4','Girona','4','+3','8'],['5','Betis','4','+2','7'],['6','València','4','0','6']];
document.querySelector('#standings').innerHTML=table.map(r=>`<tr><td class="rank">${r[0]}</td><td><span class="club">${crest(r[1])}${r[1]}</span></td><td>${r[2]}</td><td>${r[3]}</td><td><b>${r[4]}</b></td></tr>`).join('');
const squads={barca:{name:'FC Barcelona',players:[['Ter Stegen',12,82],['Koundé',28,58],['Araújo',38,38],['Cubarsí',42,38],['Balde',28,18],['Pedri',45,52],['De Jong',55,52],['Olmo',63,70],['Lamine Yamal',72,28],['Lewandowski',82,50],['Raphinha',72,72]],bench:['Fermín','Ferran Torres','Eric García','Casadó']},madrid:{name:'Real Madrid',players:[['Courtois',12,82],['Carvajal',28,60],['Militão',38,38],['Rüdiger',42,38],['Mendy',28,18],['Valverde',55,42],['Bellingham',57,62],['Camavinga',48,78],['Rodrygo',72,25],['Mbappé',82,50],['Vinícius',72,75]],bench:['Brahim','Güler','Endrick','Tchouaméni']},city:{name:'Manchester City',players:[['Ederson',12,82],['Walker',28,58],['Dias',38,40],['Gvardiol',42,40],['Grealish',28,18],['Rodri',52,50],['De Bruyne',55,70],['Foden',64,35],['Doku',72,18],['Haaland',82,50],['Savinho',72,80]],bench:['Bernardo Silva','Gündogan','Akanji','Lewis']}};
function renderLineup(key){const s=squads[key];document.querySelector('#lineupName').textContent=s.name;document.querySelector('#pitch').innerHTML=s.players.map(p=>`<div class="player" style="left:${p[2]}%;top:${p[1]}%"><i>${p[0][0]}</i>${p[0]}</div>`).join('');document.querySelector('#benchPlayers').textContent=s.bench.join(' · ')}
renderLineup('barca');document.querySelector('#teamSelect').addEventListener('change',e=>renderLineup(e.target.value));
const transfers=[['J. Alvarez','Atlético → Barça','Davanter'],['N. Williams','Athletic → Arsenal','Extrem'],['X. Simons','RB Leipzig → City','Migcampista']];
document.querySelector('#transfers').innerHTML=transfers.map(t=>`<article class="transfer"><span class="avatar">${t[0].split(' ').map(x=>x[0]).join('')}</span><div><h3>${t[0]}</h3><p>${t[1]} · ${t[2]}</p></div><span class="arrow">→</span></article>`).join('');
document.querySelector('#showAllTransfers').addEventListener('click',()=>alert('Aquí es pot ampliar la llista de fitxatges quan connectem la font de dades.'));
function tick(){const d=new Date();document.querySelector('#clock').textContent=d.toLocaleTimeString('ca-ES',{hour12:false});}tick();setInterval(tick,1000);
let n=0;setInterval(()=>{n=(n+1)%2;document.querySelector('#liveHome').textContent=n?2:2;document.querySelector('#liveAway').textContent=n?1:1},8000);
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#menuBtn').addEventListener('click',()=>{const nav=document.querySelector('.nav');nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='72px';nav.style.left='0';nav.style.right='0';nav.style.padding='15px 22px';nav.style.background='#07111f';nav.style.flexDirection='column';});