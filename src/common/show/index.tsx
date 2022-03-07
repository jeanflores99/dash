
interface TPropsShow {
  condition: boolean;
  isDefault?: any;
  children: any;
}

export const Show = (props: TPropsShow) => {
  if (props.condition) return props.children || null;
  return props.isDefault || null;
}