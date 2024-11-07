const parseIsFavourite = (boolean) => {
  if (typeof boolean !== 'string') return undefined;

  if (boolean === 'true') return true;
  if (boolean === 'false') return false;
  return undefined;
};

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return undefined;

  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(contactType) ? contactType : undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  return {
    contactType: parseContactType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
