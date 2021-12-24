const path = require('path');

module.exports = {
  title: 'Harmony Reference',
  tagline: 'The tagline of Harmony Reference',
  url: 'https://harmony.mobilejazz.com',
  baseUrl: '/',
  favicon: 'favicon/favicon.ico',
  organizationName: 'mobilejazz', // Usually your GitHub org/user name.
  projectName: 'harmony-reference', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Harmony',
      logo: {
        alt: 'Harmony Reference Logo',
        src: 'svg/as_harmony_logo_imagotype.svg',
      },
      items: [
        {to: 'docs/introduction', label: 'Reference', position: 'left'},
        {to: 'standards/meta-standard', label: 'Standards', position: 'left'},
        {
          href: 'https://github.com/mobilejazz/harmony-reference',
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
              label: 'Introduction',
              to: 'docs/introduction',
            },
            {
              label: 'Getting Started',
              to: 'docs/getting-started/overview',
            },
            {
              label: 'Fundamentals',
              to: 'docs/fundamentals/concepts',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Mobile Jazz',
              href: 'https://mobilejazz.com',
            },
            {
              label: 'Behance',
              href: 'https://www.behance.net/MobileJazz',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/mobilejazz',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mobilejazz',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/mobilejazzcom',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/mobilejazzcom',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mobile Jazz`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./src/sidebars.js'),
          editUrl: 'https://github.com/mobilejazz/harmony-reference/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'standards',
        path: 'standards',
        routeBasePath: 'standards',
        sidebarPath: require.resolve('./src/sidebars-standards.js'),
      },
    ],
  ],
};
