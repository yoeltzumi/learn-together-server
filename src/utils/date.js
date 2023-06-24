const compareHours = (hour1, hour2) => {
  const split1 = hour1.split(":").map((st) => Number(st));
  const split2 = hour2.split(":").map((st) => Number(st));
  if (split1[0] > split2[0]) {
    return 1;
  } else if (split1[0] < split2[0]) {
    return -1;
  } else {
    if (split1[1] > split2[0]) {
      return 1;
    } else if (split1[1] < split2[1]) {
      return -1;
    } else {
      return 0;
    }
  }
};

module.exports = {
  compareHours,
};
