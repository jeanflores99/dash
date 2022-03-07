import { useDispatch } from 'react-redux';
import { toggleTheme } from '@common/store/screen.thunk';

export const useDarkTheme = () => {
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleTheme())

  return {
    toggle,
  }
}