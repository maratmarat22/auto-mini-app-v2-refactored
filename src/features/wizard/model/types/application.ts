import type { WizardState } from './store';
import type { RangeEntity } from './autoEntity';
import { tma } from '@/shared/lib/tma';

export interface Application {
  telegramId: number | undefined;
  username: string | undefined;

  brand: string | null;
  model: string | null;
  generation: string | null;
  configuration: string | null;
  modification: string | null;

  bodyType: string | null;
  engineType: string | null;
  engineDisplacement: RangeEntity<number | null> | null;
  enginePower: RangeEntity<number | null> | null;
  gearType: string | null;
  transmission: string | null;
  years: RangeEntity<number | null> | null;

  comment: string | null;
  budget: number | null;
  city: string | null;
}

export function mapStateToApplication(state: WizardState): Application {
  return {
    telegramId: tma.launchParameters?.tgWebAppData?.user?.id ?? -1,
    username: tma.launchParameters?.tgWebAppData?.user?.username,

    brand: state.brand?.name ?? null,
    model: state.model?.name ?? null,
    generation: state.generation?.name ?? null,
    configuration: state.configuration?.name ?? null,
    modification: state.modification?.name ?? null,

    bodyType: state.bodyType?.name ?? null,
    engineType: state.engineType?.name ?? null,
    engineDisplacement: state.engineDisplacement,
    enginePower: state.enginePower,
    gearType: state.gearType?.name ?? null,
    transmission: state.transmission?.name ?? null,
    years: state.years,

    comment: state.comment,
    budget: state.budget,
    city: state.city?.name ?? null,
  };
}
