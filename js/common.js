/** 公共：平台、渲染辅助、底部 Tab */
(function (global) {
  const PLATFORMS = ['ios', 'flutter', 'web'];
  const LABELS = { flutter: 'Flutter', web: 'H5', ios: 'iOS' };
  const CHIPS = {
    flutter: ['Dart', 'Widget', '状态管理', '性能'],
    web: ['HTML/CSS', 'JavaScript', '浏览器', '工程化'],
    ios: ['Swift', 'UIKit', 'Objective-C', 'Runtime'],
  };

  function qs() {
    return new URLSearchParams(location.search);
  }

  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {
      /* Safari 隐私模式等可能写失败，忽略 */
    }
  }

  function getPlatform() {
    const raw = qs().get('platform') || storageGet('h5_faces_platform') || 'ios';
    return PLATFORMS.includes(raw) ? raw : 'ios';
  }

  function setPlatform(p) {
    const key = PLATFORMS.includes(p) ? p : 'ios';
    storageSet('h5_faces_platform', key);
  }

  function ensureCatalog() {
    if (typeof window.mergeExtraIntoCatalog === 'function') {
      window.mergeExtraIntoCatalog();
      window.mergeExtraIntoCatalog = null;
    }
    return window.CATALOG;
  }

  function platformData(p) {
    ensureCatalog();
    const cat = window.CATALOG;
    if (!cat) return null;
    return cat[p || getPlatform()] || null;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** 把带【小节标题】的答法渲染成可读层次（纯文本仍可复制） */
  function formatAnswer(text) {
    const raw = String(text == null ? '' : text).replace(/\r\n/g, '\n').trim();
    if (!raw) return '';
    const lines = raw.split('\n');
    const parts = [];
    let buf = [];
    let inSection = false;

    function flushBuf() {
      if (!buf.length) return;
      const block = [];
      let list = null;
      const closeList = () => {
        if (list) {
          block.push(`<ul class="ans-list">${list.join('')}</ul>`);
          list = null;
        }
      };
      for (const line of buf) {
        const t = line.trimEnd();
        if (!t.trim()) {
          closeList();
          continue;
        }
        const m = t.match(/^\s*(?:[-•*]|\d+[.)、])\s+(.+)$/);
        if (m) {
          if (!list) list = [];
          list.push(`<li>${esc(m[1])}</li>`);
          continue;
        }
        closeList();
        // 「标签：内容」行，标签加粗
        const kv = t.match(/^([^：:]{1,16})([：:])\s*(.+)$/);
        if (kv && !/^(http|https)$/i.test(kv[1])) {
          block.push(
            `<p class="ans-p"><span class="ans-k">${esc(kv[1] + kv[2])}</span>${esc(kv[3])}</p>`
          );
        } else {
          block.push(`<p class="ans-p">${esc(t)}</p>`);
        }
      }
      closeList();
      parts.push(block.join(''));
      buf = [];
    }

    for (const line of lines) {
      const heading = line.trim().match(/^【([^】]+)】$/);
      if (heading) {
        flushBuf();
        if (inSection) parts.push('</section>');
        parts.push(
          `<section class="ans-sec"><h3 class="ans-h">${esc(heading[1])}</h3>`
        );
        inSection = true;
        continue;
      }
      buf.push(line);
    }
    flushBuf();
    if (inSection) parts.push('</section>');
    // 无任何【标题】时，整段仍按段落渲染
    if (!inSection && parts.length === 1) {
      return `<div class="answer rich">${parts[0]}</div>`;
    }
    return `<div class="answer rich">${parts.join('')}</div>`;
  }

  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 1600);
  }

  const ACCENTS = {
    flutter: '#00897B',
    web: '#E65100',
    ios: '#1565C0',
  };

  function applyAccent(p) {
    const key = p || getPlatform();
    let color = ACCENTS[key];
    try {
      const data = platformData(key);
      if (data && data.accent) color = data.accent;
    } catch (_) {
      /* 控件页可不加载题库 */
    }
    document.documentElement.style.setProperty('--accent', color || ACCENTS.flutter);
  }

  /** basePrefix: '' from root, '../' from pages/ */
  function renderTabbar(activePlatform, basePrefix) {
    const base = basePrefix || '';
    const tabs = [
      { id: 'ios', label: 'iOS', ico: '📱' },
      { id: 'flutter', label: 'Flutter', ico: '💙' },
      { id: 'web', label: 'H5', ico: '🌐' },
    ];
    return `<nav class="tabbar">${tabs
      .map(
        (t) => `<a class="tab ${activePlatform === t.id ? 'active' : ''}" href="${base}index.html?platform=${t.id}">
      <span class="ico">${t.ico}</span>${t.label}
    </a>`,
      )
      .join('')}</nav>`;
  }

  function topbar(title, backHref, subtitle) {
    return `<header class="top">
      ${backHref ? `<a class="icon-btn" href="${backHref}" aria-label="返回">←</a>` : ''}
      <div style="flex:1;min-width:0">
        <h1>${esc(title)}</h1>
        <div class="sub">${esc(subtitle || 'H5_Faces · 可部署 GitHub Pages')}</div>
      </div>
    </header>`;
  }

  function groupByCat(list) {
    const map = new Map();
    for (const it of list) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    }
    return map;
  }

  function counts(p) {
    const data = platformData(p);
    const knowledge = (data && data.knowledge) || [];
    const interviews = (data && data.interviews) || [];
    const know = knowledge.filter((it) => !Store.has(it)).length;
    const interview = interviews.filter((it) => !Store.has(it)).length;
    const mastered = knowledge.concat(interviews).filter((it) => Store.has(it)).length;
    return {
      knowledge: know,
      interview,
      mastered,
      knowledgeTotal: knowledge.length,
      interviewTotal: interviews.length,
    };
  }

  function detailUrl(platform, mode, item, basePrefix) {
    const base = basePrefix || '';
    const id = encodeURIComponent(Store.idOf(item));
    return `${base}pages/detail.html?platform=${platform}&mode=${mode}&id=${id}`;
  }

  global.App = {
    PLATFORMS,
    LABELS,
    CHIPS,
    qs,
    getPlatform,
    setPlatform,
    ensureCatalog,
    platformData,
    esc,
    formatAnswer,
    toast,
    applyAccent,
    renderTabbar,
    topbar,
    groupByCat,
    counts,
    detailUrl,
  };
})(window);
