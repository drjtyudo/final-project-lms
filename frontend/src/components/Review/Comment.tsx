import React, { useState } from 'react';

const Comment = ({ author, text, replies }) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className="mb-2">
    <div className="flex items-start">
      <div className="flex-shrink-0 w-10 h-10 mr-2">
        <img
          className="w-full h-full rounded-full"
          src="https://via.placeholder.com/40"
          alt={`Avatar of ${author}`}
        />
      </div>
      <div className="flex-grow">
        <p className="font-bold text-base">{author}</p>
        <p className="text-gray-700 text-base w-4/5">{text}</p>
      </div>
      <div>
        <button className='font-bold' type="link" size="small">
          Balas Komentar
        </button>
      </div>
    </div>
      {replies.length > 0 && (
        <button
          className="text-gray-400 hover text-sm ml-12 no-underline"
          onClick={toggleReplies}
        >
          {showReplies
            ? `${replies.length} Balasan`
            : `${replies.length} Balasan`}
        </button>
      )}
      {showReplies && (
        <div className="mt-2 ml-[50px]">
          {replies.map((reply, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 mr-2">
                <img
                  className="w-full h-full rounded-full"
                  src="https://via.placeholder.com/32"
                  alt={`Avatar of ${reply.author}`}
                />
              </div>
              <div>
                <p className="font-bold text-base">{reply.author}</p>
                <p className="text-base w-4/5">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;