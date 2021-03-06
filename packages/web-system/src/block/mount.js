import warning from 'warning';
import { mount as coreMount } from '@ixinwu-ngp/web-core';
import generateReducer from '../utils/generate_reducer';
import connect from './connect';

export default function mount(blockConfig, bundle) {
  const {
    identity,
    data = {},
    config = {},
    settings = {},
    handles = {},
    models = {},
    mapState,
  } = blockConfig;

  const { models: dataModels = {} } = data;

  warning(identity, 'block config need identity');

  const modelReducers = {};
  const lastModels = {
    ...models,
    ...dataModels,
  };
  Object.keys(lastModels).forEach(key => {
    modelReducers[key] = generateReducer({
      key,
      defaultValue: lastModels[key].defaultValue,
    });
  });

  const { handleTriggers } = coreMount(identity, {
    reducers: {
      ...bundle.reducers,
      ...modelReducers,
    },
    sagas: bundle.sagas,
    handles: bundle.handles,
  });

  if (!bundle.view) {
    return null;
  }

  return connect({
    identity,
    handleTriggers,
    mapState: mapState || data.mapState,
    config,
    settings,
    handleConfigs: handles,
    dataConfigs: models,
  })(bundle.view);
}
