import apiService from '../lib/api_service';
import { paramConverter } from '@ixinwu-ngp/web-fetch';
import { sliceListData, createDataSetListMockData, formatDataSetData } from './utils';
import groups from './mock_data/groups';

const SCOPE_MOCK = true;

export function fetchGetDataSetListData(dataSetKey, fields, params) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/queryDynamicListPageData',
    params: paramConverter.toPagingListPramas({
      dataSetKey,
      params,
      fields,
    }),
    // mock: SCOPE_MOCK,
    mockData: () => {
      const data = createDataSetListMockData(fields);

      return {
        count: data.length,
        list: sliceListData(data, params),
      };
    },
  };

  return apiService.fetchJsonApi(fetchOptions).then(data => ({
    ...data,
    list: data.data,
  }));
}

export function fetchGetDataSetData(dataSetKey, fields, primaryFieldKey, primaryFieldValue) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/queryDynamicSingleData',
    params: paramConverter.toSingleDataParams({
      dataSetKey,
      fields,
      primaryFieldKey,
      primaryFieldValue,
    }),
    // mock: SCOPE_MOCK,
    mockData: () => {
      const data = createDataSetListMockData(fields)[0];

      return formatDataSetData(data);
    },
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchAddDataSetData(dataSetKey, fields, values) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/insertDynamicData',
    params: paramConverter.toInsertParams({
      dataSetKey,
      values,
      fields,
    }),
    // mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchEditDataSetData(
  dataSetKey,
  fields,
  values,
  originalData,
  primaryFieldKey,
  primaryFieldValue,
) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/updateDynamicData',
    params: paramConverter.toUpdateParams({
      dataSetKey,
      fields,
      values,
      originalData,
      primaryFieldKey,
      primaryFieldValue,
    }),
    // mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchDeleteDataSetData(dataSetKey, primaryFieldKey, primaryFieldValues) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/deleteDynamicData',
    params: paramConverter.toDeleteParams({
      dataSetKey,
      primaryFieldKey,
      primaryFieldValues,
    }),
    // mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchGetGroupTypeData(groupKey) {
  const fetchOptions = {
    method: 'POST',
    url: '/group/groupTypes',
    params: {
      groupKey,
    },
    mock: SCOPE_MOCK,
    mockData: groups[groupKey],
  };

  return apiService.fetchJsonApi(fetchOptions);
}
