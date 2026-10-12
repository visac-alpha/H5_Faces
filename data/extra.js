/**
 * 额外知识点与面试题（在 catalog 之上合并）
 * 平台: flutter | web | ios
 */
window.EXTRA = {
  flutter: {
    knowledge: [
      {
        category: 'Flutter 入门',
        question: 'Widget / Element / RenderObject 三棵树分别干什么？',
        answer:
          'Widget：配置描述，轻量可重建。\n' +
          'Element：Widget 在树上的实例，负责挂载、更新、与 RenderObject 关联。\n' +
          'RenderObject：真正布局与绘制。\n' +
          'setState 后会重建 Widget，Element 尽量复用，只在类型/Key 变化时换掉。',
        code: 'setState(() => count++); // 重建 Widget，Element/RenderObject 尽量复用',
        kind: 'knowledge',
      },
      {
        category: 'Flutter 入门',
        question: 'StatelessWidget 和 StatefulWidget 怎么选？',
        answer:
          '无内部可变状态用 Stateless；需要随交互/异步变化用 Stateful（或外部状态管理）。\n' +
          '现代项目更多把状态上提或用 Provider/Riverpod/GetX，页面本身可保持偏「展示」。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'Flutter 入门',
        question: 'BuildContext 是什么？为什么不能在 initState 里直接用依赖它的东西？',
        answer:
          'BuildContext 代表 Element 在树上的位置，用来找 InheritedWidget、Navigator、Theme 等。\n' +
          'initState 时该 Element 可能还未完全挂到树上，访问依赖祖先的东西不安全；用 addPostFrameCallback 或 didChangeDependencies。',
        code: 'WidgetsBinding.instance.addPostFrameCallback((_) {\n  // 这里再 Navigator / 读 ModalRoute\n});',
        kind: 'knowledge',
      },
      {
        category: 'Flutter 入门',
        question: 'runApp、MaterialApp、Scaffold 各负责什么？',
        answer:
          'runApp：挂上根 Widget，启动绑定。\n' +
          'MaterialApp：路由、主题、本地化等应用级配置。\n' +
          'Scaffold：单页骨架（AppBar、Body、FloatingActionButton、底部栏）。',
        code: 'void main() => runApp(const MyApp());',
        kind: 'knowledge',
      },
      {
        category: 'Flutter 入门',
        question: 'Hot Reload 和 Hot Restart 区别？',
        answer:
          'Hot Reload：尽量保留状态，注入更新后的代码，改 UI 最快。\n' +
          'Hot Restart：重启应用状态，从 main 重新跑，全局变量/静态会被重置。\n' +
          '改了 main、全局初始化、部分枚举/泛型边界时可能需要 Restart。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'Flutter 入门',
        question: 'Key 有什么用？ValueKey / ObjectKey / GlobalKey？',
        answer:
          'Key 帮助框架在 Widget 重建时识别「是不是同一个」Element。\n' +
          '列表重排、同类型兄弟切换状态时需要 Key。\n' +
          'GlobalKey 可跨树拿到 State，但贵且易滥用，优先局部 Key。',
        code: 'ListTile(key: ValueKey(item.id), title: Text(item.name))',
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: 'Future、async/await、then 的关系？',
        answer:
          'Future 表示异步结果。async 函数返回 Future；await 暂停当前函数等待完成。\n' +
          'then 是回调式链式；async/await 是语法糖，错误用 try/catch。\n' +
          '不要在 build 里直接「开火」不缓存的 Future，会反复请求。',
        code: 'Future<String> load() async {\n  final r = await api.get();\n  return r.body;\n}',
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: 'Stream 和 Future 的区别？',
        answer:
          'Future：一次结果。Stream：一连串事件（可多值）。\n' +
          '用 listen / await for；记得 cancel 订阅防泄漏。UI 侧常用 StreamBuilder。',
        code: 'final sub = stream.listen((e) => print(e));\n// dispose: sub.cancel();',
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: 'final、const、var、dynamic 怎么记？',
        answer:
          'var：推断后类型固定。dynamic：运行时可改类型，少用。\n' +
          'final：运行时赋值一次。const：编译期常量，可 canonicalization。\n' +
          '集合要编译期常量写 const [...]。',
        code: 'final now = DateTime.now();\nconst pi = 3.14;',
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: '空安全：?. ?? ! late 分别干什么？',
        answer:
          '?. 短路调用；?? 空则默认值；??= 空才赋值。\n' +
          '! 强制非空，为 null 会炸，应少用。\n' +
          'late：延迟初始化，第一次用前必须赋好。',
        code: "print(name?.length);\nprint(name ?? '匿名');",
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: '级联 .. 与扩展方法 extension？',
        answer:
          '.. 可对同一对象连续调用并仍返回原对象，适合配置。\n' +
          'extension 给已有类型加方法，不改原类源码，利于工具函数归类。',
        code: 'final p = Paint()\n  ..color = Colors.red\n  ..strokeWidth = 2;',
        kind: 'knowledge',
      },
      {
        category: 'Dart 基础',
        question: 'mixin 是做什么的？',
        answer:
          '在不使用多重继承的情况下复用实现。\n' +
          'class C extends B with A, M。注意混入顺序与成员冲突。\n' +
          'Flutter 动画里常见 SingleTickerProviderStateMixin。',
        code: 'mixin Logger {\n  void log(String m) => print(m);\n}',
        kind: 'knowledge',
      },
      {
        category: '生命周期',
        question: 'State 生命周期：initState / didChangeDependencies / dispose？',
        answer:
          'initState：创建一次，做控制器、订阅初始化。\n' +
          'didChangeDependencies：依赖 Inherited 变化时调用，也可能在 init 后立刻调。\n' +
          'dispose：释放 AnimationController、Stream 订阅、FocusNode 等，防泄漏。',
        code: '@override\nvoid dispose() {\n  _controller.dispose();\n  super.dispose();\n}',
        kind: 'knowledge',
      },
      {
        category: '生命周期',
        question: 'didUpdateWidget 什么时候触发？',
        answer:
          '父重建导致配置（widget 字段）变化时，State 复用并回调 didUpdateWidget。\n' +
          '常用于「外部传入的 id 变了要重新拉数」。\n' +
          '对比 initState：State 第一次创建才走 initState。',
        code: '@override\nvoid didUpdateWidget(OldWidget old) {\n  super.didUpdateWidget(old);\n  if (old.id != widget.id) reload();\n}',
        kind: 'knowledge',
      },
      {
        category: '生命周期',
        question: 'WidgetsBindingObserver 监听前后台？',
        answer:
          '混入观察 AppLifecycleState：resumed / inactive / paused / detached 等。\n' +
          '进后台停定时器、WS；回前台刷新。记得 dispose 里 removeObserver。',
        code: 'WidgetsBinding.instance.addObserver(this);',
        kind: 'knowledge',
      },
      {
        category: '布局',
        question: 'Row/Column 溢出怎么排查？Expanded 和 Flexible？',
        answer:
          '溢出黄黑条：子组件在主轴上要的空间超过父限制。\n' +
          'Expanded 强制吃掉剩余空间（flex）；Flexible 可按 fit 决定是否撑满。\n' +
          '文本用 Expanded + Text overflow ellipsis；列表用 ListView 而不是 Column+一堆子项。',
        code: 'Row(\n  children: [\n    Expanded(child: Text(long, overflow: TextOverflow.ellipsis)),\n  ],\n)',
        kind: 'knowledge',
      },
      {
        category: '布局',
        question: '约束向下、尺寸向上是什么意思？',
        answer:
          '父把 BoxConstraints（最小/最大宽高）传给子；子在约束内决定自己的 size，再报告给父。\n' +
          '理解后才能看懂为什么「在无界约束的 ListView 里再放 ListView」会炸。\n' +
          'UnconstrainedBox、Intrinsic 等是例外工具，慎用。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '布局',
        question: 'Stack / Positioned / Align 怎么用？',
        answer:
          'Stack 重叠布局；Positioned 相对 Stack 四边定位；Align/Alignment 做对齐。\n' +
          '未定位子项按 alignment 摆放。注意 Stack 默认 clipBehavior。',
        code: 'Stack(children: [\n  Positioned(right: 8, top: 8, child: Badge()),\n])',
        kind: 'knowledge',
      },
      {
        category: '布局',
        question: 'MediaQuery 与安全区、键盘？',
        answer:
          'MediaQuery 提供尺寸、padding、viewInsets（键盘）等。\n' +
          'SafeArea 吃掉刘海/Home 条；键盘顶起可用 viewInsets.bottom 或 Scaffold resizeToAvoidBottomInset。\n' +
          '滥用 MediaQuery.of(context) 会导致键盘变化时整树重建，可细粒度 select。',
        code: 'padding: EdgeInsets.only(\n  bottom: MediaQuery.viewInsetsOf(context).bottom,\n)',
        kind: 'knowledge',
      },
      {
        category: '布局',
        question: 'ListView.builder 和 Column+map 怎么选？',
        answer:
          '长列表必须懒加载：ListView.builder / SliverList。\n' +
          'Column+map 会一次建齐所有子项，数据多必卡。\n' +
          '嵌套滚动用 CustomScrollView + slivers，或禁止一方滚动。',
        code: 'ListView.builder(\n  itemCount: n,\n  itemBuilder: (_, i) => Tile(items[i]),\n)',
        kind: 'knowledge',
      },
      {
        category: '状态管理',
        question: 'Provider / Riverpod / Bloc / GetX 分别适合什么场景？',
        answer:
          'Provider：简单依赖注入 + 通知，入门友好。\n' +
          'Riverpod：编译期安全、测试友好，推荐新项目。\n' +
          'Bloc：事件→状态流，适合复杂流程、要可追溯。\n' +
          'GetX：路由+状态+DI 一体，快但要自律，避免全局滥用。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '状态管理',
        question: 'setState 的边界：什么时候不该用？',
        answer:
          '只影响局部 UI 的短暂状态可以用。\n' +
          '跨页共享、复杂业务、要测试的状态应上提或进状态库。\n' +
          '大范围 setState 会重建大子树，可拆 Widget 或用更细粒度方案。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '状态管理',
        question: 'InheritedWidget 解决什么问题？',
        answer:
          '向下高效共享数据；子通过 dependOnInheritedWidgetOfExactType 注册依赖，变了才重建。\n' +
          'Theme、MediaQuery、Provider 底层都相关。\n' +
          '自己写时注意 updateShouldNotify。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '状态管理',
        question: 'ValueNotifier / ChangeNotifier 区别？',
        answer:
          'ValueNotifier：单一值变化通知。\n' +
          'ChangeNotifier：可多字段，调用 notifyListeners。\n' +
          '配合 ValueListenableBuilder / AnimatedBuilder / Provider 的 ChangeNotifierProvider。记得 dispose。',
        code: 'final counter = ValueNotifier<int>(0);\ncounter.value++;',
        kind: 'knowledge',
      },
      {
        category: '路由导航',
        question: 'Navigator push / pop / 命名路由？',
        answer:
          '命令式：Navigator.push(MaterialPageRoute(...))。\n' +
          '命名路由：routes / onGenerateRoute，便于统一拦截。\n' +
          '需要返回值用 push 的 Future；pop(result)。',
        code: "Navigator.of(context).pushNamed('/detail', arguments: id);",
        kind: 'knowledge',
      },
      {
        category: '路由导航',
        question: 'go_router / 声明式路由解决什么？',
        answer:
          '用配置描述路径与栈，利于深链、Web URL、重定向（未登录）。\n' +
          '比满屏 imperative push 更好维护。\n' +
          '注意与状态管理配合做 refreshListenable。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '路由与混合',
        question: 'FlutterBoost / 混合栈要记住什么？',
        answer:
          'Native 与 Flutter 页面互相打开时，栈由混合框架协调。\n' +
          '注意：容器生命周期、返回手势、Channel 传登录态/主题、冷启动 Deep Link 等初始化完成后再跳转。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '路由与混合',
        question: 'MethodChannel / EventChannel / BasicMessageChannel？',
        answer:
          'MethodChannel：一次调用一次结果（最常用）。\n' +
          'EventChannel：Native 持续推事件（传感器流）。\n' +
          'BasicMessageChannel：双向消息，可自定义 codec。注意线程与类型编解码。',
        code: "const ch = MethodChannel('app/theme');\nfinal map = await ch.invokeMethod('getTheme');",
        kind: 'knowledge',
      },
      {
        category: '异步与并发',
        question: '事件循环：微任务与事件队列？',
        answer:
          'Dart 单 Isolate 里：同步代码 → 微任务队列 → 事件队列（Timer、IO、帧回调）。\n' +
          'scheduleMicrotask / Future.then 偏微任务；Future.delayed 进事件队列。\n' +
          '理解后能解释「为什么 then 比 delayed(0) 早」。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '异步与并发',
        question: 'Isolate / compute 用在什么场景？',
        answer:
          '重 CPU 别堵 UI isolate：大 JSON、压缩、加解密。\n' +
          'compute / Isolate.run 适合一次性；长驻后台用独立 Isolate。\n' +
          '只能传可发送对象；不能在里头碰 UI。',
        code: 'final data = await Isolate.run(() => jsonDecode(text));',
        kind: 'knowledge',
      },
      {
        category: '异步与并发',
        question: 'FutureBuilder / StreamBuilder 注意点？',
        answer:
          'future/stream 参数要稳定，不要每次 build 新建，否则反复加载。\n' +
          '处理 waiting / error / data 三态；切换页面注意取消。\n' +
          '复杂场景更宜状态管理 + 仓库层。',
        code: 'FutureBuilder(\n  future: _future, // 存在 State 里\n  builder: ...\n)',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'dio / http 封装一般放什么？',
        answer:
          'BaseUrl、Header、超时、拦截器（token、日志、401）、错误模型。\n' +
          '取消用 CancelToken；文件上传下载进度回调。\n' +
          '业务码与 HTTP 状态码分层处理。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'shared_preferences / secure_storage / 本地 DB？',
        answer:
          'shared_preferences：小配置。\n' +
          'flutter_secure_storage：token 等敏感信息。\n' +
          '结构化大数据用 sqflite / drift / hive / isar 等。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'json_serializable 与手动 fromJson？',
        answer:
          '代码生成减少样板与字段遗漏；改模型要 build_runner。\n' +
          '脏数据、多态列表有时仍需自定义转换。\n' +
          '大 JSON 解码可放到 isolate。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '绘制与动画',
        question: 'AnimationController 基础概念？',
        answer:
          '需要 Ticker（常 mixin SingleTickerProviderStateMixin）。\n' +
          'duration + vsync；listen 或 AnimatedBuilder；dispose 必须释放。\n' +
          'CurvedAnimation、Tween 描述曲线与数值映射。',
        code: '_controller = AnimationController(\n  vsync: this,\n  duration: const Duration(milliseconds: 300),\n);',
        kind: 'knowledge',
      },
      {
        category: '绘制与动画',
        question: 'Hero、隐式动画、显式动画怎么区分？',
        answer:
          '隐式：AnimatedContainer 等，改属性自动过渡。\n' +
          '显式：自己掌控 Controller。\n' +
          'Hero：共享元素跨路由飞行，tag 要唯一对应。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '绘制与动画',
        question: 'CustomPaint / Canvas 什么时候用？',
        answer:
          '图表、特殊形状、轻量自绘。\n' +
          'Paint 在 shouldRepaint 里比较参数，避免无意义重绘。\n' +
          '复杂场景考虑做一层缓存或用现成图表库。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '性能',
        question: 'const 构造与拆分 Widget 为什么能优化？',
        answer:
          'const Widget 在重建时可直接复用，减少创建与 diff。\n' +
          '拆成更小子 Widget，父 setState 时未变子树可跳过。\n' +
          '列表 item 尽量无副作用、可 const 的部分拆出去。',
        code: 'const Text("标题");',
        kind: 'knowledge',
      },
      {
        category: '性能',
        question: 'RepaintBoundary 是干什么的？',
        answer:
          '把重绘范围隔开，昂贵子树脏了不一定带动整屏。\n' +
          '适合复杂动画、常变小区域。\n' +
          '不是越多越好，有层合成成本，按需使用。',
        code: 'RepaintBoundary(child: ComplicatedChart())',
        kind: 'knowledge',
      },
      {
        category: '性能',
        question: '图片加载常见优化？',
        answer:
          '缓存（cached_network_image）、合适分辨率、占位图。\n' +
          '列表里限制并发与尺寸；避免在 build 里反复解码超大图。\n' +
          '本地大图可用 resize 或预生成缩略图。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '工程实践',
        question: '目录结构与分层怎么常规划分？',
        answer:
          '常见：presentation（UI）/ domain / data（api、model）。\n' +
          '或按 feature 分模块，每模块内再分层。\n' +
          '目标：UI 不直接拼 URL，便于测与替换实现。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '工程实践',
        question: '依赖注入：get_it / riverpod 的角色？',
        answer:
          '把 ApiClient、Repository 注册后到处拿，避免满地 new。\n' +
          'Riverpod 本身即可提供依赖；get_it 是服务定位器。\n' +
          '测试时替换实现即可。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '工程实践',
        question: '主题 ThemeData、暗色、文字缩放？',
        answer:
          'Theme.of(context) 取色与文字样式；统一改 MaterialApp.theme。\n' +
          'darkTheme + themeMode；注意三方组件是否跟随。\n' +
          '文字随系统缩放时检查溢出布局。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '工程实践',
        question: '全局异常与 FlutterError 怎么接？',
        answer:
          'FlutterError.onError 收框架错误；PlatformDispatcher.instance.onError 收平台/异步。\n' +
          'runZonedGuarded 包一层上报。\n' +
          '别只 print，生产环境要落到崩溃平台。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '平台适配',
        question: 'Android / iOS 差异常见点？',
        answer:
          '返回手势与导航栏、权限文案、推送通道、文件路径、状态栏样式。\n' +
          '用 Theme / Platform.isIOS 或 adaptive 控件；混合栈更要测双端。\n' +
          '安全区与刘海用 SafeArea / padding。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '平台适配',
        question: '屏幕适配：不要写死一种思路？',
        answer:
          '用约束与弹性布局优先，而不是处处乘缩放系数。\n' +
          '必要时用 MediaQuery 或 ScreenUtil 类方案，但注意字体与无障碍缩放。\n' +
          '平板/横屏要单独验证。',
        code: '',
        kind: 'knowledge',
      },
    ],
    interviews: [
      {
        category: 'Flutter 实战',
        question: '列表滑动卡顿你会怎么查？',
        answer:
          '先分清 CPU/GPU：DevTools Performance。\n' +
          '常见：build 过重、图片未缓存/过大、item 里重复创建重对象、缺少 const、在 build 里算复杂逻辑。\n' +
          '优化：ListView.builder、itemExtent/原型、图片缓存、隔离开销高的子树、减少不必要 setState。',
        code: 'ListView.builder(\n  itemCount: n,\n  itemBuilder: (_, i) => Item(data[i]),\n)',
        kind: 'interview',
      },
      {
        category: 'Flutter 实战',
        question: '如何做全局登录态与 401 统一跳转？',
        answer:
          '用全局状态（Riverpod/GetX）持有 token/用户；网络层拦截 401 → 清态 → 跳登录。\n' +
          'Deep Link 目标页若需登录：先暂存路由，登录成功续跳。避免每个页面自己写一套。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'Flutter 实战',
        question: 'Isolate 什么时候用？和 compute 的关系？',
        answer:
          'UI 线程做重 CPU（JSON 大包解析、加解密、图片处理）会掉帧时，丢到 Isolate。\n' +
          'compute / Isolate.run 适合一次性任务；长期任务用完整 Isolate + SendPort。\n' +
          '注意：不能直接操作 UI，传可发送的数据。',
        code: 'final map = await Isolate.run(() => jsonDecode(bigJson));',
        kind: 'interview',
      },
    ],
  },
  web: {
    knowledge: [
      {
        category: 'Vue 入门',
        question: 'Vue3 组合式 API 的核心概念？',
        answer:
          'setup 中用 ref/reactive 声明状态，computed/watch 派生与副作用，生命周期用 onMounted 等。\n' +
          '逻辑按「关注点」抽成 useXxx composable，而不是 Options 的 data/methods 拆散。',
        code: 'const count = ref(0)\nconst double = computed(() => count.value * 2)',
        kind: 'knowledge',
      },
      {
        category: 'Vue 入门',
        question: 'Pinia 解决什么问题？',
        answer:
          '全局/跨页共享状态：用户、主题、币种列表等。\n' +
          '比 Vuex 更轻；配合组合式写法清晰。页面私有表单不必进 store。',
        code: 'export const useUserStore = defineStore("user", () => {\n  const token = ref("")\n  return { token }\n})',
        kind: 'knowledge',
      },
      {
        category: '移动端 H5',
        question: 'viewport、rem/vw、安全区分别干什么？',
        answer:
          'viewport meta 控制布局视口。\n' +
          'rem/vw 做多屏适配；底部按钮用 env(safe-area-inset-*) 避开 Home 条。\n' +
          '100vh 在 iOS 可能含工具栏，可用 dvh/svh 或 JS 设 --vh。',
        code: '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
        kind: 'knowledge',
      },
      {
        category: '网络',
        question: 'axios 拦截器一般放什么？',
        answer:
          '请求：带 Authorization、traceId。\n' +
          '响应：解包业务码、401 登出、统一 toast、可做短时防重复提交。',
        code: 'api.interceptors.response.use(r => r.data, err => { /* 401 */ })',
        kind: 'knowledge',
      },
      {
        category: '安全',
        question: 'XSS 和 CSRF 一句话区分与防护？',
        answer:
          'XSS：往页面注入脚本，偷 token → 转义、CSP、少用 v-html。\n' +
          'CSRF：借用户 Cookie 伪造请求 → SameSite、CSRF Token；Bearer 放 Header 面较小但仍怕 XSS。',
        code: '',
        kind: 'knowledge',
      },
    ],
    interviews: [
      {
        category: 'H5 资产站',
        question: '余额页估值如何用 WebSocket 实时刷新？',
        answer:
          '持仓数量来自资产接口；价格来自 WS；前端 数量×价格×汇率。\n' +
          '推送节流；断线展示延迟并用 REST 兜底；回前台重连+快照。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'H5 资产站',
        question: '提币防重复提交怎么做？',
        answer:
          '按钮 loading+disabled；请求层短锁；服务端幂等（clientOrderId）才是最终手段。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'H5 资产站',
        question: '闪兑报价倒计时过期怎么处理？',
        answer:
          '定时拉报价并展示倒计时；到期刷新；提交前二次确认；过期拒绝提交并提示刷新。',
        code: '',
        kind: 'interview',
      },
      {
        category: '前端工程',
        question: 'Vite 项目首屏怎么优化？',
        answer:
          '路由懒加载、组件库按需、图片懒加载、骨架屏、关键接口并行、gzip/brotli、合理拆包与 CDN。',
        code: 'const Page = () => import("./pages/Wallet.vue")',
        kind: 'interview',
      },
      {
        category: '浏览器',
        question: '事件循环：输出顺序怎么讲？',
        answer:
          '同步 → 微任务（Promise）→ 宏任务（setTimeout）。\n' +
          '能手写 1 2 3 4 的例子并解释为什么。',
        code: "console.log(1)\nsetTimeout(() => console.log(4), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(2)\n// 1 2 3 4",
        kind: 'interview',
      },
    ],
  },
  ios: {
    knowledge: [
      {
        category: 'Swift 入门',
        question: '值类型和引用类型？struct vs class？',
        answer:
          'struct/enum 是值类型，赋值拷贝（写时复制）；class 是引用类型，共享同一实例。\n' +
          'UIKit 大量 class；SwiftUI 状态多用 struct + 属性包装器。\n' +
          '面试加分：值类型更易推理线程安全；需要继承/Identity 时用 class。',
        code: 'struct Point { var x: Int }\nclass Person { var name: String }',
        kind: 'knowledge',
      },
      {
        category: 'Swift 入门',
        question: 'Optional 怎么安全解包？',
        answer:
          'if let / guard let；?? 默认值；可选链 ?.；少用强制 !。\n' +
          'guard 提前退出让后面代码更直。map / flatMap 可对 Optional 做变换。',
        code: 'guard let url = URL(string: s) else { return }\nprint(url)',
        kind: 'knowledge',
      },
      {
        category: 'Swift 入门',
        question: 'let / var、类型推断、类型注解？',
        answer:
          'let 不可重新赋值（引用类型内容仍可变）；var 可变。\n' +
          '编译器可推断类型；对外 API、复杂类型建议显式注解，可读性更好。',
        code: 'let id: String = "1"\nvar count = 0',
        kind: 'knowledge',
      },
      {
        category: 'Swift 入门',
        question: 'Array / Dictionary / Set 基础差异？',
        answer:
          'Array：有序可重复。Dictionary：键值。Set：无序不重复。\n' +
          '都是值类型；注意 copy-on-write：赋值后未改前共享存储。',
        code: 'var a = [1, 2]\nvar b = a\nb.append(3) // a 仍是 [1,2]',
        kind: 'knowledge',
      },
      {
        category: 'Swift 入门',
        question: '枚举 enum 能干什么？关联值？',
        answer:
          '枚举可带方法、计算属性；关联值表达「一种状态多种载荷」。\n' +
          '常用于网络结果、页面状态机：.loading / .success(data) / .failure(err)。',
        code: 'enum LoadState {\n  case idle, loading\n  case success(Data)\n  case failure(Error)\n}',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: '协议 Protocol 与扩展 Extension？',
        answer:
          '协议定义能力契约；类型遵循协议获得多态。\n' +
          'Extension 可给已有类型加方法、遵循协议；协议扩展可提供默认实现。\n' +
          '面向协议编程是 Swift 常见风格。',
        code: 'protocol Drawable { func draw() }\nextension Drawable {\n  func draw() { print("default") }\n}',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: '泛型 Generics 解决什么问题？',
        answer:
          '在保持类型安全的前提下复用算法/容器，避免 Any 丢失类型。\n' +
          '可用 where 约束；关联类型用在协议里。',
        code: 'func first<T>(_ arr: [T]) -> T? { arr.first }',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: '闭包 Closure：逃逸与捕获列表？',
        answer:
          '闭包可捕获外部变量。escaping 表示闭包在函数返回后仍可能执行（如异步回调）。\n' +
          '捕获列表 [weak self] / [unowned self] 打破循环；不确定生命周期用 weak。',
        code: 'func load(completion: @escaping (Data) -> Void) { ... }',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: 'Error 处理：throw / try / Result？',
        answer:
          '抛错函数标 throws；调用处 try / try? / try!。\n' +
          'Result 适合回调里携带成功或失败；async 函数可直接 throws。',
        code: 'do {\n  let u = try User(json)\n} catch {\n  print(error)\n}',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: 'access control：private / fileprivate / internal / public / open？',
        answer:
          'private：类型/文件内（Swift 较新规则偏声明作用域）。fileprivate：本文件。\n' +
          'internal：模块内默认。public：可跨模块用但不能子类重写（对 class）。\n' +
          'open：可跨模块继承/重写。框架对外 API 常用 public/open。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'Swift 语法',
        question: 'property wrapper 是什么？（如 State、Published）',
        answer:
          '用包装类型给属性附加存取逻辑，语法糖 @Wrapper var x。\n' +
          'SwiftUI 的 @State、Combine 的 @Published 都是属性包装器。\n' +
          '理解「包装器持有 storage + wrappedValue」有助于读框架代码。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: 'UIViewController 生命周期关键节点？',
        answer:
          'viewDidLoad：一次加载。viewWillAppear/DidAppear：每次显示。\n' +
          '消失对应 Will/DidDisappear。内存警告 didReceiveMemoryWarning。\n' +
          '网络回调里更新 UI 要回主线程。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: 'UIView 的 frame / bounds / center？',
        answer:
          'frame：父坐标系中的位置与大小。bounds：自身坐标系，原点常 (0,0)。\n' +
          'center：父坐标系中心点。旋转/变换时多用 bounds+center 思考。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: 'Auto Layout 基础：约束与优先级？',
        answer:
          '用约束描述相对关系，而不是写死 frame。\n' +
          '优先级 1000 必需，可降级做压缩抗性；contentHugging / compressionResistance 控制被挤时谁让步。\n' +
          '冲突会打日志；Intrinsic Content Size 影响 Label/Button。',
        code: 'label.setContentCompressionResistancePriority(.required, for: .horizontal)',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: 'UITableView 复用机制在干什么？',
        answer:
          '屏幕外 cell 回收进复用池，dequeue 再配置，避免为每行创建新视图。\n' +
          '必须在 cellForRow 里完整重置状态（勾选、图片、异步回调校验 indexPath）。',
        code: 'let cell = tableView.dequeueReusableCell(withIdentifier: "id", for: indexPath)',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: 'UINavigationController 与模态呈现？',
        answer:
          '导航栈：push/pop，适合层级钻取。\n' +
          '模态 present/dismiss：临时流程（登录、编辑）。\n' +
          '注意：谁 present 谁负责链路；iOS 13+ 默认 pageSheet 可下拉关闭。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'UIKit',
        question: '事件传递与响应者链？',
        answer:
          '触摸命中最前端视图，再沿响应者链（superview → VC → window → app）找能处理的对象。\n' +
          '可重写 hitTest / point(inside:)；手势识别器会参与竞争。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '生命周期',
        question: 'App 前后台：scene / application 回调？',
        answer:
          '常见：active → inactive → background；回前台再 active。\n' +
          '进后台应暂停定时器/断开非必要连接；回前台刷新数据、恢复动画。\n' +
          'SceneDelegate 与 AppDelegate 在多窗口时代都要能讲清职责。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'SwiftUI',
        question: 'State / Binding / ObservedObject / StateObject？',
        answer:
          '@State：视图私有状态。@Binding：父子双向。\n' +
          '@StateObject：视图拥有的 ObservableObject 生命周期。\n' +
          '@ObservedObject：外部传入的观察对象，不负责创建。选错会导致状态被重置。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'SwiftUI',
        question: 'View 是什么？为什么说它是轻量描述？',
        answer:
          'View 是协议，body 描述 UI 结构；SwiftUI 可按状态差分更新。\n' +
          '尽量让 View 小而纯；副作用放生命周期修饰符或 ViewModel。\n' +
          'Identity（id）影响动画与状态保留。',
        code: 'struct TitleView: View {\n  var text: String\n  var body: some View { Text(text) }\n}',
        kind: 'knowledge',
      },
      {
        category: 'SwiftUI',
        question: 'Environment 与 EnvironmentObject？',
        answer:
          '@Environment 读系统/框架注入值（色调、dismiss）。\n' +
          '@EnvironmentObject 注入共享 ObservableObject，需在祖先 .environmentObject 提供。\n' +
          '适合主题、会话等跨多层传递，避免层层参数。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: 'SwiftUI',
        question: 'List / NavigationStack 基础用法概念？',
        answer:
          'List 适合数据驱动列表；注意 id 稳定。\n' +
          'NavigationStack（新）用路径/值驱动导航，比旧 NavigationView 更可控。\n' +
          '大数据列表仍要注意模型轻量与图片加载。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '内存',
        question: 'ARC 与循环引用怎么破？',
        answer:
          '强引用计数为 0 释放。闭包/代理互相强持有会泄漏。\n' +
          '闭包用 [weak self]，代理用 weak；注意 self? 与生命周期。\n' +
          'Timer、NotificationCenter、Combine sink 也是常见泄漏源。',
        code: 'foo { [weak self] in\n  guard let self else { return }\n  self.reload()\n}',
        kind: 'knowledge',
      },
      {
        category: '内存',
        question: 'weak 和 unowned 怎么选？',
        answer:
          'weak：可选，对象释放后变 nil，更安全。\n' +
          'unowned：非可选，假定生命周期更长，用错会野指针崩溃。\n' +
          '不确定就 weak；只有能证明「一定还在」才 unowned。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '内存',
        question: 'autoreleasepool 什么时候有用？',
        answer:
          '在紧循环里创建大量临时 ObjC/桥接对象时，可包 autoreleasepool 提前回收峰值内存。\n' +
          '纯 Swift 值类型场景收益有限；处理大图/批量导入时更常见。',
        code: 'for item in bigList {\n  autoreleasepool { process(item) }\n}',
        kind: 'knowledge',
      },
      {
        category: '并发',
        question: 'GCD 和 async/await 怎么理解？',
        answer:
          'GCD：队列派发（主队列/全局队列）。\n' +
          'Swift Concurrency：async/await、Actor、Task，编译期帮你少踩线程坑。\n' +
          'UI 更新必须在主线程/主 Actor。',
        code: 'Task {\n  let data = try await api.fetch()\n  await MainActor.run { self.label.text = data }\n}',
        kind: 'knowledge',
      },
      {
        category: '并发',
        question: '串行队列 vs 并发队列？同步 vs 异步？',
        answer:
          '串行：任务依次。并发：可并行（受系统调度）。\n' +
          'async：把任务丢到队列后立即返回。sync：等到任务结束（在主线程 sync 主队列会死锁）。\n' +
          '读写锁场景可用 barrier 或 actor。',
        code: 'DispatchQueue.global().async {\n  let img = load()\n  DispatchQueue.main.async { imageView.image = img }\n}',
        kind: 'knowledge',
      },
      {
        category: '并发',
        question: 'Actor 解决什么问题？',
        answer:
          'Actor 隔离可变状态，外部 await 访问，降低数据竞争。\n' +
          'MainActor 标记 UI 相关类型/方法。\n' +
          '替代部分「串行队列保护属性」的手写模式。',
        code: 'actor Counter {\n  var value = 0\n  func inc() { value += 1 }\n}',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'URLSession 基本用法概念？',
        answer:
          'dataTask / 现在更多 async URLSession.shared.data(from:)。\n' +
          '注意超时、取消（Task cancel）、后台会话、HTTP 状态码与解码错误分层。\n' +
          '证书校验、ATS（HTTPS）是上架常见考点。',
        code: 'let (data, resp) = try await URLSession.shared.data(from: url)',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'Codable 是做什么的？',
        answer:
          'Encodable/Decodable 合称 Codable，把模型与 JSON 互转。\n' +
          'CodingKeys 映射字段名；可选字段、默认值、自定义 decode 处理脏数据。\n' +
          '大 JSON 考虑后台线程解码。',
        code: 'struct User: Codable { let id: Int; let name: String }',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'UserDefaults / Keychain / 文件 怎么选？',
        answer:
          'UserDefaults：小配置、非敏感。\n' +
          'Keychain：token、密码等敏感信息。\n' +
          '文件/数据库：大体积、结构化数据（FileManager、Core Data、SQLite/GRDB）。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '网络与存储',
        question: 'NotificationCenter 使用注意？',
        answer:
          '解耦广播，但易滥用导致难追踪。\n' +
          '观察者要在适当时机 remove；闭包观察注意循环引用。\n' +
          '能用委托/回调/Combine/async 流时，优先更明确的数据流。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '性能基础',
        question: '主线程都该干什么、不该干什么？',
        answer:
          '主线程：UI 更新、用户交互响应。\n' +
          '不要：重计算、大图解码、大量 JSON、同步磁盘/网络。\n' +
          '掉帧（卡顿）多数是主线程被堵。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '性能基础',
        question: '离屏渲染大致是什么？',
        answer:
          '圆角+阴影、遮罩、光栅化等可能触发离屏渲染，增加 GPU/内存开销。\n' +
          '列表里慎用复杂视觉效果；能用 cornerRadius 对不透明层优化则优化。\n' +
          '用 Core Animation Instrument 观察。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '架构',
        question: 'MVC / MVP / MVVM 在 iOS 里怎么理解？',
        answer:
          'UIKit 经典 MVC 易变成 Massive ViewController。\n' +
          'MVVM：View/VC 绑 ViewModel，网络与转换下沉，利于测试。\n' +
          'SwiftUI 天然偏 MVVM。选架构要看团队与页面复杂度，别为模式而模式。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '架构',
        question: '依赖注入为什么有用？',
        answer:
          '把网络、存储等依赖从外部传入，而不是 VC 内部 new 死。\n' +
          '便于单测 mock、便于替换实现。\n' +
          '形式：初始化注入、环境对象、简单容器均可。',
        code: 'init(api: APIClient) { self.api = api }',
        kind: 'knowledge',
      },
      {
        category: '系统能力',
        question: '权限与隐私：相册/相机/定位要注意什么？',
        answer:
          'Info.plist 用途说明文案必填；先查授权状态再请求。\n' +
          '被拒要有降级 UI；不要反复弹系统框骚扰用户。\n' +
          '上架审核对隐私清单、追踪 ATT 很严。',
        code: '',
        kind: 'knowledge',
      },
      {
        category: '系统能力',
        question: '推送通知：远程与本地？',
        answer:
          '先请求授权；设备 token 交给服务端。\n' +
          '前台展示策略、点击跳转路由要统一。\n' +
          '本地通知适合定时提醒；远程依赖 APNs。',
        code: '',
        kind: 'knowledge',
      },
    ],
    interviews: [
      {
        category: 'iOS 实战',
        question: 'tableView 卡顿常见原因？',
        answer:
          '主线程解码大图、cell 复用不当、复杂圆角阴影、高度计算过重、自动布局约束冲突频繁。\n' +
          '优化：异步解码、固定行高/缓存高度、减少离屏渲染、预加载。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '如何设计网络层错误与登录过期？',
        answer:
          '统一 Client：拼 Header、解包、映射错误码。\n' +
          '401：清 Token、发通知/走协调器进登录；避免每个 VC 复制粘贴。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: 'Instrument 你会先看哪几项？',
        answer:
          'Time Profiler 找热点；Allocations/Leaks 看内存；Core Animation 看离屏/混合。\n' +
          '结合复现路径，先定位主线程阻塞还是内存涨。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '如何避免 cell 异步图片错乱？',
        answer:
          '回调时校验 indexPath 或模型 id 是否仍对应当前 cell。\n' +
          'prepareForReuse 清空图片/取消任务。\n' +
          '用图片库（Kingfisher 等）的 cell 扩展或自己做任务 token。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: 'App 启动慢怎么排查？',
        answer:
          '区分 pre-main 与 main 后。减少启动时同步 IO、反射、超大依赖初始化。\n' +
          '能懒加载的 SDK 延后；用 Instruments / Xcode 启动度量看耗时栈。\n' +
          '首屏只做展示必需数据。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '如何做统一路由 / 深链跳转？',
        answer:
          'URL/Universal Link → 解析成路由模型 → 中央 Router 负责 push/present。\n' +
          '未登录先缓存目标再登录续跳。\n' +
          '避免各处写死 if page == xxx。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: 'OC 与 Swift 混编要注意什么？',
        answer:
          '桥接头（Bridging Header）暴露 OC；Swift 用 @objc / @objcMembers 暴露给 OC。\n' +
          '注意空安全映射（nullable）、命名空间、枚举/结构体限制。\n' +
          '新代码优先 Swift，边界模块逐步迁移。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '如何保证列表滚动时帧率稳定？',
        answer:
          '减少 cell 层级与透明混合；预计算高度；图片尺寸匹配。\n' +
          '避免在 scrollViewDidScroll 里做重活。\n' +
          '批量更新用 performBatchUpdates；差分刷新比 reloadData 更细。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: 'Token 刷新与多请求并发 401 怎么处理？',
        answer:
          '单飞（single-flight）：第一个 401 触发刷新，其它请求排队等新 token 再重放。\n' +
          '刷新失败统一登出。注意线程安全与重试次数上限。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: 'SwiftUI 与 UIKit 混用场景？',
        answer:
          'UIViewControllerRepresentable / UIViewRepresentable 包老控件（地图、WKWebView）。\n' +
          'UIHostingController 把 SwiftUI 嵌进 UIKit 栈。\n' +
          '讲清数据回传：Coordinator / Binding。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '如何做崩溃收集与防护边界？',
        answer:
          '接入崩溃上报（信号/异常）；关键路径加断言与降级。\n' +
          '不要用乱 hook 当长期方案；修根因。\n' +
          '对服务端脏数据 decode 要容错，避免强制解包炸飞。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'iOS 实战',
        question: '图片缓存策略你会怎么设计？',
        answer:
          '内存缓存 + 磁盘缓存；键用 URL+尺寸。\n' +
          '解码在后台；限制内存缓存上限；退后台可清理。\n' +
          '列表优先展示占位，滑出可视区可取消下载。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: '@property 常用修饰符 strong / weak / copy / assign / nonatomic 怎么选？',
        answer:
          'strong：持有对象，引用计数 +1（默认对象类型）。\n' +
          'weak：不持有，对象释放后自动置 nil，破循环引用、delegate 常用。\n' +
          'copy：生成不可变副本；NSString / NSArray / block 属性常用，防外部可变对象悄悄改。\n' +
          'assign：用于基本类型（NSInteger、CGFloat）；对象上用 assign 释放后成野指针，慎用。\n' +
          'atomic（默认）自旋保护 setter/getter，但不能保证线程安全业务；UI 属性多用 nonatomic 性能更好。',
        code:
          '@property (nonatomic, strong) NSArray *items;\n' +
          '@property (nonatomic, copy) NSString *name;\n' +
          '@property (nonatomic, weak) id<MyDelegate> delegate;',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: '为什么 NSString / Block 属性常用 copy？',
        answer:
          'NSString：外部可能传入 NSMutableString，用 strong 会共享同一可变对象，外部改你也被改；copy 得到不可变快照。\n' +
          'Block：block 最初可能在栈上，copy 会把它拷到堆上，属性才能安全持有，否则离开作用域变野。\n' +
          'MRC 下 block 属性必须 copy；ARC 下对 block 写 strong 编译器常会按 copy 处理，但面试仍建议显式 copy。',
        code: '@property (nonatomic, copy) void (^completion)(BOOL ok);',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'ARC 和 MRC 区别？什么情况还要管内存？',
        answer:
          'MRC：手动 retain / release / autorelease。\n' +
          'ARC：编译器插入保留/释放，仍遵守引用计数规则。\n' +
          'ARC 下仍要处理：循环引用（block/delegate）、CF 对象与桥接（__bridge / CFBridgingRelease）、Core Foundation、部分 C API。\n' +
          '不能对 ARC 对象直接调用 retain/release；不能用 NSAllocateObject 等。',
        code: '__weak typeof(self) weakSelf = self;\nself.completion = ^{ __strong typeof(weakSelf) self = weakSelf; /* ... */ };',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'Category 和 Class Extension（匿名分类）区别？',
        answer:
          'Category：可拆分实现、给系统类加方法；一般不能加成员变量（runtime 关联对象可绕过）；加载时合并方法列表。\n' +
          'Class Extension：写在 .m 里的匿名 @interface，可声明私有属性/方法，编译期可见，常用来藏实现细节。\n' +
          '同名方法：Category 会覆盖类原方法（不确定多个 Category 谁赢），Extension 更像类的一部分。',
        code:
          '// Category\n@interface UIView (Frame)\n- (void)setX:(CGFloat)x;\n@end\n\n' +
          '// Extension（.m）\n@interface MyVC ()\n@property (nonatomic, strong) UILabel *titleLabel;\n@end',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'OC 消息发送流程？找不到方法时消息转发怎么走？',
        answer:
          'objc_msgSend：按 isa 找到类 → 缓存 → 方法列表 → 父类链。\n' +
          '找不到则动态方法解析：+resolveInstanceMethod: / +resolveClassMethod:（可动态加实现）。\n' +
          '再转发：-forwardingTargetForSelector:（快速转给别的对象）。\n' +
          '完整转发：-methodSignatureForSelector: → -forwardInvocation:。\n' +
          '仍失败：doesNotRecognizeSelector: 崩溃。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'Runtime 能干什么？Method Swizzling 要注意什么？',
        answer:
          'Runtime：关联对象、动态添加方法/属性、遍历 ivar/method、消息转发、isa-swizzling（KVO）等。\n' +
          'Swizzling：交换两个方法 IMP，常用于 hook 生命周期、埋点。\n' +
          '注意：+load 里做且只做一次；用 dispatch_once；调用原实现防递归；考虑继承链与系统升级兼容；能不用尽量少用。',
        code:
          'Method a = class_getInstanceMethod(cls, @selector(viewDidLoad));\n' +
          'Method b = class_getInstanceMethod(cls, @selector(my_viewDidLoad));\n' +
          'method_exchangeImplementations(a, b);',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'KVO 原理是什么？如何正确使用与取消？',
        answer:
          '对对象添加观察时，Runtime 动态创建子类 NSKVONotifying_XXX，改 isa 指向它，重写 setter，调用 will/didChangeValueForKey。\n' +
          '回调：observeValueForKeyPath:ofObject:change:context:。\n' +
          '必须成对 removeObserver；对象释放前取消，否则易崩。\n' +
          'iOS 11+ 可用带 NSKeyValueObservation 的 block API，生命周期更好管。\n' +
          '自动 KVO 依赖 KVC 合规 setter；手动可调 will/didChange。',
        code: '[obj addObserver:self forKeyPath:@"name" options:NSKeyValueObservingOptionNew context:NULL];',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'KVC 是什么？valueForKey / setValue:forKey: 注意点？',
        answer:
          'Key-Value Coding：用字符串访问属性，不直接调 getter/setter。\n' +
          '查找顺序：get<Key> / <key> / is<Key> / _<key> 等；集合有特殊访问器。\n' +
          '键错会抛 NSUnknownKeyException（可重写 setValue:forUndefinedKey:）。\n' +
          '可访问私有成员（破坏封装）；字典转模型、Runtime 常用。\n' +
          'nil 赋给非对象标量要小心（NSNumber 包装）。',
        code: '[user setValue:@"Tom" forKey:@"name"];\nid n = [user valueForKey:@"name"];',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'Block 循环引用怎么产生？__weak / __strong / __block 区别？',
        answer:
          '对象强持有 block，block 又捕获并强持有对象 → 环。常见：self.block = ^{ [self do]; }。\n' +
          '__weak：弱引用打破环；block 内再用 __strong 临时持有，避免执行中途 self 变 nil。\n' +
          '__block：允许在 block 内修改外部变量；对对象在 MRC 下不 retain，ARC 下仍可能强引用，破环仍优先 __weak。',
        code:
          '__weak typeof(self) weakSelf = self;\n' +
          'self.task = ^{\n  __strong typeof(weakSelf) self = weakSelf;\n  if (!self) return;\n  [self refresh];\n};',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: '+load 和 +initialize 有什么区别？',
        answer:
          '+load：镜像加载进运行时就调，主类先于 Category；每个实现都会调（含 Category 的 +load）。\n' +
          '+initialize：类第一次收到消息前惰性调用；运行时保证线程安全；Category 的 +initialize 会覆盖主类（只留一个）。\n' +
          '不要在 +load 做重活；Swizzling 常放 +load。\n' +
          '+initialize 可能被子类触发时父类也调一次，注意判断 self == [MyClass class]。',
        code: '',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'isEqual: 和 hash 为什么要一起重写？',
        answer:
          '放入 NSSet / NSDictionary 键时，先比 hash 再比 isEqual。\n' +
          '约定：isEqual 为 YES 则 hash 必须相同；hash 相同不一定 equal。\n' +
          '只重写其中一个会导致集合行为错乱（找不到、重复插入）。\n' +
          'hash 应尽量稳定且分布均匀；可变对象作键时 hash 被改会丢对象。',
        code:
          '- (BOOL)isEqual:(id)other {\n  if (self == other) return YES;\n  if (![other isKindOfClass:self.class]) return NO;\n  return [self.uid isEqual:((MyModel *)other).uid];\n}\n' +
          '- (NSUInteger)hash { return self.uid.hash; }',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'AutoreleasePool 有什么用？什么时候需要 @autoreleasepool？',
        answer:
          '对象发 autorelease 后不立刻释放，而是登记到当前池，池 drain 时统一 release。\n' +
          '主线程 RunLoop 每圈有池；子线程、紧循环大量临时对象时要自己包 @autoreleasepool，否则峰值内存飙高。\n' +
          '典型：大循环读图/解析、后台线程处理。',
        code:
          'for (NSInteger i = 0; i < 10000; i++) {\n  @autoreleasepool {\n    UIImage *img = [UIImage imageWithContentsOfFile:paths[i]];\n    // 用完即释放临时对象\n  }\n}',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'delegate 为什么常用 weak？和 notification / block 回调怎么选？',
        answer:
          'delegate 若 strong，易和委托方互相持有形成环；weak（或 assign 在 MRC）是惯例。\n' +
          'delegate：1 对 1、方法清晰、适合 UI 事件协议。\n' +
          'notification：1 对多、解耦，但难追踪、易漏 remove。\n' +
          'block：闭包方便，注意循环引用与可读性；复杂多方法仍偏向 protocol。',
        code: '@property (nonatomic, weak) id<UITableViewDelegate> delegate;',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: '关联对象（Associated Objects）怎么用？和成员变量比？',
        answer:
          'runtime 的 objc_setAssociatedObject / objc_getAssociatedObject，可给已有类（含 Category）挂额外数据。\n' +
          '策略：ASSIGN / RETAIN / COPY，以及 nonatomic 变体。\n' +
          '对象释放时关联对象一并清理（按策略）。\n' +
          '不能替代真正 ivar 的性能与清晰度；Category 加「属性」常用它做存储。',
        code:
          'objc_setAssociatedObject(self, @selector(extra), obj, OBJC_ASSOCIATION_RETAIN_NONATOMIC);\n' +
          'id obj = objc_getAssociatedObject(self, @selector(extra));',
        kind: 'interview',
      },
      {
        category: 'Objective-C',
        question: 'OC 里 id、instancetype、NSObject * 有什么区别？',
        answer:
          'id：任意对象指针，编译期几乎不检查方法是否存在（可写任意消息，错了运行时才爆）。\n' +
          'NSObject *：至少是 NSObject 子类，只能看到 NSObject 接口（除非强转）。\n' +
          'instancetype：构造方法返回类型，编译器推断为当前类，比 id 更安全（如 [[MyVC alloc] init] 链式类型正确）。\n' +
          '自定义 init / 便利构造器返回值优先写 instancetype。',
        code: '- (instancetype)initWithName:(NSString *)name;',
        kind: 'interview',
      },
    ],
  },
};

/** 把 EXTRA 合并进 CATALOG（需先加载 catalog.js） */
window.mergeExtraIntoCatalog = function mergeExtraIntoCatalog() {
  const cat = window.CATALOG;
  const extra = window.EXTRA || {};
  if (!cat) return;
  for (const key of Object.keys(extra)) {
    if (!cat[key]) continue;
    const e = extra[key];
    const seenK = new Set(cat[key].knowledge.map((x) => x.category + '||' + x.question));
    const seenI = new Set(cat[key].interviews.map((x) => x.category + '||' + x.question));
    for (const it of e.knowledge || []) {
      const id = it.category + '||' + it.question;
      if (!seenK.has(id)) {
        cat[key].knowledge.push({ ...it, kind: 'knowledge' });
        seenK.add(id);
      }
    }
    for (const it of e.interviews || []) {
      const id = it.category + '||' + it.question;
      if (!seenI.has(id)) {
        cat[key].interviews.push({ ...it, kind: 'interview' });
        seenI.add(id);
      }
    }
  }
};
