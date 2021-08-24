import fetch, { FetchError } from "node-fetch";

const defaultURL = "https://mee6.xyz/api/plugins/levels/leaderboard/"
interface PossibleObjectTypes { id: string }
interface Mee6User {
  id: string
  level: string
  username: string
  discriminator: string
  avatar: string
  message_count: string
  detailed_xp: {
    userXp: string
    levelXp: string
    totalXp: string
  }
}
export class Mee6Levels {
  private static async makeRequest(endpoint: string): Promise<any> {
    const response = await fetch(defaultURL + endpoint)

    if (response.status !== 200) {
      throw new FetchError(response.status + ': ' + response.statusText, 'basic')
    }
    return await response.json()
  }

  private static parseID(variable: string | PossibleObjectTypes): string | void {
    if (typeof variable == 'string') return variable
    else if (typeof variable.id == 'string') return variable.id
    else throw new Error("Unable to find or parse ID given.")
  }

  public static async fetchLeaderBoardByPage(guild: string | PossibleObjectTypes, page: number = 0, limit: number = 1000): Promise<Array<Mee6User>> {
    const id = this.parseID(guild)
    const { users } = await this.makeRequest(id + '?limit=' + limit + '&page=' + page)
    return users.map((user: Mee6User, index: number) => {
      const { id, level, username, discriminator, avatar, message_count } = user
      const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}`
      const rank = (limit * page) + index + 1
      return {
        id,
        level,
        username,
        discriminator,
        avatarURL,
        message_count,
        xp: user.detailed_xp,
        rank
      }
    })
  }

  public static async fetchRewards(guild: string | PossibleObjectTypes, sorted: boolean = true) {
    const id = this.parseID(guild)

    const { role_rewards } = await this.makeRequest(id + '?limit=1')
    if (!sorted) return role_rewards
    //@ts-expect-error
    else return role_rewards.sort((a: any, b: any) => a.rank - b.rank).map(({ rank, ...vars }) => ({ level: rank, ...vars }))
  }
}