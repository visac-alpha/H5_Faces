/**
 * 三端控件目录（Flutter Widget / H5 DOM / iOS UIKit·SwiftUI）
 * thumb: 列表缩略示意类型
 * demo: 详情页演示类型
 */
window.WIDGETS = {
  flutter: [
    {
      id: 'text',
      title: 'Text',
      subtitle: 'Text / RichText',
      category: '基础',
      language: 'Dart',
      thumb: 'text',
      demo: 'fl_text',
      usage: '展示文本；style、maxLines、overflow；RichText 做多样式。',
      code: `Text(
  'Hello Flutter',
  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
  maxLines: 1,
  overflow: TextOverflow.ellipsis,
)`,
    },
    {
      id: 'container',
      title: 'Container',
      subtitle: '装饰与约束',
      category: '基础',
      language: 'Dart',
      thumb: 'box',
      demo: 'fl_container',
      usage: 'padding/margin/decoration/constraints；别滥用套太多层。',
      code: `Container(
  padding: EdgeInsets.all(12),
  decoration: BoxDecoration(
    color: Colors.teal.shade50,
    borderRadius: BorderRadius.circular(12),
  ),
  child: Text('Container'),
)`,
    },
    {
      id: 'row_column',
      title: 'Row / Column',
      subtitle: '线性布局',
      category: '布局',
      language: 'Dart',
      thumb: 'row',
      demo: 'fl_row',
      usage: '主轴/交叉轴对齐；子项过多用 Expanded，防溢出。',
      code: `Row(
  children: [
    Icon(Icons.star),
    SizedBox(width: 8),
    Expanded(child: Text('标题文字')),
  ],
)`,
    },
    {
      id: 'expanded',
      title: 'Expanded',
      subtitle: 'Expanded / Flexible / Spacer',
      category: '布局',
      language: 'Dart',
      thumb: 'expanded',
      demo: 'fl_expanded',
      usage: '在 Flex 里分配剩余空间；Flexible 可不全占满。',
      code: `Row(
  children: [
    Expanded(flex: 2, child: Container(height: 40, color: Colors.teal)),
    Expanded(flex: 1, child: Container(height: 40, color: Colors.orange)),
  ],
)`,
    },
    {
      id: 'stack',
      title: 'Stack',
      subtitle: '层叠与 Positioned',
      category: '布局',
      language: 'Dart',
      thumb: 'stack',
      demo: 'fl_stack',
      usage: '角标、叠图；Positioned 相对 Stack 定位。',
      code: `Stack(
  children: [
    Container(width: 120, height: 80, color: Colors.teal),
    Positioned(
      right: 4, top: 4,
      child: CircleAvatar(radius: 8, backgroundColor: Colors.red),
    ),
  ],
)`,
    },
    {
      id: 'align_padding',
      title: 'Align / Padding',
      subtitle: 'Align / Padding / SafeArea',
      category: '布局',
      language: 'Dart',
      thumb: 'align',
      demo: 'fl_align',
      usage: '对齐与内边距；SafeArea 避开刘海与 Home 条。',
      code: `SafeArea(
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Align(
      alignment: Alignment.centerRight,
      child: Text('右对齐'),
    ),
  ),
)`,
    },
    {
      id: 'image_icon',
      title: 'Image / Icon',
      subtitle: 'Image / Icon / CircleAvatar',
      category: '基础',
      language: 'Dart',
      thumb: 'image',
      demo: 'fl_image',
      usage: '网络图注意缓存与占位；Icon 用 Icons / 自定义字体。',
      code: `Row(
  children: [
    Icon(Icons.home, color: Colors.teal),
    SizedBox(width: 8),
    CircleAvatar(child: Text('A')),
  ],
)`,
    },
    {
      id: 'button',
      title: 'Button',
      subtitle: 'Elevated / Outlined / Text / FAB',
      category: '输入',
      language: 'Dart',
      thumb: 'button',
      demo: 'fl_button',
      usage: '按场景选按钮类型；禁用态与 loading 要处理。',
      code: `ElevatedButton(
  onPressed: () {},
  child: Text('Elevated'),
)
OutlinedButton(onPressed: () {}, child: Text('Outlined'))
TextButton(onPressed: () {}, child: Text('Text'))`,
    },
    {
      id: 'textfield',
      title: 'TextField',
      subtitle: 'TextField / TextFormField',
      category: '输入',
      language: 'Dart',
      thumb: 'input',
      demo: 'fl_input',
      usage: '配合 TextEditingController；表单用 Form + validator。',
      code: `TextField(
  decoration: InputDecoration(
    labelText: '用户名',
    border: OutlineInputBorder(),
  ),
)`,
    },
    {
      id: 'form_controls',
      title: '表单控件',
      subtitle: 'Checkbox / Radio / Switch / Slider',
      category: '输入',
      language: 'Dart',
      thumb: 'form',
      demo: 'fl_form',
      usage: '受控组件：value + onChanged；与 Form 校验联动。',
      code: `Switch(
  value: on,
  onChanged: (v) => setState(() => on = v),
)
Slider(
  value: progress,
  onChanged: (v) => setState(() => progress = v),
)`,
    },
    {
      id: 'listview',
      title: 'ListView',
      subtitle: 'builder / separated',
      category: '滚动',
      language: 'Dart',
      thumb: 'list',
      demo: 'fl_list',
      usage: '长列表用 builder；separated 做分割线。',
      code: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (_, i) => ListTile(
    title: Text(items[i]),
  ),
)`,
    },
    {
      id: 'gridview',
      title: 'GridView',
      subtitle: 'count / extent / builder',
      category: '滚动',
      language: 'Dart',
      thumb: 'grid',
      demo: 'fl_grid',
      usage: '宫格列表；固定列数用 count，按宽用 extent。',
      code: `GridView.count(
  crossAxisCount: 2,
  mainAxisSpacing: 8,
  crossAxisSpacing: 8,
  children: [
    for (final e in items)
      Card(child: Center(child: Text(e))),
  ],
)`,
    },
    {
      id: 'sliver',
      title: 'Scroll / Sliver',
      subtitle: 'CustomScrollView',
      category: '滚动',
      language: 'Dart',
      thumb: 'sliver',
      demo: 'fl_sliver',
      usage: '多 sliver 组合吸顶头部+列表；比嵌套 ListView 更稳。',
      code: `CustomScrollView(
  slivers: [
    SliverAppBar(pinned: true, title: Text('Title')),
    SliverList(delegate: SliverChildBuilderDelegate(...)),
  ],
)`,
    },
    {
      id: 'pageview',
      title: 'PageView',
      subtitle: '轮播 / 分页',
      category: '滚动',
      language: 'Dart',
      thumb: 'page',
      demo: 'fl_page',
      usage: '整页滑动；配合 PageController 与指示点。',
      code: `PageView(
  controller: controller,
  children: [
    KeepAlivePage(color: Colors.teal),
    KeepAlivePage(color: Colors.orange),
  ],
)`,
    },
    {
      id: 'refresh',
      title: 'RefreshIndicator',
      subtitle: '下拉刷新',
      category: '滚动',
      language: 'Dart',
      thumb: 'refresh',
      demo: 'fl_refresh',
      usage: 'onRefresh 返回 Future；上拉加载另做 ScrollController。',
      code: `RefreshIndicator(
  onRefresh: () async => await reload(),
  child: ListView.builder(...),
)`,
    },
    {
      id: 'gesture',
      title: '手势',
      subtitle: 'GestureDetector / InkWell',
      category: '交互',
      language: 'Dart',
      thumb: 'gesture',
      demo: 'fl_gesture',
      usage: '点击/长按/拖拽；Material 水波用 InkWell。',
      code: `InkWell(
  onTap: () {},
  child: Padding(
    padding: EdgeInsets.all(12),
    child: Text('点我'),
  ),
)`,
    },
    {
      id: 'dialog',
      title: 'Dialog',
      subtitle: 'Alert / BottomSheet',
      category: '反馈',
      language: 'Dart',
      thumb: 'dialog',
      demo: 'fl_dialog',
      usage: 'showDialog / showModalBottomSheet；注意 barrier 与返回。',
      code: `showDialog(
  context: context,
  builder: (_) => AlertDialog(
    title: Text('提示'),
    content: Text('确认提交？'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: Text('取消')),
      TextButton(onPressed: () => Navigator.pop(context, true), child: Text('确定')),
    ],
  ),
)`,
    },
    {
      id: 'snackbar',
      title: 'SnackBar / Tooltip',
      subtitle: '轻提示',
      category: '反馈',
      language: 'Dart',
      thumb: 'toast',
      demo: 'fl_snack',
      usage: 'ScaffoldMessenger.showSnackBar；Tooltip 长按/悬停说明。',
      code: `ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(content: Text('已保存')),
)`,
    },
    {
      id: 'nav',
      title: '导航结构',
      subtitle: 'Drawer / TabBar / NavigationBar',
      category: '结构',
      language: 'Dart',
      thumb: 'nav',
      demo: 'fl_nav',
      usage: 'Scaffold 抽屉与底部导航；IndexedStack 保活页面。',
      code: `Scaffold(
  drawer: Drawer(child: ListView(...)),
  bottomNavigationBar: NavigationBar(
    selectedIndex: index,
    onDestinationSelected: (i) => setState(() => index = i),
    destinations: [...],
  ),
)`,
    },
    {
      id: 'card_chip',
      title: 'Card / Chip',
      subtitle: 'Card / ListTile / Chip',
      category: '基础',
      language: 'Dart',
      thumb: 'card',
      demo: 'fl_card',
      usage: '信息块与标签；ExpansionTile 可折叠。',
      code: `Card(
  child: ListTile(
    title: Text('标题'),
    subtitle: Text('副标题'),
    trailing: Chip(label: Text('标签')),
  ),
)`,
    },
    {
      id: 'progress',
      title: 'Progress',
      subtitle: 'Circular / Linear',
      category: '反馈',
      language: 'Dart',
      thumb: 'progress',
      demo: 'fl_progress',
      usage: '不确定进度用 indeterminate；确定进度传 value。',
      code: `CircularProgressIndicator()
LinearProgressIndicator(value: 0.4)`,
    },
    {
      id: 'async_builder',
      title: '异步 Builder',
      subtitle: 'FutureBuilder / StreamBuilder',
      category: '异步',
      language: 'Dart',
      thumb: 'async',
      demo: 'fl_async',
      usage: 'future/stream 要稳定存放，避免每次 build 新建。',
      code: `FutureBuilder<String>(
  future: _future,
  builder: (context, snap) {
    if (!snap.hasData) return CircularProgressIndicator();
    return Text(snap.data!);
  },
)`,
    },
    {
      id: 'animation',
      title: 'Animation',
      subtitle: 'AnimatedContainer / Hero',
      category: '动画',
      language: 'Dart',
      thumb: 'anim',
      demo: 'fl_anim',
      usage: '隐式动画改属性即可；Hero 跨页共享元素。',
      code: `AnimatedContainer(
  duration: Duration(milliseconds: 300),
  width: big ? 120 : 60,
  height: 60,
  color: Colors.teal,
)`,
    },
    {
      id: 'picker',
      title: 'Picker',
      subtitle: 'DatePicker / TimePicker',
      category: '输入',
      language: 'Dart',
      thumb: 'picker',
      demo: 'fl_picker',
      usage: 'showDatePicker / showTimePicker；注意本地化。',
      code: `final date = await showDatePicker(
  context: context,
  initialDate: DateTime.now(),
  firstDate: DateTime(2020),
  lastDate: DateTime(2030),
)`,
    },
    {
      id: 'layout_query',
      title: '布局查询',
      subtitle: 'MediaQuery / LayoutBuilder',
      category: '布局',
      language: 'Dart',
      thumb: 'query',
      demo: 'fl_query',
      usage: '读屏宽与约束做响应式；避免无必要整树依赖 MediaQuery。',
      code: `LayoutBuilder(
  builder: (context, c) {
    final wide = c.maxWidth > 600;
    return wide ? Row(...) : Column(...);
  },
)`,
    },
  ],

  web: [
    {
      id: 'button',
      title: 'button',
      subtitle: '按钮',
      category: '表单',
      language: 'HTML',
      thumb: 'button',
      demo: 'web_button',
      usage: '用 button 做操作；a 做跳转。',
      code: `<button class="btn">提交</button>
<button class="btn outline">取消</button>`,
    },
    {
      id: 'input',
      title: 'input / textarea',
      subtitle: '输入框',
      category: '表单',
      language: 'HTML',
      thumb: 'input',
      demo: 'web_input',
      usage: 'label 关联控件；注意 type 与校验。',
      code: `<label>昵称
  <input name="name" placeholder="请输入">
</label>
<textarea rows="3" placeholder="简介"></textarea>`,
    },
    {
      id: 'select',
      title: 'select',
      subtitle: '下拉选择',
      category: '表单',
      language: 'HTML',
      thumb: 'form',
      demo: 'web_select',
      usage: '简单枚举用原生 select。',
      code: `<select>
  <option>ERC20</option>
  <option>TRC20</option>
</select>`,
    },
    {
      id: 'checkbox_radio',
      title: 'checkbox / radio',
      subtitle: '多选 / 单选',
      category: '表单',
      language: 'HTML',
      thumb: 'form',
      demo: 'web_check',
      usage: 'radio 同 name 成组。',
      code: `<label><input type="checkbox"> 记住我</label>
<label><input type="radio" name="pay"> 微信</label>`,
    },
    {
      id: 'flex',
      title: 'Flexbox',
      subtitle: 'display:flex',
      category: '布局',
      language: 'CSS',
      thumb: 'row',
      demo: 'web_flex',
      usage: '一维布局；justify-content / align-items / flex。',
      code: `.row { display: flex; gap: 8px; }
.row > * { flex: 1; }`,
    },
    {
      id: 'grid',
      title: 'CSS Grid',
      subtitle: 'display:grid',
      category: '布局',
      language: 'CSS',
      thumb: 'grid',
      demo: 'web_grid',
      usage: '二维网格；宫格入口、相册。',
      code: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}`,
    },
    {
      id: 'modal',
      title: 'Modal',
      subtitle: '弹层',
      category: '反馈',
      language: 'JS',
      thumb: 'dialog',
      demo: 'web_modal',
      usage: '遮罩 + 居中卡片；点遮罩关闭。',
      code: `mask.classList.add('show')
mask.addEventListener('click', e => {
  if (e.target === mask) mask.classList.remove('show')
})`,
    },
    {
      id: 'toast',
      title: 'Toast',
      subtitle: '轻提示',
      category: '反馈',
      language: 'JS',
      thumb: 'toast',
      demo: 'web_toast',
      usage: '短暂提示，不打断操作。',
      code: `function toast(msg) {
  el.textContent = msg
  el.classList.add('show')
  setTimeout(() => el.classList.remove('show'), 1600)
}`,
    },
    {
      id: 'tabs',
      title: 'Tabs',
      subtitle: '标签页',
      category: '导航',
      language: 'JS',
      thumb: 'nav',
      demo: 'web_tabs',
      usage: '切换面板；可配合路由。',
      code: `btn.onclick = () => {
  panels.forEach(p => p.hidden = true)
  target.hidden = false
}`,
    },
    {
      id: 'fetch',
      title: 'Fetch',
      subtitle: '网络请求',
      category: '网络',
      language: 'JS',
      thumb: 'async',
      demo: 'web_fetch',
      usage: 'async/await + 错误处理。',
      code: `const res = await fetch(url)
const data = await res.json()`,
    },
    {
      id: 'list',
      title: 'List',
      subtitle: '列表渲染',
      category: '结构',
      language: 'JS',
      thumb: 'list',
      demo: 'web_list',
      usage: 'map 渲染；长列表考虑虚拟列表。',
      code: `ul.innerHTML = items.map(i =>
  \`<li>\${i}</li>\`
).join('')`,
    },
    {
      id: 'progress',
      title: 'Progress / Range',
      subtitle: '进度与滑杆',
      category: '表单',
      language: 'HTML',
      thumb: 'progress',
      demo: 'web_progress',
      usage: 'progress 展示；range 调节。',
      code: `<progress value="40" max="100"></progress>
<input type="range" min="0" max="100" value="40">`,
    },
  ],

  ios: [
    {
      id: 'uiview',
      title: 'UIView',
      subtitle: '根视图 / 图层',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'box',
      demo: 'ios_view',
      usage: '所有控件基类；优先 Auto Layout。',
      code: `let box = UIView()
box.backgroundColor = .systemTeal
box.layer.cornerRadius = 8
box.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(box)`,
    },
    {
      id: 'uilabel',
      title: 'UILabel',
      subtitle: '文本',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'text',
      demo: 'ios_label',
      usage: 'numberOfLines、动态字体。',
      code: `let label = UILabel()
label.text = "Hello"
label.font = .preferredFont(forTextStyle: .body)
label.numberOfLines = 0`,
    },
    {
      id: 'uibutton',
      title: 'UIButton',
      subtitle: '按钮',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'button',
      demo: 'ios_button',
      usage: 'addTarget 或 UIAction；配置 configuration。',
      code: `let btn = UIButton(type: .system)
btn.setTitle("确认", for: .normal)
btn.addAction(UIAction { _ in }, for: .touchUpInside)`,
    },
    {
      id: 'uiimageview',
      title: 'UIImageView',
      subtitle: '图片',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'image',
      demo: 'ios_image',
      usage: 'contentMode；大图注意解码与缓存。',
      code: `let iv = UIImageView(image: UIImage(systemName: "photo"))
iv.contentMode = .scaleAspectFill
iv.clipsToBounds = true`,
    },
    {
      id: 'uitextfield',
      title: 'UITextField',
      subtitle: '单行输入',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'input',
      demo: 'ios_field',
      usage: 'delegate / 键盘类型 / 回车键。',
      code: `let tf = UITextField()
tf.placeholder = "请输入"
tf.borderStyle = .roundedRect
tf.keyboardType = .default`,
    },
    {
      id: 'uiswitch',
      title: 'UISwitch',
      subtitle: '开关',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'form',
      demo: 'ios_switch',
      usage: 'isOn + valueChanged。',
      code: `let sw = UISwitch()
sw.addAction(UIAction { _ in
  print(sw.isOn)
}, for: .valueChanged)`,
    },
    {
      id: 'uislider',
      title: 'UISlider',
      subtitle: '滑杆',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'progress',
      demo: 'ios_slider',
      usage: 'value、minimumValue、maximumValue。',
      code: `let slider = UISlider()
slider.minimumValue = 0
slider.maximumValue = 1
slider.value = 0.4`,
    },
    {
      id: 'uisegment',
      title: 'UISegmentedControl',
      subtitle: '分段控件',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'nav',
      demo: 'ios_segment',
      usage: '多选一的分段切换。',
      code: `let seg = UISegmentedControl(items: ["日", "周", "月"])
seg.selectedSegmentIndex = 0`,
    },
    {
      id: 'uistack',
      title: 'UIStackView',
      subtitle: '线性堆叠',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'row',
      demo: 'ios_stack',
      usage: 'axis、spacing、distribution；替代手写一排约束。',
      code: `let stack = UIStackView(arrangedSubviews: [a, b, c])
stack.axis = .horizontal
stack.spacing = 8
stack.distribution = .fillEqually`,
    },
    {
      id: 'uitableview',
      title: 'UITableView',
      subtitle: '列表',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'list',
      demo: 'ios_table',
      usage: '复用 cell；diffable 数据源更现代。',
      code: `tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
  cell.textLabel?.text = items[indexPath.row]
  return cell
}`,
    },
    {
      id: 'uicollection',
      title: 'UICollectionView',
      subtitle: '网格 / 自定义布局',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'grid',
      demo: 'ios_collection',
      usage: 'FlowLayout / CompositionalLayout。',
      code: `let layout = UICollectionViewFlowLayout()
layout.itemSize = CGSize(width: 100, height: 100)
let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)`,
    },
    {
      id: 'uinav',
      title: 'UINavigationController',
      subtitle: '导航栈',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'nav',
      demo: 'ios_nav',
      usage: 'push/pop；大标题与返回手势。',
      code: `let nav = UINavigationController(rootViewController: home)
nav.pushViewController(detail, animated: true)`,
    },
    {
      id: 'uitab',
      title: 'UITabBarController',
      subtitle: '底部 Tab',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'nav',
      demo: 'ios_tab',
      usage: '多根控制器；badge 提示。',
      code: `let tab = UITabBarController()
home.tabBarItem = UITabBarItem(title: "首页", image: UIImage(systemName: "house"), tag: 0)
tab.viewControllers = [home, mine]`,
    },
    {
      id: 'uialert',
      title: 'UIAlertController',
      subtitle: '弹窗 / ActionSheet',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'dialog',
      demo: 'ios_alert',
      usage: 'alert 与 actionSheet；destructive 样式。',
      code: `let alert = UIAlertController(title: "提示", message: "确认删除？", preferredStyle: .alert)
alert.addAction(UIAlertAction(title: "取消", style: .cancel))
alert.addAction(UIAlertAction(title: "删除", style: .destructive))
present(alert, animated: true)`,
    },
    {
      id: 'wkwebview',
      title: 'WKWebView',
      subtitle: '内嵌网页',
      category: 'UIKit',
      language: 'Swift',
      thumb: 'async',
      demo: 'ios_web',
      usage: 'JS 桥、进度、白屏与缓存策略。',
      code: `let web = WKWebView(frame: .zero)
web.load(URLRequest(url: URL(string: "https://example.com")!))`,
    },
    {
      id: 'sui_text',
      title: 'SwiftUI Text',
      subtitle: '文本',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'text',
      demo: 'ios_label',
      usage: '修饰符链式；动态字体。',
      code: `Text("Hello")
  .font(.headline)
  .foregroundStyle(.primary)
  .lineLimit(2)`,
    },
    {
      id: 'sui_button',
      title: 'SwiftUI Button',
      subtitle: '按钮',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'button',
      demo: 'ios_button',
      usage: 'Button / role / buttonStyle。',
      code: `Button("确认") { submit() }
  .buttonStyle(.borderedProminent)`,
    },
    {
      id: 'sui_list',
      title: 'SwiftUI List',
      subtitle: '列表',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'list',
      demo: 'ios_table',
      usage: '数据驱动；id 要稳定。',
      code: `List(items) { item in
  NavigationLink(item.title) {
    DetailView(item: item)
  }
}`,
    },
    {
      id: 'sui_grid',
      title: 'SwiftUI LazyVGrid',
      subtitle: '网格',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'grid',
      demo: 'ios_collection',
      usage: 'GridItem 定义列；懒加载。',
      code:
        'let cols = [GridItem(.flexible()), GridItem(.flexible())]\n' +
        'LazyVGrid(columns: cols, spacing: 8) {\n' +
        '  ForEach(items) { Text($0) }\n' +
        '}',
    },
    {
      id: 'sui_stack',
      title: 'SwiftUI Stack',
      subtitle: 'HStack / VStack / ZStack',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'stack',
      demo: 'ios_stack',
      usage: '线性与层叠；Spacer 撑开。',
      code: `HStack {
  Text("左")
  Spacer()
  Text("右")
}`,
    },
    {
      id: 'sui_nav',
      title: 'SwiftUI NavigationStack',
      subtitle: '导航',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'nav',
      demo: 'ios_nav',
      usage: '值驱动导航；path 可绑定。',
      code:
        'NavigationStack {\n' +
        '  List(items) { item in\n' +
        '    NavigationLink(value: item) { Text(item.title) }\n' +
        '  }\n' +
        '  .navigationDestination(for: Item.self) { Detail($0) }\n' +
        '}',
    },
    {
      id: 'sui_tab',
      title: 'SwiftUI TabView',
      subtitle: '标签页',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'nav',
      demo: 'ios_tab',
      usage: 'tabItem；可做分页轮播。',
      code: `TabView {
  HomeView().tabItem { Label("首页", systemImage: "house") }
  MineView().tabItem { Label("我的", systemImage: "person") }
}`,
    },
    {
      id: 'sui_toggle',
      title: 'SwiftUI Toggle',
      subtitle: '开关',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'form',
      demo: 'ios_switch',
      usage: 'Binding。',
      code: '@State private var on = true\nToggle("推送", isOn: $on)',
    },
    {
      id: 'sui_progress',
      title: 'SwiftUI ProgressView',
      subtitle: '进度 / 转圈',
      category: 'SwiftUI',
      language: 'Swift',
      thumb: 'progress',
      demo: 'ios_slider',
      usage: '不确定与确定进度。',
      code: `ProgressView()
ProgressView(value: 0.4)`,
    },
  ],
};
