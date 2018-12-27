export interface JwtSession {
  jwt?: string;
  refresh?: string;
}

type Key = 'pettracker.jwt' | 'pettracker.refresh';

const storage = () => ({
  getItem: (k: Key) => localStorage.getItem(k),
  setItem: (k: Key, v: string) => localStorage.setItem(k, v),
});

export const getSession = (): JwtSession | false => {
  const { getItem } = storage();
  const jwt = getItem('pettracker.jwt');
  const refresh = getItem('pettracker.refresh') || '';

  if (!jwt) return false;

  return { jwt, refresh };
};


export const setSession = (
  { jwt, refresh }: JwtSession,
): boolean => {
  const current = getSession();

  if (current && current.jwt === jwt) {
    return false;
  }

  const { setItem } = storage();
  setItem('pettracker.jwt', jwt || '');
  setItem('pettracker.refresh', refresh || '');

  return true;
};
