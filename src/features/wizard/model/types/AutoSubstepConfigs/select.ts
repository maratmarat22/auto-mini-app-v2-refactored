import {
  isAutoQueriesDataKey,
  isAutoQueriesLoadingKey,
  type AutoQueriesDataKey,
  type AutoQueriesLoadingKey,
} from '../autoQueriesKeys';
import { isAutoBaseSubstepConfig, type AutoBaseSubstepConfig } from './base';
import { isSelectableAutoProp } from './supportingTypes';

export interface AutoSelectSubstepConfig extends AutoBaseSubstepConfig {
  dataKey: AutoQueriesDataKey;
  loadingKey: AutoQueriesLoadingKey;

  header: string;
  placeholder: string;
}

export function isAutoSelectSubstepConfig(
  x: unknown,
): x is AutoSelectSubstepConfig {
  if (!isAutoBaseSubstepConfig(x)) return false;

  return (
    x.type === 'select' &&
    isSelectableAutoProp(x.prop) &&
    'dataKey' in x &&
    isAutoQueriesDataKey(x.dataKey) &&
    'loadingKey' in x &&
    isAutoQueriesLoadingKey(x.loadingKey) &&
    'header' in x &&
    typeof x.header === 'string' &&
    'placeholder' in x &&
    typeof x.placeholder === 'string'
  );
}
