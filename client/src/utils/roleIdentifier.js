const getFinderOrclaimer = (userId, document) => {
  if (userId == document?.finderId?._id) {
    return "finder";
  } else if (userId == document?.claimerId?._id) {
    return "claimer";
  }
};

export { getFinderOrclaimer };
