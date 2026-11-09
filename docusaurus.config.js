const { themes } = require('prism-react-renderer');

// TODO: replace with the real production domain before deploying.
const HOSTNAME = 'v-control-docs.vercel.app';

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'V-Control Documentation',
  tagline: 'An out-of-the-box .NET MAUI component library',
  url: `https://${HOSTNAME}`,
  baseUrl: '/',
  favicon: 'img/favicon.svg',
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700;900&family=Space+Grotesk:wght@500;700&display=swap',
      rel: 'stylesheet',
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: { label: 'English' },
      zh: { label: '简体中文' },
    },
  },
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
    },
    navbar: {
      title: 'V-Control',
      hideOnScroll: true,
      items: [
        {
          type: 'doc',
          docId: 'starter',
          sidebarId: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/jevonsflash/V-Control',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/starter',
            },
            {
              label: 'Components',
              to: '/docs/v-button',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jevonsflash/V-Control',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} V-Control. Built with Docusaurus.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      // https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
      // Note: ```xml fences are covered by Prism's built-in `markup` alias.
      additionalLanguages: ['csharp', 'bash', 'json', 'diff'],
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        // The docs have no index page; send bare /docs/ to the first doc.
        redirects: [{ from: '/docs', to: '/docs/starter' }],
      }),
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
          breadcrumbs: false,
          exclude: ['README.md'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: false,
      }),
    ],
  ],
};
