import React from 'react';

interface KeywordsFilterProps {
  keywordType: string;
  onKeywordsChange: (keyword: string) => void;
}

const KeywordsFilter = ({
  keywordType,
  onKeywordsChange,
}: KeywordsFilterProps) => {
  return (
    <div className='grid grid-cols-2 border font-light'>
      {['가성비', '프리미엄'].map(keyword => (
        <span
          key={keyword}
          className={`cursor-pointer py-2 text-center duration-100 ${keywordType === keyword ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-100'}`}
          onClick={() => onKeywordsChange(keyword)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordsFilter;
