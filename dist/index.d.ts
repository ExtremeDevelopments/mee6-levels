import * as MEE6 from "./MEE6";
interface MEE6XP {
    userXp: number;
    levelXp: number;
    totalXp: number;
}
interface MEE6User {
    id: string;
    username: string;
    discriminator: string;
    avatarURL: string;
    avatar: string;
    level: number;
    detailed_xp: MEE6XP;
    xp: MEE6XP;
    rank: number;
    message_count: number;
}
interface MEE6Role {
    id: string;
    name: string;
    mentionable: boolean;
    permissions: number;
    position: number;
    managed: boolean;
    hoist: boolean;
    color: number;
}
interface MEE6RoleReward {
    role: MEE6Role;
    level: number;
}
interface PossibleObj {
    id: string;
}
declare type VarIdentity = PossibleObj | string;
declare const _default: typeof MEE6.default;
export default _default;
export { PossibleObj, VarIdentity, MEE6RoleReward, MEE6Role, MEE6User, MEE6XP };
