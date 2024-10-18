import React, { useState } from 'react';
import { MessageCircle, Repeat, Heart, Share } from 'lucide-react';
import TweetForm from './TweetForm';
import { PostType } from '../App';

interface TweetProps {
  tweet: PostType;
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const Tweet: React.FC<TweetProps> = ({ tweet, onLike, onShare, onComment }) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = (content: string) => {
    onComment(tweet.id, content);
    setIsReplying(false);
  };

  return (
    <div className={`p-4 border-b border-saffron-200 ${tweet.isPinned ? 'bg-saffron-50' : ''}`}>
      {tweet.isPinned && (
        <p className="text-sm text-saffron-600 mb-2">📌 Pinned Post</p>
      )}
      <div className="flex items-center mb-2">
        <img
          src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${tweet.handle}`}
          alt={tweet.user}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <p className="font-bold text-saffron-800">{tweet.user} <span className="font-normal text-saffron-600">{tweet.handle}</span></p>
        </div>
      </div>
      <p className="mb-3 text-saffron-900">{tweet.content}</p>
      {tweet.image && (
        <img src={tweet.image} alt="Post image" className="mb-3 rounded-lg max-w-full h-auto" />
      )}
      <div className="flex justify-between text-saffron-600 mb-2">
        <button className="flex items-center hover:text-saffron-700" onClick={() => setIsReplying(!isReplying)}>
          <MessageCircle size={18} className="mr-2" /> {tweet.comments}
        </button>
        <button className="flex items-center hover:text-saffron-700" onClick={() => onShare(tweet.id)}>
          <Repeat size={18} className="mr-2" /> {tweet.shares}
        </button>
        <button className="flex items-center hover:text-saffron-700" onClick={() => onLike(tweet.id)}>
          <Heart size={18} className="mr-2" /> {tweet.likes}
        </button>
        <button className="flex items-center hover:text-saffron-700">
          <Share size={18} />
        </button>
      </div>
      {isReplying && (
        <div className="ml-12 mt-2">
          <TweetForm onTweet={handleReply} isReply={true} />
        </div>
      )}
      {tweet.replies.map((reply) => (
        <div key={reply.id} className="ml-12 mt-4">
          <Tweet tweet={reply} onLike={onLike} onShare={onShare} onComment={onComment} />
        </div>
      ))}
    </div>
  );
};

export default Tweet;