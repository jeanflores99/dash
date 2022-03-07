/* eslint-disable no-unused-vars */

import { IBadgeEntity } from "@common/badges/dtos/badge.entity";

export enum PersonMaritalStatus {
  S = "S",
  C = "C",
  D = "D",
  V = "V",
  O = "O",
}

export interface PersonEntity {
  id: number;
  prefix: string;
  name: string;
  lastname: string;
  secondaryName?: string;
  documentTypeId: string;
  fullName: string;
  documentNumber: string;
  badgeId: string;
  dateOfBirth: string;
  gender: "F" | "M";
  maritalStatus: PersonMaritalStatus;
  phone?: string;
  emailContact?: string;
  address?: string;
  state: boolean;
  documentType: { name: string; code: string };
  badge?: IBadgeEntity;
}
