import React, { useEffect, useState } from "react";
import { AuthLayout } from '@common/layouts'
import { BreadCrumb } from '@common/breadcrumb'
import { authorize } from "@services/authorize";
import { Store } from "redux";
import { workActions } from "@modules/escalafon/works/store";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { getWorks } from "@modules/escalafon/works/apis";
import { WorkTable } from "@modules/escalafon/works/components/work-table";
import { useRouter } from "next/router";
import { WorkEntity } from "@modules/escalafon/works/dtos/work.entity";
import { encrypt } from "@services/crypt";
import { FloatButton } from "@common/button/float-button";
import { Plus } from "react-feather";
import { WorkStepCreate } from '@modules/escalafon/works/components/work-step-create';

const Index = () => {

  const { works } = useSelector((state: RootState) => state.work);
  const [pending, setPending] = useState(true);
  const [options, setOptions] = useState<undefined | string>(undefined);
  const router = useRouter();

  const switchOptions = {
    CREATE: 'CREATE'
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

  const handlePage = (page: number) => {
    setPending(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
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

  const handleClick = (work: WorkEntity) => {
    const id = encrypt(`${work.id}`);
    router.push(`${router.pathname}/ID:${id}`);
  }

  useEffect(() => {
    if (pending) setPending(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AuthLayout>
      <BreadCrumb title="Trabajadores" parent="Escalafón" />
      <div className="card card-body">
        <WorkTable
          defaultQuerySearch={router?.query?.querySearch || ''}
          loading={pending}
          data={works.items}
          perPage={works.meta.itemsPerPage}
          totalItems={works.meta.totalItems}
          onChangePage={handlePage}
          onChangeRowsPerPage={handleChangePerPage}
          onQuerySearch={handleQuerySearch}
          onClick={handleClick}
        />
      </div>
      {/* btn flotante */}
      <FloatButton
        icon={<Plus />}
        color="success"
        onClick={() => setOptions(switchOptions.CREATE)}
      />
      {/* modal create */}
      {switchOptions.CREATE == options
        ? <WorkStepCreate
          onClose={() => setOptions(undefined)}
          onSave={(work) => handleQuerySearch(work.orderBy.toLowerCase())}
        />
        : null
      }
    </AuthLayout>
  )
}

export default Index;

export const getServerSideProps = authorize('Trabajadores', async (ctx: any, store: Store) => {
  const page = ctx.query?.page || 1;
  const querySearch = ctx.query?.querySearch || '';
  const limit = ctx.query?.limit || 30;
  const result = await getWorks({ page, querySearch, limit });
  if (!result?.err) store.dispatch(workActions.paginate(result));
});