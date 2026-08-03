export type StudioProject = {
  id: string;
  title: string;
  imageUrl: string;
  isEdited: boolean;
};

const imageUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;

export const STUDIO_PROJECTS: readonly StudioProject[] = [
  {
    id: 'prairie-light',
    title: 'Prairie light',
    imageUrl: imageUrl('photo-1500530855697-b586d89ba3ee'),
    isEdited: true,
  },
  {
    id: 'blue-hour',
    title: 'Blue hour',
    imageUrl: imageUrl('photo-1470770841072-f978cf4d019e'),
    isEdited: false,
  },
  {
    id: 'red-earth',
    title: 'Red earth',
    imageUrl: imageUrl('photo-1500534314209-a25ddb2bd429'),
    isEdited: true,
  },
  {
    id: 'still-water',
    title: 'Still water',
    imageUrl: imageUrl('photo-1518837695005-2083093ee35b'),
    isEdited: false,
  },
  {
    id: 'forest-floor',
    title: 'Forest floor',
    imageUrl: imageUrl('photo-1441974231531-c6227db76b6e'),
    isEdited: true,
  },
  {
    id: 'last-light',
    title: 'Last light',
    imageUrl: imageUrl('photo-1490730141103-6cac27aaab94'),
    isEdited: false,
  },
  {
    id: 'open-road',
    title: 'Open road',
    imageUrl: imageUrl('photo-1519608487953-e999c86e7455'),
    isEdited: true,
  },
  {
    id: 'morning-table',
    title: 'Morning table',
    imageUrl: imageUrl('photo-1495474472287-4d71bcdd2085'),
    isEdited: false,
  },
  {
    id: 'hard-lines',
    title: 'Hard lines',
    imageUrl: imageUrl('photo-1511818966892-d7d671e672a2'),
    isEdited: true,
  },
  {
    id: 'salt-air',
    title: 'Salt air',
    imageUrl: imageUrl('photo-1507525428034-b723cf961d3e'),
    isEdited: false,
  },
  {
    id: 'green-distance',
    title: 'Green distance',
    imageUrl: imageUrl('photo-1472214103451-9374bd1c798e'),
    isEdited: true,
  },
  {
    id: 'high-country',
    title: 'High country',
    imageUrl: imageUrl('photo-1501785888041-af3ef285b470'),
    isEdited: false,
  },
  {
    id: 'early-sun',
    title: 'Early sun',
    imageUrl: imageUrl('photo-1470252649378-9c29740c9fa8'),
    isEdited: true,
  },
  {
    id: 'soft-structure',
    title: 'Soft structure',
    imageUrl: imageUrl('photo-1483985988355-763728e1935b'),
    isEdited: false,
  },
  {
    id: 'quiet-wild',
    title: 'Quiet wild',
    imageUrl: imageUrl('photo-1483347756197-71ef80e95f73'),
    isEdited: true,
  },
];
