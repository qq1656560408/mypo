package com.mz.vo;

import java.util.List;

public class SelectModuleAuthority {
	private Integer id;
	private String text;
	private Integer assistantID;
    private List<SelectModuleAuthority> children;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Integer getAssistantID() {
		return assistantID;
	}
	public void setAssistantID(Integer assistantID) {
		this.assistantID = assistantID;
	}
	public List<SelectModuleAuthority> getChildren() {
		return children;
	}
	public void setChildren(List<SelectModuleAuthority> children) {
		this.children = children;
	}
    
	
}
