const timeAgo = (date) => {
  const differenceInSeconds = Math.floor(
    (new Date() - Date.parse(date)) / 1000
  );
  if (differenceInSeconds < 15) return "just now";
  const durationNames = ["year", "month", "day", "hour", "minute"];
  const secondsPerDuration = [31536000, 2592000, 86400, 3600, 60];
  let nWholeDurations = 0;
  var i = -1;
  do {
    ++i;
    nWholeDurations = Math.floor(differenceInSeconds / secondsPerDuration[i]);
  } while (i < 4 && nWholeDurations === 0);

  return nWholeDurations >= 1
    ? nWholeDurations +
        " " +
        durationNames[i] +
        (nWholeDurations > 1 ? "s" : "") +
        " ago"
    : differenceInSeconds + " seconds ago";
};

export default timeAgo;
