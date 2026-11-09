import {useEffect, useState} from 'react';

const GITHUB_API = 'https://api.github.com/repos/jevonsflash/V-Control';
const STORAGE_KEY = 'vcontrol:github-stars';
/** GitHub 匿名 API 限额 60 次/小时/IP，本地缓存 1 小时内不再请求。 */
const CACHE_TTL = 60 * 60 * 1000;

interface CacheEntry {
  stars: number;
  ts: number;
}

/** 模块级去重：同一次页面会话里导航栏与首页按钮共享一个请求。 */
let pending: Promise<number | null> | null = null;

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (
      typeof entry?.stars !== 'number' ||
      typeof entry?.ts !== 'number' ||
      Date.now() - entry.ts > CACHE_TTL
    ) {
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function writeCache(stars: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({stars, ts: Date.now()}));
  } catch {
    // 无痕模式等 localStorage 不可用时忽略缓存
  }
}

async function fetchStars(): Promise<number | null> {
  const cached = readCache();
  if (cached) return cached.stars;
  try {
    const res = await fetch(GITHUB_API, {
      headers: {Accept: 'application/vnd.github+json'},
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {stargazers_count?: unknown};
    if (typeof data.stargazers_count !== 'number') return null;
    writeCache(data.stargazers_count);
    return data.stargazers_count;
  } catch {
    // 网络错误或触发限流时静默降级：不显示星标数
    return null;
  }
}

/**
 * 返回 jevonsflash/V-Control 的 star 数；加载中或获取失败时为 null。
 * 仅在客户端请求，SSR 与首帧渲染一致，不会产生水合不匹配。
 */
export function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    pending ??= fetchStars();
    pending.then((n) => {
      if (!cancelled && n !== null) setStars(n);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}

/** 与 GitHub 官方一致的紧凑格式：999 → "999"，1234 → "1.2k"，12345 → "12k"。 */
export function formatStarCount(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return k < 10 ? `${k.toFixed(1)}k` : `${Math.round(k)}k`;
}
