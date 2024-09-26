export const getPatientsWithLensConsultation = (data) =>
  data.filter((patient) => patient.lensConsultation !== undefined);

export const getPatientsWithoutLensConsultation = (data) =>
  data.filter((patient) => patient.lensConsultation === undefined);
