import { autoApi } from '@/features/wizard/api/autoApi';
import { useWizardStore } from '@/features/wizard/model/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAutoState } from './useAutoState';
import type {
  AutoQueriesDataKey,
  AutoQueriesLoadingKey,
} from '../model/types/autoQueriesKeys';
import type { AutoEntity } from '../model/types/autoEntity';

export const useAutoQueries = (): Record<
  AutoQueriesDataKey,
  AutoEntity[] | undefined
> &
  Record<AutoQueriesLoadingKey, boolean> => {
  const updateState = useWizardStore((store) => store.updateState);
  const lastActionClear = useWizardStore((store) => store.lastActionClear);
  const auto = useAutoState();

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  const modelsQuery = useQuery({
    queryKey: ['models', auto.brand?.id],
    queryFn: () => autoApi.getModels(auto.brand?.id),
    enabled: !!auto.brand?.id,
  });

  const generationsQuery = useQuery({
    queryKey: ['generations', auto.model?.id],
    queryFn: () => autoApi.getGenerations(auto.model?.id),
    enabled: !!auto.model?.id,
  });

  const configurationsQuery = useQuery({
    queryKey: ['configurations', auto.generation?.id],
    queryFn: () => autoApi.getConfigurations(auto.generation?.id),
    enabled: !!auto.generation?.id,
  });

  const modificationsQuery = useQuery({
    queryKey: ['modifications', auto.configuration?.id],
    queryFn: () => autoApi.getModifications(auto.configuration?.id),
    enabled: !!auto.configuration?.id,
  });

  useEffect(() => {
    if (lastActionClear) return;

    if (!auto.brand && brandsQuery.data?.length === 1) {
      updateState({ brand: brandsQuery.data[0] });
    } else if (!auto.model && modelsQuery.data?.length === 1) {
      updateState({ model: modelsQuery.data[0] });
    } else if (!auto.generation && generationsQuery.data?.length === 1) {
      updateState({ generation: generationsQuery.data[0] });
    } else if (!auto.configuration && configurationsQuery.data?.length === 1) {
      updateState({ configuration: configurationsQuery.data[0] });
    } else if (!auto.modification && modificationsQuery.data?.length === 1) {
      updateState({ modification: modificationsQuery.data[0] });
    }
  }, [
    auto.brand,
    auto.model,
    auto.generation,
    auto.configuration,
    auto.modification,

    brandsQuery.data,
    modelsQuery.data,
    generationsQuery.data,
    configurationsQuery.data,
    modificationsQuery.data,

    lastActionClear,
    updateState,
  ]);

  const bodyTypesQuery = useQuery({
    queryKey: ['bodyTypes'],
    queryFn: autoApi.getBodyTypes,
  });

  const engineTypesQuery = useQuery({
    queryKey: ['engineTypes'],
    queryFn: autoApi.getEngineTypes,
  });

  const gearTypesQuery = useQuery({
    queryKey: ['gearTypes'],
    queryFn: autoApi.getGearTypes,
  });

  const transmissionQuery = useQuery({
    queryKey: ['transmission'],
    queryFn: autoApi.getTransmissions,
  });

  return {
    brandsData: brandsQuery.data,
    brandsLoading: brandsQuery.isLoading,

    modelsData: modelsQuery.data,
    modelsLoading: modelsQuery.isLoading,

    generationsData: generationsQuery.data,
    generationsLoading: generationsQuery.isLoading,

    configurationsData: configurationsQuery.data,
    configurationsLoading: configurationsQuery.isLoading,

    modificationsData: modificationsQuery.data,
    modificationsLoading: modificationsQuery.isLoading,

    bodyTypesData: bodyTypesQuery.data,
    bodyTypesLoading: bodyTypesQuery.isLoading,

    engineTypesData: engineTypesQuery.data,
    engineTypesLoading: engineTypesQuery.isLoading,

    gearTypesData: gearTypesQuery.data,
    gearTypesLoading: gearTypesQuery.isLoading,

    transmissionsData: transmissionQuery.data,
    transmissionsLoading: transmissionQuery.isLoading,
  };
};
