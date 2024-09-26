import { makeEnum } from "../utils/enum";

export const ConsultationStatus = makeEnum([
  "PENDING",
  "APPROVED",
  "COMPLETED",
]);
