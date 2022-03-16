import * as schemas from './schemas';

export type Order = {
  /**
   * @format int64
   */
  id?: number;
  /**
   * @format int64
   */
  petId?: number;
  /**
   * @format int32
   */
  quantity?: number;
  /**
   * @format date-time
   */
  shipDate?: string;
  /**
   * Order Status
   */
  status?: 'placed' | 'approved' | 'delivered';

  complete?: boolean;
};

export type Customer = {
  /**
   * @format int64
   */
  id?: number;

  username?: string;

  address?: Array<schemas.Address>;
};

export type Address = {
  street?: string;

  city?: string;

  state?: string;

  zip?: string;
};

export type Category = {
  /**
   * @format int64
   */
  id?: number;

  name?: string;
};

export type User = {
  /**
   * @format int64
   */
  id?: number;

  username?: string;

  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;

  phone?: string;
  /**
   * User Status
   * @format int32
   */
  userStatus?: number;
};

export type Tag = {
  /**
   * @format int64
   */
  id?: number;

  name?: string;
};

export type Pet = {
  /**
   * @format int64
   */
  id?: number;

  name: string;

  category?: schemas.Category;

  photoUrls: Array<string>;

  tags?: Array<schemas.Tag>;
  /**
   * pet status in the store
   */
  status?: 'available' | 'pending' | 'sold';
};

export type ApiResponse = {
  /**
   * @format int32
   */
  code?: number;

  type?: string;

  message?: string;
};
