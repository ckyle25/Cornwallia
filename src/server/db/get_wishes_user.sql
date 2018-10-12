SELECT
userid
,edwuserid
,familyid
,isparentflg
,biographytxt
,firstnameval
,lastnameval
,isadminflg
,accessgroup1flg
,accessgroup2flg
,accessgroup3flg
FROM wishes_users
WHERE edwuserid = $1
