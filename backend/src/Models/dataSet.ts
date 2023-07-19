export type Status = 'new' | 'complete' | 'in-progress' | 'on-hold' | 'archived';

export interface Item {
  id:string;
  name: string;
  viewed: boolean;
  description: string;
  status: Status;
}

export const dataSet: Item[] = [
  {
    id : '1689782295774',
    name: 'Item 1',
    viewed: true,
    description: 'This is the first item',
    status: 'complete',
  },
  {
    id : '1689782295775',
    name: 'Item 2',
    viewed: false,
    description: 'This is the second item',
    status: 'in-progress',
  },
  {
    id : '1689782295776',
    name: 'Item 3',
    viewed: true,
    description: 'This is the third item',
    status: 'new',
  },
  {
    id : '1689782295777',
    name: 'Item 4',
    viewed: true,
    description: 'This is the fourth item',
    status: 'on-hold',
  },
  {
    id : '1689782295778',
    name: 'Item 5',
    viewed: false,
    description: 'This is the fifth item',
    status: 'archived',
  },
];


