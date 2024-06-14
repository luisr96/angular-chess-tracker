export interface UserStatsData {
  chess_daily: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    best: {
      rating: number;
      date: number;
      game: string;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess_rapid: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
  chess_blitz: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
  fide: number;
  tactics: {
    highest: {
      rating: number;
      date: number;
    };
    lowest: {
      rating: number;
      date: number;
    };
  };
  puzzle_rush: {};
}

export const defaultUserStatsData: UserStatsData = {
  chess_daily: {
    last: {
      rating: 0,
      date: 0,
      rd: 0,
    },
    best: {
      rating: 0,
      date: 0,
      game: '',
    },
    record: {
      win: 0,
      loss: 0,
      draw: 0,
      time_per_move: 0,
      timeout_percent: 0,
    },
  },
  chess_rapid: {
    last: {
      rating: 0,
      date: 0,
      rd: 0,
    },
    record: {
      win: 0,
      loss: 0,
      draw: 0,
    },
  },
  chess_blitz: {
    last: {
      rating: 0,
      date: 0,
      rd: 0,
    },
    record: {
      win: 0,
      loss: 0,
      draw: 0,
    },
  },
  fide: 0,
  tactics: {
    highest: {
      rating: 0,
      date: 0,
    },
    lowest: {
      rating: 0,
      date: 0,
    },
  },
  puzzle_rush: {},
};
