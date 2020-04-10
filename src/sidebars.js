/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  reference: [
    'introduction',
    {
      type: "category",
      label: "Getting Started",
      items: [
        'getting-started/prerequisites',
        'getting-started/setup',
        'getting-started/samples',
      ]
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [{
        type: 'category',
        label: 'Application',
        items: [
          'application/android',
          'application/ios',
          'application/backend',
          'application/frontend'
        ]
      },
        {
          type: 'category',
          label: 'Domain',
          items: [
            'domain/interactor/interactor',
            'domain/threading/executor',
            'domain/threading/threading',
          ]
        },
        {
          type: 'category',
          label: 'Data',
          items: [{
            type: 'category',
            label: 'Repository',
            items: [
              'data/repository/repository',
              {
                type: 'category',
                label: 'Default implementations',
                items: [
                  'data/repository/cache-repository',
                  'data/repository/repository-mapper',
                  'data/repository/single-data-source-repository',
                  'data/repository/void-repository'
                ]
              },
              'data/repository/how-to-repository'
            ]
          },
            {
              type: 'category',
              label: 'DataSource',
              items: [
                'data/data-source/data-source',
                {
                  type: 'category',
                  label: 'Default implementations',
                  items: [
                    'data/data-source/data-source-mapper',
                    'data/data-source/data-source-validator',
                    'data/data-source/device-storage-data-source',
                    'data/data-source/in-memory-data-source',
                    'data/data-source/keychain-data-source',
                    'data/data-source/realm-data-source',
                    'data/data-source/timed-cache-data-source',
                    'data/data-source/void-data-source'
                  ]
                },
                'data/data-source/how-to-data-source'
              ]
            },
            'data/query',
            'data/mapper',
            'data/operation'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Other resources',
      items: [
        {
          type: 'category',
          label: 'Libraries',
          items: [
            'mj-library/vastra',
            'mj-library/colloc',
            {
              type: 'category',
              label: 'OAuth2Server',
              items: [
                'mj-library/oauth2-server/introduction',
                'mj-library/oauth2-server/oauth2-server-example',
                'mj-library/oauth2-server/oauth2-server-models',
                'mj-library/oauth2-server/oauth-provider',
                'mj-library/oauth2-server/oauth-user',
                'mj-library/oauth2-server/sql-interface',
                {
                  type: 'category',
                  label: 'Interactors',
                  items: [
                    'mj-library/oauth2-server/interactors/auth-controller-interactor',
                    'mj-library/oauth2-server/interactors/get-oauth-user-interactor',
                    'mj-library/oauth2-server/interactors/login-oauth-user-interactor',
                    'mj-library/oauth2-server/interactors/oauth2-guard-interactor',
                    'mj-library/oauth2-server/interactors/validate-scope-interactor',
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/naming-convention',
        'best-practices/dependency-injection'
      ]
    },
    {
      type: 'category',
      label: 'Old',
      items: [{
        type: 'category',
        label: 'Reference',
        items: [
          'old/executor',
          'old/logger',
          'old/mapper',
          {
            type: 'category',
            label: 'DataSource',
            items: [
              'old/data-source/data-source',
              'old/data-source/data-source-mapper',
              'old/data-source/data-source-validator',
              'old/data-source/device-storage-data-source',
              'old/data-source/in-memory-data-source',
              'old/data-source/keychain-data-source',
              'old/data-source/query',
              'old/data-source/realm-data-source',
              'old/data-source/timed-cache-data-source',
              'old/data-source/void-data-source',
            ]
          },
          'old/interactor',
          {
            type: 'category',
            label: 'Repository',
            items: [
              'old/repository/repository',
              'old/repository/cache-repository',
              'old/repository/operation',
              'old/repository/repository-mapper',
              'old/repository/single-data-source-repository',
              'old/repository/void-repository',
            ]
          }
        ]
      }]
    }
  ]
};
