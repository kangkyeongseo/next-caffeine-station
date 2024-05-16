import React, { useEffect, useState } from 'react';

interface KeywordsFilterProps {
  keywordType: string;
  onKeywordsChange: (keyword: string) => void;
  user: any;
}

const KeywordsFilter = ({
  keywordType,
  onKeywordsChange,
  user,
}: KeywordsFilterProps) => {
  const [keywords, setKeywords] = useState(['가성비', '프리미엄']);
  useEffect(() => {
    if (!user) return;
    setKeywords(['가성비', '프리미엄', '나의 카페']);
  }, [user]);
  return (
    <div
      className={`grid border font-light ${user ? 'grid-cols-3' : 'grid-cols-2'}`}
    >
      {keywords.map(keyword => (
        <span
          key={keyword}
          className={`cursor-pointer py-[6px] text-center duration-100 md:py-2 ${keywordType === keyword ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-100'}`}
          onClick={() => onKeywordsChange(keyword)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordsFilter;
