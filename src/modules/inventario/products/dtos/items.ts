import { Iitem, UnidadMedida } from "../interfaces/Iitem";

export const Item: Iitem[] = [{
  id: 1,
  nombre: 'Pollo',
  count: 20,
  priceunitario: '14',
  pricetotal: '280',
  tiempocaducidad: '5 dias',
  unidadmedida: UnidadMedida.Und,
  state: true
}, {
  id: 2,
  nombre: 'Arroz',
  count: 40,
  priceunitario: '3',
  pricetotal: '120',
  tiempocaducidad: '10 dias',
  unidadmedida: UnidadMedida.Kg,
  state: true

}, {
  id: 3,
  nombre: 'Papa',
  count: 50,
  priceunitario: '1.2',
  pricetotal: '60',
  tiempocaducidad: '4 dias',
  unidadmedida: UnidadMedida.Kg,
  state: true

}


]