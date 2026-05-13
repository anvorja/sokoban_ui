export interface LevelData {
  id: number
  name: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil' | 'Experto'
  content: string
}

export const LEVELS: LevelData[] = [
  {
    id: 1,
    name: 'Nivel 1',
    difficulty: 'Fácil',
    content: `WWWWWW
W000WW
WX0X0W
W00W0W
W0000W
WWWWWW
1,1
2,2
2,3`,
  },
  {
    id: 2,
    name: 'Nivel 2',
    difficulty: 'Medio',
    content: `WWWWWWW
W0000WW
W00000W
W0WX0XW
W00000W
WWWWWWW
1,1
2,2
2,3`,
  },
  {
    id: 3,
    name: 'Nivel 3',
    difficulty: 'Difícil',
    content: `00WWWW0
WWW00W0
W00X0WW
W00000W
W0WX00W
W00000W
WWWWWWW
2,1
2,4
3,4`,
  },
  {
    id: 4,
    name: 'Nivel 4',
    difficulty: 'Experto',
    content: `0WWWWW0
WW000WW
W00W00W
W00X00W
W00X00W
WW0X0WW
0WWWWW0
1,2
3,2
3,3
3,4`,
  },
  {
    id: 5,
    name: 'Nivel 5',
    difficulty: 'Experto',
    content: `WWWWWWWW
W000000W
W0WW000W
W0X0X00W
W000000W
W00WW00W
W000X00W
WWWWWWWW
1,1
3,2
3,4
6,3`,
  },
  {
    id: 6,
    name: 'Nivel 6',
    difficulty: 'Experto',
    content: `0WWWWWWW0
WW0000W0W
W000W000W
W0X000X0W
W000W000W
W0X0W0X0W
WW000000W
0WWWWWWW0
1,1
3,2
3,6
5,2
5,6`,
  },
  {
    id: 7,
    name: 'Nivel 7',
    difficulty: 'Experto',
    content: `00WWWWWWW
WWW00000W
W0000W00W
W0X0X000W
W00W0X00W
W0000000W
W00X0W00W
WW0000W0W
00WWWWWWW
1,3
3,2
3,4
4,5
6,3`,
  },
  {
    id: 8,
    name: 'Nivel 8',
    difficulty: 'Experto',
    content: `00WWWWWWW0
0WW000000W
WW0000W00W
W000X0X00W
W0W000000W
W00X00X00W
W0000W000W
WW000X000W
0WW000000W
00WWWWWWWW
2,1
3,3
3,5
5,3
5,6
7,5`,
  },
]
