import { createLeague, createFixtures } from './data.js';
import { createMatch, advanceMatch, simulateMatch } from './matchEngine.js';
import { loadGame, saveGame, exportGame, importGame } from './saveSystem.js';

const app=document.getElementById('app');
let state=loadGame();
if(!state){state={clubs:createLeague(5162026),season:1,round:1,fixtures:createFixtures(createLeague(5162026),1)}};

function render(){
 const club=state.clubs?.[0];
 app.innerHTML=`<header class="topbar"><div class="brand"><span class="brand-mark">JG</span><div>Jack Gaffer<small>Football Manager Lite</small></div></div><div class="topbar-right"><span class="club-chip">${club?.name||'Millford United'}</span><span class="date-chip">Season ${state.season||1}</span></div></header><div class="layout"><aside class="sidebar"><div class="nav-group"><div class="nav-label">Club</div><button class="nav-btn active" data-act="dashboard">◉ Dashboard</button><button class="nav-btn" data-act="match">⚽ Match</button><button class="nav-btn" data-act="save">💾 Save</button></div></aside><section class="content"><div class="page-heading"><div><div class="eyebrow">Manager career</div><h1>${club?.name||'Millford United'}</h1><p class="subhead">Season ${state.season||1}, Round ${state.round||1}</p></div></div><div class="grid two"><article class="card hero-card"><div class="hero-top"><div class="hero-kicker">Jack Gaffer</div><div class="hero-score">${club?.record?.points||0}<span> points</span></div></div><div class="hero-foot"><div><div class="club-name">${club?.name||'Millford United'}</div><div class="next-fixture">Ready for the next fixture.</div></div><button class="btn primary" data-act="match">Start Match</button></div></article><article class="card"><h2 class="card-title">Quick check</h2><div class="list"><div class="list-row"><div class="list-main"><b>Squad</b><small>${club?.players?.length||0} players</small></div></div><div class="list-row"><div class="list-main"><b>Save game</b><small>Local browser save</small></div><button class="btn small" data-act="save">Export</button></div></div></article></div></section></div>`;
 app.querySelectorAll('[data-act="match"]').forEach(b=>b.onclick=()=>runMatch());
 app.querySelectorAll('[data-act="save"]').forEach(b=>b.onclick=()=>{const blob=exportGame(state); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='jack-gaffer-save.json';a.click();URL.revokeObjectURL(a.href);});
 saveGame(state);
}
function runMatch(){const fixture=state.fixtures?.find(f=>f.round===state.round&&!f.played);if(!fixture){alert('No fixture available.');return;}const home=state.clubs.find(c=>c.id===fixture.homeId),away=state.clubs.find(c=>c.id===fixture.awayId);const result=simulateMatch(home,away,hash(fixture.homeId+fixture.awayId+state.round));fixture.played=true;fixture.score=[result.teams[0].stats.goals,result.teams[1].stats.goals];state.round=Math.min(18,state.round+1);saveGame(state);alert(`${home.name} ${fixture.score[0]}–${fixture.score[1]} ${away.name}`);render();}
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
render();if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
