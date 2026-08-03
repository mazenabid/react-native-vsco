export type StudioProject = {
  id: string;
  index: string;
  title: string;
  updatedAt: string;
  isEdited: boolean;
  palette: {
    base: string;
    light: string;
    dark: string;
    line: string;
  };
  composition: {
    sunTop: number;
    sunLeft: number;
    horizonHeight: number;
  };
};

export const STUDIO_PROJECTS: readonly StudioProject[] = [
  {
    id: 'prairie-light',
    index: '01',
    title: 'Prairie light',
    updatedAt: 'TODAY · 08:42',
    isEdited: true,
    palette: { base: '#B9A99C', light: '#E4C39D', dark: '#5C5E57', line: '#F1E8DB' },
    composition: { sunTop: 0.18, sunLeft: 0.5, horizonHeight: 0.4 },
  },
  {
    id: 'blue-hour',
    index: '02',
    title: 'Blue hour',
    updatedAt: 'YESTERDAY · 21:16',
    isEdited: false,
    palette: { base: '#596573', light: '#AAB4BE', dark: '#222B32', line: '#D9DFE3' },
    composition: { sunTop: 0.12, sunLeft: 0.16, horizonHeight: 0.52 },
  },
  {
    id: 'red-earth',
    index: '03',
    title: 'Red earth',
    updatedAt: 'JUL 31 · 17:03',
    isEdited: true,
    palette: { base: '#B66F50', light: '#E0B47D', dark: '#633A2D', line: '#F2D7BE' },
    composition: { sunTop: 0.24, sunLeft: 0.42, horizonHeight: 0.34 },
  },
  {
    id: 'still-water',
    index: '04',
    title: 'Still water',
    updatedAt: 'JUL 29 · 06:28',
    isEdited: false,
    palette: { base: '#7E9691', light: '#C7D1C6', dark: '#3E5958', line: '#E1EAE5' },
    composition: { sunTop: 0.13, sunLeft: 0.54, horizonHeight: 0.46 },
  },
  {
    id: 'soft-concrete',
    index: '05',
    title: 'Soft concrete',
    updatedAt: 'JUL 27 · 14:50',
    isEdited: true,
    palette: { base: '#A59F96', light: '#D9D0C2', dark: '#5B5752', line: '#EFE9DF' },
    composition: { sunTop: 0.3, sunLeft: 0.12, horizonHeight: 0.29 },
  },
  {
    id: 'after-rain',
    index: '06',
    title: 'After rain',
    updatedAt: 'JUL 25 · 19:12',
    isEdited: false,
    palette: { base: '#66746A', light: '#B5BEA7', dark: '#303D35', line: '#DCE2D4' },
    composition: { sunTop: 0.17, sunLeft: 0.35, horizonHeight: 0.56 },
  },
];
