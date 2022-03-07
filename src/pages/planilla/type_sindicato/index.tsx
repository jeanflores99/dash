import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { useRouter } from "next/router";
import { RootState } from "@store/store";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useSelector } from "react-redux"
import { SindicatoCreate } from '@modules/planilla/type_sindicato/components/sindicato-create'
import { SindicatoTable } from '@modules/planilla/type_sindicato/components/sindicato-table'
import { TypeSindicato } from '@modules/planilla/type_sindicato/dtos/type_sindicato.entity';
import { authorize } from '@services/authorize';
import { Store } from 'redux';
import { configDefaultServer } from '@modules/planilla/type_sindicato/deafult';

const Index = () => {
  const { type_sindicatos } = useSelector((state: RootState) => state.type_sindicato);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<undefined | string>(undefined);
  const router = useRouter();

  const switchOptions = {
    CREATE: 'CREATE'
  }

  const handleClick = (Type_Descuento: TypeSindicato) => {
    const id = encrypt(`${Type_Descuento.id}`);
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
    <BreadCrumb title='Tip. Afiliaciones' parent='Planilla' />
    <div className="card card-body">
      <SindicatoTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={type_sindicatos.items}
        perPage={type_sindicatos.meta.itemsPerPage}
        totalItems={type_sindicatos.meta.totalItems}
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
        ? <SindicatoCreate
          onClose={() => setOptions(undefined)}
          onSave={(sindicato) => handleQuerySearch(sindicato.nombre || '')}
        />
        : null
      }
    </div>
  </AuthLayout>;
};
export default Index

export const getServerSideProps = authorize('Tipo Afiliaciones', async (ctx: any, store: Store) => configDefaultServer(ctx, store));