import React, { useMemo } from 'react';
import { decrypt } from '@services/crypt';
import { authorize } from '@services/authorize';
import { Store } from 'redux';
import { findWork } from '@modules/escalafon/works/apis';
import { workActions } from '@modules/escalafon/works/store';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { AuthLayout } from '@common/layouts';
import { setTitle } from '@common/store/screen.thunk';
import { BreadCrumb } from '@common/breadcrumb';
import { PersonProfile } from '@modules/auth/person/components/person-profile';
import { WorkTab } from '@modules/escalafon/works/components/work-tab';

const WorkId = () => {

  const { work } = useSelector((state: RootState) => state.work);

  const displayTitle = useMemo(() => {
    const textName = `${work?.person?.name}`.toLowerCase();
    return `Trabajador ${textName}`
  }, [work])

  return (
    <AuthLayout>
      <BreadCrumb parent='escalafón'
        title={displayTitle}
      />
      <PersonProfile
        code={work?.person?.documentNumber || ''}
        title={work?.person?.fullName || ''}
        email={work?.person?.emailContact || ''}
        dateOfBirth={work?.person?.dateOfBirth || ''}
        phone={work?.person?.phone || ''}
        address={work?.person?.address || ''}
      />
      <WorkTab />
    </AuthLayout>
  )
}

export default WorkId;

export const getServerSideProps = authorize(`Información del Trabajador`,
  async (ctx: any, store: Store) => {
    const query = ctx?.query || {};
    const id = parseInt(decrypt(query?.id) || '_error');
    const work = await findWork(id);
    if (work?.id) {
      store.dispatch(workActions.find(work));
      store.dispatch(setTitle(`Trabajador ${work?.person?.name?.toLowerCase()}`));
    } else {
      store.dispatch(workActions.find(null))
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        }
      }
    }
  });