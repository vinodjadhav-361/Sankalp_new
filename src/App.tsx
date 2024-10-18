import React, { useState } from 'react';
import { Search, Home, Bell, Mail, Bookmark, User, MoreHorizontal, PlusCircle } from 'lucide-react';
import TweetForm from './components/TweetForm';
import Tweet from './components/Tweet';
import ExplorePage from './components/ExplorePage';
import CreatePostModal from './components/CreatePostModal';

export interface PostType {
  id: number;
  user: string;
  handle: string;
  content: string;
  likes: number;
  shares: number;
  comments: number;
  replies: PostType[];
  level: 'national' | 'state' | 'local';
  isPinned?: boolean;
  image?: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([
    { id: 1, user: 'Ramesh Kumar', handle: '@rameshkumar', content: 'Just joined Sankalp! Excited to connect with fellow Hindu organizations.', likes: 5, shares: 2, comments: 1, replies: [], level: 'national', isPinned: true },
    { id: 2, user: 'Priya Sharma', handle: '@priyasharma', content: 'Sankalp is an amazing platform for our community!', likes: 10, shares: 4, comments: 3, replies: [], level: 'state' },
    { id: 3, user: 'Amit Patel', handle: '@amitpatel', content: 'Local temple renovation project starting next week. Volunteers needed!', likes: 15, shares: 8, comments: 5, replies: [], level: 'local' },
  ]);

  const [currentPage, setCurrentPage] = useState('home');
  const [currentFeedLevel, setCurrentFeedLevel] = useState<'national' | 'state' | 'local'>('national');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const addPost = (content: string, level: 'national' | 'state' | 'local', image?: string) => {
    const newPost: PostType = {
      id: Date.now(),
      user: 'Current User',
      handle: '@currentuser',
      content,
      likes: 0,
      shares: 0,
      comments: 0,
      replies: [],
      level,
      image,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleShare = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleComment = (postId: number, comment: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              replies: [...post.replies, { id: Date.now(), user: 'Current User', handle: '@currentuser', content: comment, likes: 0, shares: 0, comments: 0, replies: [], level: post.level }],
            }
          : post
      )
    );
  };

  const filteredPosts = posts.filter(post => post.level === currentFeedLevel);

  return (
    <div className="min-h-screen bg-saffron-50">
      <div className="container mx-auto flex">
        {/* Left Sidebar */}
        <div className="w-1/4 py-4 px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-saffron-700">Sankalp</h1>
          </div>
          <nav>
            <a href="#" onClick={() => setCurrentPage('home')} className={`flex items-center mb-4 text-lg ${currentPage === 'home' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Home className="mr-4" /> Home</a>
            <a href="#" onClick={() => setCurrentPage('explore')} className={`flex items-center mb-4 text-lg ${currentPage === 'explore' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Search className="mr-4" /> Explore</a>
            <a href="#" className="flex items-center mb-4 text-lg text-saffron-600"><Bell className="mr-4" /> Notifications</a>
            <a href="#" className="flex items-center mb-4 text-lg text-saffron-600"><Mail className="mr-4" /> Messages</a>
            <a href="#" className="flex items-center mb-4 text-lg text-saffron-600"><Bookmark className="mr-4" /> Bookmarks</a>
            <a href="#" className="flex items-center mb-4 text-lg text-saffron-600"><User className="mr-4" /> Profile</a>
            <a href="#" className="flex items-center mb-4 text-lg text-saffron-600"><MoreHorizontal className="mr-4" /> More</a>
          </nav>
          <button onClick={() => setIsCreatePostModalOpen(true)} className="bg-saffron-600 text-white rounded-full py-2 px-4 w-full mt-4 hover:bg-saffron-700 transition duration-200 flex items-center justify-center">
            <PlusCircle className="mr-2" /> Create Post
          </button>
        </div>

        {/* Main Content */}
        <div className="w-1/2 border-x border-saffron-200 bg-white">
          {currentPage === 'home' ? (
            <>
              <h1 className="text-xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Home</h1>
              <div className="flex justify-around p-2 bg-saffron-100">
                <button
                  onClick={() => setCurrentFeedLevel('national')}
                  className={`px-4 py-2 rounded-full ${currentFeedLevel === 'national' ? 'bg-saffron-600 text-white' : 'bg-white text-saffron-600'}`}
                >
                  National
                </button>
                <button
                  onClick={() => setCurrentFeedLevel('state')}
                  className={`px-4 py-2 rounded-full ${currentFeedLevel === 'state' ? 'bg-saffron-600 text-white' : 'bg-white text-saffron-600'}`}
                >
                  State
                </button>
                <button
                  onClick={() => setCurrentFeedLevel('local')}
                  className={`px-4 py-2 rounded-full ${currentFeedLevel === 'local' ? 'bg-saffron-600 text-white' : 'bg-white text-saffron-600'}`}
                >
                  Local
                </button>
              </div>
              <div className="border-t border-saffron-200">
                {filteredPosts.map((post) => (
                  <Tweet
                    key={post.id}
                    tweet={post}
                    onLike={handleLike}
                    onShare={handleShare}
                    onComment={handleComment}
                  />
                ))}
              </div>
            </>
          ) : (
            <ExplorePage />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 py-4 px-6">
          <div className="bg-saffron-100 rounded-lg p-4 mb-4">
            <h2 className="font-bold text-xl mb-4 text-saffron-800">Trending Topics</h2>
            <div className="mb-3">
              <p className="text-sm text-saffron-600">Trending in Spirituality</p>
              <p className="font-bold text-saffron-800">#Diwali2023</p>
              <p className="text-sm text-saffron-600">5,234 Posts</p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-saffron-600">Culture · Trending</p>
              <p className="font-bold text-saffron-800">#YogaDay</p>
              <p className="text-sm text-saffron-600">32.1K Posts</p>
            </div>
            <a href="#" className="text-saffron-600 text-sm hover:text-saffron-700">Show more</a>
          </div>
          <div className="bg-saffron-100 rounded-lg p-4">
            <h2 className="font-bold text-xl mb-4 text-saffron-800">Organizations to follow</h2>
            <div className="mb-3">
              <p className="font-bold text-saffron-800">Vedic Foundation</p>
              <button className="text-saffron-600 text-sm hover:text-saffron-700">Follow</button>
            </div>
            <div className="mb-3">
              <p className="font-bold text-saffron-800">Hindu Youth Forum</p>
              <button className="text-saffron-600 text-sm hover:text-saffron-700">Follow</button>
            </div>
            <a href="#" className="text-saffron-600 text-sm hover:text-saffron-700">Show more</a>
          </div>
        </div>
      </div>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={addPost}
      />
    </div>
  );
}

export default App;