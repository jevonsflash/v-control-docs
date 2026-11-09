import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';

const GITHUB_URL = 'https://github.com/jevonsflash/V-Control';
const NUGET_URL = 'https://www.nuget.org/packages/VControl';
const MAUI_DOCS_URL = 'https://learn.microsoft.com/dotnet/maui/';

type FooterItem = {
  label: string;
  /** Internal route. */
  to?: string;
  /** External URL — rendered as a plain anchor with target/rel. */
  href?: string;
};

type FooterColumn = {
  title: string;
  items: FooterItem[];
};

/**
 * Site footer, modelled on the Napacitor footer: brand block on the left,
 * grouped link columns on the right, then a bottom bar.
 *
 * Labels are `translate()`d — Chinese lives in i18n/zh/code.json.
 */
function Footer(): ReactNode {
  const columns: FooterColumn[] = [
    {
      title: translate({id: 'footer.column.product', message: 'Product'}),
      items: [
        {
          label: translate({
            id: 'footer.link.bench',
            message: 'Component bench',
          }),
          to: '/',
        },
        {
          label: translate({
            id: 'footer.link.components',
            message: 'All components',
          }),
          to: '/docs/components',
        },
      ],
    },
    {
      title: translate({id: 'footer.column.resources', message: 'Resources'}),
      items: [
        {
          label: translate({
            id: 'footer.link.starter',
            message: 'Getting started',
          }),
          to: '/docs/starter',
        },
        {
          label: translate({
            id: 'footer.link.nuget',
            message: 'NuGet package',
          }),
          href: NUGET_URL,
        },
        {
          label: translate({
            id: 'footer.link.mauiDocs',
            message: '.NET Multi-Platform App UI docs',
          }),
          href: MAUI_DOCS_URL,
        },
      ],
    },
    {
      title: translate({id: 'footer.column.project', message: 'Project'}),
      items: [
        {label: 'GitHub', href: GITHUB_URL},
        {
          label: translate({id: 'footer.link.issues', message: 'Issues'}),
          href: `${GITHUB_URL}/issues`,
        },
        {
          label: translate({id: 'footer.link.releases', message: 'Releases'}),
          href: `${GITHUB_URL}/releases`,
        },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand-link" to="/">
            <span className="brand-mark">
              <img src={useBaseUrl('/img/favicon.svg')} alt="" width={30} height={30} />
              <span>V-Control</span>
            </span>
          </Link>
          <p className="brand-tag">
            {translate({
              id: 'footer.tagline',
              message: 'An out-of-the-box .NET MAUI component library',
            })}
          </p>
        </div>

        <div className="footer-links">
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.items.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.to!}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          {translate(
            {
              id: 'footer.copyright',
              message: '© {year} V-Control. All rights reserved.',
            },
            {year: new Date().getFullYear()},
          )}
        </span>
        {/* Plain anchor: a fragment-only hop must not go through the router. */}
        <a className="to-top" href="#top">
          {translate({id: 'footer.backToTop', message: 'Back to top ↑'})}
        </a>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
