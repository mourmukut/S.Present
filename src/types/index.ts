export interface tree {
  id: string;
  parentId: string;
  label: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  autherId: string;
  autherName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}
