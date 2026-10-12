/** 控件集合：演示挂载 + 示例代码 */
window.WIDGET_DEMOS = [
  {
    id: 'button',
    title: 'Button 按钮',
    desc: '主按钮 / 描边 / 幽灵按钮，点击反馈。',
    code: `<button class="ui-btn">主按钮</button>
<button class="ui-btn outline">描边</button>
<button class="ui-btn ghost">幽灵</button>`,
    mount(el) {
      el.innerHTML = `<div class="row">
        <button type="button" class="ui-btn" data-t="主按钮">主按钮</button>
        <button type="button" class="ui-btn outline" data-t="描边">描边</button>
        <button type="button" class="ui-btn ghost" data-t="幽灵">幽灵</button>
      </div>`;
      el.querySelectorAll('button').forEach((b) => {
        b.onclick = () => App.toast('点击了：' + b.dataset.t);
      });
    },
  },
  {
    id: 'input',
    title: 'Input / Textarea',
    desc: '单行输入、多行输入，监听 input 事件。',
    code: `<input class="ui-input" placeholder="请输入">
<textarea class="ui-textarea" placeholder="多行内容"></textarea>`,
    mount(el) {
      el.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;width:100%">
        <input class="ui-input" id="demoInput" placeholder="请输入昵称">
        <textarea class="ui-textarea" id="demoTa" placeholder="自我介绍"></textarea>
        <div style="font-size:12px;color:#64748b" id="demoInputTip">实时：</div>
      </div>`;
      const tip = el.querySelector('#demoInputTip');
      const sync = () => {
        tip.textContent =
          '实时：' +
          (el.querySelector('#demoInput').value || '(空)') +
          ' / ' +
          (el.querySelector('#demoTa').value || '(空)');
      };
      el.querySelector('#demoInput').oninput = sync;
      el.querySelector('#demoTa').oninput = sync;
    },
  },
  {
    id: 'select',
    title: 'Select 下拉',
    desc: '原生 select，适合简单枚举。',
    code: `<select class="ui-select">
  <option>ERC20</option>
  <option>TRC20</option>
</select>`,
    mount(el) {
      el.innerHTML = `<select class="ui-select" id="demoSel">
        <option value="erc20">ERC20</option>
        <option value="trc20">TRC20</option>
        <option value="bep20">BEP20</option>
      </select>
      <div style="margin-top:8px;font-size:12px;color:#64748b" id="selTip">当前：erc20</div>`;
      el.querySelector('#demoSel').onchange = (e) => {
        el.querySelector('#selTip').textContent = '当前：' + e.target.value;
      };
    },
  },
  {
    id: 'check',
    title: 'Checkbox / Radio',
    desc: '多选与单选。',
    code: `<label><input type="checkbox"> 记住我</label>
<label><input type="radio" name="pay"> 微信</label>`,
    mount(el) {
      el.innerHTML = `<div class="row">
        <label><input type="checkbox" id="ck"> 记住登录</label>
        <label><input type="radio" name="pay" value="wx" checked> 微信</label>
        <label><input type="radio" name="pay" value="ali"> 支付宝</label>
      </div>
      <div style="margin-top:8px;font-size:12px;color:#64748b" id="ckTip"></div>`;
      const tip = el.querySelector('#ckTip');
      const sync = () => {
        const pay = el.querySelector('input[name=pay]:checked').value;
        tip.textContent =
          '记住=' + el.querySelector('#ck').checked + ' · 支付=' + pay;
      };
      el.querySelectorAll('input').forEach((i) => (i.onchange = sync));
      sync();
    },
  },
  {
    id: 'switch',
    title: 'Switch 开关',
    desc: '自定义开关，用 class 切换状态。',
    code: `el.classList.toggle('on')
// CSS: .switch.on { background: accent }`,
    mount(el) {
      el.innerHTML = `<div class="row">
        <button type="button" class="switch" id="sw" aria-label="开关"><i></i></button>
        <span id="swTip" style="font-size:13px">关</span>
      </div>`;
      const sw = el.querySelector('#sw');
      sw.onclick = () => {
        sw.classList.toggle('on');
        el.querySelector('#swTip').textContent = sw.classList.contains('on') ? '开' : '关';
      };
    },
  },
  {
    id: 'tabs',
    title: 'Tabs 标签页',
    desc: '切换面板内容。',
    code: `tabs.forEach(btn => btn.onclick = () => {
  panels.forEach(p => p.hidden = true)
  target.hidden = false
})`,
    mount(el) {
      el.innerHTML = `<div class="tabs">
        <button type="button" class="active" data-i="0">持仓</button>
        <button type="button" data-i="1">账单</button>
        <button type="button" data-i="2">设置</button>
      </div>
      <div class="tab-panels">
        <div data-p="0">持仓列表示意</div>
        <div data-p="1" hidden>账单列表示意</div>
        <div data-p="2" hidden>设置项示意</div>
      </div>`;
      const btns = el.querySelectorAll('.tabs button');
      const panels = el.querySelectorAll('[data-p]');
      btns.forEach((b) => {
        b.onclick = () => {
          btns.forEach((x) => x.classList.remove('active'));
          b.classList.add('active');
          panels.forEach((p) => (p.hidden = p.dataset.p !== b.dataset.i));
        };
      });
    },
  },
  {
    id: 'progress',
    title: 'Progress / Range',
    desc: '进度条与滑动条。',
    code: `<div class="progress"><span style="width:40%"></span></div>
<input type="range" min="0" max="100">`,
    mount(el) {
      el.innerHTML = `<div class="progress" style="margin-bottom:10px"><span id="pg" style="width:40%"></span></div>
        <input type="range" min="0" max="100" value="40" id="rg" style="width:100%">
        <div style="font-size:12px;color:#64748b;margin-top:6px" id="rgTip">40%</div>`;
      const rg = el.querySelector('#rg');
      rg.oninput = () => {
        el.querySelector('#pg').style.width = rg.value + '%';
        el.querySelector('#rgTip').textContent = rg.value + '%';
      };
    },
  },
  {
    id: 'badge',
    title: 'Badge / Tag',
    desc: '状态标签。',
    code: `<span class="tag">成功</span>`,
    mount(el) {
      el.innerHTML = `<div class="row">
        <span class="tag">成功</span>
        <span class="tag" style="background:#fff7ed;color:#c2410c">确认中</span>
        <span class="tag" style="background:#fef2f2;color:#b91c1c">失败</span>
        <span class="tag" style="background:#eef2ff;color:#3730a3">ERC20</span>
      </div>`;
    },
  },
  {
    id: 'list',
    title: 'List 列表',
    desc: '简单列表项，可点。',
    code: `<ul class="list-demo">
  <li>BTC · 0.12</li>
</ul>`,
    mount(el) {
      const items = ['BTC · 0.12', 'ETH · 1.5', 'USDT · 1200'];
      el.innerHTML = `<ul class="list-demo">${items
        .map((t) => `<li data-t="${t}">${t} ›</li>`)
        .join('')}</ul>`;
      el.querySelectorAll('li').forEach((li) => {
        li.style.cursor = 'pointer';
        li.onclick = () => App.toast(li.dataset.t);
      });
    },
  },
  {
    id: 'modal',
    title: 'Modal 弹窗',
    desc: '遮罩层 + 居中对话框。',
    code: `mask.classList.add('show')
mask.addEventListener('click', e => {
  if (e.target === mask) mask.classList.remove('show')
})`,
    mount(el) {
      el.innerHTML = `<button type="button" class="ui-btn" id="openModal">打开弹窗</button>`;
      el.querySelector('#openModal').onclick = () => {
        if (typeof window.__openDemoModal === 'function') window.__openDemoModal();
        else App.toast('请在控件集合页使用完整弹窗');
      };
    },
  },
  {
    id: 'toast',
    title: 'Toast 轻提示',
    desc: '底部短暂提示，不打断操作。',
    code: `function toast(msg) {
  el.textContent = msg
  el.classList.add('show')
  setTimeout(() => el.classList.remove('show'), 1600)
}`,
    mount(el) {
      el.innerHTML = `<div class="row">
        <button type="button" class="ui-btn" data-m="提交成功">成功 Toast</button>
        <button type="button" class="ui-btn ghost" data-m="网络异常">警告 Toast</button>
      </div>`;
      el.querySelectorAll('button').forEach((b) => {
        b.onclick = () => App.toast(b.dataset.m);
      });
    },
  },
  {
    id: 'flex',
    title: 'Flex 布局',
    desc: '一维排布，子项均分。',
    code: `.row { display: flex; gap: 8px; }
.row > * { flex: 1; }`,
    mount(el) {
      el.innerHTML = `<div class="flex-demo">
        <div>A</div><div>B</div><div>C</div>
      </div>`;
    },
  },
  {
    id: 'grid',
    title: 'Grid 布局',
    desc: '二维网格，两列卡片。',
    code: `.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }`,
    mount(el) {
      el.innerHTML = `<div class="grid-demo">
        <div>1</div><div>2</div><div>3</div><div>4</div>
      </div>`;
    },
  },
  {
    id: 'accordion',
    title: 'Accordion 折叠',
    desc: '点击标题展开/收起内容。',
    code: `header.onclick = () => panel.hidden = !panel.hidden`,
    mount(el) {
      el.innerHTML = `<div>
        <button type="button" class="cat-h" id="accH" style="padding:8px 0">
          <span class="arrow">›</span> 什么是 rem？
        </button>
        <div id="accB" hidden style="font-size:13px;color:#475569;padding:0 0 8px">
          rem 相对根元素字体大小，常用于移动端适配。
        </div>
      </div>`;
      const h = el.querySelector('#accH');
      const b = el.querySelector('#accB');
      h.onclick = () => {
        b.hidden = !b.hidden;
        h.querySelector('.arrow').style.transform = b.hidden ? '' : 'rotate(90deg)';
      };
    },
  },
  {
    id: 'skeleton',
    title: 'Skeleton 骨架屏',
    desc: '加载占位，降低白屏感。',
    code: `.sk { height: 14px; background: linear-gradient(90deg,#eee,#f5f5f5,#eee); background-size: 200% 100%; animation: shine 1.2s infinite; }`,
    mount(el) {
      el.innerHTML = `<style>
        @keyframes shine { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
        .sk{height:14px;border-radius:6px;margin:8px 0;background:linear-gradient(90deg,#e2e8f0,#f8fafc,#e2e8f0);background-size:200% 100%;animation:shine 1.2s infinite}
      </style>
      <div class="sk" style="width:40%"></div>
      <div class="sk"></div>
      <div class="sk" style="width:70%"></div>
      <button type="button" class="ui-btn" style="margin-top:8px" id="skLoad">模拟加载完成</button>
      <div id="skDone" hidden style="margin-top:8px;font-size:14px">内容已加载：BTC ¥ xxx</div>`;
      el.querySelector('#skLoad').onclick = () => {
        el.querySelectorAll('.sk').forEach((n) => (n.style.display = 'none'));
        el.querySelector('#skDone').hidden = false;
        el.querySelector('#skLoad').hidden = true;
      };
    },
  },
  {
    id: 'fetch',
    title: 'Fetch 请求（演示）',
    desc: '用公共测试接口演示 async/await。',
    code: `const res = await fetch(url)
const data = await res.json()`,
    mount(el) {
      el.innerHTML = `<button type="button" class="ui-btn" id="fetchBtn">请求 JSONPlaceholder</button>
        <pre class="demo-code" id="fetchOut" style="margin-top:8px;max-height:160px;overflow:auto">点击按钮发起请求…</pre>`;
      el.querySelector('#fetchBtn').onclick = async () => {
        const out = el.querySelector('#fetchOut');
        out.textContent = '加载中…';
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
          const data = await res.json();
          out.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
          out.textContent = '失败：' + e.message;
        }
      };
    },
  },
];
