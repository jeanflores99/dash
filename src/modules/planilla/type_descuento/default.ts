import { Store } from 'redux';
import { paginate } from '@modules/planilla/type_descuento/store';
import { getTypeDescuentos } from '@modules/planilla/type_descuento/apis';

export const configDefaultServer = async (ctx: any, store: Store) => {

  const page = ctx.query?.page || 1;
  const querySearch = ctx.query?.querySearch || '';
  const limit = ctx.query?.limit || 30;
  const result = await getTypeDescuentos({ page, querySearch, limit });
  if (!result?.err) store.dispatch(paginate(result));
}
