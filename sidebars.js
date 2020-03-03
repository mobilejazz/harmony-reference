/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  someSidebar: [
    'introduction',
    // "introduction",
    // {
    //   type: "category",
    //   label: "Getting Started",
    //   items: [
    //     {
    //       type: "category",
    //       label: "Docs",
    //       items: [
    //         "doc2"
    //         // 'doc3',
    //       ]
    //     }
    //   ]
    // },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'Executor',
        'Logger',
        'Mapper',
        {
          type: 'category',
          label: 'Data Source',
          items: [
            'DataSource/DataSource',
            'DataSource/DataSourceMapper',
            'DataSource/DataSourceValidator',
            'DataSource/DeviceStorageDataSource',
            'DataSource/InMemoryDataSource',
            'DataSource/KeychainDataSource',
            'DataSource/Query',
            'DataSource/RealmDataSource',
            'DataSource/TimedCacheDataSource',
            'DataSource/VoidDataSource',
          ]
        },
        'Interactor/Interactor',
        {
          type: 'category',
          label: 'Repository',
          items: [
            'Repository/Repository',
            'Repository/CacheRepository',
            'Repository/Operation',
            'Repository/RepositoryMapper',
            'Repository/SingleDataSourceRepository',
            'Repository/VoidRepository',
          ]
        }
      ]
    }
  ]
};
