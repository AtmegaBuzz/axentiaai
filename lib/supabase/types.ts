export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
}

export interface Thread {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  slug: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: Category;
  posts?: Post[];
  post_count?: number;
  reaction_count?: number;
}

export interface Post {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  parent_id: string | null;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  reactions?: Reaction[];
  upvotes?: number;
  downvotes?: number;
  user_reaction?: 'upvote' | 'downvote' | null;
}

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  type: 'upvote' | 'downvote';
  created_at: string;
}
