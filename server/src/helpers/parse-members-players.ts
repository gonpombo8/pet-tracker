import { values } from 'lodash';

interface Members<M, P> {
  [key: string]: Member<M> | Player<P>;
}

type Member<T> = {
  username: string;
  type: 'member';
} & T;

type Player<T> = {
  username: string;
  type: 'player';
} & T;

interface Response<M, P> {
  members: { [key: string]: Member<M> };
  players: { [key: string]: Player<P> };
}

const parseMembersPlayers = <M, P>
  (members: Members<M, P>): Response<M, P> =>
    values(members).reduce(
      (acc: Response<M, P>, member) => {
        if (member.type === 'member') {
          acc.members = { ...acc.members, [member.username]: member };
        }
        if (member.type === 'player') {
          acc.players = { ...acc.players, [member.username]: member };
        }
        return acc;
      },
      { members: {}, players: {} },
    );

export default parseMembersPlayers;
