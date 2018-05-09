package com.mz.vo;

public class selectWaitExamine {
	 /**
     * 考核ID
     */
	private Integer checkID;
	 /**
     * 考核单位名称
     */
	private String checkUnitMC;
    /**
     * 
     * 项目名称
     */
	private String projectMC;
    /**
     * 考核要求
     */
	private String checkDemand;
    /**
     * 考核时间
     */
	
	private String checkTime;
    /**
     * 审核时间
     */
	private String reviewTime;
    /**
     * 审核得分
     */
	private Double reviewScore;
    /**
     * 申请人
     */
	private String applicant;
    /**
     * 审核人
     */
	private String auditor;
    /**
     * 审核否(1 已审核 0未审核)
     */
	private Integer auditNo;
    /**
     * 备注
     */
	private String remarks;
	/**
	 * 日期+时间
	 */
	private String DT;


	public Integer getCheckID() {
		return checkID;
	}

	public void setCheckID(Integer checkID) {
		this.checkID = checkID;
	}

	public String getProjectMC() {
		return projectMC;
	}

	public void setProjectMC(String projectMC) {
		this.projectMC = projectMC;
	}

	public String getCheckDemand() {
		return checkDemand;
	}

	public void setCheckDemand(String checkDemand) {
		this.checkDemand = checkDemand;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}

	public String getReviewTime() {
		return reviewTime;
	}

	public void setReviewTime(String reviewTime) {
		this.reviewTime = reviewTime;
	}

	public Double getReviewScore() {
		return reviewScore;
	}

	public void setReviewScore(Double reviewScore) {
		this.reviewScore = reviewScore;
	}


	public Integer getAuditNo() {
		return auditNo;
	}

	public void setAuditNo(Integer auditNo) {
		this.auditNo = auditNo;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public String getCheckUnitMC() {
		return checkUnitMC;
	}

	public void setCheckUnitMC(String checkUnitMC) {
		this.checkUnitMC = checkUnitMC;
	}

	public String getDT() {
		return DT;
	}

	public void setDT(String dT) {
		DT = dT;
	}

	public String getAuditor() {
		return auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

	public String getApplicant() {
		return applicant;
	}

	public void setApplicant(String applicant) {
		this.applicant = applicant;
	}

}
