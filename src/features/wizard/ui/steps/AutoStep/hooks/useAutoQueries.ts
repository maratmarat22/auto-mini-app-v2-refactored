import { autoApi } from '@/features/wizard/api/autoApi';
import { useWizardStore } from '@/features/wizard/model/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useAutoQueries = () => {
  const store = useWizardStore();

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  const modelsQuery = useQuery({
    queryKey: ['models', store.brand?.id],
    queryFn: () => autoApi.getModels(store.brand?.id),
    enabled: !!store.brand?.id,
  });

  const generationsQuery = useQuery({
    queryKey: ['generations', store.model?.id],
    queryFn: () => autoApi.getGenerations(store.model?.id),
    enabled: !!store.model?.id,
  });

  const configurationsQuery = useQuery({
    queryKey: ['configurations', store.generation?.id],
    queryFn: () => autoApi.getConfigurations(store.generation?.id),
    enabled: !!store.generation?.id,
  });

  const modificationsQuery = useQuery({
    queryKey: ['modifications', store.configuration?.id],
    queryFn: () => autoApi.getModifications(store.configuration?.id),
    enabled: !!store.configuration?.id,
  });

  useEffect(() => {
    const fillNext = () => {
      if (!store.brand && brandsQuery.data?.length === 1) {
        store.setSpecificAutoProperty('brand', brandsQuery.data[0]);
        return;
      }
      if (!store.model && modelsQuery.data?.length === 1) {
        store.setSpecificAutoProperty('model', modelsQuery.data[0]);
        return;
      }
      if (!store.generation && generationsQuery.data?.length === 1) {
        store.setSpecificAutoProperty('generation', generationsQuery.data[0]);
        return;
      }
      if (!store.configuration && configurationsQuery.data?.length === 1) {
        store.setSpecificAutoProperty(
          'configuration',
          configurationsQuery.data[0],
        );
        return;
      }
      if (!store.modification && modificationsQuery.data?.length === 1) {
        store.setSpecificAutoProperty(
          'modification',
          modificationsQuery.data[0],
        );
        return;
      }
    };

    fillNext();
  }, [
    brandsQuery.data,
    modelsQuery.data,
    generationsQuery.data,
    configurationsQuery.data,
    modificationsQuery.data,
    store,
  ]);

  return {
    brands: brandsQuery.data,
    brandsAreLoading: brandsQuery.isLoading,

    models: modelsQuery.data,
    modelsAreLoading: modelsQuery.isLoading,

    generations: generationsQuery.data,
    generationsAreLoading: generationsQuery.isLoading,

    configurations: configurationsQuery.data,
    configurationsAreLoading: configurationsQuery.isLoading,

    modifications: modificationsQuery.data,
    modificationsAreLoading: modificationsQuery.isLoading,
  };
};

type AutoQueries = ReturnType<typeof useAutoQueries>;
export type AutoQueriesKey = keyof AutoQueries;
