import fetch, { FetchError } from "node-fetch";
///<reference path="node.d.ts" />
import { MEE6User, MEE6RoleReward, VarIdentity } from './index'
const defaultURL = "https://mee6.xyz/api/plugins/levels/leaderboard/"
export default class MEE6 {
  private static async makeRequest(endpoint: string): Promise<any> {
    const response = await fetch(defaultURL + endpoint)

    if (response.status !== 200) {
      throw new FetchError(response.status + ': ' + response.statusText, 'basic')
    }
    return await response.json()
  }

  private static parseID(variable: VarIdentity): string | void {
    if (typeof variable == 'string') return variable
    else if (typeof variable.id == 'string') return variable.id
    else throw new Error("Unable to find or parse ID given.")
  }

  public static async fetchLeaderboardByPage(guild: VarIdentity, page: number = 0, limit: number = 1000): Promise<MEE6User[]> {
    const id = this.parseID(guild)
    const { players: users } = await this.makeRequest(id + '?limit=' + limit + '&page=' + page)
    return users.map((user: MEE6User, index: number) => {
      const { id, level, username, discriminator, avatar, message_count, detailed_xp } = user
      const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}`
      const rank = (limit * page) + index + 1
      return {
        id,
        level,
        username,
        discriminator,
        avatarURL,
        message_count,
        xp: detailed_xp,
        rank
      }
    })
  }

  public static async fetchLeaderboard(guild: VarIdentity): Promise<MEE6User[]> {
    const id = this.parseID(guild)
    let pageNum = 0
    let page
    const board = []
    while (true) {
      page = await this.fetchLeaderboardByPage(id as string, pageNum, 1000)
      board.push(...page)
      if (page.length < 1000) break
      pageNum += 1
    }
    return board
  }

  public static async fetchRewards(guild: VarIdentity, sorted: boolean = true): Promise<MEE6RoleReward[]> {
    const id = this.parseID(guild)

    const { role_rewards } = await this.makeRequest(id + '?limit=1')
    if (!sorted) return role_rewards
    //@ts-expect-error
    else return role_rewards.sort((a: any, b: any) => a.rank - b.rank).map(({ rank, ...vars }) => ({ level: rank, ...vars }))
  }

  public static async fetchUser(guild: VarIdentity, user: VarIdentity): Promise<MEE6User | undefined> {
    const guildID = this.parseID(guild)
    const userID = this.parseID(user)
    let pageNum = 0
    let page
    let userInfo

    while (true) {
      page = await this.fetchLeaderboardByPage(guildID as string, 1000, pageNum)
      userInfo = page.find(u => u.id === userID)
      if (page.length < 1000 || userInfo) break
      pageNum += 1
    }
    return userInfo
  }

}