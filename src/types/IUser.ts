
export interface IUser {
  _id: string,
  password: string,
  names: string,
  surnames: string,
  score: number,
  selected_teams: {
    champion: string,
    runner_up: string,
    third_place: string
  },
  matches_results: {
    [key: string]: {
      local_score: number,
      visitor_score: number
    }
  },
}