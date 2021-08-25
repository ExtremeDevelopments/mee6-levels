"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importStar(require("node-fetch"));
const defaultURL = "https://mee6.xyz/api/plugins/levels/leaderboard/";
class MEE6 {
    static async makeRequest(endpoint) {
        const response = await node_fetch_1.default(defaultURL + endpoint);
        if (response.status !== 200) {
            throw new node_fetch_1.FetchError(response.status + ': ' + response.statusText, 'basic');
        }
        return await response.json();
    }
    static parseID(variable) {
        if (typeof variable == 'string')
            return variable;
        else if (typeof variable.id == 'string')
            return variable.id;
        else
            throw new Error("Unable to find or parse ID given.");
    }
    static async fetchLeaderboardByPage(guild, page = 0, limit = 1000) {
        const id = this.parseID(guild);
        console.log({ page, limit });
        const { players: users } = await this.makeRequest(id + '?limit=' + limit + '&page=' + page);
        return users.map((user, index) => {
            const { id, level, username, discriminator, avatar, message_count, detailed_xp } = user;
            const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;
            const rank = (limit * page) + index + 1;
            return {
                id,
                level,
                username,
                discriminator,
                avatarURL,
                message_count,
                xp: detailed_xp,
                rank
            };
        });
    }
    static async fetchLeaderboard(guild) {
        const id = this.parseID(guild);
        let pageNum = 0;
        let page;
        const board = [];
        while (true) {
            page = await this.fetchLeaderboardByPage(id, pageNum, 1000);
            board.push(...page);
            if (page.length < 1000)
                break;
            pageNum += 1;
        }
        return board;
    }
    static async fetchRewards(guild, sorted = true) {
        const id = this.parseID(guild);
        const { role_rewards } = await this.makeRequest(id + '?limit=1');
        if (!sorted)
            return role_rewards;
        else
            return role_rewards.sort((a, b) => a.rank - b.rank).map(({ rank, ...vars }) => ({ level: rank, ...vars }));
    }
    static async fetchUser(guild, user) {
        const guildID = this.parseID(guild);
        const userID = this.parseID(user);
        let pageNum = 0;
        let page;
        let userInfo;
        while (true) {
            page = await this.fetchLeaderboardByPage(guildID, 1000, pageNum);
            userInfo = page.find(u => u.id === userID);
            if (page.length < 1000 || userInfo)
                break;
            pageNum += 1;
        }
        return userInfo;
    }
}
exports.default = MEE6;
