package com.mz.vo;

import java.util.List;

public class ShowProcessFile {



	
	
	
	private int id;
	private String text;
	private String processFileURL;
	private int parentID;
	private List<ShowProcessFile> children;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getProcessFileURL() {
		return processFileURL;
	}
	public void setProcessFileURL(String processFileURL) {
		this.processFileURL = processFileURL;
	}
	public int getParentID() {
		return parentID;
	}
	public void setParentID(int parentID) {
		this.parentID = parentID;
	}
	public List<ShowProcessFile> getChildren() {
		return children;
	}
	public void setChildren(List<ShowProcessFile> children) {
		this.children = children;
	}
}
