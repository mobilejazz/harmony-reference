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
      type: 'category',
      label: 'Reference',
      items: [
        'executor',
        'logger',
        'mapper',
        {
          type: 'category',
          label: 'DataSource',
          items: [
            'data-source/data-source',
            'data-source/data-source-mapper',
            'data-source/data-source-validator',
            'data-source/device-storage-data-source',
            'data-source/in-memory-data-source',
            'data-source/keychain-data-source',
            'data-source/query',
            'data-source/realm-data-source',
            'data-source/timed-cache-data-source',
            'data-source/void-data-source',
          ]
        },
        'interactor/interactor',
        {
          type: 'category',
          label: 'Repository',
          items: [
            'repository/repository',
            'repository/cache-repository',
            'repository/operation',
            'repository/repository-mapper',
            'repository/single-data-source-repository',
            'repository/void-repository',
          ]
        }
      ]
    }
  ]
};
