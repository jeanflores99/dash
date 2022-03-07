import { Store } from 'redux';
import { paginate } from '@modules/planilla/type_remuneration/store';
import { getTypeRemunerations } from '@modules/planilla/type_remuneration/apis';

export const configDefaultServer = async (ctx: any, store: Store) => {
  const page = ctx.query?.page || 1;
  const querySearch = ctx.query?.querySearch || '';
  const limit = ctx.query?.limit || 30;
  const result = await getTypeRemunerations({ page, querySearch, limit });
  if (!result?.err) store.dispatch(paginate(result));
}