type TResource = {
  id: number;
  userId: number;
  name: string;
  key: string;
  iv: string;
  salt: string | null;
  createdAt: Date;
  updatedAt: Date;
};
