UPDATE wishes_wishes
SET reservedflg = 1,
reserveduserid = $1
WHERE wishid = $2;

SELECT
ww.wishid
,ww.titledsc
,ww.costamt
,ww.linktxt
,ww.descriptiondsc
,ww.ratingnbr
,ww.userid
,ww.reservedflg
,ww.reserveduserid
,wf.parent1wishesuserid
,wf.parent2wishesuserid
FROM wishes_wishes ww
	LEFT JOIN wishes_users wu
		on wu.userid = ww.userid
	LEFT JOIN wishes_family wf
		on wf.familyid = wu.familyid
WHERE ww.userid = $3

