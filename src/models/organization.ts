export type Organization = {
  id: number;
  parent?: {
    id: number;
    title: string;
    vulgar_title: string;
  };
  title: string;
  vulgar_title: string;
  children: Organization[];
  created_at: Date;
};
