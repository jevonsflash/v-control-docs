import { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGitHubStars, formatStarCount } from '../hooks/useGitHubStars';
import { StarIcon } from '../components/GitHubIcons';
import styles from './index.module.css';

const GITHUB_URL = 'https://github.com/jevonsflash/V-Control';
const INSTALL_CMD = 'dotnet add package VControl';
/** Number of entries in the Components category of sidebars.ts. */
const COMPONENT_TOTAL = 21;

interface Cell {
  no: string;
  img: string;
  /** Localized display name. */
  name: string;
  cls: string;
  slug: string | null;
  xaml: string | null;
  /** Localized prose, for cells with no XAML snippet to show. */
  note: string | null;
}

/**
 * The 14 bench cells. Display names and notes go through translate() with
 * literal ids so `docusaurus write-translations` can extract them; the default
 * locale is English, and the Chinese strings live in i18n/zh/code.json.
 */
function useCells(): Cell[] {
  return [
    {
      no: '01',
      img: 'image-1.png',
      name: translate({ id: 'homepage.cell.v-button.name', message: 'Button' }),
      cls: 'VButton',
      slug: 'v-button',
      xaml: '<control:VButton TitleText="BUTTON"></control:VButton>',
      note: null,
    },
    {
      no: '02',
      img: 'image-2.png',
      name: translate({
        id: 'homepage.cell.v-entry.name',
        message: 'Text Entry',
      }),
      cls: 'VEntry',
      slug: 'v-entry',
      xaml: '<control:VEntry></control:VEntry>',
      note: null,
    },
    {
      no: '03',
      img: 'image-3.png',
      name: translate({
        id: 'homepage.cell.v-datepicker.name',
        message: 'Date Picker',
      }),
      cls: 'VDatePicker',
      slug: 'v-datepicker',
      xaml: '<control:VDatePicker></control:VDatePicker>',
      note: null,
    },
    {
      no: '04',
      img: 'image-4.png',
      name: translate({
        id: 'homepage.cell.v-searchbar.name',
        message: 'Search Bar',
      }),
      cls: 'VSearchBar',
      slug: 'v-searchbar',
      xaml: '<control:VSearchBar></control:VSearchBar>',
      note: null,
    },
    {
      no: '05',
      img: 'image-5.png',
      name: translate({
        id: 'homepage.cell.v-menu-cell.name',
        message: 'Menu List',
      }),
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
      name: translate({
        id: 'homepage.cell.v-timeline.name',
        message: 'Timeline',
      }),
      cls: 'VTimeLine',
      slug: 'v-timeline',
      xaml: '<control:VTimeLine ItemsSource="{Binding ProBarList}"></control:VTimeLine>',
      note: null,
    },
    {
      no: '07',
      img: 'image-7.png',
      name: translate({
        id: 'homepage.cell.v-tag-picker.name',
        message: 'Tag Picker',
      }),
      cls: 'VTagPicker',
      slug: 'v-tag-picker',
      xaml: '<control:VTagPicker ItemsSource="{Binding SelectedCountryList}"></control:VTagPicker>',
      note: null,
    },
    {
      no: '08',
      img: 'image-8.png',
      name: translate({
        id: 'homepage.cell.v-placeholder-view.name',
        message: 'Empty State',
      }),
      cls: 'VPlaceholderView',
      slug: 'v-placeholder-view',
      xaml: '<control:VPlaceholderView></control:VPlaceholderView>',
      note: null,
    },
    {
      no: '09',
      img: 'image-9.png',
      name: translate({
        id: 'homepage.cell.v-expander.name',
        message: 'Expander',
      }),
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
      name: translate({
        id: 'homepage.cell.v-collection.name',
        message: 'Card Collection',
      }),
      cls: 'VCollection',
      slug: 'v-collection',
      xaml: '<control:VCollection ItemsSource="{Binding InternalEmailList}">\n</control:VCollection>',
      note: null,
    },
    {
      no: '11',
      img: 'image-11.png',
      name: translate({
        id: 'homepage.cell.v-number-entry.name',
        message: 'Number Entry',
      }),
      cls: 'VNumberEntry',
      slug: 'v-number-entry',
      xaml: '<control:VNumberEntry></control:VNumberEntry>',
      note: null,
    },
    {
      no: '12',
      img: 'image-12.png',
      name: translate({
        id: 'homepage.cell.v-checkable-collection.name',
        message: 'Selectable List',
      }),
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
      name: translate({
        id: 'homepage.cell.v-rich-text-editor.name',
        message: 'Rich Text',
      }),
      cls: 'VRichTextEditor',
      slug: 'v-rich-text-editor',
      xaml: null,
      note: translate({
        id: 'homepage.cell.v-rich-text-editor.note',
        message:
          'WYSIWYG editor: typing and styling show up in place. Usage and the property table are in the docs.',
      }),
    },
    {
      no: '14',
      img: 'image-14.png',
      name: translate({
        id: 'homepage.cell.immersive-header.name',
        message: 'Immersive Header',
      }),
      cls: '',
      slug: null,
      xaml: null,
      note: translate({
        id: 'homepage.cell.immersive-header.note',
        message:
          'A real business screen: an immersive header over dark photo content — the controls hold up on dark content too.',
      }),
    },
  ];
}

export default function Home(): React.JSX.Element {
  const [open, setOpen] = useState<Cell | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const imgBase = useBaseUrl('/img/screenshots/');
  const stars = useGitHubStars();
  const cells = useCells();
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh';

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

  /** Idle / done / failed label, shared by every copy button on the page. */
  const copyLabel = useCallback(
    (key: string, idle: string) => {
      if (copied === key) {
        return translate({ id: 'homepage.copied', message: '✓ Copied' });
      }
      if (copied === `${key}-fail`) {
        return translate({ id: 'homepage.copyFailed', message: 'Copy failed' });
      }
      return idle;
    },
    [copied],
  );

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
      description={translate({
        id: 'homepage.description',
        message: 'V-Control — an out-of-the-box .NET MAUI component library',
      })}>
      <main>
        <section
          className={`${styles.bench} ${open ? styles.benchDim : ''}`}
          aria-label={translate({
            id: 'homepage.bench.ariaLabel',
            message: 'V-Control component bench',
          })}>
          <div className={styles.plate}>
            <p className={styles.plateKicker}>
              <img
                className={styles.plateKickerLogo}
                src={useBaseUrl('/microsoft.svg')}
                alt="Microsoft"
                width={18}
                height={18}
              />
              <span className={styles.plateKickerText}>
               For .NET Multi-Platform App UI
              </span>
            </p>
            <h1 className={styles.plateTitle}>V-Control</h1>
            {/* Tagline in the current locale first, then in the other one. */}
            <p className={styles.plateTagPrimary}>
              {translate({
                id: 'homepage.tagline',
                message: 'An out-of-the-box .NET MAUI component library',
              })}
            </p>
            <p className={styles.plateTagSecondary}>
              {isZh
                ? 'An out-of-the-box .NET MAUI component library'
                : '开箱即用的 .NET MAUI 组件库'}
            </p>
            {/* 安装方式指引：mac 风格 mock bash */}
            <div className={styles.term}>
              <div className={styles.termBar}>
                <span className={styles.termDots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.termTitle}>bash — install</span>
                <button
                  type="button"
                  className={styles.termCopy}
                  onClick={() => copy(INSTALL_CMD, 'install')}
                  aria-label={translate({
                    id: 'homepage.install.copyAriaLabel',
                    message: 'Copy the install command',
                  })}>
                  {copyLabel(
                    'install',
                    translate({ id: 'homepage.install.copy', message: 'Copy' }),
                  )}
                </button>
              </div>
              <div className={styles.termBody}>
                <p className={styles.termStep}>
                  <i className={styles.termHash}>#</i>
                  {translate({
                    id: 'homepage.install.step1',
                    message: '① Install the NuGet package',
                  })}
                </p>
                <p className={styles.termCmd}>
                  <i className={styles.termPrompt}>$</i>
                  {INSTALL_CMD}
                </p>
                <p className={styles.termOut}>
                  {translate({
                    id: 'homepage.install.step1Alt',
                    message: 'or search “V-Control” on NuGet',
                  })}
                </p>
                <p className={styles.termStep}>
                  <i className={styles.termHash}>#</i>
                  {translate({
                    id: 'homepage.install.step2',
                    message: '② Register the handler in MauiProgram.cs',
                  })}
                </p>
                <p className={styles.termCode}>.UseVControl()</p>
                <p className={styles.termStep}>
                  <i className={styles.termHash}>#</i>
                  {translate({
                    id: 'homepage.install.step3',
                    message: '③ Add the theme in App.xaml',
                  })}
                </p>
                <p className={styles.termCode}>&lt;v:VControlTheme /&gt;</p>
                <Link className={styles.termLink} to="/docs/starter">
                  <i className={styles.termPrompt}>$</i>
                  {translate({
                    id: 'homepage.install.fullGuide',
                    message: 'full install guide',
                  })}
                  <i className={styles.termArrow} aria-hidden="true">
                    →
                  </i>
                </Link>
              </div>
            </div>
            <div className={styles.plateActions}>
              <Link className={styles.pillSolid} to="/docs/v-button">
                {translate({
                  id: 'homepage.cta.docs',
                  message: 'Component docs',
                })}
              </Link>
              <Link className={styles.pillGhost} to={GITHUB_URL}>
                GitHub
                {stars !== null && (
                  <span
                    className={styles.pillStars}
                    title={`${stars} stars on GitHub`}>
                    <StarIcon />
                    {formatStarCount(stars)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {cells.map((c, i) => (
            <button
              key={c.no}
              type="button"
              className={styles.cell}
              style={{ '--d': `${60 + i * 30}ms` } as React.CSSProperties}
              onClick={() => setOpen(c)}
              aria-haspopup="dialog"
              aria-label={translate(
                {
                  id: 'homepage.cell.ariaLabel',
                  message: '{no} {name}{cls} — open the inspection card',
                },
                { no: c.no, name: c.name, cls: c.cls ? ` ${c.cls}` : '' },
              )}>
              <span className={styles.cellImg}>
                <img
                  src={`${imgBase}${c.img}`}
                  alt={translate(
                    {
                      id: 'homepage.cell.imgAlt',
                      message: 'Screenshot of the {name} control',
                    },
                    { name: c.name },
                  )}
                  loading={i < 5 ? 'eager' : 'lazy'}
                />
              </span>
              <span className={styles.cellLabel}>
                <b className={styles.cellName}>{c.name}</b>
                {c.cls && <span className={styles.cellCls}>{c.cls}</span>}
              </span>
            </button>
          ))}

          <Link
            className={styles.more}
            to="/docs/components"
            style={{ '--d': `${60 + cells.length * 30}ms` } as React.CSSProperties}>
            <p className={styles.moreKicker}>
              {translate({
                id: 'homepage.more.kicker',
                message: 'Components · Directory',
              })}
            </p>
            <p className={styles.moreCount}>
              <b>{COMPONENT_TOTAL}</b>
              <span>
                {translate({
                  id: 'homepage.more.countLine1',
                  message: 'controls in total',
                })}
                <br />
                {translate({
                  id: 'homepage.more.countLine2',
                  message: 'every one documented',
                })}
              </span>
            </p>
            <span className={styles.moreBtn}>
              {translate({
                id: 'homepage.more.cta',
                message: 'Browse all components',
              })}
              <i aria-hidden="true">→</i>
            </span>
          </Link>
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
              aria-label={translate(
                {
                  id: 'homepage.card.ariaLabel',
                  message: '{name} inspection card',
                },
                { name: open.name },
              )}
              onClick={(e) => e.stopPropagation()}>
              <div className={styles.cardImg}>
                <img
                  src={`${imgBase}${open.img}`}
                  alt={translate(
                    {
                      id: 'homepage.cell.imgAlt',
                      message: 'Screenshot of the {name} control',
                    },
                    { name: open.name },
                  )}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <span className={styles.cardNo}>{open.no}</span>
                  <span className={styles.cardName}>{open.name}</span>
                  {open.cls && (
                    <span className={styles.cardCls}>{open.cls}</span>
                  )}
                  <button
                    type="button"
                    className={styles.cardClose}
                    onClick={() => setOpen(null)}
                    aria-label={translate({
                      id: 'homepage.card.close',
                      message: 'Close the inspection card',
                    })}>
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
                      {translate({
                        id: 'homepage.card.docs',
                        message: 'Open docs',
                      })}
                    </Link>
                  )}
                  {open.xaml && (
                    <button
                      type="button"
                      className={styles.pillGhost}
                      onClick={() => copy(open.xaml!, `xaml-${open.no}`)}>
                      {copyLabel(
                        `xaml-${open.no}`,
                        translate({
                          id: 'homepage.card.copyXaml',
                          message: 'Copy XAML',
                        }),
                      )}
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
