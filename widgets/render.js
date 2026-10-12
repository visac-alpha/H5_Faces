/** 列表缩略图 + 详情演示挂载（按平台视觉区分） */
(function (global) {
  const THUMBS = {
    text: () => `<div class="thumb-inner thumb-text"><span>Aa</span><i></i><i style="width:70%"></i></div>`,
    box: () => `<div class="thumb-inner thumb-box"><div></div></div>`,
    row: () => `<div class="thumb-inner thumb-row"><b></b><b></b><b></b></div>`,
    expanded: () => `<div class="thumb-inner thumb-row"><b style="flex:2"></b><b style="flex:1"></b></div>`,
    stack: () => `<div class="thumb-inner thumb-stack"><div class="a"></div><div class="b"></div></div>`,
    align: () => `<div class="thumb-inner thumb-align"><span></span></div>`,
    image: () => `<div class="thumb-inner thumb-image">🖼</div>`,
    button: () => `<div class="thumb-inner thumb-button"><span>Btn</span></div>`,
    input: () => `<div class="thumb-inner thumb-input"><i></i></div>`,
    form: () => `<div class="thumb-inner thumb-form"><i class="sw"></i><i class="dot"></i></div>`,
    list: () => `<div class="thumb-inner thumb-list"><i></i><i></i><i></i></div>`,
    grid: () => `<div class="thumb-inner thumb-grid"><b></b><b></b><b></b><b></b></div>`,
    sliver: () => `<div class="thumb-inner thumb-sliver"><header></header><i></i><i></i></div>`,
    page: () => `<div class="thumb-inner thumb-page"><div></div><em></em></div>`,
    refresh: () => `<div class="thumb-inner thumb-refresh">↓</div>`,
    gesture: () => `<div class="thumb-inner thumb-gesture">👆</div>`,
    dialog: () => `<div class="thumb-inner thumb-dialog"><div></div></div>`,
    toast: () => `<div class="thumb-inner thumb-toast"><span>Tip</span></div>`,
    nav: () => `<div class="thumb-inner thumb-nav"><i></i><i></i><i></i></div>`,
    card: () => `<div class="thumb-inner thumb-card"><b></b><i></i></div>`,
    progress: () => `<div class="thumb-inner thumb-progress"><i style="width:55%"></i></div>`,
    async: () => `<div class="thumb-inner thumb-async">⟳</div>`,
    anim: () => `<div class="thumb-inner thumb-anim"><b></b></div>`,
    picker: () => `<div class="thumb-inner thumb-picker">📅</div>`,
    query: () => `<div class="thumb-inner thumb-query"><span>MQ</span></div>`,
  };

  function thumbHtml(type) {
    const fn = THUMBS[type] || THUMBS.box;
    return fn();
  }

  function toast(msg) {
    if (window.App && typeof window.App.toast === 'function') {
      window.App.toast(msg);
    }
  }

  function mountDemo(el, item, platform) {
    if (!el || !item) return;
    const d = item.demo;
    let accent = '#00897B';
    try {
      accent =
        getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() ||
        accent;
    } catch (_) {}

    // —— Flutter-like mocks ——
    if (d === 'fl_text') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-appbar">Text</div><div class="mock-body"><p style="font-size:18px;font-weight:600">Hello Flutter</p><p style="color:#64748b;font-size:13px">RichText · maxLines · ellipsis</p></div></div>`;
      return;
    }
    if (d === 'fl_container') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="display:flex;justify-content:center;padding:20px"><div style="padding:14px 18px;background:#e0f2f1;border-radius:12px;color:#00695c;font-weight:600">Container</div></div></div>`;
      return;
    }
    if (d === 'fl_row' || d === 'fl_expanded') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div style="display:flex;gap:8px;align-items:center"><span style="font-size:18px">★</span><div style="flex:1;background:#e2e8f0;border-radius:6px;padding:8px;font-size:13px">Expanded 标题</div></div><div style="display:flex;gap:6px;margin-top:12px"><div style="flex:2;height:36px;background:${accent};border-radius:6px"></div><div style="flex:1;height:36px;background:#fb923c;border-radius:6px"></div></div></div></div>`;
      return;
    }
    if (d === 'fl_stack') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="display:flex;justify-content:center;padding:16px"><div style="position:relative;width:140px;height:90px;background:${accent};border-radius:10px"><span style="position:absolute;right:6px;top:6px;width:16px;height:16px;background:#ef4444;border-radius:50%"></span></div></div></div>`;
      return;
    }
    if (d === 'fl_align') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="height:100px;display:flex;align-items:center;justify-content:flex-end;padding:12px;border:1px dashed #cbd5e1;border-radius:8px"><span style="background:#e0f2f1;padding:6px 10px;border-radius:6px;font-size:13px">右对齐</span></div></div>`;
      return;
    }
    if (d === 'fl_image') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body row" style="gap:12px;align-items:center"><div style="width:40px;height:40px;border-radius:50%;background:#99f6e4;display:flex;align-items:center;justify-content:center">🏠</div><div style="width:40px;height:40px;border-radius:50%;background:#c7d2fe;display:flex;align-items:center;justify-content:center;font-weight:700">A</div></div></div>`;
      return;
    }
    if (d === 'fl_button') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body row" style="gap:8px;flex-wrap:wrap"><button type="button" class="ui-btn">Elevated</button><button type="button" class="ui-btn outline">Outlined</button><button type="button" class="ui-btn ghost">Text</button></div></div>`;
      el.querySelectorAll('button').forEach((b) => (b.onclick = () => toast('Flutter Button：' + b.textContent)));
      return;
    }
    if (d === 'fl_input') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><label style="font-size:12px;color:#64748b">用户名</label><input class="ui-input" placeholder="TextField" style="margin-top:4px"></div></div>`;
      return;
    }
    if (d === 'fl_form') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div class="row" style="margin-bottom:10px"><button type="button" class="switch" id="flsw"><i></i></button><span id="flswt">Switch 关</span></div><input type="range" min="0" max="100" value="40" style="width:100%" id="flrg"><div style="font-size:12px;color:#64748b;margin-top:6px" id="flrgt">Slider 40</div></div></div>`;
      const sw = el.querySelector('#flsw');
      sw.onclick = () => {
        sw.classList.toggle('on');
        el.querySelector('#flswt').textContent = 'Switch ' + (sw.classList.contains('on') ? '开' : '关');
      };
      el.querySelector('#flrg').oninput = (e) => {
        el.querySelector('#flrgt').textContent = 'Slider ' + e.target.value;
      };
      return;
    }
    if (d === 'fl_list') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div class="mock-list">${['BTC','ETH','USDT'].map((t)=>`<div class="mock-li"><span>${t}</span><span>›</span></div>`).join('')}</div></div></div>`;
      return;
    }
    if (d === 'fl_grid') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div class="mock-grid">${['A','B','C','D'].map((t)=>`<div class="mock-cell">${t}</div>`).join('')}</div><p style="font-size:12px;color:#64748b;margin-top:8px">GridView.count · crossAxisCount: 2</p></div></div>`;
      return;
    }
    if (d === 'fl_sliver') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-appbar" style="position:sticky;top:0">SliverAppBar</div><div class="mock-body"><div class="mock-list">${[1,2,3].map((i)=>`<div class="mock-li">Item ${i}</div>`).join('')}</div></div></div>`;
      return;
    }
    if (d === 'fl_page') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div style="height:100px;border-radius:10px;background:linear-gradient(135deg,${accent},#5eead4);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">Page 1</div><div style="display:flex;gap:6px;justify-content:center;margin-top:10px"><i style="width:8px;height:8px;border-radius:50%;background:${accent};display:inline-block"></i><i style="width:8px;height:8px;border-radius:50%;background:#cbd5e1;display:inline-block"></i></div></div></div>`;
      return;
    }
    if (d === 'fl_refresh') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="text-align:center"><div style="color:${accent};font-size:28px;margin-bottom:8px">↓</div><p style="font-size:13px;color:#64748b">下拉刷新示意 · RefreshIndicator</p><button type="button" class="ui-btn" style="margin-top:10px" id="flref">模拟刷新</button></div></div>`;
      el.querySelector('#flref').onclick = async function () {
        this.textContent = '刷新中…';
        this.disabled = true;
        await new Promise((r) => setTimeout(r, 800));
        this.textContent = '模拟刷新';
        this.disabled = false;
        toast('刷新完成');
      };
      return;
    }
    if (d === 'fl_gesture') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div id="fltap" style="padding:20px;background:#e0f2f1;border-radius:10px;text-align:center;user-select:none">InkWell / GestureDetector<br><small>点击试试</small></div></div></div>`;
      el.querySelector('#fltap').onclick = () => toast('onTap');
      return;
    }
    if (d === 'fl_dialog') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><button type="button" class="ui-btn" id="fldlg">showDialog</button><div id="fldlgbox" hidden style="margin-top:12px;padding:14px;border-radius:12px;background:#fff;border:1px solid #e5e7eb;box-shadow:0 8px 24px rgba(0,0,0,.08)"><b>提示</b><p style="font-size:13px;color:#64748b;margin:8px 0">确认提交？</p><div class="row" style="justify-content:flex-end;gap:8px"><button type="button" class="ui-btn ghost" id="flc">取消</button><button type="button" class="ui-btn" id="flo">确定</button></div></div></div></div>`;
      const box = el.querySelector('#fldlgbox');
      el.querySelector('#fldlg').onclick = () => (box.hidden = false);
      el.querySelector('#flc').onclick = () => (box.hidden = true);
      el.querySelector('#flo').onclick = () => {
        box.hidden = true;
        toast('确定');
      };
      return;
    }
    if (d === 'fl_snack') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><button type="button" class="ui-btn" id="flsn">SnackBar</button></div></div>`;
      el.querySelector('#flsn').onclick = () => toast('已保存（SnackBar 示意）');
      return;
    }
    if (d === 'fl_nav') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-appbar">Home</div><div class="mock-body" style="min-height:80px;display:flex;align-items:center;justify-content:center;color:#64748b">Body</div><div class="mock-tabbar"><span class="on">首页</span><span>发现</span><span>我的</span></div></div>`;
      return;
    }
    if (d === 'fl_card') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div style="border-radius:12px;border:1px solid #e5e7eb;padding:12px;background:#fff"><div style="font-weight:600">标题</div><div style="font-size:13px;color:#64748b;margin:4px 0 8px">副标题 ListTile</div><span class="tag">Chip</span></div></div></div>`;
      return;
    }
    if (d === 'fl_progress') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="text-align:center"><div class="mock-spinner" style="border-top-color:${accent}"></div><div class="progress" style="margin-top:16px"><span style="width:40%"></span></div></div></div>`;
      return;
    }
    if (d === 'fl_async') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body" style="text-align:center"><div class="mock-spinner" id="flsp" style="border-top-color:${accent}"></div><p id="flas" style="margin-top:10px;font-size:13px;color:#64748b">FutureBuilder waiting…</p><button type="button" class="ui-btn" style="margin-top:8px" id="flab">重新加载</button></div></div>`;
      const run = async () => {
        el.querySelector('#flsp').style.display = 'inline-block';
        el.querySelector('#flas').textContent = 'waiting…';
        await new Promise((r) => setTimeout(r, 900));
        el.querySelector('#flsp').style.display = 'none';
        el.querySelector('#flas').textContent = 'data: ok';
      };
      el.querySelector('#flab').onclick = run;
      run();
      return;
    }
    if (d === 'fl_anim') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div id="flan" style="width:60px;height:60px;background:${accent};border-radius:8px;transition:width .3s"></div><button type="button" class="ui-btn" style="margin-top:12px" id="flanb">AnimatedContainer</button></div></div>`;
      let big = false;
      el.querySelector('#flanb').onclick = () => {
        big = !big;
        el.querySelector('#flan').style.width = big ? '120px' : '60px';
      };
      return;
    }
    if (d === 'fl_picker') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><button type="button" class="ui-btn" id="flpk">选择日期</button><p id="flpkv" style="margin-top:10px;font-size:13px;color:#64748b">未选择</p></div></div>`;
      el.querySelector('#flpk').onclick = () => {
        const d0 = new Date().toISOString().slice(0, 10);
        el.querySelector('#flpkv').textContent = 'DatePicker 示意：' + d0;
        toast(d0);
      };
      return;
    }
    if (d === 'fl_query') {
      el.innerHTML = `<div class="mock-fl"><div class="mock-body"><div id="flq" style="padding:12px;background:#f1f5f9;border-radius:8px;font-size:13px"></div></div></div>`;
      const paint = () => {
        el.querySelector('#flq').textContent =
          'LayoutBuilder 示意宽度 ≈ ' + Math.round(el.clientWidth) + 'px · ' +
          (el.clientWidth > 420 ? '宽屏 Row' : '窄屏 Column');
      };
      paint();
      window.addEventListener('resize', paint, { once: true });
      return;
    }

    // —— Web interactive ——
    if (d === 'web_button') {
      el.innerHTML = `<div class="row"><button type="button" class="ui-btn">提交</button><button type="button" class="ui-btn outline">取消</button></div>`;
      el.querySelectorAll('button').forEach((b) => (b.onclick = () => toast(b.textContent)));
      return;
    }
    if (d === 'web_input') {
      el.innerHTML = `<input class="ui-input" placeholder="昵称"><textarea class="ui-textarea" style="margin-top:8px" placeholder="简介"></textarea>`;
      return;
    }
    if (d === 'web_select') {
      el.innerHTML = `<select class="ui-select"><option>ERC20</option><option>TRC20</option></select>`;
      return;
    }
    if (d === 'web_check') {
      el.innerHTML = `<div class="row"><label><input type="checkbox"> 记住我</label><label><input type="radio" name="p" checked> 微信</label><label><input type="radio" name="p"> 支付宝</label></div>`;
      return;
    }
    if (d === 'web_flex') {
      el.innerHTML = `<div class="flex-demo"><div>A</div><div>B</div><div>C</div></div>`;
      return;
    }
    if (d === 'web_grid') {
      el.innerHTML = `<div class="grid-demo"><div>1</div><div>2</div><div>3</div><div>4</div></div>`;
      return;
    }
    if (d === 'web_modal') {
      el.innerHTML = `<button type="button" class="ui-btn" id="wm">打开 Modal</button>
        <div class="modal-mask" id="wmm"><div class="modal"><h4>Modal</h4><p>H5 弹层演示</p><button type="button" class="btn primary" id="wmc">关闭</button></div></div>`;
      const m = el.querySelector('#wmm');
      el.querySelector('#wm').onclick = () => m.classList.add('show');
      el.querySelector('#wmc').onclick = () => m.classList.remove('show');
      m.onclick = (e) => {
        if (e.target === m) m.classList.remove('show');
      };
      return;
    }
    if (d === 'web_toast') {
      el.innerHTML = `<button type="button" class="ui-btn" id="wt">Toast</button>`;
      el.querySelector('#wt').onclick = () => toast('操作成功');
      return;
    }
    if (d === 'web_tabs') {
      el.innerHTML = `<div class="tabs"><button type="button" class="active" data-i="0">持仓</button><button type="button" data-i="1">账单</button></div><div data-p="0">持仓面板</div><div data-p="1" hidden>账单面板</div>`;
      const btns = el.querySelectorAll('.tabs button');
      const panels = el.querySelectorAll('[data-p]');
      btns.forEach((b) => {
        b.onclick = () => {
          btns.forEach((x) => x.classList.remove('active'));
          b.classList.add('active');
          panels.forEach((p) => (p.hidden = p.dataset.p !== b.dataset.i));
        };
      });
      return;
    }
    if (d === 'web_fetch') {
      el.innerHTML = `<button type="button" class="ui-btn" id="wf">请求演示</button><pre class="demo-code" id="wfo" style="margin-top:8px">点击发起…</pre>`;
      el.querySelector('#wf').onclick = async () => {
        const o = el.querySelector('#wfo');
        o.textContent = 'loading…';
        try {
          const r = await fetch('https://jsonplaceholder.typicode.com/todos/1');
          o.textContent = JSON.stringify(await r.json(), null, 2);
        } catch (e) {
          o.textContent = String(e);
        }
      };
      return;
    }
    if (d === 'web_list') {
      el.innerHTML = `<ul class="list-demo"><li>Item A</li><li>Item B</li><li>Item C</li></ul>`;
      return;
    }
    if (d === 'web_progress') {
      el.innerHTML = `<div class="progress"><span style="width:40%"></span></div><input type="range" value="40" style="width:100%;margin-top:10px" id="wr"><div id="wrt" style="font-size:12px;color:#64748b">40%</div>`;
      el.querySelector('#wr').oninput = (e) => {
        el.querySelector('.progress > span').style.width = e.target.value + '%';
        el.querySelector('#wrt').textContent = e.target.value + '%';
      };
      return;
    }

    // —— iOS-like mocks ——
    if (d === 'ios_view') {
      el.innerHTML = `<div class="mock-ios"><div class="ios-box"></div><p class="ios-cap">UIView · cornerRadius</p></div>`;
      return;
    }
    if (d === 'ios_label') {
      el.innerHTML = `<div class="mock-ios"><p style="font-size:17px">Hello UILabel / Text</p><p class="ios-cap">动态字体 · numberOfLines</p></div>`;
      return;
    }
    if (d === 'ios_button') {
      el.innerHTML = `<div class="mock-ios"><button type="button" class="ios-btn">确认</button></div>`;
      el.querySelector('button').onclick = () => toast('UIButton / SwiftUI Button');
      return;
    }
    if (d === 'ios_image') {
      el.innerHTML = `<div class="mock-ios"><div class="ios-img">🖼</div><p class="ios-cap">UIImageView · aspectFill</p></div>`;
      return;
    }
    if (d === 'ios_field') {
      el.innerHTML = `<div class="mock-ios"><input class="ios-field" placeholder="请输入"></div>`;
      return;
    }
    if (d === 'ios_switch') {
      el.innerHTML = `<div class="mock-ios row" style="justify-content:space-between;align-items:center"><span>推送通知</span><button type="button" class="switch on" id="isw"><i></i></button></div>`;
      const sw = el.querySelector('#isw');
      sw.onclick = () => sw.classList.toggle('on');
      return;
    }
    if (d === 'ios_slider') {
      el.innerHTML = `<div class="mock-ios"><input type="range" style="width:100%" value="40"><p class="ios-cap">UISlider / ProgressView</p></div>`;
      return;
    }
    if (d === 'ios_segment') {
      el.innerHTML = `<div class="mock-ios"><div class="ios-seg"><span class="on">日</span><span>周</span><span>月</span></div></div>`;
      el.querySelectorAll('.ios-seg span').forEach((s) => {
        s.onclick = () => {
          el.querySelectorAll('.ios-seg span').forEach((x) => x.classList.remove('on'));
          s.classList.add('on');
        };
      });
      return;
    }
    if (d === 'ios_stack') {
      el.innerHTML = `<div class="mock-ios"><div class="flex-demo"><div>A</div><div>B</div><div>C</div></div><p class="ios-cap">UIStackView / HStack</p></div>`;
      return;
    }
    if (d === 'ios_table') {
      el.innerHTML = `<div class="mock-ios"><div class="mock-list ios-list">${['收件箱','已发送','草稿箱'].map((t)=>`<div class="mock-li"><span>${t}</span><span style="color:#c7c7cc">›</span></div>`).join('')}</div><p class="ios-cap">UITableView / List</p></div>`;
      return;
    }
    if (d === 'ios_collection') {
      el.innerHTML = `<div class="mock-ios"><div class="mock-grid">${['1','2','3','4'].map((t)=>`<div class="mock-cell ios-cell">${t}</div>`).join('')}</div><p class="ios-cap">UICollectionView / LazyVGrid</p></div>`;
      return;
    }
    if (d === 'ios_nav') {
      el.innerHTML = `<div class="mock-ios"><div class="ios-nav"><span style="color:#007aff">‹ 返回</span><b>详情</b><span></span></div><div style="padding:16px;font-size:14px;color:#64748b">Navigation 内容区</div></div>`;
      return;
    }
    if (d === 'ios_tab') {
      el.innerHTML = `<div class="mock-ios"><div style="min-height:70px;display:flex;align-items:center;justify-content:center;color:#64748b">首页</div><div class="ios-tabbar"><span class="on">首页</span><span>我的</span></div></div>`;
      return;
    }
    if (d === 'ios_alert') {
      el.innerHTML = `<div class="mock-ios"><button type="button" class="ios-btn" id="ial">弹出 Alert</button><div id="iab" hidden style="margin-top:12px;background:rgba(255,255,255,.95);border-radius:14px;padding:14px;text-align:center;border:1px solid #e5e7eb"><b>提示</b><p style="font-size:13px;margin:8px 0;color:#64748b">确认删除？</p><button type="button" class="ios-btn" id="iao">删除</button></div></div>`;
      el.querySelector('#ial').onclick = () => (el.querySelector('#iab').hidden = false);
      el.querySelector('#iao').onclick = () => {
        el.querySelector('#iab').hidden = true;
        toast('已删除（示意）');
      };
      return;
    }
    if (d === 'ios_web') {
      el.innerHTML = `<div class="mock-ios"><div style="border:1px solid #e5e7eb;border-radius:10px;padding:20px;text-align:center;background:#f8fafc">WKWebView<br><small style="color:#94a3b8">example.com</small></div></div>`;
      return;
    }

    el.innerHTML = `<p style="color:#94a3b8;font-size:13px">暂无演示：${d}</p>`;
  }

  global.WidgetUI = { thumbHtml, mountDemo };
})(window);
