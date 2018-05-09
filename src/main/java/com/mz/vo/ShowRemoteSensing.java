package com.mz.vo;

import java.util.List;

public class ShowRemoteSensing {

	private int id,parentsID;
	private String text,url;
	private List<ShowRemoteSensing> children;
	
	
	
	
	

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
	public int getParentsID() {
		return parentsID;
	}
	public void setParentsID(int parentsID) {
		this.parentsID = parentsID;
	}

	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public List<ShowRemoteSensing> getChildren() {
		return children;
	}
	public void setChildren(List<ShowRemoteSensing> children) {
		this.children = children;
	}
	
	
	
}
