import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { CategoriaCreate } from '@modules/planilla/type_categoria/components/categoria-create';
import { TypeCategoria } from '@modules/planilla/type_categoria/dtos/type_categoria.entity';
import { CategoriaTable } from '@modules/planilla/type_categoria/components/categoria-table'
import { useRouter } from "next/router";
import { RootState } from "@store/store";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useSelector } from "react-redux"
import { authorize } from '@services/authorize';
import { Store } from 'redux';
import { configDefaultServer } from '@modules/planilla/type_categoria/default';

//Mover a escalafon

const Index = () => {
  const { typecategorias } = useSelector((state: RootState) => state.type_categoria);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<undefined | string>(undefined);
  const router = useRouter();

  const switchOptions = {
    CREATE: 'CREATE'
  }

  const handleClick = (Type_Categoria: TypeCategoria) => {
    const id = encrypt(`${Type_Categoria.id}`);
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
    <BreadCrumb title='Tip. Categoría' parent='Planilla' />
    <div className="card card-body">
      <CategoriaTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={typecategorias.items}
        perPage={typecategorias.meta.itemsPerPage}
        totalItems={typecategorias.meta.totalItems}
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
        ? <CategoriaCreate
          onClose={() => setOptions(undefined)}
          onSave={(work) => handleQuerySearch(work.export_value || '')}
        />
        : null
      }
    </div>
  </AuthLayout>;
};

export default Index

export const getServerSideProps = authorize('Tipo Categoría', async (ctx: any, store: Store) => configDefaultServer(ctx, store));