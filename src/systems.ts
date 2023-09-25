type Modifier = { type: 'replace' | 'add'; map: Map<number, number> };

type ScoringSystem = {
  map: Map<number, number>;
  modifiers?: {
    s?: Modifier;
    f?: Modifier;
  };
};

type SupportedModifierKey = keyof NonNullable<ScoringSystem['modifiers']>;
type SupportedModifier = { label: string; value: SupportedModifierKey };

type Systems = Array<{
  label: string;
  system: ScoringSystem;
  supportedModifiers?: SupportedModifier[];
}>;

const fastestLapModifier: SupportedModifier = {
  label: 'Fastest lap',
  value: 'f',
};

const sprintModifier: SupportedModifier = {
  label: 'Sprint',
  value: 's',
};

const system1962: ScoringSystem = {
  map: new Map([
    [1, 9],
    [2, 6],
    [3, 4],
    [4, 3],
    [5, 2],
    [6, 1],
  ]),
};

const system1991: ScoringSystem = {
  map: new Map([
    [1, 10],
    [2, 6],
    [3, 4],
    [4, 3],
    [5, 2],
    [6, 1],
  ]),
};

const system2003: ScoringSystem = {
  map: new Map([
    [1, 10],
    [2, 8],
    [3, 6],
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 1],
  ]),
};

const system2010: ScoringSystem = {
  map: new Map([
    [1, 25],
    [2, 18],
    [3, 15],
    [4, 12],
    [5, 10],
    [6, 8],
    [7, 6],
    [8, 4],
    [9, 2],
    [10, 1],
  ]),
};

const system2019: ScoringSystem = {
  map: new Map([
    [1, 25],
    [2, 18],
    [3, 15],
    [4, 12],
    [5, 10],
    [6, 8],
    [7, 6],
    [8, 4],
    [9, 2],
    [10, 1],
  ]),
  modifiers: {
    f: {
      type: 'add',
      map: new Map([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
        [9, 1],
        [10, 1],
      ]),
    },
  },
};

const system2021: ScoringSystem = {
  map: new Map([
    [1, 25],
    [2, 18],
    [3, 15],
    [4, 12],
    [5, 10],
    [6, 8],
    [7, 6],
    [8, 4],
    [9, 2],
    [10, 1],
  ]),
  modifiers: {
    s: {
      type: 'replace',
      map: new Map([
        [1, 3],
        [2, 2],
        [3, 1],
      ]),
    },
    f: {
      type: 'add',
      map: new Map([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
        [9, 1],
        [10, 1],
      ]),
    },
  },
};

const system2022: ScoringSystem = {
  map: new Map([
    [1, 25],
    [2, 18],
    [3, 15],
    [4, 12],
    [5, 10],
    [6, 8],
    [7, 6],
    [8, 4],
    [9, 2],
    [10, 1],
  ]),
  modifiers: {
    s: {
      type: 'replace',
      map: new Map([
        [1, 8],
        [2, 7],
        [3, 6],
        [4, 5],
        [5, 4],
        [6, 3],
        [7, 2],
        [8, 1],
      ]),
    },
    f: {
      type: 'add',
      map: new Map([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
        [9, 1],
        [10, 1],
      ]),
    },
  },
};

export const systems = [
  {
    label: '1962-1990',
    system: system1962,
  },
  {
    label: '1991-2002',
    system: system1991,
  },
  {
    label: '2003-2009',
    system: system2003,
  },
  {
    label: '2010-2018',
    system: system2010,
  },
  {
    label: '2019-present',
    system: system2019,
    supportedModifiers: [fastestLapModifier],
  },
  {
    label: '2021',
    system: system2021,
    supportedModifiers: [fastestLapModifier, sprintModifier],
  },
  {
    label: '2022-present',
    system: system2022,
    supportedModifiers: [fastestLapModifier, sprintModifier],
  },
] satisfies Systems;

export const getScore = (str: string, system: ScoringSystem) => {
  const match = str.match(/^(\d{1,2})([fs]?)/);
  if (!match) return 0;

  const [, placingStr, modifierStr] = match;
  const placing = Number(placingStr);

  let regularKey = system.map;
  const modifier = system.modifiers?.[modifierStr as SupportedModifierKey];

  if (modifier?.type === 'replace') {
    regularKey = modifier.map;
  }

  const [minPlacing] = Array.from(regularKey)
    .map(([p]) => p)
    .sort(Number);
  const [maxPlacing] = Array.from(regularKey)
    .map(([p]) => p)
    .sort(Number)
    .reverse();

  if (
    isNaN(placing) ||
    placing < minPlacing ||
    placing > maxPlacing ||
    !regularKey.has(placing)
  ) {
    return 0;
  }

  let score = regularKey.get(placing);

  if (score === undefined) return 0;

  if (modifierStr === 's' && !modifier) {
    return 0;
  }

  if (modifier?.type === 'add') {
    score += modifier.map.get(placing) ?? 0;
  }

  return score;
};
