const getPosition = (options: any = {}) =>
  new Promise<Position>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );

const parseError = (error: PositionError) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      return 'Accept the request for geolocation to notifiy the pet owner';
    case error.POSITION_UNAVAILABLE:
      return 'Location information is unavailable. Contact the pet owner.';
    case error.TIMEOUT:
      return 'The request to get user location timed out.';
    default:
      return 'An unknown error occurred.';
  }
}

export default async () => {
  try {
    const position: Position = await getPosition();
    return { position }
  } catch (e) {
    return { error: parseError(e) };
  }
}
