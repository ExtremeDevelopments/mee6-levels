import { MEE6User, MEE6RoleReward, VarIdentity } from './index';
export default class MEE6 {
    private static makeRequest;
    private static parseID;
    static fetchLeaderboardByPage(guild: VarIdentity, page?: number, limit?: number): Promise<MEE6User[]>;
    static fetchLeaderboard(guild: VarIdentity): Promise<MEE6User[]>;
    static fetchRewards(guild: VarIdentity, sorted?: boolean): Promise<MEE6RoleReward[]>;
    static fetchUser(guild: VarIdentity, user: VarIdentity): Promise<MEE6User | undefined>;
}
