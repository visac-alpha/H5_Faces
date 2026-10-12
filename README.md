# H5_Faces

Flutter / H5 / iOS 面试题与知识点（纯静态 H5，多文件结构）。已去掉安卓。

## 首页四条入口（固定顺序）

1. **知识点**
2. **面试题**
3. **已掌握的面试题**
4. **控件集合**（按端区分：Flutter Widget / H5 / iOS）  
   流程：控件列表（名称 + 缩略示意）→ 详情（UI 示例 + 代码）

底部 Tab 切换：Flutter / H5 / iOS。

## 本地打开

用浏览器直接打开 `index.html`，或：

```bash
npx serve H5_Faces
```

## GitHub Pages

1. 把 `H5_Faces` 目录内容推到仓库（根目录或 `/docs`）
2. 仓库 Settings → Pages → 选分支与目录
3. 手机打开 `https://<user>.github.io/<repo>/` 即可刷题

根目录放一个空文件 `.nojekyll`（已提供），避免 Jekyll 忽略下划线路径。

## 更新题库

从 Flutter 工程 Dart 源码重新抽取：

```bash
node tools/gen_h5_faces_data.mjs
```

额外题目在 `data/extra.js` 手工维护。

## 目录

```
H5_Faces/
  index.html          # 首页
  css/common.css
  js/store.js         # 已掌握本地存储
  js/common.js
  data/catalog.js     # 自动生成
  data/extra.js       # 扩充题
  pages/list.html
  pages/detail.html
  pages/widgets.html         # 控件列表
  pages/widget_detail.html   # 控件详情
  widgets/catalog.js         # 三端控件数据
  widgets/render.js          # 缩略图 + 演示挂载
```
