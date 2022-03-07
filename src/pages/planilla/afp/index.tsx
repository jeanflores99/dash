import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { useRouter } from "next/router";
import { RootState } from "@store/store";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { useSelector } from "react-redux"
import { AfpCreate } from '@modules/planilla/afp/components/afp-create'
import { AfpTable } from '@modules/planilla/afp/components/afp-table'
import { Afp } from '@modules/planilla/afp/dtos/afp.entity';

const Index = () => {
  const { afps } = useSelector((state: RootState) => state.afp);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<undefined | string>(undefined);
  const router = useRouter();

  const switchOptions = {
    CREATE: 'CREATE'
  }

  const handleClick = (afp: Afp) => {
    const id = encrypt(`${afp.id}`);
    router.push(`${router.pathname}/id:${id}`);
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
    <BreadCrumb title='AFP' parent='Planilla' />
    <div className="card card-body">
      <AfpTable
        defaultQuerySearch={router?.query?.querySearch || ''}
        loading={pending}
        data={afps.items}
        perPage={afps.meta.itemsPerPage}
        totalItems={afps.meta.totalItems}
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
        ? <AfpCreate
          onClose={() => setOptions(undefined)}
          onSave={(afp) => handleQuerySearch(afp.aporte || '')}
        />
        : null
      }
    </div>
  </AuthLayout>;
};
export default Index