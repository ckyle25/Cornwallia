UPDATE TABLE users
SET emaildsc = $2,
isadminflg = $3,
lanpartyflg = $4,
calendarflg = $5,
firstnameval = $6,
lastnameval = $7,
auth0id = $8
WHERE userid = $1
