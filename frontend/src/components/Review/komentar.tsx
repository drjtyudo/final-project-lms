import React, { useState } from 'react'
import Comment from './Comment'

const commentsData = [
  {
    author: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    replies: [
      {
        author: 'Jane Smith',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    author: 'Jane Smith',
    text: 'Ini adalah komentar kedua.',
    replies: [
      { author: 'John Doe', text: 'Balasan pertama.' },
      { author: 'Bob Brown', text: 'Balasan kedua.' },
    ],
  },
  {
    author: 'Alice Johnson',
    text: 'Ini adalah komentar ketiga.',
    replies: [
      { author: 'Jane Smith', text: 'Balasan pertama.' },
      { author: 'John Doe', text: 'Balasan kedua.' },
    ],
  },
  {
    author: 'Alice Johnson',
    text: 'Ini adalah komentar ketiga.',
    replies: [
      { author: 'Jane Smith', text: 'Balasan pertama.' },
      { author: 'John Doe', text: 'Balasan kedua.' },
    ],
  },
    {
        author: 'Alice Johnson',
        text: 'Ini adalah komentar ketiga.',
        replies: [
        { author: 'Jane Smith', text: 'Balasan pertama.' },
        { author: 'John Doe', text: 'Balasan kedua.' },
        ],
    },
]

const Komentar = () => {
  const [visibleComments, setVisibleComments] = useState(2);
  const [showThirdComment, setShowThirdComment] = useState(false);

  const showMoreComments = () => {
    if (!showThirdComment) {
      setVisibleComments(visibleComments + 3);
    } else {
      setVisibleComments(visibleComments - 3);
    }
    setShowThirdComment(!showThirdComment);
  };

  return (
    <div className="px-4 h-[500px] overflow-auto">
      {commentsData.slice(0, visibleComments).map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}

      <div className="text-center m-auto gap-2 mt-4 flex flex-col w-36 ">
        <button className="text-gray-400 hover" onClick={showMoreComments}>
          {showThirdComment ? 'Show Less' : 'Show More'}
        </button>
        <button className="border border-black p-0 rounded-xl">
          + Leave a Review
        </button>
      </div>
    </div>
  );
};

export default Komentar;
