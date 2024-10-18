import React from 'react';
import { Search, TrendingUp, Users, Calendar } from 'lucide-react';

const ExplorePage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-saffron-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Sankalp"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Trending Topics</h2>
        <div className="space-y-4">
          {[
            { icon: TrendingUp, tag: '#VedicWisdom', posts: '15.2K posts' },
            { icon: Users, tag: '#SanatanDharma', posts: '8.7K posts' },
            { icon: Calendar, tag: '#NavratriCelebrations', posts: '12.5K posts' },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-saffron-50 rounded-lg">
              <item.icon className="text-saffron-600" size={24} />
              <div>
                <p className="font-bold text-saffron-800">{item.tag}</p>
                <p className="text-sm text-saffron-600">{item.posts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-saffron-200">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Suggested Organizations</h2>
        <div className="space-y-4">
          {[
            { name: 'Vedic Foundation', handle: '@vedicfoundation', followers: '25.6K followers' },
            { name: 'Hindu Youth Forum', handle: '@hinduyouthforum', followers: '18.3K followers' },
            { name: 'Sanskrit Lovers', handle: '@sanskritlovers', followers: '12.9K followers' },
          ].map((org, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-saffron-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${org.name}`}
                  alt={org.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-saffron-800">{org.name}</p>
                  <p className="text-sm text-saffron-600">{org.handle}</p>
                  <p className="text-xs text-saffron-500">{org.followers}</p>
                </div>
              </div>
              <button className="bg-saffron-600 text-white rounded-full px-4 py-1 text-sm font-bold hover:bg-saffron-700 transition duration-200">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-saffron-200">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Upcoming Events</h2>
        <div className="space-y-4">
          {[
            { name: 'International Yoga Day', date: 'June 21, 2023', location: 'Worldwide' },
            { name: 'Diwali Festival', date: 'November 12, 2023', location: 'Various Cities' },
            { name: 'Vedic Conference', date: 'August 15-17, 2023', location: 'New Delhi, India' },
          ].map((event, index) => (
            <div key={index} className="p-3 bg-saffron-50 rounded-lg">
              <p className="font-bold text-saffron-800">{event.name}</p>
              <p className="text-sm text-saffron-600">{event.date}</p>
              <p className="text-sm text-saffron-500">{event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;