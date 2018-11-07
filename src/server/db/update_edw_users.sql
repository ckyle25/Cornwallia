UPDATE users
SET emaildsc = $2,
isadminflg = $3,
wishesflg = $4,
lanpartyflg = $5,
calendarflg = $6,
firstnameval = $7,
lastnameval = $8,
auth0id = $9
WHERE userid = $1
