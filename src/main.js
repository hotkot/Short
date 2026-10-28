import './style.css';

const icons = {
 file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>', download:'<path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
 arrow:'<path d="M19 12H5m6-6-6 6 6 6"/>', check:'<path d="m5 12 4 4L19 6"/>',
 undo:'<path d="M3 9h11a6 6 0 0 1 0 12M3 9l5-5M3 9l5 5"/>', redo:'<path d="M21 9H10a6 6 0 0 0 0 12m11-12-5-5m5 5-5 5"/>',
 left:'<path d="M4 5h16M4 10h10M4 15h16M4 20h10"/>', center:'<path d="M4 5h16M7 10h10M4 15h16M7 20h10"/>',
 list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h.01M3 12h.01M3 18h.01"/>', link:'<path d="m10 13 4-4m-5 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 0 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m21 15-5-5L5 21"/>', panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>', more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>', print:'<path d="M7 8V3h10v5M7 17H3V8h18v9h-4M7 14h10v7H7z"/>',
};
const icon = name => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.file}</svg>`;
const starter = `<p class="eyebrow">A LITTLE SPACE TO THINK</p><h1>Good things start<br>with a few words.</h1><p>Every big idea begins somewhere. A passing thought, a conversation, a sentence you can’t quite get out of your head.</p><p>This is a place to give those ideas a little room.</p><h2>Make room for what matters</h2><p>We spend so much time making things more complicated. More tabs. More tools. More noise. But the best work usually starts when we slow down and pay attention.</p><blockquote>“Simplicity boils down to two steps: identify the essential.<br>Eliminate the rest.”<br><span>— Leo Babauta</span></blockquote><p>So, start small. Write down the thing you’ve been thinking about. Don’t worry about getting it right on the first try.</p><p>A rough draft is a beginning. And a beginning is everything.</p><h2>A few things to remember</h2><ul><li>Follow your curiosity.</li><li>Leave a little space for the unexpected.</li><li>Make something that feels like you.</li></ul><p>Over to you.</p>`;
const key = 'short.documents.v1';
let docs;
try { docs = JSON.parse(localStorage.getItem(key)); } catch {}
if (!Array.isArray(docs) || !docs.length) docs = [{id:crypto.randomUUID(), title:'A place to begin', html:starter, updated:Date.now(), starred:false}];
let active = docs[0], filter = 'all', query = '', saved = true;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelector('#app').innerHTML = `
<aside class="sidebar"><a class="brand" href="#" aria-label="Short home"><span class="brand-symbol">s<span>.</span></span><span>short<span class="brand-dot">.</span></span></a>
<button class="new-document">${icon('plus')} New document <span>⌘ N</span></button>
<div class="sidebar-label">WORKSPACE</div><nav><button data-filter="all" class="nav-item active">${icon('file')} All documents <span class="doc-count"></span></button><button data-filter="recent" class="nav-item">${icon('clock')} Recent</button><button data-filter="starred" class="nav-item">${icon('star')} Starred</button></nav>
<div class="sidebar-section"><span>YOUR DOCUMENTS</span><button class="icon-button add-small" aria-label="New document">${icon('plus')}</button></div>
<label class="search">${icon('search')}<input placeholder="Find a document…" aria-label="Find a document" /></label><div class="document-list"></div>
<div class="sidebar-bottom"><div class="local-note"><span class="green-dot"></span> Your words, your space.<small>Saved in this browser. Always yours.</small></div><div class="profile"><span class="avatar">Y</span><div>Your workspace<small>Personal account</small></div><span class="profile-badge">LOCAL</span></div></div></aside>
<main><header class="topbar"><div class="breadcrumbs"><button class="icon-button sidebar-toggle" aria-label="Toggle sidebar">${icon('panel')}</button><span class="breadcrumb-parent">Workspace</span>${icon('chevron')}<span id="breadcrumb-title"></span></div><div class="topbar-actions"><span class="saved-state">${icon('check')} All changes saved</span><button class="export-button">${icon('download')} Export <span>⌄</span></button></div></header>
<section class="document-heading"><div><div class="document-kicker">YOUR NEXT GREAT IDEA STARTS HERE</div><div class="title-row"><input id="document-title" aria-label="Document title" maxlength="160"><button id="star-document" class="icon-button" aria-label="Star document">${icon('star')}</button></div><div class="document-meta">${icon('clock')} <span id="edited-label">Edited just now</span><span class="meta-dot">·</span> Only you</div></div><div class="heading-right"><span class="private-label"><span class="green-dot"></span> Personal document</span><button id="document-menu" class="icon-button" aria-label="Document options">${icon('more')}</button></div></section>
<div class="editor-shell"><div class="toolbar" role="toolbar" aria-label="Text formatting"><div class="tool-group"><button data-command="undo" title="Undo" aria-label="Undo">${icon('undo')}</button><button data-command="redo" title="Redo" aria-label="Redo">${icon('redo')}</button></div><div class="tool-group"><select id="block-style" aria-label="Paragraph style"><option value="p">Normal text</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="blockquote">Quote</option></select></div><div class="tool-group"><select id="font-family" aria-label="Font family"><option value="Georgia">Georgia</option><option value="Arial">Arial</option><option value="Verdana">Verdana</option><option value="monospace">Mono</option></select></div><div class="tool-group"><button data-command="bold" title="Bold (Ctrl+B)" aria-label="Bold"><b>B</b></button><button data-command="italic" title="Italic (Ctrl+I)" aria-label="Italic"><i>I</i></button><button data-command="underline" title="Underline (Ctrl+U)" aria-label="Underline"><u>U</u></button><label class="color-control" title="Text color"><span>A</span><input type="color" value="#263b34" aria-label="Text color"></label></div><div class="tool-group"><button data-command="justifyLeft" title="Align left" aria-label="Align left">${icon('left')}</button><button data-command="justifyCenter" title="Align center" aria-label="Align center">${icon('center')}</button><button data-command="insertUnorderedList" title="Bullet list" aria-label="Bullet list">${icon('list')}</button></div><div class="tool-group"><button id="insert-link" title="Insert link" aria-label="Insert link">${icon('link')}</button><button id="insert-image" title="Insert image" aria-label="Insert image">${icon('image')}</button></div><button id="print" class="print-button" title="Print" aria-label="Print">${icon('print')}</button></div>
<div class="paper-area"><div class="paper" ><article id="editor" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Document content" spellcheck="true"></article></div><div class="page-caption">A little less noise. A little more possibility.</div></div></div>
<footer><span><span class="green-dot"></span> All set. Make something good.</span><div><span id="word-count"></span><span class="footer-divider"></span><span id="reading-time"></span><span class="footer-divider"></span><button id="zoom-out" aria-label="Zoom out">−</button><span id="zoom-label">100%</span><button id="zoom-in" aria-label="Zoom in">+</button></div></footer></main>
<dialog id="export-dialog"><button class="dialog-close" aria-label="Close">×</button><span class="dialog-eyebrow">TAKE YOUR WORDS WITH YOU</span><h2>Ready for the next chapter.</h2><p>Download a copy of your document.</p><button data-export="html">${icon('file')} Formatted document <span>.html</span></button><button data-export="txt">${icon('file')} Plain text <span>.txt</span></button><button data-export="print">${icon('print')} Print or save as PDF</button></dialog>
<dialog id="link-dialog"><button class="dialog-close" aria-label="Close">×</button><h2>Add a link</h2><form><label>Web address<input type="url" name="url" placeholder="https://example.com" required></label><button class="primary" type="submit">Insert link</button></form></dialog>
<dialog id="options-dialog"><button class="dialog-close" aria-label="Close">×</button><h2>Document options</h2><button id="duplicate">Duplicate document</button><button id="delete" class="danger">Delete document</button></dialog><input id="image-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden><div class="toast" role="status"></div>`;
const editor = document.querySelector('#editor');
const title = document.querySelector('#document-title');
function notify(message) { const t=document.querySelector('.toast'); t.textContent=message; t.classList.add('visible'); clearTimeout(notify.timer); notify.timer=setTimeout(()=>t.classList.remove('visible'),3500); }
function persist() {
 try { localStorage.setItem(key,JSON.stringify(docs)); saved=true; } catch { saved=false; notify('Storage is full or unavailable. Export a copy to keep your work.'); }
 document.querySelector('.saved-state').innerHTML=saved ? `${icon('check')} All changes saved` : 'Changes not saved';
}
function list() {
 document.querySelector('.doc-count').textContent=docs.length;
 let visible=docs.filter(d=>(filter!=='starred'||d.starred)&&d.title.toLowerCase().includes(query));
 if(filter==='recent') visible.sort((a,b)=>b.updated-a.updated);
 document.querySelector('.document-list').innerHTML=visible.length ? visible.map(d=>`<button class="document-item ${d.id===active.id?'selected':''}" data-id="${esc(d.id)}">${icon('file')}<span>${esc(d.title || 'Untitled document')}</span>${d.starred?'<span class="tiny-star">★</span>':''}</button>`).join('') : '<p class="empty-list">No documents here yet.</p>';
 document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>open(docs.find(d=>d.id===b.dataset.id)));
}
function stats() { const text=editor.innerText.trim(); const count=text?text.split(/\s+/u).length:0; document.querySelector('#word-count').textContent=`${count} word${count===1?'':'s'}`; document.querySelector('#reading-time').textContent=`${Math.max(1,Math.ceil(count/200))} min read`; }
function open(doc) { active=doc; title.value=doc.title; editor.innerHTML=doc.html; document.querySelector('#breadcrumb-title').textContent=doc.title||'Untitled document'; document.querySelector('#star-document').classList.toggle('is-starred',!!doc.starred); document.querySelector('#star-document').setAttribute('aria-pressed',String(!!doc.starred)); list(); stats(); }
function update() { active.html=editor.innerHTML; active.updated=Date.now(); document.querySelector('#edited-label').textContent='Edited just now'; persist(); stats(); }
function create() { const doc={id:crypto.randomUUID(),title:'Untitled document',html:'<p><br></p>',updated:Date.now(),starred:false}; docs.unshift(doc); persist(); open(doc); title.focus(); title.select(); }
editor.addEventListener('input',update);
title.addEventListener('input',()=>{active.title=title.value;active.updated=Date.now();document.querySelector('#breadcrumb-title').textContent=title.value||'Untitled document';persist();list();});
document.querySelectorAll('.new-document,.add-small').forEach(b=>b.onclick=create);
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));list();});
document.querySelector('.search input').oninput=e=>{query=e.target.value.toLowerCase();list();};
document.querySelector('#star-document').onclick=()=>{active.starred=!active.starred;persist();open(active);};
function command(cmd,value=null) {editor.focus();document.execCommand(cmd,false,value);update();refreshFormatting();}
function refreshFormatting(){document.querySelectorAll('[data-command]').forEach(b=>b.classList.toggle('pressed',document.queryCommandState(b.dataset.command)));}
document.querySelectorAll('[data-command]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>command(b.dataset.command);});
document.addEventListener('selectionchange',()=>{if(editor.contains(window.getSelection()?.anchorNode)) refreshFormatting();});
document.querySelector('#block-style').onchange=e=>command('formatBlock',e.target.value);
document.querySelector('#font-family').onchange=e=>command('fontName',e.target.value);
let selection;
function remember(){const s=window.getSelection();if(s.rangeCount&&editor.contains(s.anchorNode))selection=s.getRangeAt(0).cloneRange();}
function restore(){editor.focus();if(selection){const s=window.getSelection();s.removeAllRanges();s.addRange(selection);}}
document.querySelector('.color-control').onmousedown=remember;
document.querySelector('input[type=color]').oninput=e=>{restore();command('foreColor',e.target.value);};
document.querySelector('#insert-link').onmousedown=e=>{e.preventDefault();remember();};
document.querySelector('#insert-link').onclick=()=>document.querySelector('#link-dialog').showModal();
document.querySelector('#link-dialog form').onsubmit=e=>{e.preventDefault();const url=new FormData(e.target).get('url');if(!/^https?:\/\//i.test(url)){notify('Use an http or https web address.');return;}document.querySelector('#link-dialog').close();restore();if(window.getSelection().isCollapsed)command('insertHTML',`<a href="${esc(url)}">${esc(url)}</a>`);else command('createLink',url);e.target.reset();};
document.querySelector('#insert-image').onmousedown=e=>{e.preventDefault();remember();};
document.querySelector('#insert-image').onclick=()=>document.querySelector('#image-file').click();
document.querySelector('#image-file').onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>2*1024*1024){notify('Choose an image smaller than 2 MB.');return;}const r=new FileReader();r.onload=()=>{restore();command('insertImage',r.result);};r.readAsDataURL(f);e.target.value='';};
// Paste plain text to keep imported markup and scripts out of stored documents.
editor.addEventListener('paste',e=>{e.preventDefault();command('insertText',e.clipboardData.getData('text/plain'));});
document.querySelector('.export-button').onclick=()=>document.querySelector('#export-dialog').showModal();
document.querySelectorAll('.dialog-close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
function download(format){if(format==='print'){window.print();return;}const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(active.title)}</title><style>body{max-width:720px;margin:60px auto;padding:24px;font:18px/1.8 Georgia,serif;color:#263b34}img{max-width:100%}blockquote{border-left:3px solid #728475;padding-left:24px}</style></head><body>${active.html}</body></html>`;const blob=new Blob([format==='txt'?editor.innerText:html],{type:format==='txt'?'text/plain;charset=utf-8':'text/html;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${(active.title||'Untitled document').replace(/[^\p{L}\p{N} _-]/gu,'')}.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Your document is ready.');}
document.querySelectorAll('[data-export]').forEach(b=>b.onclick=()=>{document.querySelector('#export-dialog').close();download(b.dataset.export);});
document.querySelector('#print').onclick=()=>window.print();
document.querySelector('#document-menu').onclick=()=>document.querySelector('#options-dialog').showModal();
document.querySelector('#duplicate').onclick=()=>{const doc={...active,id:crypto.randomUUID(),title:`${active.title} (copy)`,updated:Date.now()};docs.unshift(doc);persist();open(doc);document.querySelector('#options-dialog').close();};
document.querySelector('#delete').onclick=()=>{if(!confirm(`Delete “${active.title || 'Untitled document'}”? This cannot be undone.`))return;docs=docs.filter(d=>d.id!==active.id);if(!docs.length)create();else{persist();open(docs[0]);}document.querySelector('#options-dialog').close();};
document.querySelector('.sidebar-toggle').onclick=()=>document.body.classList.toggle('sidebar-hidden');
document.querySelector('.brand').onclick=e=>{e.preventDefault();filter='all';document.querySelector('[data-filter=all]').click();};
let zoom=100;function setZoom(delta){zoom=Math.max(60,Math.min(140,zoom+delta));document.querySelector('.paper').style.zoom=zoom/100;document.querySelector('#zoom-label').textContent=`${zoom}%`;}
document.querySelector('#zoom-out').onclick=()=>setZoom(-10);document.querySelector('#zoom-in').onclick=()=>setZoom(10);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.altKey&&e.key.toLowerCase()==='n'){e.preventDefault();create();}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();update();notify(saved?'Document saved in this browser.':'Export your document to keep your work.');}});
document.querySelector('.new-document span').textContent=navigator.platform.includes('Mac')?'⌘ ⌥ N':'Ctrl Alt N';
open(active);persist();
