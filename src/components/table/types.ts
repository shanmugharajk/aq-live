export interface IColumn {
  id: any;
  label: string;
  className?: string;
  render?: (value: any) => React.ReactNode;
}

export interface ITableProps {
  columns: IColumn[];
  rows: any[];
}
