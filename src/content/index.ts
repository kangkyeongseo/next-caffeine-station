const paikdabang = {
  name: '빽다방',
  hot: { price: 1500, amount: 400, caffeine: 237 },
  ice: { price: 2000, amount: 625, caffeine: 237 },
  menu: [
    {
      menuName: '앗!메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 1500,
          amount: 400,
          kcal: 14,
          caffeine: 237,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 2000,
          amount: 625,
          kcal: 13,
          caffeine: 237,
        },
      ],
    },
  ],
};

const megaCoffee = {
  name: '메가MGC커피',
  hot: { price: 1500, amount: 567, caffeine: 204.2 },
  ice: { price: 2000, amount: 680, caffeine: 199.7 },
  menu: [
    {
      menuName: '아메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 1500,
          amount: 567,
          kcal: 12.2,
          caffeine: 204.2,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 2000,
          amount: 680,
          kcal: 12.2,
          caffeine: 199.7,
        },
      ],
    },
  ],
};

const composeCoffee = {
  name: '컴포즈커피',
  hot: { price: 1500, amount: 567, caffeine: 156 },
  ice: { price: 1500, amount: 567, caffeine: 156 },
  menu: [
    {
      menuName: '아메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 1500,
          amount: 567,
          kcal: 15,
          caffeine: 156,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 1500,
          amount: 567,
          kcal: 15,
          caffeine: 156,
        },
      ],
    },
  ],
};

const starbucks = {
  name: '스타벅스',
  hot: { price: 4500, amount: 355, caffeine: 150 },
  ice: { price: 4500, amount: 355, caffeine: 150 },
  menu: [
    {
      menuName: '아메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 4500,
          amount: 355,
          kcal: 10,
          caffeine: 150,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 4500,
          amount: 355,
          kcal: 10,
          caffeine: 150,
        },
      ],
    },
  ],
};

const paulbassett = {
  name: '폴바셋',
  hot: { price: 4700, amount: 360, caffeine: 160 },
  ice: { price: 4700, amount: 360, caffeine: 160 },
  menu: [
    {
      menuName: '아메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 4700,
          amount: 360,
          kcal: 10,
          caffeine: 160,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 4700,
          amount: 360,
          kcal: 10,
          caffeine: 160,
        },
      ],
    },
  ],
};

const twosome = {
  name: '투썸플레이스',
  hot: { price: 4500, amount: 355, caffeine: 160 },
  ice: { price: 4500, amount: 355, caffeine: 160 },
  menu: [
    {
      menuName: '아메리카노',
      kind: [
        {
          type: 'hot',
          size: 'one_size',
          price: 4500,
          amount: 355,
          kcal: 15,
          caffeine: 160,
        },
        {
          type: 'ice',
          size: 'one_size',
          price: 4500,
          amount: 355,
          kcal: 15,
          caffeine: 160,
        },
      ],
    },
  ],
};

export const brands = [
  paikdabang,
  megaCoffee,
  composeCoffee,
  starbucks,
  paulbassett,
  twosome,
];
