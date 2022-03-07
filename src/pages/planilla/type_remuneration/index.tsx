import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { RemunerationTable } from "@modules/planilla/type_remuneration/components/remuneration-table";
import { RemunerationCreate } from '@modules/planilla/type_remuneration/components/remuneration-create';
import { TypeRemuneration } from "@modules/planilla/type_remuneration/dtos/type_remuneration.entity";
import { useRouter } from "next/router";
import { authorize } from "@services/authorize";
import { RootState } from "@store/store";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Store } from 'redux'
import { configDefaultServer } from '@modules/planilla/type_remuneration/default';
import { findTypeRemuneration } from '@modules/planilla/type_remuneration/apis';
import { find } from '@modules/planilla/type_remuneration/store'
import { RemunerationEdit } from '@modules/planilla/type_remuneration/components/remuneration-edit'
const Index = () => {

  const { type_remunerations } = useSelector((state: RootState) => state.type_remuneration);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<string>('UNDEFINED');
  const router = useRouter();
  const disptach = useDispatch()

  const switchOptions: any = {
    'CREATE': <RemunerationCreate
      onClose={() => setOptions('UNDEFINED')}
      onSave={(type_remuneration) => handleQuerySearch(type_remuneration.description || '')}
    // onSave={() => { }}
    />,
    'EDIT': <RemunerationEdit
      onClose={() => setOptions('UNDEFINED')}
      onSave={(type_remuneration) => handleQuerySearch(type_remuneration.description || '')}
    />,
    'UNDEFINED': undefined
  }



  const show = async (Type_Remuneration: TypeRemuneration) => {
    const result = await findTypeRemuneration(Type_Remuneration.id)
    disptach(find(result))
    setOptions('EDIT')
  }

  const desactive = () => {
    console.log('desactive')
  }

  const handlePage = (page: number) => {
    setPending(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    });
  }

  const handleChangePerPage = (limit: number, page: number) => {
    setPending(true);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
        limit
      }
    });
  }

  const handleQuerySearch = (querySearch: string | string[]) => {
    setPending(true);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1,
        querySearch
      }
    })
  }

  useEffect(() => {
    if (pending) setPending(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <AuthLayout>
    <BreadCrumb title='Tip. Remuneración' parent='Planilla' />
    <div className="card card-body">
      <RemunerationTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={type_remunerations.items}
        perPage={type_remunerations.meta.itemsPerPage}
        totalItems={type_remunerations.meta.totalItems}
        onChangePage={handlePage}
        onChangeRowsPerPage={handleChangePerPage}
        onQuerySearch={handleQuerySearch}
        onClick={{ 'show': show, 'desactive': desactive }}
      />

      {/* btn flotante */}
      <FloatButton
        icon={<Plus />}
        color="success"
        onClick={() => setOptions('CREATE')}
      />

      {/* modal create */}
      {
        switchOptions[options]
      }
    </div>
  </AuthLayout >;
};

export default Index;

export const getServerSideProps = authorize('Tipos Remuneraciones', async (ctx: any, store: Store) => configDefaultServer(ctx, store))