import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { useRouter } from "next/router";
import { RootState } from "@store/store";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useSelector } from "react-redux"
import { AportacionCreate } from '@modules/planilla/type_aportacion/components/aportacion-create'
import { AportacionTable } from '@modules/planilla/type_aportacion/components/aportacion-table'
import { TypeAportacion } from '@modules/planilla/type_aportacion/dtos/type_aportacion.enitity';
import { authorize } from '@services/authorize';
import { Store } from 'redux';
import { configDefaultServer } from '@modules/planilla/type_aportacion/default';

const Index = () => {
  const { type_aportaciones } = useSelector((state: RootState) => state.type_aportacion);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<undefined | string>(undefined);
  const router = useRouter();

  const switchOptions = {
    CREATE: 'CREATE'
  }

  const handleClick = (Type_Aportacion: TypeAportacion) => {
    const id = encrypt(`${Type_Aportacion.id}`);
    router.push(`${router.pathname}/ID:${id}`);
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
    <BreadCrumb title='Tip. Aportación' parent='Planilla' />
    <div className="card card-body">
      <AportacionTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={type_aportaciones.items}
        perPage={type_aportaciones.meta.itemsPerPage}
        totalItems={type_aportaciones.meta.totalItems}
        onChangePage={handlePage}
        onChangeRowsPerPage={handleChangePerPage}
        onQuerySearch={handleQuerySearch}
        onClick={handleClick}
      />

      {/* btn flotante */}
      <FloatButton
        icon={<Plus />}
        color="success"
        onClick={() => setOptions(switchOptions.CREATE)}
      />
      {/* modal create */}
      {switchOptions.CREATE == options
        ? <AportacionCreate
          onClose={() => setOptions(undefined)}
          onSave={(typeaportacion) => handleQuerySearch(typeaportacion.default || '')}
        />
        : null
      }
    </div>
  </AuthLayout>;
};
export default Index


export const getServerSideProps = authorize('Tipos Aportación', async (ctx: any, store: Store) => configDefaultServer(ctx, store))