export interface Resume {
  id: number;
  title: string;
  contentJson?: string;
  status: "draft" | "uploaded" | "reviewed";
  createdAt?: string;
  updatedAt?: string;
}
