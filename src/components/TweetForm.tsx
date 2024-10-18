import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';

interface TweetFormProps {
  onTweet: (content: string) => void;
  isReply?: boolean;
}

const TweetForm: React.FC<TweetFormProps> = ({ onTweet, isReply = false }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onTweet(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${!isReply && 'border-b border-saffron-200'}`}>
      <textarea
        className="w-full p-2 resize-none focus:outline-none bg-saffron-50 text-saffron-900 placeholder-saffron-500"
        placeholder={isReply ? "Write your reply" : "What's on your mind?"}
        rows={isReply ? 2 : 3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          <button type="button" className="text-saffron-600 hover:text-saffron-700"><Image size={20} /></button>
          <button type="button" className="text-saffron-600 hover:text-saffron-700"><Smile size={20} /></button>
          <button type="button" className="text-saffron-600 hover:text-saffron-700"><Calendar size={20} /></button>
          <button type="button" className="text-saffron-600 hover:text-saffron-700"><MapPin size={20} /></button>
        </div>
        <button
          type="submit"
          className="bg-saffron-600 text-white rounded-full px-4 py-2 font-bold hover:bg-saffron-700 transition duration-200"
          disabled={!content.trim()}
        >
          {isReply ? 'Reply' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default TweetForm;