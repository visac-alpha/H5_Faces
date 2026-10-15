/**
 * 额外知识点与面试题（在 catalog 之上合并）
 * 平台: flutter | web | ios
 */
window.EXTRA = {
  flutter: {
    knowledge: [
      {
        category: "Flutter 入门",
        question: "Widget / Element / RenderObject 三棵树分别干什么？",
        answer:
          "Widget：配置描述，轻量可重建。\n" +
          "Element：Widget 在树上的实例，负责挂载、更新、与 RenderObject 关联。\n" +
          "RenderObject：真正布局与绘制。\n" +
          "setState 后会重建 Widget，Element 尽量复用，只在类型/Key 变化时换掉。",
        code: "setState(() => count++); // 重建 Widget，Element/RenderObject 尽量复用",
        kind: "knowledge",
      },
      {
        category: "Flutter 入门",
        question: "StatelessWidget 和 StatefulWidget 怎么选？",
        answer:
          "无内部可变状态用 Stateless；需要随交互/异步变化用 Stateful（或外部状态管理）。\n" +
          "现代项目更多把状态上提或用 Provider/Riverpod/GetX，页面本身可保持偏「展示」。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "Flutter 入门",
        question: "BuildContext 是什么？为什么不能在 initState 里直接用依赖它的东西？",
        answer:
          "BuildContext 代表 Element 在树上的位置，用来找 InheritedWidget、Navigator、Theme 等。\n" +
          "initState 时该 Element 可能还未完全挂到树上，访问依赖祖先的东西不安全；用 addPostFrameCallback 或 didChangeDependencies。",
        code:
          "WidgetsBinding.instance.addPostFrameCallback((_) {\n" +
          "  // 这里再 Navigator / 读 ModalRoute\n" +
          "});",
        kind: "knowledge",
      },
      {
        category: "Flutter 入门",
        question: "runApp、MaterialApp、Scaffold 各负责什么？",
        answer:
          "runApp：挂上根 Widget，启动绑定。\n" +
          "MaterialApp：路由、主题、本地化等应用级配置。\n" +
          "Scaffold：单页骨架（AppBar、Body、FloatingActionButton、底部栏）。",
        code: "void main() => runApp(const MyApp());",
        kind: "knowledge",
      },
      {
        category: "Flutter 入门",
        question: "Hot Reload 和 Hot Restart 区别？",
        answer:
          "Hot Reload：尽量保留状态，注入更新后的代码，改 UI 最快。\n" +
          "Hot Restart：重启应用状态，从 main 重新跑，全局变量/静态会被重置。\n" +
          "改了 main、全局初始化、部分枚举/泛型边界时可能需要 Restart。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "Flutter 入门",
        question: "Key 有什么用？ValueKey / ObjectKey / GlobalKey？",
        answer:
          "Key 帮助框架在 Widget 重建时识别「是不是同一个」Element。\n" +
          "列表重排、同类型兄弟切换状态时需要 Key。\n" +
          "GlobalKey 可跨树拿到 State，但贵且易滥用，优先局部 Key。",
        code: "ListTile(key: ValueKey(item.id), title: Text(item.name))",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "Future、async/await、then 的关系？",
        answer:
          "Future 表示异步结果。async 函数返回 Future；await 暂停当前函数等待完成。\n" +
          "then 是回调式链式；async/await 是语法糖，错误用 try/catch。\n" +
          "不要在 build 里直接「开火」不缓存的 Future，会反复请求。",
        code:
          "Future<String> load() async {\n" +
          "  final r = await api.get();\n" +
          "  return r.body;\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "Stream 和 Future 的区别？",
        answer:
          "Future：一次结果。Stream：一连串事件（可多值）。\n" +
          "用 listen / await for；记得 cancel 订阅防泄漏。UI 侧常用 StreamBuilder。",
        code:
          "final sub = stream.listen((e) => print(e));\n" +
          "// dispose: sub.cancel();",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "final、const、var、dynamic 怎么记？",
        answer:
          "var：推断后类型固定。dynamic：运行时可改类型，少用。\n" +
          "final：运行时赋值一次。const：编译期常量，可 canonicalization。\n" +
          "集合要编译期常量写 const [...]。",
        code:
          "final now = DateTime.now();\n" +
          "const pi = 3.14;",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "空安全：?. ?? ! late 分别干什么？",
        answer:
          "?. 短路调用；?? 空则默认值；??= 空才赋值。\n" +
          "! 强制非空，为 null 会炸，应少用。\n" +
          "late：延迟初始化，第一次用前必须赋好。",
        code:
          "print(name?.length);\n" +
          "print(name ?? '匿名');",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "级联 .. 与扩展方法 extension？",
        answer:
          ".. 可对同一对象连续调用并仍返回原对象，适合配置。\n" +
          "extension 给已有类型加方法，不改原类源码，利于工具函数归类。",
        code:
          "final p = Paint()\n" +
          "  ..color = Colors.red\n" +
          "  ..strokeWidth = 2;",
        kind: "knowledge",
      },
      {
        category: "Dart 基础",
        question: "mixin 是做什么的？",
        answer:
          "在不使用多重继承的情况下复用实现。\n" +
          "class C extends B with A, M。注意混入顺序与成员冲突。\n" +
          "Flutter 动画里常见 SingleTickerProviderStateMixin。",
        code:
          "mixin Logger {\n" +
          "  void log(String m) => print(m);\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "生命周期",
        question: "State 生命周期：initState / didChangeDependencies / dispose？",
        answer:
          "initState：创建一次，做控制器、订阅初始化。\n" +
          "didChangeDependencies：依赖 Inherited 变化时调用，也可能在 init 后立刻调。\n" +
          "dispose：释放 AnimationController、Stream 订阅、FocusNode 等，防泄漏。",
        code:
          "@override\n" +
          "void dispose() {\n" +
          "  _controller.dispose();\n" +
          "  super.dispose();\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "生命周期",
        question: "didUpdateWidget 什么时候触发？",
        answer:
          "父重建导致配置（widget 字段）变化时，State 复用并回调 didUpdateWidget。\n" +
          "常用于「外部传入的 id 变了要重新拉数」。\n" +
          "对比 initState：State 第一次创建才走 initState。",
        code:
          "@override\n" +
          "void didUpdateWidget(OldWidget old) {\n" +
          "  super.didUpdateWidget(old);\n" +
          "  if (old.id != widget.id) reload();\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "生命周期",
        question: "WidgetsBindingObserver 监听前后台？",
        answer:
          "混入观察 AppLifecycleState：resumed / inactive / paused / detached 等。\n" +
          "进后台停定时器、WS；回前台刷新。记得 dispose 里 removeObserver。",
        code: "WidgetsBinding.instance.addObserver(this);",
        kind: "knowledge",
      },
      {
        category: "布局",
        question: "Row/Column 溢出怎么排查？Expanded 和 Flexible？",
        answer:
          "溢出黄黑条：子组件在主轴上要的空间超过父限制。\n" +
          "Expanded 强制吃掉剩余空间（flex）；Flexible 可按 fit 决定是否撑满。\n" +
          "文本用 Expanded + Text overflow ellipsis；列表用 ListView 而不是 Column+一堆子项。",
        code:
          "Row(\n" +
          "  children: [\n" +
          "    Expanded(child: Text(long, overflow: TextOverflow.ellipsis)),\n" +
          "  ],\n" +
          ")",
        kind: "knowledge",
      },
      {
        category: "布局",
        question: "约束向下、尺寸向上是什么意思？",
        answer:
          "父把 BoxConstraints（最小/最大宽高）传给子；子在约束内决定自己的 size，再报告给父。\n" +
          "理解后才能看懂为什么「在无界约束的 ListView 里再放 ListView」会炸。\n" +
          "UnconstrainedBox、Intrinsic 等是例外工具，慎用。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "布局",
        question: "Stack / Positioned / Align 怎么用？",
        answer:
          "Stack 重叠布局；Positioned 相对 Stack 四边定位；Align/Alignment 做对齐。\n" +
          "未定位子项按 alignment 摆放。注意 Stack 默认 clipBehavior。",
        code:
          "Stack(children: [\n" +
          "  Positioned(right: 8, top: 8, child: Badge()),\n" +
          "])",
        kind: "knowledge",
      },
      {
        category: "布局",
        question: "MediaQuery 与安全区、键盘？",
        answer:
          "MediaQuery 提供尺寸、padding、viewInsets（键盘）等。\n" +
          "SafeArea 吃掉刘海/Home 条；键盘顶起可用 viewInsets.bottom 或 Scaffold resizeToAvoidBottomInset。\n" +
          "滥用 MediaQuery.of(context) 会导致键盘变化时整树重建，可细粒度 select。",
        code:
          "padding: EdgeInsets.only(\n" +
          "  bottom: MediaQuery.viewInsetsOf(context).bottom,\n" +
          ")",
        kind: "knowledge",
      },
      {
        category: "布局",
        question: "ListView.builder 和 Column+map 怎么选？",
        answer:
          "长列表必须懒加载：ListView.builder / SliverList。\n" +
          "Column+map 会一次建齐所有子项，数据多必卡。\n" +
          "嵌套滚动用 CustomScrollView + slivers，或禁止一方滚动。",
        code:
          "ListView.builder(\n" +
          "  itemCount: n,\n" +
          "  itemBuilder: (_, i) => Tile(items[i]),\n" +
          ")",
        kind: "knowledge",
      },
      {
        category: "状态管理",
        question: "Provider / Riverpod / Bloc / GetX 分别适合什么场景？",
        answer:
          "Provider：简单依赖注入 + 通知，入门友好。\n" +
          "Riverpod：编译期安全、测试友好，推荐新项目。\n" +
          "Bloc：事件→状态流，适合复杂流程、要可追溯。\n" +
          "GetX：路由+状态+DI 一体，快但要自律，避免全局滥用。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "状态管理",
        question: "setState 的边界：什么时候不该用？",
        answer:
          "只影响局部 UI 的短暂状态可以用。\n" +
          "跨页共享、复杂业务、要测试的状态应上提或进状态库。\n" +
          "大范围 setState 会重建大子树，可拆 Widget 或用更细粒度方案。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "状态管理",
        question: "InheritedWidget 解决什么问题？",
        answer:
          "向下高效共享数据；子通过 dependOnInheritedWidgetOfExactType 注册依赖，变了才重建。\n" +
          "Theme、MediaQuery、Provider 底层都相关。\n" +
          "自己写时注意 updateShouldNotify。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "状态管理",
        question: "ValueNotifier / ChangeNotifier 区别？",
        answer:
          "ValueNotifier：单一值变化通知。\n" +
          "ChangeNotifier：可多字段，调用 notifyListeners。\n" +
          "配合 ValueListenableBuilder / AnimatedBuilder / Provider 的 ChangeNotifierProvider。记得 dispose。",
        code:
          "final counter = ValueNotifier<int>(0);\n" +
          "counter.value++;",
        kind: "knowledge",
      },
      {
        category: "路由导航",
        question: "Navigator push / pop / 命名路由？",
        answer:
          "命令式：Navigator.push(MaterialPageRoute(...))。\n" +
          "命名路由：routes / onGenerateRoute，便于统一拦截。\n" +
          "需要返回值用 push 的 Future；pop(result)。",
        code: "Navigator.of(context).pushNamed('/detail', arguments: id);",
        kind: "knowledge",
      },
      {
        category: "路由导航",
        question: "go_router / 声明式路由解决什么？",
        answer:
          "用配置描述路径与栈，利于深链、Web URL、重定向（未登录）。\n" +
          "比满屏 imperative push 更好维护。\n" +
          "注意与状态管理配合做 refreshListenable。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "路由与混合",
        question: "FlutterBoost / 混合栈要记住什么？",
        answer:
          "Native 与 Flutter 页面互相打开时，栈由混合框架协调。\n" +
          "注意：容器生命周期、返回手势、Channel 传登录态/主题、冷启动 Deep Link 等初始化完成后再跳转。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "路由与混合",
        question: "MethodChannel / EventChannel / BasicMessageChannel？",
        answer:
          "MethodChannel：一次调用一次结果（最常用）。\n" +
          "EventChannel：Native 持续推事件（传感器流）。\n" +
          "BasicMessageChannel：双向消息，可自定义 codec。注意线程与类型编解码。",
        code:
          "const ch = MethodChannel('app/theme');\n" +
          "final map = await ch.invokeMethod('getTheme');",
        kind: "knowledge",
      },
      {
        category: "异步与并发",
        question: "事件循环：微任务与事件队列？",
        answer:
          "Dart 单 Isolate 里：同步代码 → 微任务队列 → 事件队列（Timer、IO、帧回调）。\n" +
          "scheduleMicrotask / Future.then 偏微任务；Future.delayed 进事件队列。\n" +
          "理解后能解释「为什么 then 比 delayed(0) 早」。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "异步与并发",
        question: "Isolate / compute 用在什么场景？",
        answer:
          "重 CPU 别堵 UI isolate：大 JSON、压缩、加解密。\n" +
          "compute / Isolate.run 适合一次性；长驻后台用独立 Isolate。\n" +
          "只能传可发送对象；不能在里头碰 UI。",
        code: "final data = await Isolate.run(() => jsonDecode(text));",
        kind: "knowledge",
      },
      {
        category: "异步与并发",
        question: "FutureBuilder / StreamBuilder 注意点？",
        answer:
          "future/stream 参数要稳定，不要每次 build 新建，否则反复加载。\n" +
          "处理 waiting / error / data 三态；切换页面注意取消。\n" +
          "复杂场景更宜状态管理 + 仓库层。",
        code:
          "FutureBuilder(\n" +
          "  future: _future, // 存在 State 里\n" +
          "  builder: ...\n" +
          ")",
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "dio / http 封装一般放什么？",
        answer:
          "BaseUrl、Header、超时、拦截器（token、日志、401）、错误模型。\n" +
          "取消用 CancelToken；文件上传下载进度回调。\n" +
          "业务码与 HTTP 状态码分层处理。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "shared_preferences / secure_storage / 本地 DB？",
        answer:
          "shared_preferences：小配置。\n" +
          "flutter_secure_storage：token 等敏感信息。\n" +
          "结构化大数据用 sqflite / drift / hive / isar 等。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "json_serializable 与手动 fromJson？",
        answer:
          "代码生成减少样板与字段遗漏；改模型要 build_runner。\n" +
          "脏数据、多态列表有时仍需自定义转换。\n" +
          "大 JSON 解码可放到 isolate。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "绘制与动画",
        question: "AnimationController 基础概念？",
        answer:
          "需要 Ticker（常 mixin SingleTickerProviderStateMixin）。\n" +
          "duration + vsync；listen 或 AnimatedBuilder；dispose 必须释放。\n" +
          "CurvedAnimation、Tween 描述曲线与数值映射。",
        code:
          "_controller = AnimationController(\n" +
          "  vsync: this,\n" +
          "  duration: const Duration(milliseconds: 300),\n" +
          ");",
        kind: "knowledge",
      },
      {
        category: "绘制与动画",
        question: "Hero、隐式动画、显式动画怎么区分？",
        answer:
          "隐式：AnimatedContainer 等，改属性自动过渡。\n" +
          "显式：自己掌控 Controller。\n" +
          "Hero：共享元素跨路由飞行，tag 要唯一对应。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "绘制与动画",
        question: "CustomPaint / Canvas 什么时候用？",
        answer:
          "图表、特殊形状、轻量自绘。\n" +
          "Paint 在 shouldRepaint 里比较参数，避免无意义重绘。\n" +
          "复杂场景考虑做一层缓存或用现成图表库。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "性能",
        question: "const 构造与拆分 Widget 为什么能优化？",
        answer:
          "const Widget 在重建时可直接复用，减少创建与 diff。\n" +
          "拆成更小子 Widget，父 setState 时未变子树可跳过。\n" +
          "列表 item 尽量无副作用、可 const 的部分拆出去。",
        code: "const Text(\"标题\");",
        kind: "knowledge",
      },
      {
        category: "性能",
        question: "RepaintBoundary 是干什么的？",
        answer:
          "把重绘范围隔开，昂贵子树脏了不一定带动整屏。\n" +
          "适合复杂动画、常变小区域。\n" +
          "不是越多越好，有层合成成本，按需使用。",
        code: "RepaintBoundary(child: ComplicatedChart())",
        kind: "knowledge",
      },
      {
        category: "性能",
        question: "图片加载常见优化？",
        answer:
          "缓存（cached_network_image）、合适分辨率、占位图。\n" +
          "列表里限制并发与尺寸；避免在 build 里反复解码超大图。\n" +
          "本地大图可用 resize 或预生成缩略图。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "工程实践",
        question: "目录结构与分层怎么常规划分？",
        answer:
          "常见：presentation（UI）/ domain / data（api、model）。\n" +
          "或按 feature 分模块，每模块内再分层。\n" +
          "目标：UI 不直接拼 URL，便于测与替换实现。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "工程实践",
        question: "依赖注入：get_it / riverpod 的角色？",
        answer:
          "把 ApiClient、Repository 注册后到处拿，避免满地 new。\n" +
          "Riverpod 本身即可提供依赖；get_it 是服务定位器。\n" +
          "测试时替换实现即可。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "工程实践",
        question: "主题 ThemeData、暗色、文字缩放？",
        answer:
          "Theme.of(context) 取色与文字样式；统一改 MaterialApp.theme。\n" +
          "darkTheme + themeMode；注意三方组件是否跟随。\n" +
          "文字随系统缩放时检查溢出布局。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "工程实践",
        question: "全局异常与 FlutterError 怎么接？",
        answer:
          "FlutterError.onError 收框架错误；PlatformDispatcher.instance.onError 收平台/异步。\n" +
          "runZonedGuarded 包一层上报。\n" +
          "别只 print，生产环境要落到崩溃平台。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "平台适配",
        question: "Android / iOS 差异常见点？",
        answer:
          "返回手势与导航栏、权限文案、推送通道、文件路径、状态栏样式。\n" +
          "用 Theme / Platform.isIOS 或 adaptive 控件；混合栈更要测双端。\n" +
          "安全区与刘海用 SafeArea / padding。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "平台适配",
        question: "屏幕适配：不要写死一种思路？",
        answer:
          "用约束与弹性布局优先，而不是处处乘缩放系数。\n" +
          "必要时用 MediaQuery 或 ScreenUtil 类方案，但注意字体与无障碍缩放。\n" +
          "平板/横屏要单独验证。",
        code: '',
        kind: "knowledge",
      }
    ],
    interviews: [
      {
        category: "Flutter 实战",
        question: "列表滑动卡顿你会怎么查？",
        answer:
          "【一句话】\n" +
          "先用 DevTools Performance 分清 UI/Raster 瓶颈，再针对列表懒加载、图片解码、item 过重与过度重建逐项优化，并用 Release 真机验证。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 定位：Performance/Timeline 看是 build/layout 重，还是光栅/过度绘制；CPU profiler 找热点。\n" +
          "2. 常见原因：ListView(children) 全量构建、itemBuilder 创建 Controller、大图未降采样、父级 setState 范围过大、缺 const。\n" +
          "3. 优化手段：builder/sliver、itemExtent 或原型、图片缓存与 cacheWidth、拆分组件/Selector、必要处 RepaintBoundary。\n" +
          "4. 验证：同一操作路径前后对比 fps/帧耗时；Debug 仅用于功能，结论以 Release 为准。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "长列表必须 builder；图片按显示尺寸解码；把不变子树移出监听范围。先改最大头的项（图片与全量 children），再微调动画与图层。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "按「现象 → 工具分层 → 假设 → 改动 → 数据验证」讲一个真实案例。避免只罗列名词没有指标。\n" +
          "\n" +
          "【易错点】\n" +
          "- 未分清 UI/Raster 就盲目加 RepaintBoundary 或减动画。\n" +
          "- 在 itemBuilder 每次 new ScrollController/动画控制器。\n" +
          "- 用模拟器 Debug 滑动帧率当作优化验收标准。",
        code:
          "ListView.builder(\n" +
          "  itemCount: n,\n" +
          "  itemBuilder: (_, i) => Item(data[i]),\n" +
          ")",
        kind: "interview",
      },
      {
        category: "Flutter 实战",
        question: "如何做全局登录态与 401 统一跳转？",
        answer:
          "【一句话】\n" +
          "用全局状态持有登录态，网络层统一拦截 401 清态并跳转登录；深链目标先暂存，登录成功后再续跳，避免每页各自处理。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 单一数据源：Riverpod/Bloc/GetX 等保存 token/用户；启动时恢复安全存储中的会话。\n" +
          "2. 网络层：Dio 拦截器遇 401，排队刷新或直接 logout；失败则清态并导航到登录页。\n" +
          "3. 路由守卫：需登录页在进入前检查；深链先记 intended route，登录后替换栈或 push 目标。\n" +
          "4. 体验：防多次 401 并发导致重复跳转；登出要取消进行中的请求。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "拦截器只抛领域错误或调 AuthController.forceLogout()；导航用全局 navigatorKey，避免无 context。刷新 token 与强制登出策略要分开。不要在每个 Repository catch 里写跳转。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "强调「横切：状态 + 拦截器 + 路由守卫」三件套，并提深链续跳与防重入。这是实战高频题，结构清晰即可高分。\n" +
          "\n" +
          "【易错点】\n" +
          "- 每个页面自己 if (401) Navigator.pushLogin，行为不一致且难维护。\n" +
          "- 401 刷新无锁，并发请求触发多次 refresh/多次跳转。\n" +
          "- 登录成功用 push 叠很多登录页，或未清理 intended 路由导致死循环。",
        code: '',
        kind: "interview",
      },
      {
        category: "Flutter 实战",
        question: "Isolate 什么时候用？和 compute 的关系？",
        answer:
          "【一句话】\n" +
          "主 Isolate 上 CPU 密集任务会掉帧时用 Isolate；compute/Isolate.run 适合一次性任务，长驻后台用完整 Isolate + 端口通信。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 为何需要：Dart 单 Isolate 内事件循环，重计算阻塞 UI 帧。\n" +
          "2. API：compute（Flutter foundation）与 Isolate.run 适合单次输入输出；长期任务用 Isolate.spawn + SendPort/ReceivePort。\n" +
          "3. 限制：消息传递需可序列化（或有限可发送类型），不能在后台 Isolate 直接碰 Widget/BuildContext。\n" +
          "4. 适用例：大 JSON 解析、加解密、图片处理、繁重压缩；纯异步 I/O 通常不必开 Isolate。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "先确认是 CPU 瓶颈而非 I/O；一次性用 Isolate.run；要进度回传再用自定义 Isolate。注意创建开销，过碎任务别狂开。传数据尽量减拷贝（如先写文件再传路径）。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "先讲单线程事件循环，再说与 Future 的区别（Future 不解决 CPU 占用），最后对比 run 与长驻 Isolate。\n" +
          "\n" +
          "【易错点】\n" +
          "- 把网络请求误以为必须 Isolate（http 本身异步即可）。\n" +
          "- 向 Isolate 传巨大对象反复拷贝，反而更慢。\n" +
          "- 在 worker 里调用 setState 或使用 UI 插件造成错误。",
        code: "final map = await Isolate.run(() => jsonDecode(bigJson));",
        kind: "interview",
      }
    ],
  },
  web: {
    knowledge: [
      {
        category: "Vue 入门",
        question: "Vue3 组合式 API 的核心概念？",
        answer:
          "setup 中用 ref/reactive 声明状态，computed/watch 派生与副作用，生命周期用 onMounted 等。\n" +
          "逻辑按「关注点」抽成 useXxx composable，而不是 Options 的 data/methods 拆散。",
        code:
          "const count = ref(0)\n" +
          "const double = computed(() => count.value * 2)",
        kind: "knowledge",
      },
      {
        category: "Vue 入门",
        question: "Pinia 解决什么问题？",
        answer:
          "全局/跨页共享状态：用户、主题、币种列表等。\n" +
          "比 Vuex 更轻；配合组合式写法清晰。页面私有表单不必进 store。",
        code:
          "export const useUserStore = defineStore(\"user\", () => {\n" +
          "  const token = ref(\"\")\n" +
          "  return { token }\n" +
          "})",
        kind: "knowledge",
      },
      {
        category: "移动端 H5",
        question: "viewport、rem/vw、安全区分别干什么？",
        answer:
          "viewport meta 控制布局视口。\n" +
          "rem/vw 做多屏适配；底部按钮用 env(safe-area-inset-*) 避开 Home 条。\n" +
          "100vh 在 iOS 可能含工具栏，可用 dvh/svh 或 JS 设 --vh。",
        code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">",
        kind: "knowledge",
      },
      {
        category: "网络",
        question: "axios 拦截器一般放什么？",
        answer:
          "请求：带 Authorization、traceId。\n" +
          "响应：解包业务码、401 登出、统一 toast、可做短时防重复提交。",
        code: "api.interceptors.response.use(r => r.data, err => { /* 401 */ })",
        kind: "knowledge",
      },
      {
        category: "安全",
        question: "XSS 和 CSRF 一句话区分与防护？",
        answer:
          "XSS：往页面注入脚本，偷 token → 转义、CSP、少用 v-html。\n" +
          "CSRF：借用户 Cookie 伪造请求 → SameSite、CSRF Token；Bearer 放 Header 面较小但仍怕 XSS。",
        code: '',
        kind: "knowledge",
      }
    ],
    interviews: [
      {
        category: "H5 资产站",
        question: "余额页估值如何用 WebSocket 实时刷新？",
        answer:
          "持仓数量来自资产接口；价格来自 WS；前端 数量×价格×汇率。\n" +
          "推送节流；断线展示延迟并用 REST 兜底；回前台重连+快照。",
        code: '',
        kind: "interview",
      },
      {
        category: "H5 资产站",
        question: "提币防重复提交怎么做？",
        answer:
          "按钮 loading+disabled；请求层短锁；服务端幂等（clientOrderId）才是最终手段。",
        code: '',
        kind: "interview",
      },
      {
        category: "H5 资产站",
        question: "闪兑报价倒计时过期怎么处理？",
        answer:
          "定时拉报价并展示倒计时；到期刷新；提交前二次确认；过期拒绝提交并提示刷新。",
        code: '',
        kind: "interview",
      },
      {
        category: "前端工程",
        question: "Vite 项目首屏怎么优化？",
        answer:
          "路由懒加载、组件库按需、图片懒加载、骨架屏、关键接口并行、gzip/brotli、合理拆包与 CDN。",
        code: "const Page = () => import(\"./pages/Wallet.vue\")",
        kind: "interview",
      },
      {
        category: "浏览器",
        question: "事件循环：输出顺序怎么讲？",
        answer:
          "同步 → 微任务（Promise）→ 宏任务（setTimeout）。\n" +
          "能手写 1 2 3 4 的例子并解释为什么。",
        code:
          "console.log(1)\n" +
          "setTimeout(() => console.log(4), 0)\n" +
          "Promise.resolve().then(() => console.log(3))\n" +
          "console.log(2)\n" +
          "// 1 2 3 4",
        kind: "interview",
      }
    ],
  },
  ios: {
    knowledge: [
      {
        category: "Swift 入门",
        question: "值类型和引用类型？struct vs class？",
        answer:
          "【一句话】\n" +
          "值类型按值拷贝（常配合写时复制），引用类型共享同一实例；struct/enum 是值类型，class 是引用类型。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 值类型：struct、enum（以及元组等）赋值/传参时语义是拷贝；Swift 标准库对 Array 等实现 copy-on-write，未修改前可共享底层存储。\n" +
          "2. 引用类型：class 赋值只拷贝引用，多方指向同一对象；身份（identity）用 === 比较，相等性常用 ==。\n" +
          "3. 选型依据：无继承、数据模型、线程安全推理更清晰 → 优先 struct；需要继承、引用语义、Identity、UIKit 对象生命周期 → 用 class。\n" +
          "4. 生态习惯：UIKit 大量 class；SwiftUI 状态多用 struct + 属性包装器，让状态变更可追踪、视图易重建。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "模型、坐标、配置、纯数据优先 struct；需要 Objective-C 互操作、KVO、继承体系或“同一份对象被多处观察”时用 class。不要为了“面向对象”默认 class。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Swift 里 struct/enum 是值类型，赋值拷贝，标准库还用 COW 优化；class 是引用类型，共享实例。值类型更容易推理，尤其多线程；要继承或对象身份就用 class。UIKit 偏 class，SwiftUI 状态偏 struct。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 误以为 struct 赋值一定立刻深拷贝整份数据（忽略 COW：改之前可能仍共享存储）。\n" +
          "- 在 struct 里嵌套 class，以为整体是值语义——内层引用仍会被共享。\n" +
          "- 把“可变”等同于“必须是 class”：var struct 属性也可变，只是赋值是拷贝语义。",
        code:
          "struct Point { var x: Int }\n" +
          "class Person { var name: String }",
        kind: "knowledge",
      },
      {
        category: "Swift 入门",
        question: "Optional 怎么安全解包？",
        answer:
          "【一句话】\n" +
          "Optional 表达“可能没有值”；优先用 if let / guard let、??、可选链安全解包，少用强制 !。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. if let / guard let：绑定非空值；guard 失败提前 return，后面代码扁平、主路径清晰。\n" +
          "2. ?? 提供默认值；可选链 ?. 在中间为 nil 时短路返回 nil，避免层层判断。\n" +
          "3. map / flatMap：对 Optional 做变换（有值才映射），flatMap 可扁平化嵌套 Optional。\n" +
          "4. 强制解包 !：仅在“逻辑上必然非空且失败应立刻崩溃”的极少数场景；业务代码尽量避免。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "入口校验、提前退出用 guard let；局部分支用 if let；展示层可用 ?? 兜底文案；链式取属性用 ?.。异步回调里解包失败要明确降级，不要吞错。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Optional 是类型系统的一部分。我常用 guard let 提前退出，主流程更直；默认值用 ??，属性链路用 ?.。强制解包只在绝对确定时用。还可以用 map/flatMap 做变换，减少嵌套 if。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 习惯性写 !，线上脏数据直接崩溃。\n" +
          "- if let 层层嵌套（金字塔），该用 guard 或提前返回却没用。\n" +
          "- 混淆 Optional.map 与数组 map；或对已解包值再包一层 Optional。",
        code:
          "guard let url = URL(string: s) else { return }\n" +
          "print(url)",
        kind: "knowledge",
      },
      {
        category: "Swift 入门",
        question: "let / var、类型推断、类型注解？",
        answer:
          "【一句话】\n" +
          "let 绑定不可重新赋值，var 可变；编译器可推断类型，对外 API 与复杂类型建议显式注解。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. let：变量名不能指向别的值；若是引用类型，对象内部属性仍可能可变（let person 仍可改 person.name）。\n" +
          "2. var：允许重新赋值；值类型改属性也会触发写时复制等语义。\n" +
          "3. 类型推断：编译器根据右侧表达式推断，减少噪点；但推断失败或可读性差时要注解。\n" +
          "4. 显式注解：公开 API、协议要求、复杂泛型/闭包签名、提升可读性与文档性时优先写清类型。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "默认能 let 就 let，缩小可变范围；局部简单变量可推断；模块边界、函数参数返回值、模型字段尽量写清楚类型。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“我默认用 let，需要变再用 var。注意 let 对 class 只是引用不可换，内容仍可变。类型推断够用就推断，公开接口和复杂类型我会显式注解，方便阅读和审查。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 以为 let 对象完全不可变（忽略引用类型内部可变）。\n" +
          "- 对外暴露推断出的复杂类型，接口一改调用方全炸，却没主动注解稳定契约。\n" +
          "- 滥用类型别名或 Any 掩盖本该明确的类型。",
        code:
          "let id: String = \"1\"\n" +
          "var count = 0",
        kind: "knowledge",
      },
      {
        category: "Swift 入门",
        question: "Array / Dictionary / Set 基础差异？",
        answer:
          "【一句话】\n" +
          "Array 有序可重复，Dictionary 键值映射，Set 无序不重复；三者都是值类型，并常有 copy-on-write。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Array：有序序列，可重复；下标访问、适合列表数据源。\n" +
          "2. Dictionary：Key 须 Hashable；查找平均 O(1)，适合配置、索引、缓存映射。\n" +
          "3. Set：元素唯一且 Hashable；适合去重、成员测试、集合运算（交并差）。\n" +
          "4. 值语义 + COW：赋值后未修改前可共享存储；对副本修改才触发拷贝（如示例中 b.append 不影响 a）。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "UI 列表用 Array；按 id 查对象用 Dictionary；快速判断是否存在/去重用 Set。需要稳定顺序又要唯一时，常用 Array + 额外 Set，或有序结构自行维护。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“三个集合都是值类型。Array 有序可重复，Dictionary 键值，Set 无序唯一。赋值后靠 COW，没改之前共享底层；一改副本才拷贝。选型看是否要顺序、是否要唯一、是否要键查找。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 以为赋值后立刻完全独立拷贝，或反过来以为改副本会影响原数组（未理解 COW 触发点）。\n" +
          "- Dictionary/Set 的 Key 未正确实现 Hashable/Equatable，导致查不到或行为异常。\n" +
          "- 用 Array.contains 做大规模成员测试，性能差却没用 Set。",
        code:
          "var a = [1, 2]\n" +
          "var b = a\n" +
          "b.append(3) // a 仍是 [1,2]",
        kind: "knowledge",
      },
      {
        category: "Swift 入门",
        question: "枚举 enum 能干什么？关联值？",
        answer:
          "【一句话】\n" +
          "枚举可带方法与计算属性；关联值让“同一类状态携带不同载荷”，非常适合状态机与结果建模。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 基础：case 枚举互斥状态；可实现方法、计算属性、遵循协议。\n" +
          "2. 关联值：如 .success(Data)、.failure(Error)，把数据和错误绑在状态上，避免平行可选字段。\n" +
          "3. 模式匹配：switch 必须尽量穷尽；with 绑定关联值，编译器帮查漏。\n" +
          "4. 典型场景：网络加载 .idle/.loading/.success/.failure；页面状态、权限结果、导航意图等。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "互斥状态优先 enum，而不是多个 Bool 组合。需要“状态 + 数据”用关联值；需要原始值映射（原始字符串/整型）可用 raw value。复杂业务可再配合 struct 载荷。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Swift 枚举很强：能有方法，还能关联值。我常用它做加载状态机，success 带数据、failure 带错误，switch 穷尽检查。比一堆 isLoading + optional data 更安全、更清晰。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 用多个独立 Bool/Optional 表达互斥状态，出现 loading 且又有 data 等非法组合。\n" +
          "- switch 漏 case，或滥用 default 掩盖应处理的新状态。\n" +
          "- 关联值过大、频繁拷贝时未考虑用引用或间接存储（高级场景）。",
        code:
          "enum LoadState {\n" +
          "  case idle, loading\n" +
          "  case success(Data)\n" +
          "  case failure(Error)\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "协议 Protocol 与扩展 Extension？",
        answer:
          "【一句话】\n" +
          "协议定义能力契约，类型遵循后获得多态；Extension 可补方法、让已有类型遵循协议，协议扩展还能给默认实现。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Protocol：描述“能做什么”，不绑定具体继承树；面向协议编程是 Swift 主流风格。\n" +
          "2. 遵循与多态：用协议类型或泛型约束编程，便于替换实现、单测 mock。\n" +
          "3. Extension：给现有类型加方法/计算属性；可声明遵循某协议，把适配逻辑放在扩展里。\n" +
          "4. 协议扩展默认实现：共享通用行为；类型可覆盖。注意与“协议要求必须由类型提供”的区分。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "模块边界、可替换依赖用协议；共享算法放协议扩展；给系统类型加点能力用 Extension，但避免污染全局命名空间。UIKit 代理模式与 Swift 协议可结合。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“协议是契约，类型遵循就获得多态。Extension 能给已有类型加方法或遵循协议，协议扩展还能默认实现。这样可以面向协议编程，而不是死绑某个基类。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 协议扩展里的方法若未在协议声明中要求，通过协议类型调用可能走不到类型自己的实现（静态派发相关坑）。\n" +
          "- Extension 乱加 API，可读性与发现成本变高。\n" +
          "- 把协议当成“空接口标签”滥用，缺少真正抽象。",
        code:
          "protocol Drawable { func draw() }\n" +
          "extension Drawable {\n" +
          "  func draw() { print(\"default\") }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "泛型 Generics 解决什么问题？",
        answer:
          "【一句话】\n" +
          "泛型在保持类型安全的前提下复用算法与容器，避免 Any 抹掉类型信息。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 问题：同一套逻辑适用于多种类型，又不想写重复代码或退回 Any。\n" +
          "2. 泛型函数/类型：如 first<T>(_:[T])->T?，编译期保留 T。\n" +
          "3. 约束：where / : Protocol 限制 T 必须具备某些能力（Equatable、Comparable 等）。\n" +
          "4. 协议关联类型：在协议里用 associatedtype 表达“实现者自定的关联类型”，常与泛型协同。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "容器、工具函数、网络层 Decoder 偏好泛型；需要运行时异质集合再考虑类型擦除（any Protocol）或枚举包装。约束写清楚，避免过度灵活导致难用。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“泛型让我复用算法同时保留类型安全，比如通用 first。用 where 约束能力。协议里用关联类型表达实现者自己的类型。尽量少用 Any，否则调用处还要强转。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 到处 Any / AnyObject，编译期安全丢失。\n" +
          "- 约束过宽或过窄：过宽无意义，过窄导致难复用。\n" +
          "- 混淆泛型参数与协议关联类型的使用场景。",
        code: "func first<T>(_ arr: [T]) -> T? { arr.first }",
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "闭包 Closure：逃逸与捕获列表？",
        answer:
          "【一句话】\n" +
          "闭包可捕获外部变量；@escaping 表示函数返回后仍可能执行；用捕获列表 [weak self] 等打破循环引用。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 捕获：闭包默认强捕获外部引用类型，延长其生命周期。\n" +
          "2. @escaping：异步回调、存储起来稍后调用的闭包必须标 escaping；非逃逸默认更易优化。\n" +
          "3. 捕获列表：[weak self] 弱引用；[unowned self] 非可选但生命周期必须保证。\n" +
          "4. 典型场景：网络 completion、动画、通知闭包、Combine sink——都要审视是否形成 self ↔ closure 环。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "异步/存储闭包用 @escaping；捕获 self 不确定生命周期就 weak，进闭包再 guard let self。短生命周期且能证明 self 仍在，才考虑 unowned。值类型捕获注意可变性与 inout 限制。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“闭包会捕获外部变量。escaping 表示返回后还可能跑，比如异步回调。如果 self 强持有闭包、闭包再强持有 self，就泄漏，所以用 [weak self]。不确定生命周期绝不用 unowned。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 忘记 @escaping 导致编译错误，或误把该逃逸的写成非逃逸。\n" +
          "- 逃逸闭包强引用 self 造成泄漏。\n" +
          "- 误用 unowned，对象已释放仍调用 → 崩溃。",
        code: "func load(completion: @escaping (Data) -> Void) { ... }",
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "Error 处理：throw / try / Result？",
        answer:
          "【一句话】\n" +
          "错误用 throw 抛出、调用处 try 处理；Result 适合回调携带成功/失败；async 函数可直接 throws。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. throws：标记可能失败的函数；错误类型常遵循 Error。\n" +
          "2. try / try? / try!：完整处理、转 Optional、强制（失败崩溃）。优先 do-catch 或向上抛。\n" +
          "3. Result：成功 Failure 枚举化，适合 completion 回调、同步管道；可与 get() 再 throw。\n" +
          "4. async/await：异步函数可 throws，用 try await，错误路径更线性。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "新异步代码优先 async throws；回调式 API 用 Result 或 continuation 桥接。领域错误要分类（网络/解码/业务），便于上层提示。少用 try!。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Swift 错误处理是 throw/try。我会 do-catch 或继续上抛。回调里常用 Result 带成功失败。现在更多 async 函数直接 throws，用 try await，比嵌套 completion 清晰。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 空 catch 吞掉错误，线上难查。\n" +
          "- try! 用于可能失败的 IO/解析。\n" +
          "- 错误类型过于笼统（只一个 NSError），或把业务状态也全塞进 Error。",
        code:
          "do {\n" +
          "  let u = try User(json)\n" +
          "} catch {\n" +
          "  print(error)\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "access control：private / fileprivate / internal / public / open？",
        answer:
          "【一句话】\n" +
          "访问控制从 private 到 open 控制可见性与可继承性；模块内默认 internal，框架对外常用 public/open。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. private：限制在声明作用域（类型或文件相关规则以当前 Swift 为准，偏声明所在类型）。\n" +
          "2. fileprivate：整个源文件可见。\n" +
          "3. internal：模块内默认可见，App target 内互通。\n" +
          "4. public：跨模块可用；对 class，默认不能在模块外继承/重写方法。\n" +
          "5. open：允许跨模块继承与重写，框架给可扩展点才用。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "默认尽量收紧：实现细节 private；同文件辅助 fileprivate；App 内模块 internal。做 SDK：对外类型 public，可被子类扩展的类/方法才 open。避免一切都 open。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“默认 internal。private 藏细节，fileprivate 限本文件。跨模块用 public；若还要让别人继承重写，才用 open。做框架时我会刻意区分 public 与 open，避免把继承面敞得太大。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 分不清 public 与 open（以为 public class 就能在别的模块子类化重写）。\n" +
          "- 测试需要访问时乱改成 public，而不是 @testable 或内部测试钩子。\n" +
          "- 过度 open，破坏封装与演进空间。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "Swift 语法",
        question: "property wrapper 是什么？（如 State、Published）",
        answer:
          "【一句话】\n" +
          "属性包装器用包装类型给属性附加存取逻辑，语法糖是 @Wrapper；@State、@Published 都是典型例子。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 本质：包装器持有 storage，通过 wrappedValue 读写；可提供 projectedValue（如 $binding）。\n" +
          "2. 语法：@Wrapper var x 展开为包装器实例 + 计算属性转发。\n" +
          "3. 框架例：SwiftUI @State 管理视图本地状态；Combine @Published 在 willSet 发变更。\n" +
          "4. 自定义：可做 UserDefaults 映射、依赖注入、校验夹具等，但要克制。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "优先用系统/框架提供的包装器理解数据流；自定义包装器适合重复出现的存取模式。读源码时抓住 wrappedValue 与生命周期（谁拥有包装器）。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“属性包装器就是给属性加一层存取逻辑的语法糖。SwiftUI 的 @State、Combine 的 @Published 都是。理解包装器持有 storage 和 wrappedValue，读框架代码会顺很多，也能自己做简单封装。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 分不清 @StateObject / @ObservedObject / @State 等包装器的所有权差异。\n" +
          "- 忽略 projectedValue（$）含义，乱用 Binding。\n" +
          "- 自定义包装器副作用过重，调试困难。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "UIViewController 生命周期关键节点？",
        answer:
          "【一句话】\n" +
          "UIViewController 生命周期围绕视图加载与显隐：viewDidLoad 一次，Appear/Disappear 随显示反复；UI 更新须回主线程。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. viewDidLoad：视图层次第一次加载完成，做一次性初始化（绑控件、基础配置）。\n" +
          "2. viewWillAppear / viewDidAppear：每次即将/已经显示，适合刷新、开始动画、埋点。\n" +
          "3. viewWillDisappear / viewDidDisappear：停止定时器、取消不必要请求、保存草稿等。\n" +
          "4. didReceiveMemoryWarning：释放可重建缓存；现代系统内存压力处理仍需敏感。\n" +
          "5. 线程：网络/后台回调更新 UI 必须切回主线程。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "重资源、只做一次的放 didLoad；依赖“再次可见”的刷新放 Appear。离开页面取消任务，避免回调刷到已释放或不可见界面。SwiftUI 生命周期概念不同，但混用 UIKit 时仍要懂这套。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“viewDidLoad 只来一次，做初始化；Will/DidAppear 每次显示都会走，适合刷新。消失时停定时器、取消请求。网络回调更新 UI 一定回主线程。我还会提内存警告时释放可重建缓存。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 viewDidLoad 假设每次回来都会走，漏刷新。\n" +
          "- Appear 里重复加观察者/启定时器却不在 Disappear 成对移除。\n" +
          "- 后台线程直接改 UI。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "UIView 的 frame / bounds / center？",
        answer:
          "【一句话】\n" +
          "frame 是父坐标系中的位置与大小；bounds 是自身坐标系；center 是父坐标系中心点；变换时多用 bounds+center 思考。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. frame：相对父视图的 origin + size；改 frame 影响布局位置。\n" +
          "2. bounds：自身坐标空间，原点常 (0,0)，size 多为可视区域；滚动时 origin 会变（如 UIScrollView）。\n" +
          "3. center：父坐标系下中心点，旋转缩放时常配合 center 定位。\n" +
          "4. transform：有变换时 frame 可能是轴对齐包围盒，语义易混，优先 bounds/center。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "纯手写布局可改 frame；Auto Layout 下少直接打架改 frame。做动画、旋转、自定义绘制时分清父/子坐标系。命中测试、绘制在 bounds 坐标。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“frame 看在父视图里的位置大小，bounds 是自己的坐标系，center 是父坐标系中心。有 transform 时 frame 容易误导，我会用 bounds 加 center 来想。ScrollView 的 bounds.origin 还会反映滚动偏移。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 旋转后仍死盯 frame 做精确计算。\n" +
          "- 混淆 bounds.origin 与 frame.origin（尤其滚动视图）。\n" +
          "- Auto Layout 与手动改 frame 混用导致约束冲突或下一轮 layout 被覆盖。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "Auto Layout 基础：约束与优先级？",
        answer:
          "【一句话】\n" +
          "Auto Layout 用约束描述相对关系；优先级区分必需与可破约束，Hugging/CompressionResistance 决定谁被挤谁撑开。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 约束：相对、等式/不等式、常数与倍率；避免写死所有 frame。\n" +
          "2. 优先级：1000 为 required；降低优先级可做“尽量满足”的弹性布局。\n" +
          "3. contentHugging：抗被拉大；compressionResistance：抗被压小。Label/Button 常靠这两项解决左右抢空间。\n" +
          "4. Intrinsic Content Size：控件固有尺寸参与求解；冲突会在控制台打约束打断日志。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "先定关键边与对齐，再处理多控件抢宽：谁不能截断就提高其 compressionResistance。动态字体、多语言下用不等式与低优先级更好扩展。复杂界面可拆栈视图降低约束数量。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Auto Layout 描述相对关系而不是写死 frame。优先级 1000 必需，可降级做弹性。谁不能被挤扁就提高 compressionResistance，谁别被撑太开就调 hugging。冲突看控制台，Label 还要考虑固有内容尺寸。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 约束不足或过度约束导致模糊/冲突。\n" +
          "- 忽略多语言长文案，未设压缩抗性导致截断或布局爆炸。\n" +
          "- 在 layoutSubviews 里反复改常量却不懂会触发循环布局。",
        code: "label.setContentCompressionResistancePriority(.required, for: .horizontal)",
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "UITableView 复用机制在干什么？",
        answer:
          "【一句话】\n" +
          "UITableView 把屏幕外 cell 放进复用池，dequeue 后重新配置，避免为每行新建视图；配置必须完整重置状态。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 复用池：滑出屏幕的 cell 回收，标识符对应一类 cell。\n" +
          "2. dequeueReusableCell：取出后必须按当前 indexPath/模型重新赋值。\n" +
          "3. 状态重置：勾选、高亮、图片、手势、异步任务都要在复用时清理（prepareForReuse）。\n" +
          "4. 异步回调：返回时校验 indexPath 或模型 id，防止错位。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "注册 cell，cellForRow 只做绑定；耗时加载异步并带取消。优先 DiffableDataSource 减少 reload 粒度。固定/缓存行高有助滚动性能。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“TableView 复用是为了少创建视图：屏幕外进池，dequeue 再配。关键是每次完整重置，异步图片要校验还是不是这个 indexPath，prepareForReuse 清空旧状态，否则会串数据。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只在“有值”时设置，无值分支不清空 → 复用残留。\n" +
          "- 异步图片/网络回来不校验，导致错图。\n" +
          "- 在 cell 里累积加 target/手势，越滑越多重触发。",
        code: "let cell = tableView.dequeueReusableCell(withIdentifier: \"id\", for: indexPath)",
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "UINavigationController 与模态呈现？",
        answer:
          "【一句话】\n" +
          "UINavigationController 用 push/pop 做层级钻取；模态 present/dismiss 做临时流程；注意呈现链路与 iOS 13+ sheet 行为。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 导航栈：层级关系清晰，返回栈自然；适合详情钻取。\n" +
          "2. 模态：登录、编辑、选择器等临时任务；完成后 dismiss。\n" +
          "3. 呈现者：谁 present 谁形成链路；找 top VC、解耦路由时要统一。\n" +
          "4. iOS 13+：默认 pageSheet 可下拉关闭，需 isModalInPresentation 等处理“未保存离开”。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "信息架构是树状下钻 → 导航栈；打断主流程的任务 → 模态。深链/路由层统一 push 或 present，避免到处写死。SwiftUI 用 NavigationStack / sheet 对应类似语义。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“导航栈适合层级 push/pop；模态适合临时流程 present/dismiss。要清楚谁 present 的，方便 dismiss。还会提 iOS 13 后 sheet 可下拉关闭，编辑页要处理防误关。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 在已模态的 VC 上又乱 present，链路混乱难 dismiss。\n" +
          "- 忽略下拉关闭导致数据未保存。\n" +
          "- 该进栈的用模态，返回逻辑与预期不一致。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "UIKit",
        question: "事件传递与响应者链？",
        answer:
          "【一句话】\n" +
          "触摸先命中最前端视图，再沿响应者链向上找能处理的对象；可自定义 hitTest，手势识别器也会参与竞争。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 命中：从窗口向下 hit-test，找最深可交互视图。\n" +
          "2. 响应者链：该视图 → superview → viewController → … → window → application。\n" +
          "3. 自定义：重写 hitTest(_:with:) / point(inside:with:) 扩大/缩小热区或穿透。\n" +
          "4. 手势：UIGestureRecognizer 与控件事件存在失败关系、同时识别等配置。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "扩大按钮热区可改 point(inside:)；让下层接收事件可让上层 isUserInteractionEnabled = false 或 hitTest 返回下层。复杂交互先理清手势依赖，再写业务。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“系统先 hit-test 找到最前视图，处理不了就沿响应者链往上传。我可以重写 hitTest 或 pointInside 改热区。手势识别器会和控件抢事件，要用失败关系配置清楚。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 子视图超出父 bounds 点不到（父 clips 或 hitTest 默认不测界外）。\n" +
          "- 透明大视图挡住下层点击却不知道。\n" +
          "- 手势与 tableView 滚动冲突未设置 delegate。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "生命周期",
        question: "App 前后台：scene / application 回调？",
        answer:
          "【一句话】\n" +
          "App 在 active / inactive / background 等状态间切换；进后台要暂停非必要工作，回前台再刷新；Scene 与 AppDelegate 职责都要能讲清。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 常见路径：active → inactive → background；回前台再经 inactive → active。\n" +
          "2. 后台：停定时器、暂停播放/定位（按策略）、断开非必要连接、保存状态。\n" +
          "3. 前台：刷新数据、恢复动画、重新订阅。\n" +
          "4. 多场景：SceneDelegate 管窗口场景；AppDelegate 管进程级。多窗口 iPad 更明显。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "观察 scenePhase（SwiftUI）或 scene/application 回调做资源管理。长时间任务用后台任务 API，勿假设后台能无限跑。状态恢复与用户隐私权限变化也要在回前台处理。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“前后台会走 active、inactive、background。进后台我停定时器、砍非必要网络；回前台刷新。多窗口时代 SceneDelegate 管场景，AppDelegate 管进程，两边职责要分清。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只写 AppDelegate 忽略 Scene 回调，多场景下不触发预期逻辑。\n" +
          "- 后台仍狂跑定时器耗电被杀。\n" +
          "- 回前台不处理 token/权限变更导致功能 silently fail。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "SwiftUI",
        question: "State / Binding / ObservedObject / StateObject？",
        answer:
          "【一句话】\n" +
          "@State 是视图私有状态；@Binding 是双向绑定；@StateObject 由视图创建并拥有 ObservableObject；@ObservedObject 只观察外部传入，不负责创建。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. @State：值类型本地状态，变更触发刷新；适合简单 UI 状态。\n" +
          "2. @Binding：子视图读写父状态，不拥有数据源。\n" +
          "3. @StateObject：创建并拥有 ViewModel，视图重建时保持对象稳定。\n" +
          "4. @ObservedObject：对象由外部注入；若在 body 里直接 init 传入，可能被反复创建导致状态重置。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "谁创建谁用 @StateObject；向下传递用 @ObservedObject 或 @Bindable（新版本）。父子传值字段用 @Binding。跨层共享再考虑 EnvironmentObject。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“@State 管视图自己的小状态，@Binding 给子视图双向改。ObservableObject 若由视图创建并拥有，用 @StateObject；外部传入用 @ObservedObject。选错会在刷新时把 ViewModel 重建、状态丢光。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 View 里 @ObservedObject var vm = VM() 每次重建都新对象。\n" +
          "- 把大对象塞进 @State 造成不必要拷贝/刷新。\n" +
          "- 子视图该用 Binding 却传来拷贝，改了不生效。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "SwiftUI",
        question: "View 是什么？为什么说它是轻量描述？",
        answer:
          "【一句话】\n" +
          "SwiftUI 的 View 是协议，body 是 UI 的轻量描述；框架按状态差分更新，Identity 影响动画与状态保留。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. View：描述“看起来什么样”，不是 UIKit 那种重量级实例树手工持有。\n" +
          "2. 轻量：结构体很小，可频繁创建；真正渲染由系统管理。\n" +
          "3. 纯度：尽量无副作用；副作用放 onAppear、task、ViewModel。\n" +
          "4. Identity：显式 id、条件分支结构变化会影响是否保留 @State、动画是否连贯。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "拆小 View，入参明确；重逻辑进 ViewModel。列表用稳定 id。避免在 body 里做网络/磁盘。需要 UIKit 能力再用 Representable 包一层。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“View 是协议，body 描述结构，SwiftUI 按状态差分更新。所以 View 应小而纯，副作用放生命周期或 ViewModel。id 会影响身份，进而影响状态保留和动画。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 body 里造副作用或创建重对象。\n" +
          "- 不稳定 id 导致列表状态错乱、动画异常。\n" +
          "- 把 View 当成 UIViewController，试图长期持有可变 UI 句柄。",
        code:
          "struct TitleView: View {\n" +
          "  var text: String\n" +
          "  var body: some View { Text(text) }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "SwiftUI",
        question: "Environment 与 EnvironmentObject？",
        answer:
          "【一句话】\n" +
          "@Environment 读取系统/框架注入值；@EnvironmentObject 读取祖先注入的共享 ObservableObject，避免层层传参。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. @Environment：色调、locale、dismiss、sizeCategory 等环境值。\n" +
          "2. @EnvironmentObject：跨多层共享会话、主题、依赖容器等。\n" +
          "3. 注入：祖先调用 .environmentObject(_:)；缺失会运行时崩溃。\n" +
          "4. 适用：主题、账号会话、app 级服务；不适合极度局部的一次性状态。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "系统能力优先 Environment；跨多层同一对象用 EnvironmentObject；仅父子一层用普通参数/Binding 更清晰。测试时可注入假对象。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“@Environment 读框架注入的环境值，比如 dismiss。@EnvironmentObject 用来跨多层共享 ObservableObject，祖先要 environmentObject 注入。适合主题和会话，避免一层层参数往下传，但别滥用成隐形全局。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 忘记注入导致崩溃。\n" +
          "- 把所有状态都塞 EnvironmentObject，依赖关系变隐式、难测。\n" +
          "- 与 StateObject 所有权混乱，多人写同一对象无规范。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "SwiftUI",
        question: "List / NavigationStack 基础用法概念？",
        answer:
          "【一句话】\n" +
          "List 做数据驱动列表，id 必须稳定；NavigationStack 用路径/值驱动导航，比旧 NavigationView 更可控。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. List：声明式列表，配合 ForEach；注意性能与行身份。\n" +
          "2. 稳定 id：模型应用持久标识，避免用下标当 id。\n" +
          "3. NavigationStack：用 NavigationPath 或 Hashable 值驱动，支持深链与程序化返回。\n" +
          "4. 大数据：模型轻量、图片异步、避免每行过重计算。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "新项目用 NavigationStack；简单设置页 List 足够。需要极致性能的复杂列表可回 UIKit Table/Collection。导航状态尽量可编码，便于状态恢复。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“List 适合数据驱动，关键是 id 稳定。导航我用 NavigationStack，用路径或值驱动，比老 NavigationView 好控。大数据仍要注意模型轻量和图片加载，不然一样卡。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 用 index 当 id，插入删除后状态错绑。\n" +
          "- NavigationView 双栏/栈行为在不同平台不一致却未测。\n" +
          "- List 里塞重型实时计算导致滚动掉帧。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "内存",
        question: "ARC 与循环引用怎么破？",
        answer:
          "【一句话】\n" +
          "ARC 按强引用计数管理内存；闭环强引用会导致泄漏，常用 [weak self]、weak 代理，并警惕 Timer、通知、Combine 等持有。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. ARC：强引用为 0 时释放；编译器插入 retain/release。\n" +
          "2. 环：对象↔闭包、父子互相强持有、委托双方强引用等。\n" +
          "3. 破环：闭包 [weak self]；delegate 用 weak；注意临时 strong 保活。\n" +
          "4. 隐藏泄漏源：Timer（target 强持有）、NotificationCenter 闭包、Combine AnyCancellable 未保存/未取消、强引用闭包属性。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "设计所有权单向：父持有子，子弱回指父。异步回调弱引用 self。用 Instruments Leaks/Memory Graph 验证。Swift 里还能用未拥有的任务取消策略降低滞留。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“ARC 看强引用计数，为 0 释放。循环引用常见于闭包和代理，闭包用 weak self，代理用 weak。我还会提 Timer、通知、Combine sink 这些隐蔽持有，用 Memory Graph 排查。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只 weak 了 self，但闭包又强捕获了其他会反向持有 self 的对象。\n" +
          "- Timer 不加 invalidation，对象永不释。\n" +
          "- 以为 Swift 无泄漏（值类型多也不等于无环）。",
        code:
          "foo { [weak self] in\n" +
          "  guard let self else { return }\n" +
          "  self.reload()\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "内存",
        question: "weak 和 unowned 怎么选？",
        answer:
          "【一句话】\n" +
          "weak 是可选弱引用，对象释放后变 nil；unowned 非可选，假定对方生命周期更长，用错会野指针崩溃。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. weak：不增加引用计数；适合生命周期不确定的回指。\n" +
          "2. unowned：不置 nil，访问时对象必须仍存活；用于“同生共死且可证明”的关系。\n" +
          "3. 选型原则：不确定 → weak；能严格证明 → 才 unowned（如子对象生命周期绑定在父内且不会先死）。\n" +
          "4. 闭包：绝大多数 UI/异步场景选 weak。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "代理、逃逸闭包、通知观察默认 weak。性能敏感且关系清晰的内部模块才考虑 unowned。与 Objective-C unsafe_unretained 风险类似，更要谨慎。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“weak 更安全，释放变 nil。unowned 非可选，但对象没了再访问就崩。我不确定就 weak；只有能证明对方一定还在才 unowned。异步回调基本都用 weak self。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 异步里用 unowned self，请求返回时 VC 已释放 → 崩溃。\n" +
          "- 把 unowned 当性能万能药。\n" +
          "- weak 后不做 nil 判断就强制解包。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "内存",
        question: "autoreleasepool 什么时候有用？",
        answer:
          "【一句话】\n" +
          "在紧循环创建大量临时 ObjC/桥接对象时，用 autoreleasepool 可提前回收，降低峰值内存；纯 Swift 值类型收益有限。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Autorelease：对象延迟到 pool drain 再释放；RunLoop 每圈通常有池。\n" +
          "2. 紧循环：大量临时 UIImage、字符串桥接等，若不包池，峰值会堆到循环结束。\n" +
          "3. 适用：批量导入、大图处理、后台线程紧循环。\n" +
          "4. 局限：纯 Swift 值类型、已明确管理的对象，收益不明显。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "Profiling 看到循环中内存锯齿飙高再加；每个迭代包一层 autoreleasepool { }。子线程自己跑长时间任务也要考虑池。不要无脑包所有代码。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“主线程 RunLoop 自带池，但紧循环里大量临时 ObjC 对象会积压到循环结束。这时包 autoreleasepool 能削峰值。处理大图、批量导入常见。纯 Swift 值类型往往收益不大。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 误以为 Swift 完全没有 autorelease 问题（桥接/UIKit API 仍可能产生）。\n" +
          "- 在无关紧要处乱包，代码吵杂无收益。\n" +
          "- 忽略真正泄漏，只用 pool 掩盖峰值问题。",
        code:
          "for item in bigList {\n" +
          "  autoreleasepool { process(item) }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "并发",
        question: "GCD 和 async/await 怎么理解？",
        answer:
          "【一句话】\n" +
          "GCD 是队列派发模型；Swift Concurrency 用 async/await、Task、Actor 在语言层管理异步与隔离；UI 必须在主线程/主 Actor 更新。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. GCD：main / global 队列，async/sync 派发，历史代码与系统 API 常见。\n" +
          "2. Swift Concurrency：async/await 线性写异步；Task 启动；结构化并发更好取消。\n" +
          "3. Actor：隔离可变状态，降低数据竞争。\n" +
          "4. UI：UIKit/SwiftUI 更新在 MainActor；混用 GCD 时仍要切回主队列。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "新代码优先 async/await；与回调 API 用 continuation 桥接。CPU 重活 Task.detached 或后台队列，结果回主 Actor。理解两者互操作，避免嵌套地狱。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“GCD 是往队列丢任务。Swift Concurrency 用 async/await 和 Actor，编译期更能防线程问题。无论哪种，UI 必须在主线程或 MainActor。我会用 Task 拉网络再 await MainActor 更新界面。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 后台线程更 UI。\n" +
          "- async 里同步阻塞（sync 网络/锁）卡住线程池。\n" +
          "- 取消传播未处理，任务泄漏或过期回调。",
        code:
          "Task {\n" +
          "  let data = try await api.fetch()\n" +
          "  await MainActor.run { self.label.text = data }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "并发",
        question: "串行队列 vs 并发队列？同步 vs 异步？",
        answer:
          "【一句话】\n" +
          "串行队列任务依次执行，并发队列可并行；async 投递后立即返回，sync 等待结束——在主线程 sync 主队列会死锁。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 串行：同一队列任务不重叠，常用于保护共享可变状态。\n" +
          "2. 并发：可并行，实际并行度由系统决定。\n" +
          "3. async：异步投递；sync：当前线程等待目标队列跑完。\n" +
          "4. 死锁经典：主线程 DispatchQueue.main.sync { ... }。\n" +
          "5. 进阶：barrier 做并发队列上的独占写；或改用 actor。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "读写分离可用并发队列 + barrier，或直接 actor。UI 相关用主队列 async。避免层层 sync。能 async/await 表达的串行依赖优先结构化并发。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“串行依次，并发可并行。async 丢了就返回，sync 要等做完。最要命的是主线程对主队列 sync，会死锁。保护状态可以用串行队列，现在也常用 Actor。读写可用 barrier。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 主线程 main.sync 死锁。\n" +
          "- 并发队列上无保护地读写共享可变状态 → 数据竞争。\n" +
          "- 滥用全局并发队列做大量 sync，拖垮线程。",
        code:
          "DispatchQueue.global().async {\n" +
          "  let img = load()\n" +
          "  DispatchQueue.main.async { imageView.image = img }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "并发",
        question: "Actor 解决什么问题？",
        answer:
          "【一句话】\n" +
          "Actor 隔离可变状态，外部通过 await 访问，降低数据竞争；MainActor 标记 UI 相关工作。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 问题：多任务同时改同一可变状态会产生数据竞争。\n" +
          "2. Actor：内部串行化访问；跨 actor 调用需 await。\n" +
          "3. MainActor：UI 模型/方法隔离到主线程。\n" +
          "4. 对比：替代手写“串行队列保护属性”的模式，还有编译器检查加持。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "缓存、会话存储、计数器等共享可变状态可做成 actor。UI 类型标 @MainActor。注意 actor 重入：await 期间状态可能变化，要重新读条件。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Actor 把可变状态隔离开，外面要 await 才能碰，减少数据竞争。MainActor 专门跑 UI。它基本能替代我以前用串行队列保护属性的写法，还更安全。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 actor 方法里 await 后再假设前后状态不变（重入）。\n" +
          "- 把所有东西塞进一个巨大 actor，变成新瓶颈。\n" +
          "- UI 未标 MainActor 仍后台碰 UIKit。",
        code:
          "actor Counter {\n" +
          "  var value = 0\n" +
          "  func inc() { value += 1 }\n" +
          "}",
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "URLSession 基本用法概念？",
        answer:
          "【一句话】\n" +
          "URLSession 负责网络传输；现代写法常用 async data(from:)；要分层处理超时、取消、状态码与解码，并关注 ATS/证书。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. API：dataTask 回调；或 URLSession.shared.data(from:) / data(for:) async。\n" +
          "2. 分层错误：传输失败、HTTP 非 2xx、解码失败应分开，便于提示与重试。\n" +
          "3. 取消：Task 取消、URLSessionTask.cancel；页面消失要取消。\n" +
          "4. 安全与上架：ATS 默认 HTTPS；证书固定/校验是常见考点；后台下载用后台 session。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "封装统一 Client：注入 session、处理鉴权头、映射错误。超时按接口类型配置。大文件下载走 downloadTask/后台会话。日志注意脱敏。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“现在我多用 async 的 URLSession.data。会区分网络错误、HTTP 状态码错误和解码错误。支持取消，进后台或离开页面停掉。上架还要讲 ATS，默认走 HTTPS。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只看 data 非空就当成功，忽略 statusCode。\n" +
          "- 不取消请求，错序回调刷新旧页。\n" +
          "- 明文 HTTP 或随便关掉 ATS 应付调试。",
        code: "let (data, resp) = try await URLSession.shared.data(from: url)",
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "Codable 是做什么的？",
        answer:
          "【一句话】\n" +
          "Codable（Encodable & Decodable）把模型与 JSON 等数据互转；用 CodingKeys、可选与自定义 decode 应对脏数据。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 合成：字段类型也 Codable 时可自动生成实现。\n" +
          "2. CodingKeys：映射蛇形/不同字段名；忽略勿暴露字段。\n" +
          "3. 容错：可选、默认值、自定义 init(from:) 处理缺字段、类型漂移。\n" +
          "4. 性能：大 JSON 宜在后台线程解码，再回主线程赋模型。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "API 模型用 struct + Codable；不稳定后端加强容错。日期/小数等用策略或包装类型。需要与字典混用时可结合 JSONSerialization，但优先强类型。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“Codable 就是 Encodable 加 Decodable，模型跟 JSON 互转。字段名不同用 CodingKeys，脏数据就可选或自定义 decode。大 JSON 我会放后台解码，避免卡主线程。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 后端改字段导致整页解码失败，无降级。\n" +
          "- 主线程解码巨大 payload 掉帧。\n" +
          "- Date 策略不统一，时区错乱。",
        code: "struct User: Codable { let id: Int; let name: String }",
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "UserDefaults / Keychain / 文件 怎么选？",
        answer:
          "【一句话】\n" +
          "UserDefaults 存小配置非敏感；Keychain 存 token/密码；大体积或结构化数据用文件/数据库。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. UserDefaults：开关、偏好、轻量标记；不适合大数据与机密。\n" +
          "2. Keychain：敏感凭据，系统级保护；注意可访问性级别。\n" +
          "3. 文件：FileManager 存文档/缓存；分清 Documents 与 Caches。\n" +
          "4. 数据库：Core Data、SQLite/GRDB 等，适合结构化查询与大量记录。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "登录态 token → Keychain；主题/是否看过引导 → UserDefaults；离线列表/消息 → DB；图片缓存 → 磁盘缓存目录。遵守备份与隐私要求。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“小配置用 UserDefaults，敏感信息进 Keychain，大体积或要查询的用文件和数据库。别把 token 放 UserDefaults，也别把大 JSON 塞偏好里。”\n" +
          "\n" +
          "【易错点】\n" +
          "- Token 放 UserDefaults。\n" +
          "- 用 UserDefaults 存整表数据导致启动慢、易丢一致性。\n" +
          "- 缓存放 Documents 占用户 iCloud 备份配额。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "网络与存储",
        question: "NotificationCenter 使用注意？",
        answer:
          "【一句话】\n" +
          "NotificationCenter 适合广播解耦，但易滥用；要成对移除观察者，闭包注意循环引用，能用更明确数据流时优先替代。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 用途：一对多通知，跨模块广播（如登录态变更）。\n" +
          "2. 生命周期：add/remove 成对；iOS 较新 block API 用 token 管理。\n" +
          "3. 内存：闭包观察强捕获 self 易环；对象型 selector 观察也要在 deinit 移除（视 API）。\n" +
          "4. 替代：delegate、回调、Combine、AsyncStream、明确 Router 事件，链路更好追。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "真正一对多、发送方不该认识接收方时用通知；业务主链路少用。命名加模块前缀，payload 用 userInfo 并文档化。Swift 里可封装弱观察者。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“通知能解耦，但乱发会难追踪。观察要成对移除，闭包要防循环引用。能用委托、Combine 或 async 流把数据流说清楚的，我优先更明确的方式。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 漏 remove 导致野通知或泄漏。\n" +
          "- 通知泛滥成隐形架构，调试靠猜。\n" +
          "- 在通知里做重活堵主线程。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "性能基础",
        question: "主线程都该干什么、不该干什么？",
        answer:
          "【一句话】\n" +
          "主线程负责 UI 与交互响应；不要做重计算、大图解码、大 JSON、同步磁盘/网络——卡顿多半是主线程被堵。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 该做：布局、绘制提交、触摸响应、轻量状态更新。\n" +
          "2. 不该做：解码大图、复杂正则/排序大数据、同步写库、同步网络。\n" +
          "3. 表现：掉帧、滑动粘滞、启动慢。\n" +
          "4. 排查：Time Profiler 看主线程热点；优化是挪到后台再回调主线程刷 UI。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "耗时任务进后台队列/Task，结果 MainActor 更新。列表滚动路径保持 O(轻)。启动路径延迟非关键初始化。建立“主线程预算”意识。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“主线程只做 UI 和交互。重计算、大图解码、大 JSON、同步 IO 都要避开。掉帧多数是主线程堵了，我会用 Time Profiler 找栈，然后异步化再回主线程更新。”\n" +
          "\n" +
          "【易错点】\n" +
          "- cellForRow 里同步解码图片。\n" +
          "- 以为“只是读本地文件”就可同步（大文件同样卡）。\n" +
          "- 回调已经在后台却直接改 UI。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "性能基础",
        question: "离屏渲染大致是什么？",
        answer:
          "【一句话】\n" +
          "离屏渲染指在屏外位图上下文先画再合成，圆角+阴影、遮罩、光栅化等可能触发，增加 GPU/内存开销；列表里要慎用。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 概念：额外 offscreen buffer，成本高于简单混合。\n" +
          "2. 常见触发：masksToBounds + 阴影、复杂 mask、某些模糊、强制光栅化不当使用等（随系统版本有差异）。\n" +
          "3. 列表风险：每行都触发，滚动时 GPU 忙、掉帧升内存。\n" +
          "4. 优化：能切图/预先生成圆角图就少实时 mask；不透明优化；用 Instruments Core Animation 看黄/红提示。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "视觉需求与性能权衡：静态装饰可预渲染；滚动热路径保持简单图层。cornerRadius 在不透明视图上通常更便宜，组合阴影要小心。先 Instrument 再优化，避免神话式结论。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“离屏渲染是先画到屏外再合成，圆角加阴影、遮罩等可能触发，列表里特别伤。优化是减少复杂效果、能切图就切图，并用 Core Animation Instrument 验证，而不是凭感觉。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 给每个 cell 同时圆角、阴影、mask。\n" +
          "- 听说离屏就盲目 shouldRasterize，缓存失效反而更慢。\n" +
          "- 不测量就大改 UI。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "架构",
        question: "MVC / MVP / MVVM 在 iOS 里怎么理解？",
        answer:
          "【一句话】\n" +
          "UIKit 经典 MVC 易变成臃肿 VC；MVVM 把状态与转换放进 ViewModel 利于测试；SwiftUI 天然偏 MVVM——选架构看团队与复杂度。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. MVC：Model-View-Controller；iOS 里 VC 常兼 view 与协调，易 Massive ViewController。\n" +
          "2. MVP：Presenter 承担展示逻辑，View 更被动。\n" +
          "3. MVVM：View/VC 绑 ViewModel；网络、映射、校验下沉；便于单测。\n" +
          "4. SwiftUI：状态驱动，天然 View + ViewModel/Observable。\n" +
          "5. 原则：别为模式而模式，边界清晰、可测、团队能维护最重要。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "中小页面 MVC/轻 MVVM 即可；复杂表单、多状态、要单测 → MVVM。跨页协调可用 Router/Coordinator，不必上完整 VIPER。统一一层网络与模型转换比纠结缩写更重要。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“UIKit MVC 很容易把 VC 写胖。我会把网络和转换下沉到 ViewModel，VC 管绑定和生命周期，这就是 MVVM。SwiftUI 更自然。架构要看复杂度和团队，不为模式而模式。”\n" +
          "\n" +
          "【易错点】\n" +
          "- ViewModel 又变成第二个 Massive 对象。\n" +
          "- 过度分层，小功能也五六层。\n" +
          "- 口头 MVVM，实际 VC 仍直接铺网络代码。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "架构",
        question: "依赖注入为什么有用？",
        answer:
          "【一句话】\n" +
          "依赖注入把网络、存储等从外部传入，避免在 VC 内部写死创建；便于 mock 测试与替换实现。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 问题：VC/VM 内部直接 new APIClient，测试难、替换难、耦合高。\n" +
          "2. 形式：构造器注入、属性注入、Environment/EnvironmentObject、轻量容器/组装根。\n" +
          "3. 好处：单测塞 Fake；多环境（mock/staging/prod）切换；职责更清晰。\n" +
          "4. 粒度：注入协议而非具体类，面向抽象。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "默认构造器注入 api、repository。SwiftUI 可用 environment 注入。App 启动组装依赖图，向下传递。避免到处 Service Locator 隐形全局，除非有规范。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“依赖注入就是别在 VC 里写死 new。通过 init(api:) 传进来，测试可以 mock，实现也能替换。形式不限，构造器注入最直观，SwiftUI 也能用环境对象。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只注入具体类，仍难 mock。\n" +
          "- 容器过度复杂，启动装配比业务还重。\n" +
          "- 循环依赖（A 需 B、B 需 A）说明边界没划清。",
        code: "init(api: APIClient) { self.api = api }",
        kind: "knowledge",
      },
      {
        category: "系统能力",
        question: "权限与隐私：相册/相机/定位要注意什么？",
        answer:
          "【一句话】\n" +
          "相册/相机/定位等须在 Info.plist 写清用途；先查授权再请求；拒绝要有降级；勿反复弹系统框；审核对隐私与 ATT 很严。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Info.plist：NSPhotoLibraryUsageDescription 等用途文案必填且真实。\n" +
          "2. 流程：读 authorizationStatus → 未决定再 request → 已拒绝引导去设置，而非死循环弹框。\n" +
          "3. 降级：无权限仍可浏览非敏感功能，给说明与入口。\n" +
          "4. 审核：隐私清单、追踪 ATT、精确/模糊定位选择都要合规。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "在功能触发点请求（just-in-time），不要启动就连环申请。最小权限原则：能选照片库受限访问就别开完全访问。统一 Permission 管理器。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“权限要在 plist 写用途说明，先查状态再请求。被拒要有降级 UI，别反复弹系统框。上架对隐私清单和 ATT 很严，定位也要说明是否需要精确。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 缺用途文案导致崩溃或拒审。\n" +
          "- 启动一次性申请所有权限，体验与审核双差。\n" +
          "- 拒绝后无引导，功能静默失败。",
        code: '',
        kind: "knowledge",
      },
      {
        category: "系统能力",
        question: "推送通知：远程与本地？",
        answer:
          "【一句话】\n" +
          "推送需先请求授权；远程依赖 APNs 与设备 token；本地适合定时提醒；前台展示与点击路由要统一处理。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 授权：UNUserNotificationCenter 请求；未授权无提醒。\n" +
          "2. 远程：注册远推 → 拿到 device token → 交给服务端；经由 APNs 下发。\n" +
          "3. 本地：日历/间隔触发，不依赖服务器，适合提醒类。\n" +
          "4. 体验：前台代理决定是否展示；点击通知解析 userInfo 走统一路由；注意冷启动与热启动路径。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "运营消息走远程；闹钟式提醒可本地。封装 NotificationRouter 处理跳转。token 刷新、注销登录解绑要同步服务端。测试用沙盒/生产环境证书区分。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "“先请求通知授权。远程推送把 device token 给服务器，走 APNs；本地通知适合定时提醒。还要统一前台展示策略和点击后的路由，冷启动也能进对页面。”\n" +
          "\n" +
          "【易错点】\n" +
          "- 只实现注册，不处理点击跳转。\n" +
          "- 忽略 token 更新，推到旧设备。\n" +
          "- 前台收不到以为坏了，实际未实现前台展示代理。",
        code: '',
        kind: "knowledge",
      }
    ],
    interviews: [
      {
        category: "iOS 实战",
        question: "tableView 卡顿常见原因？",
        answer:
          "【一句话】\n" +
          "UITableView 卡顿多半是主线程在滚动时被重活堵住，或 cell 配置/布局/渲染成本过高。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 主线程解码大图：在 cellForRow 或回调里同步 UIImage(data:) / imageNamed 大图，滚动帧被占满，掉帧最常见。\n" +
          "2. cell 复用不当：未在 prepareForReuse 重置勾选、高亮、异步回调；旧任务回写错 cell，既花时间又造成闪烁重绘。\n" +
          "3. 复杂圆角阴影与离屏渲染：masksToBounds+shadow、光栅化、大量透明混合会加重 GPU；列表里每帧代价放大。\n" +
          "4. 高度计算过重：每次估算都跑完整 Auto Layout 或未缓存高度，滑动时频繁 measure。\n" +
          "5. 约束冲突/频繁失效：约束反复打破重建，或 cell 内层级过深，布局系统开销飙升。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "排查：Instruments → Time Profiler 看主线程热点；Core Animation 看离屏/混合。优化顺序：异步解码并按显示尺寸缩放 → 固定行高或缓存高度 → 简化 cell 层级与阴影 → 预加载可见区外一屏数据。图片优先用 Kingfisher 等带解码/取消的库。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「列表卡顿我先分主线程阻塞和渲染成本。常见是大图同步解码、高度反复计算、cell 复用状态没清。我会用 Time Profiler 定位，再异步解码、缓存高度、减离屏渲染，必要时预加载。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只 reloadData 不查主线程，误以为「数据源问题」。\n" +
          "- 给每个 cell 加圆角+阴影却不测滚动帧率。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "如何设计网络层错误与登录过期？",
        answer:
          "【一句话】\n" +
          "网络错误与登录过期应在统一 Client 层集中映射与拦截，业务 VC 只消费领域错误，401 走全局登出/续登流程。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 统一 Client：拼 Header、发请求、解包 HTTP 状态码与业务 code，映射成 AppError（网络/超时/业务/鉴权）。\n" +
          "2. 401 登录过期：清 Token/Session，发通知或走 AppCoordinator 进登录页，避免每个 VC 复制粘贴跳转。\n" +
          "3. 错误分层：传输失败、HTTP 非 2xx、JSON 解码失败、业务 code 失败要分开，UI 文案与重试策略不同。\n" +
          "4. 可观测性：统一打日志/埋点（path、code、requestId），方便线上排查。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "拦截器/中间件处理鉴权头与 401；业务层用 Result 或 throws 的领域错误。未登录深链目标可缓存，登录成功后续跳。多请求并发 401 要配合「单飞刷新 Token」，不要每个请求各自弹登录。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「我会做统一网络层：解包、映射错误码。遇到 401 清 Token，走协调器进登录，业务页不各自处理。错误分网络、解码、业务三类，UI 按类型提示和重试。」\n" +
          "\n" +
          "【易错点】\n" +
          "- VC 里各自 if status==401，漏改导致行为不一致。\n" +
          "- 把所有失败都提示「网络错误」，掩盖业务鉴权问题。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "Instrument 你会先看哪几项？",
        answer:
          "【一句话】\n" +
          "先用 Time Profiler / Allocations / Core Animation 分清是 CPU 热点、内存泄漏还是渲染问题，再结合复现路径下钻。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Time Profiler：找主/子线程热点函数，确认是否解码、JSON、布局、锁等待。\n" +
          "2. Allocations / Leaks：看内存曲线、泄漏对象、临时对象峰值；配合 Mark Generation。\n" +
          "3. Core Animation：离屏渲染、混合、GPU  culled；列表卡顿常看这项。\n" +
          "4. 其他按需：SwiftUI / View Body、Network、Energy；启动慢用 App Launch。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "复现路径固定后：卡顿优先 Time Profiler + Core Animation；内存涨用 Allocations；疑似泄漏用 Leaks。先回答「主线程堵还是内存涨」，再下钻到具体符号，最后验证优化前后对比。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「卡顿我先 Time Profiler 看主线程，再 Core Animation 看离屏混合；内存用 Allocations/Leaks。结合复现路径先定性，再改热点，用同一路径对比。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 一上来乱点工具，没有固定复现与前后对比。\n" +
          "- 只看 CPU 百分比，忽略主线程阻塞导致的掉帧。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "如何避免 cell 异步图片错乱？",
        answer:
          "【一句话】\n" +
          "异步图片错乱是因为复用后旧下载回调写到了新 cell；要用身份校验 + prepareForReuse 取消/清空。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 回调校验：完成时比对 indexPath 或模型 id 是否仍对应当前 cell（或 URL 与当前绑定一致）。\n" +
          "2. prepareForReuse：清空 image、占位，取消进行中的下载/解码任务。\n" +
          "3. 任务 token：自己维护 generation/UUID，回调时 token 不匹配则丢弃。\n" +
          "4. 图片库：Kingfisher/SDWebImage 的 cell 扩展通常已处理取消与占位，优先用成熟方案。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "cellForRow 绑定 model.id/url → 发起加载 → 回调校验 id → 再设图。滑出可视区取消任务。不要只靠「延迟加载」而不校验身份。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「错乱是复用后旧回调写错 cell。我会在 prepareForReuse 清空并取消任务，回调时校验 indexPath 或模型 id，或用图片库的 cell 扩展。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只设图不取消任务，快速滑动必乱。\n" +
          "- 用 tag=indexPath.row，插入删除后 tag 不可靠。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "App 启动慢怎么排查？",
        answer:
          "【一句话】\n" +
          "启动慢要区分 pre-main 与 main 之后：减少同步 IO/反射/重型 SDK 初始化，首屏只做展示必需工作。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. pre-main：动态库加载、+load、静态初始化、ObjC 类注册；依赖越多越慢。\n" +
          "2. main 后到首帧：AppDelegate/SceneDelegate、根 VC、同步读盘、阻塞网络、大 JSON。\n" +
          "3. 懒加载：非首屏 SDK（推送统计、地图）延后到首屏后或空闲时。\n" +
          "4. 度量：Xcode Organizer / MetricKit / Instruments App Launch 看耗时栈。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "先打点分段：didFinishLaunching、首 VC viewDidLoad、首帧。能异步的初始化放后台；能懒加载的别在启动路径。首屏用本地缓存先渲染，再刷新网络。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「我会区分 pre-main 和 main 后。减少启动同步 IO 和重型 SDK，能懒加载就延后，用启动度量看耗时栈，首屏只做展示必需数据。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 把所有 SDK 塞进 didFinishLaunching。\n" +
          "- 只优化业务代码，忽略动态库与 +load 成本。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "如何做统一路由 / 深链跳转？",
        answer:
          "【一句话】\n" +
          "深链应解析成统一路由模型，由中央 Router 负责 push/present；未登录先缓存目标，登录后续跳。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 入口统一：URL Scheme / Universal Link / 推送 userInfo → 解析为 Route（页面+参数）。\n" +
          "2. 中央 Router：根据登录态、权限决定 push/present/切 Tab，避免各处 if page==xxx。\n" +
          "3. 登录续跳：未登录缓存 pendingRoute，登录成功再 execute。\n" +
          "4. 可测试：解析与导航分离，便于单测路由表。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "路由表集中注册；参数校验失败给兜底页。UIKit 用 Coordinator/Router；SwiftUI 可用 NavigationPath。版本兼容：旧链到新页要有映射。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「深链我会解析成路由模型，交给中央 Router 导航。未登录先缓存目标，登录后续跳，避免业务里写死跳转。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 各 VC 自己解析 URL，规则漂移。\n" +
          "- 登录后忘记消费 pendingRoute。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "OC 与 Swift 混编要注意什么？",
        answer:
          "【一句话】\n" +
          "混编关键是边界暴露方式、空安全映射和类型限制：OC 经桥接头进 Swift，Swift 用 @objc 暴露给 OC，新代码优先 Swift 逐步迁。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Bridging Header：把要给 Swift 用的 OC 头放进去；模块化可用 umbrella + @import。\n" +
          "2. @objc / @objcMembers：Swift 类/方法暴露给 OC；注意只能暴露兼容类型。\n" +
          "3. 空安全：OC nullable/nonnull 映射 Optional；标错会导致意外解包崩溃。\n" +
          "4. 限制：Swift struct/enum（关联值）/泛型不能直接给 OC；需 class 或 NS_ENUM 等桥接。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "边界用薄适配层；新功能 Swift，老模块保持 OC。枚举用 NS_ENUM；block 注意写法与循环引用。混编文件改完 Clean，避免模块缓存旧头。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「OC 通过 Bridging Header 给 Swift 用，Swift 用 @objc 暴露。注意 nullable 映射和 struct 不能直接给 OC。新代码优先 Swift，边界逐步迁。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 忘记标 nullability，Swift 侧错误强制解包。\n" +
          "- 把带关联值的 Swift enum 硬暴露给 OC。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "如何保证列表滚动时帧率稳定？",
        answer:
          "【一句话】\n" +
          "帧率稳定靠降低每帧 cell 的 CPU/GPU 成本：少层级少混合、高度预计算、图片尺寸匹配，滚动回调不做重活。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 视图层级与混合：减少透明、重叠；不透明背景有助于跳过混合。\n" +
          "2. 高度预计算/缓存：避免滑动时反复 Auto Layout 测高。\n" +
          "3. 图片尺寸匹配：解码到显示像素，避免大图再缩放。\n" +
          "4. scrollViewDidScroll：只做轻量逻辑；重计算/网络放到停止滚动或后台。\n" +
          "5. 刷新粒度：performBatchUpdates / DiffableDataSource 差分，优于整表 reloadData。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "先固定/缓存行高，再优化 cell 结构；异步图片并取消。监控滚动时主线程占用。能用 Texture/IGListKit 的超复杂列表再评估，一般 UITableView/UICollectionView 调优足够。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「稳帧率我会减 cell 层级和透明混合，预计算高度，图片按显示尺寸解码，滚动回调不做重活，差分刷新代替整表 reload。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 didScroll 里频繁 relayout 或打日志。\n" +
          "- 每次数据变更都 reloadData 造成闪烁和卡顿。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "Token 刷新与多请求并发 401 怎么处理？",
        answer:
          "【一句话】\n" +
          "多请求同时 401 时要用 single-flight：只触发一次 Token 刷新，其余排队等新 Token 重放，失败则统一登出。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 单飞刷新：第一个 401 进入 refreshing，后续请求挂起，不重复打 refresh 接口。\n" +
          "2. 重放：刷新成功后用新 Token 重试原请求（注意幂等与重试上限）。\n" +
          "3. 失败统一登出：刷新失败清会话，唤醒所有等待者为失败，避免半登录态。\n" +
          "4. 线程安全：用串行队列/Actor/锁保护刷新状态机。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "在拦截器实现状态：idle / refreshing / failed。区分「业务 401」与「刷新接口自己失败」。设置最大重试，防止死循环。日志带 requestId 便于排查。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「并发 401 我会 single-flight：一次刷新，其他请求排队，成功后带新 Token 重放，失败统一登出，并保证线程安全和重试上限。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 每个请求各自刷新，打爆认证服务。\n" +
          "- 刷新成功后无限重试原失败业务码，形成循环。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "SwiftUI 与 UIKit 混用场景？",
        answer:
          "【一句话】\n" +
          "混用靠双向桥接：Representable 把 UIKit 包进 SwiftUI，UIHostingController 把 SwiftUI 嵌进 UIKit，用 Coordinator/Binding 回传事件。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. UIViewRepresentable / UIViewControllerRepresentable：包地图、WKWebView、复杂相机等成熟 UIKit 控件。\n" +
          "2. UIHostingController：在 UIKit 导航栈里嵌 SwiftUI 页面。\n" +
          "3. 数据回传：Coordinator 处理委托；Binding / 回调闭包同步状态。\n" +
          "4. 生命周期：updateUIView 避免重复创建；注意 SwiftUI 刷新频率导致的重复配置。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "优先「能 SwiftUI 就 SwiftUI」；缺能力或性能敏感再用 UIKit 岛。导航尽量单一主导（UIKit 栈或 NavigationStack），减少双栈打架。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「混用时用 Representable 包老控件，用 UIHostingController 嵌 SwiftUI。事件用 Coordinator 或 Binding 回传，并注意 update 别重复建实例。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 updateUIView 里每次都 new 子控制器。\n" +
          "- 两套导航各推一层，返回栈混乱。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "如何做崩溃收集与防护边界？",
        answer:
          "【一句话】\n" +
          "崩溃收集负责上报与归因，防护边界靠断言、降级和脏数据容错；不要用乱 hook 当长期方案，要修根因。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 崩溃上报：接入 Firebase Crashlytics / Bugly 等，覆盖信号与未捕获异常，附带自定义键（用户、页面）。\n" +
          "2. 防护边界：关键路径前置校验；服务端脏数据 decode 容错，避免强制解包。\n" +
          "3. 降级：功能失败展示占位/重试，而不是让进程崩。\n" +
          "4. 反对乱 hook：Method Swizzling 全量兜底难维护，且掩盖问题。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "Debug 用断言尽早暴露；Release 对外部输入宽容、对内部不变量严格。符号化要配置 dSYM。对必现崩溃优先修，再谈防护。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「我会接崩溃上报，关键路径加校验和降级，解码脏数据要容错，避免强制解包。hook 不当长期方案，要修根因。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 全局 catch 空实现，吞掉错误无从排查。\n" +
          "- 线上无符号化，堆栈不可读。",
        code: '',
        kind: "interview",
      },
      {
        category: "iOS 实战",
        question: "图片缓存策略你会怎么设计？",
        answer:
          "【一句话】\n" +
          "图片缓存一般是内存 + 磁盘两级：键含 URL 与尺寸，后台解码，限制内存上限，列表滑出可取消下载。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 两级缓存：内存快；磁盘持久，冷启动可恢复。\n" +
          "2. 缓存键：URL + 目标尺寸/裁剪参数，避免大图小用占内存。\n" +
          "3. 解码后台：压缩数据进内存前在后台解码成位图。\n" +
          "4. 生命周期：内存警告/退后台可清内存缓存；磁盘设容量与 LRU。\n" +
          "5. 列表优化：占位图；不可见取消下载，节省带宽与回调。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "业务优先成熟库（Kingfisher）；自研要对齐取消、优先级、解码。敏感图注意磁盘加密与清理。不同场景可设不同缓存策略（头像小而多、大图少而精）。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「我会做内存加磁盘缓存，键用 URL 加尺寸，后台解码并限制上限。列表先占位，滑出可视区取消下载，退后台可清内存。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只按 URL 缓存，不同尺寸复用同一大图。\n" +
          "- 不设上限，内存警告后仍 OOM。",
        code: '',
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "@property 常用修饰符 strong / weak / copy / assign / nonatomic 怎么选？",
        answer:
          "【一句话】\n" +
          "@property 修饰符决定内存语义与线程表现：对象常用 strong/weak/copy，基本类型用 assign，UI 属性多用 nonatomic。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. strong：持有对象，引用计数 +1，对象类型默认；生命周期由持有方决定。\n" +
          "2. weak：不持有，释放后自动置 nil；破循环、delegate 常用。\n" +
          "3. copy：生成不可变副本；NSString / NSArray / Block 常用，防外部可变对象悄悄改。\n" +
          "4. assign：基本类型（NSInteger、CGFloat）；对象上用 assign 释放后成野指针，ARC 下对象应避免。\n" +
          "5. atomic / nonatomic：atomic 默认对存取加锁，但不保证业务线程安全；UI 属性多用 nonatomic 性能更好。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "delegate → weak；NSString/Block → copy；一般模型对象 → strong；标量 → assign。需要线程安全应在业务层加串行队列/锁，不要指望 atomic。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「strong 持有，weak 不持有且置 nil，copy 防可变外部修改，assign 给基本类型。atomic 不保证业务安全，UI 常用 nonatomic。delegate 用 weak，字符串和 block 用 copy。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 对象属性用 assign，悬空指针崩溃。\n" +
          "- 以为 atomic 就线程安全，多线程改集合仍炸。",
        code:
          "@property (nonatomic, strong) NSArray *items;\n" +
          "@property (nonatomic, copy) NSString *name;\n" +
          "@property (nonatomic, weak) id<MyDelegate> delegate;",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "为什么 NSString / Block 属性常用 copy？",
        answer:
          "【一句话】\n" +
          "NSString 用 copy 防 NSMutableString 共享篡改；Block 用 copy 把栈 block 拷到堆，属性才能安全持有。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. NSString：外部可能传入 NSMutableString，strong 会共享同一可变对象，外部改你也被改；copy 得到不可变快照。\n" +
          "2. NSArray/NSDictionary 同理：可变集合传入时 copy 成不可变更安全（深浅拷贝要另说）。\n" +
          "3. Block：初始可能在栈上，离开作用域即失效；copy 到堆后属性持有才安全。\n" +
          "4. ARC 细节：对 block 写 strong 编译器常按 copy 处理，但面试与规范仍建议显式 copy；MRC 下 block 属性必须 copy。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "凡对外可能接收可变类型的「逻辑上不可变」属性，优先 copy。block 属性统一 (nonatomic, copy)。若确实要共享可变集合，显式用 NSMutableArray 并在文档中说明所有权。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「字符串用 copy 是因为可能传入可变字符串，strong 会被外部改。Block 可能在栈上，copy 到堆才能安全持有。ARC 下 strong 有时等价，但仍建议显式 copy。」\n" +
          "\n" +
          "【易错点】\n" +
          "- Block 属性写成 strong/assign，MRC 或边界场景野指针。\n" +
          "- 对自定义对象盲目 copy 却未实现 NSCopying。",
        code: "@property (nonatomic, copy) void (^completion)(BOOL ok);",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "ARC 和 MRC 区别？什么情况还要管内存？",
        answer:
          "【一句话】\n" +
          "MRC 手动 retain/release，ARC 由编译器插入；ARC 下仍要管循环引用、CF 桥接和部分 C API 生命周期。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. MRC：谁创建谁释放，手动 retain / release / autorelease，配对出错即泄漏或过度释放。\n" +
          "2. ARC：编译器插入保留释放，仍遵守引用计数；不能对 NSObject 直接 retain/release。\n" +
          "3. 仍要管：block/delegate 循环引用；Core Foundation 与 __bridge / CFBridgingRetain/Release；部分 C API 所有权约定。\n" +
          "4. 禁区：NSAllocateObject 等与 ARC 冲突的写法；混编时注意所有权注解。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "新项目 ARC。破环：delegate weak；block 用 __weak/__strong 舞。碰 CF 对象先查 Create/Get 规则（Create 要 Release）。用 Instruments Leaks 验证。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「MRC 手写引用计数，ARC 编译器插入，但循环引用和 CF 桥接仍要管。block 用 weak-strong dance，CF Create 出来的要 Release。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 以为 ARC 等于不用管内存。\n" +
          "- __bridge 与 CFBridgingRelease 用反，造成泄漏或 double-free。",
        code:
          "__weak typeof(self) weakSelf = self;\n" +
          "self.completion = ^{ __strong typeof(weakSelf) self = weakSelf; /* ... */ };",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "Category 和 Class Extension（匿名分类）区别？",
        answer:
          "【一句话】\n" +
          "Category 给已有类扩展方法（含系统类），一般不能加 ivar；Class Extension 是 .m 里匿名接口，可声明私有属性，编译期是类的一部分。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Category：拆分实现、给系统类加方法；加载时合并方法列表；加「属性」需关联对象。\n" +
          "2. Class Extension：写在 .m 的 @interface Foo ()，可声明私有属性/方法，可加 ivar，编译期可见。\n" +
          "3. 同名方法：Category 可覆盖类原方法；多个 Category 同名时优先级不确定，风险高。\n" +
          "4. Extension 更像类定义的延续，不用于给系统类「开洞」。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "私有状态用 Extension；对外工具方法用 Category。不要用 Category 覆盖系统方法做业务，除非 Swizzling 且极度谨慎。需要存储用关联对象并选好策略。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「Category 适合作扩展方法，难加真正成员变量；Extension 在 .m 声明私有属性。Category 覆盖原方法有风险，多个 Category 同名谁生效不确定。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 Category 里 @property 却不实现存储，调用崩溃或无效。\n" +
          "- 用 Category 覆盖系统方法导致升级后行为异常。",
        code:
          "// Category\n" +
          "@interface UIView (Frame)\n" +
          "- (void)setX:(CGFloat)x;\n" +
          "@end\n" +
          "\n" +
          "// Extension（.m）\n" +
          "@interface MyVC ()\n" +
          "@property (nonatomic, strong) UILabel *titleLabel;\n" +
          "@end",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "OC 消息发送流程？找不到方法时消息转发怎么走？",
        answer:
          "【一句话】\n" +
          "OC 消息发送走 objc_msgSend：缓存 → 类方法列表 → 父类链；找不到则动态解析 → 快速转发 → 完整转发，再失败才 doesNotRecognizeSelector。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 查找：isa 找类，先 cache，再 method list，再 superclass 链。\n" +
          "2. 动态方法解析：+resolveInstanceMethod: / +resolveClassMethod:，可 runtime 加 IMP 后返回 YES。\n" +
          "3. 快速转发：-forwardingTargetForSelector: 把消息转给另一个对象。\n" +
          "4. 完整转发：-methodSignatureForSelector: → -forwardInvocation:，可改写参数目标。\n" +
          "5. 失败：doesNotRecognizeSelector: 崩溃。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "代理空洞、多播可用转发；动态加方法适合热补或稀疏方法。优先正常 OOP，不要拿转发当常规业务分支。注意性能：转发路径远慢于缓存命中。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「消息发送先查缓存再方法列表再父类。找不到先 resolve 动态加方法，再 forwardingTarget，再 methodSignature 加 forwardInvocation，最后 unrecognized 崩溃。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只答「找方法」不提缓存与转发三阶段。\n" +
          "- 在 resolve 里加了方法却返回 NO，导致仍失败。",
        code: '',
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "Runtime 能干什么？Method Swizzling 要注意什么？",
        answer:
          "【一句话】\n" +
          "Runtime 可动态改类与消息行为；Method Swizzling 交换 IMP 做 hook，但必须只做一次、能调到原实现，并考虑继承与系统兼容。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. Runtime 能力：关联对象、加减方法、遍历 ivar/method、消息转发、KVO 的 isa-swizzling 等。\n" +
          "2. Swizzling：交换两个 Method 的 IMP，常用于埋点、AOP 生命周期。\n" +
          "3. 注意事项：+load 中 dispatch_once 保证一次；调用原实现防递归；处理父类未实现而子类要换的情况（先 add 再 exchange）。\n" +
          "4. 风险：与系统或其他库冲突；升级后选择子变化；难调试。能不用尽量少用。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "优先官方回调/中间件。必须 hook 时缩小范围、写清文档、加测试。避免在 +initialize 做 Swizzling（触发时机与覆盖问题）。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「Runtime 能关联对象、动态方法、转发。Swizzling 换 IMP，要在 +load 里 once，保住原实现，并考虑继承链。能不用就少用，优先修业务而不是全局 hook。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 多次 exchange 导致调用链错乱。\n" +
          "- 子类没实现却直接 exchange，换到了父类方法影响面扩大。",
        code:
          "Method a = class_getInstanceMethod(cls, @selector(viewDidLoad));\n" +
          "Method b = class_getInstanceMethod(cls, @selector(my_viewDidLoad));\n" +
          "method_exchangeImplementations(a, b);",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "KVO 原理是什么？如何正确使用与取消？",
        answer:
          "【一句话】\n" +
          "KVO 通过 Runtime 动态子类 NSKVONotifying_XXX 改写 setter，在 will/didChangeValueForKey 时通知观察者；必须成对移除观察。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 原理：addObserver 后 isa 指向动态子类，重写被观察属性的 setter，调用 will/didChangeValueForKey:。\n" +
          "2. 回调：observeValueForKeyPath:ofObject:change:context:；用 context 区分观察来源。\n" +
          "3. 成对移除：removeObserver；释放前必须取消，否则易崩。\n" +
          "4. 现代 API：iOS 11+ NSKeyValueObservation（block），随 observation 释放自动移除，更好管。\n" +
          "5. 合规：自动 KVO 依赖 KVC 合规 setter；手动可调 will/didChange；直接改 ivar 不触发。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "能用 Combine/Notification/回调就评估是否还要 KVO。必须用时优先 block observation。观察路径写常量，避免拼写错误。不要观察未实现 KVC 的私有状态除非你能控制 setter。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「KVO 会动态创建子类改 isa，重写 setter 发通知。要用合规 setter，成对 remove；现在更推荐 NSKeyValueObservation 自动管理生命周期。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 对象释放前未 removeObserver。\n" +
          "- 改 _ivar 却期望自动 KVO 回调。",
        code: "[obj addObserver:self forKeyPath:@\"name\" options:NSKeyValueObservingOptionNew context:NULL];",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "KVC 是什么？valueForKey / setValue:forKey: 注意点？",
        answer:
          "【一句话】\n" +
          "KVC 用字符串键访问属性，不直接调编译期可见的 getter/setter；方便字典转模型与 Runtime，但键错会异常且易破坏封装。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 本质：valueForKey: / setValue:forKey: 按约定查找访问器（getKey、key、isKey、_key 等）。\n" +
          "2. 集合运算：有特殊集合访问器（countOf、objectIn<Key>AtIndex: 等）。\n" +
          "3. 错误键：默认抛 NSUnknownKeyException；可重写 setValue:forUndefinedKey: / valueForUndefinedKey:。\n" +
          "4. 封装：可碰到私有成员，字典转模型常用，但要谨慎。\n" +
          "5. 标量：nil 赋给非对象属性会出问题，需 NSNumber 等包装或重写保护。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "模型映射可用 Codable 优先；动态场景再用 KVC。不要用 KVC 当常规业务读写。与 KVO 配合时保证键路径一致。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「KVC 用字符串读写属性，按固定顺序找访问器。键错会异常，能访问私有成员所以字典转模型常用，但会破坏封装；给标量赋 nil 要小心。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 键名拼错线上直接异常崩溃。\n" +
          "- setValue:nil forKey: 打到 NSInteger 等标量属性。",
        code:
          "[user setValue:@\"Tom\" forKey:@\"name\"];\n" +
          "id n = [user valueForKey:@\"name\"];",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "Block 循环引用怎么产生？__weak / __strong / __block 区别？",
        answer:
          "【一句话】\n" +
          "对象强持有 block、block 又强捕获对象即循环引用；用 __weak 破环，block 内 __strong 临时持有，__block 主要用于可变捕获而非破环。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 成因：self.block = ^{ [self do]; } 形成 self → block → self。\n" +
          "2. __weak：弱引用，不增加引用计数，打破环；对象释放后为 nil。\n" +
          "3. __strong 临时持有：block 执行期间强持有，避免中途变 nil 造成半执行状态。\n" +
          "4. __block：允许 block 内修改外部变量；MRC 下对对象有特殊不 retain 语义，ARC 下仍可能强引用，破环仍优先 __weak。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "属性 block、异步回调默认 weak-strong dance。delegate 用 weak。工具方法里「同步立刻调用的 block」不一定构成环，但写成属性长期持有就要小心。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「self 强持有 block，block 再强捕 self 就成环。用 __weak 破环，进 block 再 __strong 临时持有。__block 是为了可变捕获，不是破环银弹。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只用 __block 以为能破环（ARC 下常不能）。\n" +
          "- weak 之后不加 strong，异步执行中 self 已释放导致逻辑丢弃却未察觉。",
        code:
          "__weak typeof(self) weakSelf = self;\n" +
          "self.task = ^{\n" +
          "  __strong typeof(weakSelf) self = weakSelf;\n" +
          "  if (!self) return;\n" +
          "  [self refresh];\n" +
          "};",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "+load 和 +initialize 有什么区别？",
        answer:
          "【一句话】\n" +
          "+load 在镜像加载时调用且每个实现都会走；+initialize 在类首次收消息前惰性调用，且 Category 会覆盖主类实现。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. +load：加载进运行时即调；主类先于 Category；每个 +load 都会执行（含 Category）。\n" +
          "2. +initialize：第一次发消息前调用；运行时保证线程安全；Category 的 +initialize 覆盖主类，只留一个。\n" +
          "3. 用途：Swizzling 常放 +load；懒配置可放 +initialize，但要判断 self == [MyClass class] 防子类触发时父类也被调。\n" +
          "4. 性能：+load 做重活拖慢启动；尽量轻量。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "Swizzling → +load + once。普通初始化 → 更显式的 setup，少依赖 +initialize。不要在 +load 里依赖其他类已初始化完毕的复杂状态。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「+load 启动加载就调，每个 Category 都会调；+initialize 首次用时惰性调，Category 会覆盖。Swizzling 放 +load，且不要在 +load 做重活。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 在 +initialize 做 Swizzling，被子类触发时机搞乱。\n" +
          "- 忘记 self == [MyClass class] 判断，父类初始化逻辑被跑多次。",
        code: '',
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "isEqual: 和 hash 为什么要一起重写？",
        answer:
          "【一句话】\n" +
          "放入 NSSet/NSDictionary 时先比 hash 再比 isEqual；相等对象 hash 必须相同，因此两者要一起重写并保持一致。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 集合约定：isEqual 为 YES ⇒ hash 必须相同；hash 相同未必 equal。\n" +
          "2. 只改一个：集合找不到对象、重复插入、字典键错乱。\n" +
          "3. 实现：先比指针，再比类，再比业务主键；hash 由稳定字段导出且分布尽量均匀。\n" +
          "4. 可变对象作键：字段变化导致 hash 变，对象「丢」在桶里。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "模型进 Set/Dictionary 必须双写。优先用不可变标识（id）。Swift 里对应 Equatable + Hashable，同样要一致。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「Set 和 Dictionary 先看 hash 再 isEqual。相等则 hash 必须相同，所以要一起重写。可变对象当键改了字段会丢，hash 要稳定。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 只重写 isEqual 不重写 hash。\n" +
          "- hash 用随机或时间戳，每次不同。",
        code:
          "- (BOOL)isEqual:(id)other {\n" +
          "  if (self == other) return YES;\n" +
          "  if (![other isKindOfClass:self.class]) return NO;\n" +
          "  return [self.uid isEqual:((MyModel *)other).uid];\n" +
          "}\n" +
          "- (NSUInteger)hash { return self.uid.hash; }",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "AutoreleasePool 有什么用？什么时候需要 @autoreleasepool？",
        answer:
          "【一句话】\n" +
          "AutoreleasePool 推迟释放登记对象，在 drain 时统一 release；紧循环或子线程大量临时 ObjC 对象时要自建池降峰值。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. 机制：autorelease 对象进当前池，池结束统一释放，而不是立刻 release。\n" +
          "2. 主线程：RunLoop 每圈有池，一般够用。\n" +
          "3. 自建时机：子线程、大循环读图/解析、批量导入，包 @autoreleasepool 控制峰值。\n" +
          "4. 与 ARC：ARC 仍会生成 autorelease；池能提前回收临时对象。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "for 循环处理大量 UIImage/字符串桥接时每轮或每 N 次包一层。纯 Swift 值类型收益有限。用 Allocations 看是否锯齿下降。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「autorelease 不是马上放，等池 drain。主线程 RunLoop 有池；子线程和大循环要自己包 @autoreleasepool，避免峰值内存飙高。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 后台线程大量临时对象却不建池。\n" +
          "- 以为包了池就能解决循环引用。",
        code:
          "for (NSInteger i = 0; i < 10000; i++) {\n" +
          "  @autoreleasepool {\n" +
          "    UIImage *img = [UIImage imageWithContentsOfFile:paths[i]];\n" +
          "    // 用完即释放临时对象\n" +
          "  }\n" +
          "}",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "delegate 为什么常用 weak？和 notification / block 回调怎么选？",
        answer:
          "【一句话】\n" +
          "delegate 用 weak 避免与委托方互相强持有；一对一协议、一对多通知、闭包回调三者按耦合与基数选型。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. weak 原因：委托方强持有代理对象时，delegate 若 strong 易成环；weak（MRC 可 assign）是惯例。\n" +
          "2. delegate：1 对 1、方法清单清晰，适合 UITableView 等 UI 事件。\n" +
          "3. notification：1 对多、解耦，但链路难追踪，易漏 remove。\n" +
          "4. block：写起来快，注意循环引用与「多方法」可读性；复杂回调仍偏向 protocol。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "控件事件 → delegate/target-action；跨层广播且多监听 → Notification/Combine；一次性结果 → block/async。delegate 属性必须 weak。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「delegate 用 weak 防环。一对一用协议，一对多用通知，简单回调用 block 但要 weak self。能明确数据流就少用通知。」\n" +
          "\n" +
          "【易错点】\n" +
          "- delegate 写成 strong 造成泄漏。\n" +
          "- 通知观察者未移除，或 block 观察形成环。",
        code: "@property (nonatomic, weak) id<UITableViewDelegate> delegate;",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "关联对象（Associated Objects）怎么用？和成员变量比？",
        answer:
          "【一句话】\n" +
          "关联对象用 runtime 给已有实例（含 Category）挂存储；能模拟属性，但不能替代真正 ivar 的清晰度与性能。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. API：objc_setAssociatedObject / objc_getAssociatedObject，key 常用静态指针或 @selector。\n" +
          "2. 策略：ASSIGN / RETAIN / COPY 及 nonatomic 变体，决定内存语义。\n" +
          "3. 生命周期：宿主释放时按策略清理关联对象。\n" +
          "4. 对比 ivar：关联对象有额外查找开销；调试与类型信息弱于真正属性。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "Category 需要存储时用关联对象；类自己能加 Extension 属性就别用。注意 ASSIGN 对对象的野指针风险，对象一般用 RETAIN/COPY。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「关联对象能给 Category 加存储，用 set/getAssociatedObject，选 RETAIN 或 COPY。它方便但不如 ivar 清晰，能进 Extension 就别滥用。」\n" +
          "\n" +
          "【易错点】\n" +
          "- key 用临时字符串指针，地址不稳取不到。\n" +
          "- 对象用 ASSIGN，宿主还在关联已野。",
        code:
          "objc_setAssociatedObject(self, @selector(extra), obj, OBJC_ASSOCIATION_RETAIN_NONATOMIC);\n" +
          "id obj = objc_getAssociatedObject(self, @selector(extra));",
        kind: "interview",
      },
      {
        category: "Objective-C",
        question: "OC 里 id、instancetype、NSObject * 有什么区别？",
        answer:
          "【一句话】\n" +
          "id 几乎不检查方法；NSObject * 只能看到 NSObject 接口；instancetype 让构造器返回当前类类型，比 id 更安全。\n" +
          "\n" +
          "【要点拆解】\n" +
          "1. id：任意对象指针，编译期几乎不校验选择子，写错运行时才爆。\n" +
          "2. NSObject *：静态类型为 NSObject，只能发 NSObject 消息（除非强转）。\n" +
          "3. instancetype：用于 init/构造器，编译器推断为接收者类，链式 [[MyVC alloc] init] 类型正确。\n" +
          "4. 实践：自定义 init / 便利构造器返回值优先 instancetype，而不是 id。\n" +
          "\n" +
          "【怎么用 / 怎么选】\n" +
          "工厂方法、init 写 instancetype；容器里未知类型可用 id 再转换；需要编译期检查时避免滥用 id。Swift 侧对应 AnyObject / 具体类型桥接。\n" +
          "\n" +
          "【面试怎么讲】\n" +
          "「id 最宽松，编译器不管方法在不在；NSObject * 只能当 NSObject 用；instancetype 用于构造器，能推断成当前类，比返回 id 安全。」\n" +
          "\n" +
          "【易错点】\n" +
          "- 构造器返回 id，子类链式调用类型丢失。\n" +
          "- 过度用 id，把本可编译期发现的错误拖到运行时。",
        code: "- (instancetype)initWithName:(NSString *)name;",
        kind: "interview",
      }
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
