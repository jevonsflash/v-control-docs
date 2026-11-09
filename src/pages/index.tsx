import { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const GITHUB_URL = 'https://github.com/jevonsflash/V-Control';
const INSTALL_CMD = 'dotnet add package VControl';

interface Cell {
  no: string;
  img: string;
  zh: string;
  cls: string;
  slug: string | null;
  xaml: string | null;
  note: string | null;
}

const CELLS: Cell[] = [
  {
    no: '01',
    img: 'image-1.png',
    zh: '按钮',
    cls: 'VButton',
    slug: 'v-button',
    xaml: '<control:VButton TitleText="BUTTON"></control:VButton>',
    note: null,
  },
  {
    no: '02',
    img: 'image-2.png',
    zh: '表单输入',
    cls: 'VEntry',
    slug: 'v-entry',
    xaml: '<control:VEntry></control:VEntry>',
    note: null,
  },
  {
    no: '03',
    img: 'image-3.png',
    zh: '日期选择',
    cls: 'VDatePicker',
    slug: 'v-datepicker',
    xaml: '<control:VDatePicker></control:VDatePicker>',
    note: null,
  },
  {
    no: '04',
    img: 'image-4.png',
    zh: '搜索栏',
    cls: 'VSearchBar',
    slug: 'v-searchbar',
    xaml: '<control:VSearchBar></control:VSearchBar>',
    note: null,
  },
  {
    no: '05',
    img: 'image-5.png',
    zh: '菜单列表',
    cls: 'VMenuCell',
    slug: 'v-menu-cell',
    xaml:
      '<control:VMenuCell MenuText="My Profile"\n' +
      '                    IconText="&#xf007;"\n' +
      '                    Command="{Binding MessageCommand}"\n' +
      '                    CommandParameter="ProfilePage"></control:VMenuCell>',
    note: null,
  },
  {
    no: '06',
    img: 'image-6.png',
    zh: '时间线',
    cls: 'VTimeLine',
    slug: 'v-timeline',
    xaml: '<control:VTimeLine ItemsSource="{Binding ProBarList}"></control:VTimeLine>',
    note: null,
  },
  {
    no: '07',
    img: 'image-7.png',
    zh: '标签选择',
    cls: 'VTagPicker',
    slug: 'v-tag-picker',
    xaml: '<control:VTagPicker ItemsSource="{Binding SelectedCountryList}"></control:VTagPicker>',
    note: null,
  },
  {
    no: '08',
    img: 'image-8.png',
    zh: '空状态',
    cls: 'VPlaceholderView',
    slug: 'v-placeholder-view',
    xaml: '<control:VPlaceholderView></control:VPlaceholderView>',
    note: null,
  },
  {
    no: '09',
    img: 'image-9.png',
    zh: '折叠面板',
    cls: 'VExpander',
    slug: 'v-expander',
    xaml:
      '<control:VExpander TitleText="Title">\n' +
      '    <control:VExpander.ContentSlot>\n' +
      '        <Label Text="Content"></Label>\n' +
      '    </control:VExpander.ContentSlot>\n' +
      '</control:VExpander>',
    note: null,
  },
  {
    no: '10',
    img: 'image-10.png',
    zh: '卡片集合',
    cls: 'VCollection',
    slug: 'v-collection',
    xaml: '<control:VCollection ItemsSource="{Binding InternalEmailList}">\n</control:VCollection>',
    note: null,
  },
  {
    no: '11',
    img: 'image-11.png',
    zh: '数字输入',
    cls: 'VNumberEntry',
    slug: 'v-number-entry',
    xaml: '<control:VNumberEntry></control:VNumberEntry>',
    note: null,
  },
  {
    no: '12',
    img: 'image-12.png',
    zh: '可选列表',
    cls: 'VCheckableCollection',
    slug: 'v-checkable-collection',
    xaml:
      '<control:VCheckableCollection ItemsSource="{Binding InternalEmailList}"\n' +
      '                            SelectedItems="{Binding SelectedEmailList}">\n' +
      '</control:VCheckableCollection>',
    note: null,
  },
  {
    no: '13',
    img: 'image-13.png',
    zh: '富文本',
    cls: 'VRichTextEditor',
    slug: 'v-rich-text-editor',
    xaml: null,
    note: '所见即所得编辑器：输入与样式修改实时反映在编辑器内。用法与属性表见文档。',
  },
  {
    no: '14',
    img: 'image-14.png',
    zh: '沉浸头图',
    cls: '',
    slug: null,
    xaml: null,
    note: '真实业务屏：暗色照片内容上的沉浸头图，控件在暗色内容里同样成立。',
  },
];

export default function Home(): React.JSX.Element {
  const [open, setOpen] = useState<Cell | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const imgBase = useBaseUrl('/img/screenshots/');

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(`${key}-fail`);
      window.setTimeout(() => setCopied(null), 1600);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Layout
      title="V-Control"
      description="V-Control — an out-of-the-box .NET MAUI component library · 开箱即用的 .NET MAUI 组件库">
      <main>
        <section
          className={`${styles.bench} ${open ? styles.benchDim : ''}`}
          aria-label="V-Control 组件检录台">
          <div className={styles.plate}>
            <p className={styles.plateKicker}>.NET MAUI · Open Source</p>
            <h1 className={styles.plateTitle}>V-Control</h1>
            <p className={styles.plateTagZh}>开箱即用的 .NET MAUI 组件库</p>
            <p className={styles.plateTagEn}>
              An out-of-the-box .NET MAUI component library
            </p>
            <p className={styles.plateNote}>
              14 帧真实控件渲染，全在台上。
              <br />
              点任意一格，当场验货。
            </p>
            <div className={styles.plateActions}>
              <Link className={styles.pillSolid} to="/docs/v-button">
                进入组件文档
              </Link>
              <Link className={styles.pillGhost} to={GITHUB_URL}>
                GitHub
              </Link>
            </div>
          </div>

          {CELLS.map((c, i) => (
            <button
              key={c.no}
              type="button"
              className={styles.cell}
              style={{ '--d': `${60 + i * 30}ms` } as React.CSSProperties}
              onClick={() => setOpen(c)}
              aria-haspopup="dialog"
              aria-label={`${c.no} ${c.zh}${c.cls ? ` ${c.cls}` : ''}，打开检视卡`}>
              <span className={styles.cellImg}>
                <img
                  src={`${imgBase}${c.img}`}
                  alt={`${c.zh}控件真实渲染截图`}
                  loading={i < 5 ? 'eager' : 'lazy'}
                />
              </span>
              <span className={styles.cellLabel}>
                <i className={styles.cellNo}>{c.no}</i>
                <b className={styles.cellZh}>{c.zh}</b>
                {c.cls && <span className={styles.cellCls}>{c.cls}</span>}
              </span>
            </button>
          ))}

          <div
            className={styles.install}
            style={{ '--d': `${60 + CELLS.length * 30}ms` } as React.CSSProperties}>
            <p className={styles.installKicker}>Install · 安装</p>
            <code className={styles.installCmd}>{INSTALL_CMD}</code>
            <button
              type="button"
              className={styles.installCopy}
              onClick={() => copy(INSTALL_CMD, 'install')}>
              {copied === 'install'
                ? '✓ 已复制'
                : copied === 'install-fail'
                  ? '复制失败'
                  : '复制'}
            </button>
          </div>
        </section>

        {open && (
          <div
            className={styles.scrim}
            onClick={() => setOpen(null)}
            role="presentation">
            <div
              className={styles.card}
              role="dialog"
              aria-modal="true"
              aria-label={`${open.zh}检视卡`}
              onClick={(e) => e.stopPropagation()}>
              <div className={styles.cardImg}>
                <img
                  src={`${imgBase}${open.img}`}
                  alt={`${open.zh}控件真实渲染截图`}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <span className={styles.cardNo}>{open.no}</span>
                  <span className={styles.cardZh}>{open.zh}</span>
                  {open.cls && (
                    <span className={styles.cardCls}>{open.cls}</span>
                  )}
                  <button
                    type="button"
                    className={styles.cardClose}
                    onClick={() => setOpen(null)}
                    aria-label="关闭检视卡">
                    ✕
                  </button>
                </div>
                {open.xaml ? (
                  <pre className={styles.cardCode}>
                    <code>{open.xaml}</code>
                  </pre>
                ) : (
                  <p className={styles.cardNote}>{open.note}</p>
                )}
                <div className={styles.cardActions}>
                  {open.slug && (
                    <Link
                      className={styles.pillSolid}
                      to={`/docs/${open.slug}`}>
                      进入文档
                    </Link>
                  )}
                  {open.xaml && (
                    <button
                      type="button"
                      className={styles.pillGhost}
                      onClick={() => copy(open.xaml!, `xaml-${open.no}`)}>
                      {copied === `xaml-${open.no}`
                        ? '✓ 已复制'
                        : copied === `xaml-${open.no}-fail`
                          ? '复制失败'
                          : '复制 XAML'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
