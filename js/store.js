/** 已掌握题目：localStorage */
(function (global) {
  const KEY = 'h5_faces_mastered_v1';

  function load() {
    try {
      return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
    } catch (_) {
      return new Set();
    }
  }

  function save(set) {
    try {
      localStorage.setItem(KEY, JSON.stringify([...set]));
    } catch (_) {
      /* 忽略存储失败，避免整页白屏 */
    }
  }

  let cache = load();

  global.Store = {
    idOf(item) {
      return item.category + '||' + item.question;
    },
    has(itemOrId) {
      const id = typeof itemOrId === 'string' ? itemOrId : this.idOf(itemOrId);
      return cache.has(id);
    },
    add(item) {
      cache.add(this.idOf(item));
      save(cache);
    },
    remove(itemOrId) {
      const id = typeof itemOrId === 'string' ? itemOrId : this.idOf(itemOrId);
      cache.delete(id);
      save(cache);
    },
    clear(ids) {
      if (!ids) {
        cache = new Set();
      } else {
        for (const id of ids) cache.delete(id);
      }
      save(cache);
    },
    count() {
      return cache.size;
    },
    all() {
      return cache;
    },
  };
})(window);
