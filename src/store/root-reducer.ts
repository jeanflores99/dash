import { combineReducers } from '@reduxjs/toolkit';
import { screenReducer } from '@common/store/screen.thunk';
import { authReducer } from '@common/store/auth.thunk';
import { workReducer } from '@modules/escalafon/works/store';
import { type_remunerationReducer } from '@modules/planilla/type_remuneration/store'
import { type_descuentoReducer } from '@modules/planilla/type_descuento/store';
import { type_aportacionReducer } from '@modules/planilla/type_aportacion/store'
import { type_categoriaReducer } from '@modules/planilla/type_categoria/store';
import { type_sindicatoReducer } from '@modules/planilla/type_sindicato/store';
import { afpReducer } from '@modules/planilla/afp/store';
import { contractReducer } from "@modules/escalafon/contracts/store";
import { personReducer } from "@modules/auth/person/store";
import { clientReducer } from "@modules/auth/clients/store";
import { familyReducer } from "@modules/escalafon/families/store";
import { licenseReducer } from "@modules/escalafon/licenses/store";
import { scheduleReducer } from "@modules/escalafon/schedules/store";

export const rootReducer = combineReducers({
  screen: screenReducer,
  client: clientReducer,
  auth: authReducer,
  person: personReducer,
  work: workReducer,
  type_remuneration: type_remunerationReducer,
  type_descuento: type_descuentoReducer,
  type_aportacion: type_aportacionReducer,
  type_categoria: type_categoriaReducer,
  type_sindicato: type_sindicatoReducer,
  afp: afpReducer,
  contract: contractReducer,
  family: familyReducer,
  license: licenseReducer,
  schedule: scheduleReducer,
});
