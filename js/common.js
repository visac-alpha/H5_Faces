/** 公共：平台、渲染辅助、底部 Tab */
(function (global) {
  const PLATFORMS = ['flutter', 'web', 'ios'];
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
    const raw = qs().get('platform') || storageGet('h5_faces_platform') || 'flutter';
    return PLATFORMS.includes(raw) ? raw : 'flutter';
  }

  function setPlatform(p) {
    const key = PLATFORMS.includes(p) ? p : 'flutter';
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
      { id: 'flutter', label: 'Flutter', ico: '💙' },
      { id: 'web', label: 'H5', ico: '🌐' },
      { id: 'ios', label: 'iOS', ico: '📱' },
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
    toast,
    applyAccent,
    renderTabbar,
    topbar,
    groupByCat,
    counts,
    detailUrl,
  };
})(window);
