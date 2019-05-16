export function GetRusticityNamingFromScale(scale) {
  if (scale < 3) return 'Peu rustique';
  if (scale < 6) return 'Rustique';
  else return 'Très rustique';
}

export function GetRusticityTypeFromScale(scale) {
  switch (scale) {
    case 0: return 'Type 8'
    case 1: return 'Type 7'
    case 2: return 'Type 6'
    case 3: return 'Type 5'
    case 4: return 'Type 4'
    case 5: return 'Type 3'
    case 6: return 'Type 2'
    case 7: return 'Type 1'
    case 8: return 'Type 1'
    case 9: return 'Type 1'
    default: return 'Type 1'
  }
}

export function GetWaterNeedNamingFromScale(scale) {
  if (scale < 3) return 'Faible';
  if (scale < 6) return 'Modéré';
  else return 'Important';
}
