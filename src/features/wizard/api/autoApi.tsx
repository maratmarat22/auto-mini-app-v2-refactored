import axios from 'axios';
import type { AutoEntity } from '../model/types';

const instance = axios.create({
  baseURL: 'https://prod.akhmy.space/webhook/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const autoApi = {
  getBrands: () => instance.get<AutoEntity[]>('brands').then((res) => res.data),
  getModels: (brandId?: string) =>
    instance
      .get<AutoEntity[]>('models', { params: { brandId: brandId } })
      .then((res) => res.data),
  getGenerations: (modelId?: string) =>
    instance
      .get<AutoEntity[]>('generations', { params: { modelId: modelId } })
      .then((res) => res.data),
  getConfigurations: (generationId?: string) =>
    instance
      .get<AutoEntity[]>('configurations', {
        params: { generationId: generationId },
      })
      .then((res) => res.data),
  getModifications: (configurationId?: string) =>
    instance
      .get<AutoEntity[]>('modifications', {
        params: { configurationId: configurationId },
      })
      .then((res) => res.data),

  postApplication: () => instance.post('applications'),
};
