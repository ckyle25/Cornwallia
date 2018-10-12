SELECT
	wu.userid
	,wu.familyid
	,wu.isparentflg
	,wu.biographytxt
	,wu.firstnameval
	,wu.lastnameval
	,wf.familynm
	,wf.familygroupid
FROM wishes_users wu
JOIN wishes_family wf
	ON wu.familyid = wf.familyid