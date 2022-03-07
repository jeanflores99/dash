import { Store } from 'redux';
import { paginate } from '@modules/planilla/type_sindicato/store';
import { getTypeSindicatos } from '@modules/planilla/type_sindicato/apis';

export const configDefaultServer = async (ctx: any, store: Store) => {
  const page = ctx.query?.page || 1;
  const querySearch = ctx.query?.querySearch || '';
  const limit = ctx.query?.limit || 30;
  const result = await getTypeSindicatos({ page, querySearch, limit });
  if (!result?.err) store.dispatch(paginate(result));
}