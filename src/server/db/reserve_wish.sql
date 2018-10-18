UPDATE wishes_wishes
SET reservedflg = 1,
reserveduserid = $1
WHERE wishid = $2;
