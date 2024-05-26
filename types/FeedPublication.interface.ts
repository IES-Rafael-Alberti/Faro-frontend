export interface FeedPublicationInterface {
    data: Array<{
      id: string;
      msg: string;
      created_at: string;
      user_id: string;
      name: string;
      user_role: string;
    }>;
    currentPage: number;
    totalPages: number;
}
