import axios from 'axios';
import type { AutoEntity } from '../model/types/autoEntity';
import type { Application } from '../model/types/application';

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

  getBodyTypes: () =>
    instance.get<AutoEntity[]>('body-types').then((res) => res.data),
  getEngineTypes: () =>
    instance
      .get<AutoEntity[]>('engine-types')
      .then((res) => normalizeEntities(res.data)),
  getGearTypes: () =>
    instance
      .get<AutoEntity[]>('gear-types')
      .then((res) => normalizeEntities(res.data)),
  getTransmissions: () =>
    instance
      .get<AutoEntity[]>('transmissions')
      .then((res) => normalizeEntities(res.data)),

  postApplication: (data: Application) => instance.post('applications', data),
};

const normalizeEntities = (entities: AutoEntity[]) =>
  entities.map((e) => ({ id: String(e.id), name: e.name }));
