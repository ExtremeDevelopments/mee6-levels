export declare module 'mee6-levels' {
  export interface MEE6XP {
    userXp: number
    levelXp: number
    totalXp: number
  }
  export interface MEE6User {
    id: string
    username: string
    discriminator: string
    avatarURL: string
    level: number
    xp: MEE6XP
    rank: number
    message_count: number
  }

  export interface MEE6Role {
    id: string
    name: string
    mentionable: boolean
    permissions: number
    position: number
    managed: boolean
    hoist: boolean
    color: number
  }

  export interface MEE6RoleReward {
    role: MEE6Role
    level: number
  }

  export interface PossibleObj {
    id: string
  }
  export type VarIdentity = PossibleObj | string

  export default class MEE6 {
    private static makeRequest(endpoint: string): Promise<any>
    private static parseID(variable: VarIdentity): string | void
    public static fetchLeaderboardByPage(guild: VarIdentity, page?: number, limit?: number): Promise<MEE6User[]>
    public static fetchLeaderboard(guild: VarIdentity): Promise<MEE6User[]>
    public static fetchRewards(guild: VarIdentity, sorted?: boolean): Promise<MEE6RoleReward[]>
    public static fetchUser(guild: VarIdentity, user: VarIdentity): Promise<MEE6User | undefined>

  }
}