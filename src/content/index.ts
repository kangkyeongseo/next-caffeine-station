const paikdabang = {
  id: 1,
  name: '빽다방',
  hot: { price: 1500, amount: 400, caffeine: 237 },
  ice: { price: 2000, amount: 625, caffeine: 237 },
};

const megaCoffee = {
  id: 2,
  name: '메가MGC커피',
  hot: { price: 1500, amount: 567, caffeine: 204.2 },
  ice: { price: 2000, amount: 680, caffeine: 199.7 },
  menu: [
    {
      menuName: '아메리카노',
      nutritionalInfos: [
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
  id: 3,
  name: '     ',
  hot: { price: 1500, amount: 567, caffeine: 156 },
  ice: { price: 1500, amount: 567, caffeine: 156 },
  menu: [
    {
      menuName: '아메리카노',
      nutritionalInfo: [
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
  id: 4,
  name: '스타벅스',
  hot: { price: 4500, amount: 355, caffeine: 150 },
  ice: { price: 4500, amount: 355, caffeine: 150 },
  menu: [
    {
      menuName: '아메리카노',
      nutritionalInfo: [
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
  id: 5,
  name: '폴바셋',
  hot: { price: 4700, amount: 360, caffeine: 160 },
  ice: { price: 4700, amount: 360, caffeine: 160 },
  menu: [
    {
      menuName: '아메리카노',
      nutritionalInfo: [
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
  id: 6,
  name: '투썸플레이스',
  hot: { price: 4500, amount: 355, caffeine: 160 },
  ice: { price: 4500, amount: 355, caffeine: 160 },
  menu: [
    {
      menuName: '아메리카노',
      nutritionalInfo: [
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

export const menus = [
  {
    bradnId: 1,
    menu: [
      {
        menuName: '앗!메리카노',
        category: 'coffee',
        types: ['hot', 'ice'],
        sizes: ['원사이즈'],
        description:
          '빽다방만의 맛과 향을 더한 100% 아라비카 로스팅 원두로 뽑아내 깊고 진한 맛의 앗!메리카노',
        nutritionalInfos: [
          {
            type: 'hot',
            size: '원사이즈',
            price: 1500,
            amount: 400,
            kcal: 14,
            caffeine: 237,
          },
          {
            type: 'ice',
            size: '원사이즈',
            price: 2000,
            amount: 625,
            kcal: 13,
            caffeine: 237,
          },
        ],
      },
      {
        menuName: '원조커피',
        category: 'coffee',
        types: ['hot', 'ice'],
        sizes: ['원사이즈'],
        description: '달콤한 빽다방 대표메뉴, 믹스커피 종결자!',
        nutritionalInfos: [
          {
            type: 'hot',
            size: '원사이즈',
            price: 2500,
            amount: 375,
            kcal: 471,
            caffeine: 406,
          },
          {
            type: 'ice',
            size: '원사이즈',
            price: 2500,
            amount: 625,
            kcal: 425,
            caffeine: 371,
          },
        ],
      },
      {
        menuName: '빽s라떼',
        category: 'coffee',
        types: ['hot', 'ice'],
        sizes: ['원사이즈'],
        description:
          '진한 에스프레소와 우유가 어우려져 탄생한 부드러운 빽다방 라떼',
        nutritionalInfos: [
          {
            type: 'hot',
            size: '원사이즈',
            price: 3000,
            amount: 300,
            kcal: 253,
            caffeine: 237,
          },
          {
            type: 'ice',
            size: '원사이즈',
            price: 3000,
            amount: 625,
            kcal: 198,
            caffeine: 237,
          },
        ],
      },
      {
        menuName: '카페라떼',
        category: 'coffee',
        types: ['hot', 'ice'],
        sizes: ['small', 'large'],
        description:
          '진한 에스프레소와 우유가 어우려져 탄생한 부드러운 빽다방 라떼',
        nutritionalInfos: [
          {
            type: 'hot',
            size: 'small',
            price: 3000,
            amount: 300,
            kcal: 253,
            caffeine: 237,
          },
          {
            type: 'ice',
            size: 'small',
            price: 3500,
            amount: 500,
            kcal: 253,
            caffeine: 237,
          },
          {
            type: 'hot',
            size: 'large',
            price: 4000,
            amount: 625,
            kcal: 198,
            caffeine: 237,
          },
          {
            type: 'ice',
            size: 'large',
            price: 4500,
            amount: 825,
            kcal: 198,
            caffeine: 237,
          },
        ],
      },
      {
        menuName: '딸기라떼',
        category: 'beverage',
        types: ['ice'],
        sizes: ['원사이즈'],
        description:
          '달콤한 딸기 과육이 가득! 부드럽고 달콤하게 즐기는 딸기라떼',
        nutritionalInfos: [
          {
            type: 'ice',
            size: '원사이즈',
            price: 4000,
            amount: 590,
            kcal: 331,
            caffeine: 0,
          },
        ],
      },
      {
        menuName: '사라다빵',
        category: 'dessert',
        types: ['dessert'],
        sizes: ['원사이즈'],
        description: '어린시절 빵집에서 사먹던 추억의 감자 사라다빵',
        nutritionalInfos: [
          {
            type: 'dessert',
            size: '원사이즈',
            price: 3000,
            amount: 0,
            kcal: 386,
            caffeine: 0,
          },
        ],
      },
    ],
  },
];
