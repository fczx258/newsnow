DROP TABLE IF EXISTS news;
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at INTEGER
);
INSERT INTO news (source, title, url, created_at) VALUES
  ('baidu', 'Baidu News', 'https://baidu.com/news', 1696118400),
  ('github-trending-today', 'GitHub Trending', 'https://github.com/trending', 1696118400),
  ('zhihu', 'Zhihu Hot', 'https://zhihu.com/hot', 1696118400);
