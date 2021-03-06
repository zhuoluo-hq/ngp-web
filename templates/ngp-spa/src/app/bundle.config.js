export default {
  key: 'template-app',
  identity: 'app',
  config: {
    title: 'Template App',
    menus: [
      {
        key: 'record_list',
        icon: 'ordered-list',
        name: '履历列表',
        url: '/record_list',
      },
      {
        key: 'test',
        name: 'Test',
        url: '/test',
      },
      {
        key: 'aaa_list',
        icon: 'ordered-list',
        name: 'AAA列表',
        url: '/aaa_list',
      },
    ],
  },
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
      menus: ownProps.menus.map(item => ({
        ...item,
        id: item.key,
        pageKey: item.pageKey || item.key,
      })),
    }),
    models: {
      status: {
        defaultValue: 'loading',
      },
      statusTip: {
        defaultValue: '',
      },
      selectedMenuIds: {
        defaultValue: [],
      },
      openMenuIds: {
        defaultValue: [],
      },
      childRouteConfigs: {
        defaultValue: [],
      },
      user: {
        defaultValue: {},
      },
    },
  },
  handles: {},
};
