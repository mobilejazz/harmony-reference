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
        'getting-started/overview',
        'getting-started/setup',
        'getting-started/samples',
      ]
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/concepts',
        {
        type: 'category',
        label: 'Application',
        items: [
          'fundamentals/application/android',
          'fundamentals/application/ios',
          'fundamentals/application/backend',
          'fundamentals/application/frontend'
        ]
      },
        {
          type: 'category',
          label: 'Domain',
          items: [
            'fundamentals/domain/model',
            'fundamentals/domain/interactor',
            {
              type: 'category',
              label: 'Threading',
              items: [
                'fundamentals/domain/threading',
                'fundamentals/domain/threading/java',
                'fundamentals/domain/threading/kotlin',
                'fundamentals/domain/threading/swift',
                'fundamentals/domain/threading/typescript',
                'fundamentals/domain/threading/php'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Data',
          items: [
            'fundamentals/data/entity',
            {
              type: 'category',
              label: 'DataSource',
              items: [
                'fundamentals/data/data-source/data-source',
                'fundamentals/data/data-source/query',
                {
                  type: 'category',
                  label: 'Default implementations',
                  items: [
                    'fundamentals/data/data-source/void-data-source',
                    'fundamentals/data/data-source/data-source-mapper',
                    'fundamentals/data/data-source/in-memory-data-source',
                    'fundamentals/data/data-source/device-storage-data-source',
                    'fundamentals/data/data-source/data-source-validator',
                    'fundamentals/data/data-source/keychain-data-source',
                    'fundamentals/data/data-source/realm-data-source',
                    'fundamentals/data/data-source/raw-sql-data-source',
                    'fundamentals/data/data-source/sql-row-counter-data-source'
                  ]
                },
              ]
            },
            {
            type: 'category',
            label: 'Repository',
            items: [
              'fundamentals/data/repository/repository',
              'fundamentals/data/repository/operation',
              {
                type: 'category',
                label: 'Default implementations',
                items: [
                  'fundamentals/data/repository/cache-repository',
                  'fundamentals/data/repository/repository-mapper',
                  'fundamentals/data/repository/single-data-source-repository',
                  'fundamentals/data/repository/void-repository'
                ]
              },
            ]
          },
          ]
        },
        {
          type: 'category',
          label: 'Common',
          items: [
            'fundamentals/common/mapper',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/naming-convention',
        'best-practices/dependency-injection',
        'best-practices/presenter-specs',
        'best-practices/angular',
        'best-practices/folders-structures'
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
            'mj-library/mjlibraries',
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
      label: 'Tips and Tricks',
      items: [
        'other/tips/node',
        'other/tips/angular',
        'other/tips/git'
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
