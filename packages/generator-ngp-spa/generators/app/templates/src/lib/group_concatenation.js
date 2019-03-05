export function updateFieldBindData(fields, groupConfigs, groupConcatenations) {
  let groups = {
    ...groupConfigs,
  };

  groupConcatenations.forEach(concatenation => {
    // 同一个类别在字段中最多出现一次
    const groupField = fields.find(
      field => field.categoryGroupKey === concatenation.masterGroupKey,
    );

    // 没有主控制字段，则返回所有的类型
    if (!groupField) {
      return;
    }

    let group = groups[concatenation.slaveGroupKey];

    if (groupField.value !== undefined && groupField.value !== null && groupField.value !== '') {
      const masterTypeConcatenation = concatenation.concatenationConfig.find(
        config => config.masterTypeKey === groupField.value,
      );

      // 匹配级联，slaveGroup的typeList使用配置的slaveTypeKeys过滤
      if (masterTypeConcatenation) {
        group = {
          ...group,
          appTypeList: group.appTypeList.filter(
            type => masterTypeConcatenation.slaveTypeKeys.indexOf(type.typeKey) !== -1,
          ),
        };
        groups = Object.assign(groups, {
          [concatenation.slaveGroupKey]: group,
        });
      } else {
        // 不匹配级联时，slaveGroup的typeList为空
        group = {
          ...group,
          appTypeList: [],
        };
        groups = Object.assign(groups, {
          [concatenation.slaveGroupKey]: group,
        });
      }
    }
  });

  return fields.map(field => {
    if (field.fieldType === 'CategoryGroupType') {
      return {
        ...field,
        bindData: groups[field.categoryGroupKey] ? groups[field.categoryGroupKey].appTypeList : [],
      };
    }
    return field;
  });
}

export function getChangedData(fields) {
  const changedFieldValues = {};

  fields.forEach(field => {
    if (field.fieldType === 'CategoryGroupType' && field.value) {
      let newValue = [];
      const newText = [];
      (field.value.value || field.value).split(',').forEach(value => {
        const type = field.bindData.find(type => type.typeKey === value);
        if (type) {
          newValue.push(type.typeKey);
          newText.push(type.typeValue);
        }
      });

      newValue = newValue.join(',');

      if ((field.value.value || field.value) !== newValue) {
        changedFieldValues[field.fieldKey] = {
          value: newValue,
          text: newText.join(','),
        };
      }
    }
  });

  return changedFieldValues;
}
