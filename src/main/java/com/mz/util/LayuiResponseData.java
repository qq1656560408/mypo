package com.mz.util;

import java.util.List;

/**
 * layui表格数据格式
 * @author admin
 *
 */
public class LayuiResponseData {
	

	//响应码 数据总数
	private int code=0, count;
	//消息
	private String msg="";
	//数据
	List<?> data;


	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public List<?> getData() {
		return data;
	}
	public void setData(List<?> data) {
		this.data = data;
	}
	
	public LayuiResponseData(int count,List<?> data){
		this.count=count;
		this.data=data;
	}
	public LayuiResponseData() {
	}
	
	
}
