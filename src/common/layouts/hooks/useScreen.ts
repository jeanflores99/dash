import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resizeScreen } from "@common/store/screen.thunk";
import { useAppSelector } from '@store/index';
import { useRouter } from 'next/router';

const useScreen = () => {
  // redux
  const dispatch = useDispatch();
  const router = useRouter();
  const { screen } = useAppSelector(state => state) as any;

  const handleResize = () => dispatch(resizeScreen())

  useLayoutEffect(() => {
    if (router) handleResize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useLayoutEffect(() => {
    window?.addEventListener('resize', handleResize);
    return () => window?.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { title: screen?.title }
}

export default useScreen;