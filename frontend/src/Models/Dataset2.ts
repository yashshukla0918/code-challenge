export type Status = 'new' | 'complete' | 'in progress' | 'on hold' | 'archived';

export interface Item {
  name: string;
  viewed: boolean;
  description: string;
  status: Status;
}

export const dataSet: Item[] = [
  {
    name: 'Item 1',
    viewed: true,
    description: 'This is the first item',
    status: 'complete',
  },
  {
    name: 'Item 2',
    viewed: false,
    description: 'This is the second item',
    status: 'in progress',
  },
  {
    name: 'Item 3',
    viewed: true,
    description: 'This is the third item',
    status: 'new',
  },
  {
    name: 'Item 4',
    viewed: true,
    description: 'This is the fourth item',
    status: 'on hold',
  },
  {
    name: 'Item 5',
    viewed: false,
    description: 'This is the fifth item',
    status: 'archived',
  },
];

