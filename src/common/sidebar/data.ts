import { Save, Calendar } from 'react-feather';

export interface IChildItem {
  type: 'link'
  path: string
  title: string
  active: boolean
}

export interface IItemMenu {
  title: string
  icon: any
  type: 'sub'
  badge?: string
  badgetxt?: string
  active: boolean
  children?: IChildItem[]
}

export interface IBodyMenu {
  menuTitle: string
  menuContent: string
  items: IItemMenu[]
}

export const sidebarData: IBodyMenu[] = [
  {
    menuTitle: "Sis. Restaurante",
    menuContent: "Pedidos, Reporte, Almacen",
    items: [
      {
        title: 'Control de Ventas',
        icon: Save,
        type: 'sub',
        badge: "badge badge-warning",
        badgetxt: "v2",
        active: false,
        children: [
          {
            path: `${process?.env?.NEXT_PUBLIC_URL}/restaurant`,
            title: 'Mesas',
            type: 'link',
            active: false
          },
          {
            path: `${process?.env?.NEXT_PUBLIC_URL}/restaurant/reports`,
            title: 'Reportes',
            type: 'link',
            active: false
          },
          {
            path: `${process?.env?.NEXT_PUBLIC_URL}/restaurant/products`,
            title: 'Productos',
            type: 'link',
            active: false
          },
          {
            path: `${process?.env?.NEXT_PUBLIC_URL}/restaurant/clients`,
            title: 'Clientes',
            type: 'link',
            active: false
          }
        ]
      }, {
        title: 'Inventario',
        icon: Calendar,
        type: 'sub',
        badge: "badge badge-warning",
        badgetxt: "v2",
        active: false,
        children: [
          {
            path: `${process?.env?.NEXT_PUBLIC_URL}/inventario/products`,
            title: 'Items',
            type: 'link',
            active: false
          },
          // {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/inventario/type_remuneration`,
          //   title: 'Tip. Remuneración',
          //   type: 'link',
          //   active: false
          // },
          // {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/planilla/type_descuento`,
          //   title: 'Tip. Descuentos',
          //   type: 'link',
          //   active: false
          // },
          // {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/planilla/type_aportacion`,
          //   title: 'Tip. Aportacion',
          //   type: 'link',
          //   active: false
          // },
          // {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/planilla/type_categoria`,
          //   title: 'Tip. Catergoria',
          //   type: 'link',
          //   active: false
          // },
          // {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/planilla/type_sindicato`,
          //   title: 'Tip. Afiliaciones',
          //   type: 'link',
          //   active: false
          // }, {
          //   path: `${process?.env?.NEXT_PUBLIC_URL}/planilla/afp`,
          //   title: 'Tip. Leyes Sociales',
          //   type: 'link',
          //   active: false
          // }
        ]
      },


    ]
  }
];