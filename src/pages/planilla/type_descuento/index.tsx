import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { DescuentoCreate } from '@modules/planilla/type_descuento/components/descuento-create';
import { TypeDescuento } from '@modules/planilla/type_descuento/dtos/type_descuento.enitity';
import { DescuentoTable } from '@modules/planilla/type_descuento/components/descuento-table'
import { useRouter } from "next/router";
import { RootState } from "@store/store";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useSelector } from "react-redux"
import { authorize } from "@services/authorize";
import { Store } from 'redux';
import { configDefaultServer } from '@modules/planilla/type_descuento/default';

const Index = () => {
  const { type_descuentos } = useSelector((state: RootState) => state.type_descuento);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<string>('UNDEFINED');
  const router = useRouter();

  const switchOptions: any = {
    CREATE: <DescuentoCreate
      onClose={() => setOptions('UNDEFINED')}
      onSave={(work) => handleQuerySearch(work.key || '')}
    />,
    EDIT: <>editar</>,
    UNDEFINED: undefined
  }

  const handleClick = (Type_Descuento: TypeDescuento) => {
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
    <BreadCrumb title='Tip. Descuento' parent='Planilla' />
    <div className="card card-body">
      <DescuentoTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={type_descuentos.items}
        perPage={type_descuentos.meta.itemsPerPage}
        totalItems={type_descuentos.meta.totalItems}
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
      {
        // switchOptions.CREATE == options
        //   ? <DescuentoCreate
        //     onClose={() => setOptions(undefined)}
        //     onSave={(work) => handleQuerySearch(work.key || '')}
        //   />
        //   : null
        switchOptions[options]
      }
    </div>
  </AuthLayout>;
};
export default Index;

export const getServerSideProps = authorize('Tipos Descuentos', async (ctx: any, store: Store) => await configDefaultServer(ctx, store))
