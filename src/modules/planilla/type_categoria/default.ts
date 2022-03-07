import { Store } from 'redux';
import { paginate } from '@modules/planilla/type_categoria/store';
import { getTypeCategorias } from '@modules/planilla/type_categoria/apis';

export const configDefaultServer = async (ctx: any, store: Store) => {

  const page = ctx.query?.page || 1;
  const querySearch = ctx.query?.querySearch || '';
  const limit = ctx.query?.limit || 30;
  const result = await getTypeCategorias({ page, querySearch, limit });
  console.log(result)
  if (!result?.err) store.dispatch(paginate(result));
}
