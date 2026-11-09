import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * V-Control documentation sidebar.
 *
 * Item labels are taken from the document titles (localized per locale);
 * category labels are translated in
 * i18n/zh/docusaurus-plugin-content-docs/current.json.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['starter'],
    },
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: ['colors', 'global-styles', 'icons'],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      // Landing page for the "查看更多组件" tile on the home bench.
      link: {
        type: 'generated-index',
        title: 'Components · 组件',
        description: 'Every V-Control control in one place · 全部控件文档一览，点卡片进入。',
        slug: '/components',
      },
      items: [
        'v-button',
        'v-entry',
        'v-validating-entry',
        'v-number-entry',
        'v-form-item',
        'v-checkbox',
        'v-checkbox-group',
        'v-checkbox-button',
        'v-radiobutton-group',
        'v-checkable-collection',
        'v-picker',
        'v-validating-picker',
        'v-tag-picker',
        'v-datepicker',
        'v-searchbar',
        'v-rich-text-editor',
        'v-collection',
        'v-menu-cell',
        'v-expander',
        'v-timeline',
        'v-placeholder-view',
      ],
    },
  ],
};

export default sidebars;
