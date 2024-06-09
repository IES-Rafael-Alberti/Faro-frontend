export interface FeedPublicationInterface {
    data: Array<{
      id: string;
      msg: string;
      created_at: string;
      user_id: string;
      name: string;
      user_role: string;
      comments: Array<{
        id: string;
        user_id: string;
        publication_id: string;
        comment: string;
        created_at: string;
        name: string;
        role: string;
        image: string;
      }>;
    }>;
    currentPage: number;
    totalPages: number;
}
