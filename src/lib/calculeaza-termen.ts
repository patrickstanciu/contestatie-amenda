const TERMENE_ZILE: Record<string, number> = {
  anaf: 30,
  politie_rutiera: 15,
  primarie: 15,
  itm: 15,
  isctr: 15,
  altele: 15,
};

export type TermenStatus = "ok" | "urgent" | "expirat" | "necunoscut";

export interface TermenInfo {
  status: TermenStatus;
  deadline: Date | null;
  zileRamase: number | null; // negative = depășit cu |n| zile
  termeniZile: number;
}

export function calculeazaTermen(tip: string, dataComunicare?: string | null): TermenInfo {
  const termeniZile = TERMENE_ZILE[tip] ?? 15;

  if (!dataComunicare) {
    return { status: "necunoscut", deadline: null, zileRamase: null, termeniZile };
  }

  const data = new Date(dataComunicare);
  if (isNaN(data.getTime())) {
    return { status: "necunoscut", deadline: null, zileRamase: null, termeniZile };
  }

  const deadline = new Date(data);
  deadline.setDate(deadline.getDate() + termeniZile);

  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const zileRamase = Math.ceil((deadline.getTime() - azi.getTime()) / (1000 * 60 * 60 * 24));

  let status: TermenStatus;
  if (zileRamase < 0) status = "expirat";
  else if (zileRamase <= 3) status = "urgent";
  else status = "ok";

  return { status, deadline, zileRamase, termeniZile };
}
